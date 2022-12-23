let dbConn = require("../db");
const nodemailer = require("nodemailer");
// send  invit by email
exports.sendemail = (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "radhia.rahmani@sesame.com.tn",
      pass: "RADHIASESAME2016",
      clientId:
        "5865254077-lok9krraq0dfpi9t4870jhn9pq4po5pl.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "db59347fffd625b2c4e84703019f91fe",
    },
  });
  transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
  });

  var mailOptions = {
    from: process.env.EMAIL, // sender address
    to: req.body.email, // list of receivers
    code: req.body.code, // Subject line
    url: req.body.url,
    html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${req.body.email}</li>
            <li>code: ${req.body.code}</li>
            <li>url: ${req.body.url}</li>
        </ul>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ status: false, respMesg: "Email not sended Successfully" });
    } else {
      res.json({ status: true, respMesg: "Email Sent Successfully" });
    }
  });
  dbConn.query(
    "insert into  invitation  (id_user,accepted,datesend) values ($1,$2,$3)",
    [req.body.id, false, req.body.datesend],
    (err, rows, fields) => {
      if (!err) res.send(rows.rows);
      else console.log(err);
    }
  );
};
// get all invitations
exports.getinvit = (req, res) => {
  dbConn.query("SELECT * FROM invitation", (err, rows, fields) => {
    if (!err) res.send(rows.rows);
    else console.log(err);
  });
};
// send invit by whatsapp
exports.sendbywhatsapp = (req, res) => {
  console.log(req.body.code);
  console.log(req.body.tel);
  console.log(req.body.url);
  //   const msg = req.body.msg;
  const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+216${req.body.tel}`,
      body: `votre code est de ${req.body.code} et votre lien est ${req.body.url}`,
    })
    .then((message) => res.send(message))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  dbConn.query(
    "insert into  invitation  (id_user,accepted,datesend) values ($1,$2,$3)",
    [req.body.id, false, req.body.datesend],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
