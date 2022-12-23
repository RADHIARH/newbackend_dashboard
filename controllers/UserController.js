let dbConn = require("../db");
const fs = require("fs");
// get all users (user,employe and admin
exports.getallusers = (req, res) => {
  dbConn.query("SELECT * FROM user_table", (err, rows, fields) => {
    if (!err) res.send(rows.rows);
    else console.log(err);
  });
};
// add user
exports.adduser = (req, res) => {
  const user = req.body;
  console.log(user);
  dbConn.query(
    "insert into user_table (user_firstname,user_lastname,user_phone,user_email,user_civility,user_speciality,user_adress,user_birthday,user_seniority,user_experience,user_comment,id_role,cin,poste,verified,deleted) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      user.firstname,
      user.lastname,
      user.phone,
      user.email,
      user.civility,
      user.speciality,
      user.adress,
      user.birthday,
      user.seniority,
      user.experience,
      user.comment,
      user.role,
      user.cin,
      user.poste,
      false,
      false,
    ],
    (err, rows, fields) => {
      if (!err) res.send("user successfully added");
      else console.log(err);
    }
  );
};
// get all users
exports.getusers = (req, res) => {
  dbConn.query(
    'SELECT * FROM user_table  where id_role=(select id from role where role="utilisateur") and deleted=false',
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
// update user
exports.updateuser = (req, res) => {
  const user = req.body;
  const user_id = req.params.id;
  console.log("userrr" + req.body);
  console.log("user" + user_id);
  dbConn.query(
    "update  user_table  set user_firstname=$1 ,user_lastname =$2 ,user_phone=$3,user_email=$4, user_civility=$5, user_speciality=$6, user_adress=$7,  user_birthday=$8, user_seniority=?  ,user_experience=$9 , user_comment =$10 , cin=$11 , poste=$12  where user_id =$13 ",
    [
      user.firstname,
      user.lastname,
      user.phone,
      user.email,
      user.civility,
      user.speciality,
      user.adress,
      user.birthday,
      user.seniority,
      user.experience,
      user.comment,
      user.cin,
      user.poste,
      user_id,
    ],
    (err, rows, fields) => {
      if (!err) res.send("user successfully updated");
      else console.log(err);
    }
  );
};

// delete user
exports.deleteuser = (req, res) => {
  const user_id = req.params.id;
  dbConn.query(
    "update  user_table  set deleted=true where user_id =$1 ",
    [user_id],
    (err, rows, fields) => {
      if (!err) res.send("user successfully deleted");
      else console.log(err);
    }
  );
};
// get user by id
exports.getuserbyid = (req, res) => {
  const user_id = req.params.id;
  console.log(user_id);
  dbConn.query(
    "select * from  user_table   where user_id =$1 ",
    [user_id],
    (err, rows, fields) => {
      if (!err) res.send(rows.rows);
      else console.log(err);
    }
  );
};

exports.updateuserpassword = (req, res) => {
  dbConn.query(
    "update  user_table  set user_password =$1  where user_id =$2 ",
    [req.body.code, req.body.id],
    (err, rows, fields) => {
      if (!err) res.send(rows.rows);
      else console.log(err);
    }
  );
};

// edit user password
exports.edituserpassword = (req, res) => {
  const user = req.params.id;
  const pass = req.body.password;
  dbConn.query(
    "update  user_table	 set user_password =$1 where user_id =$2  ",
    [pass, user],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log(rows.rows);
      } else console.log(err);
    }
  );
};

// validate user informations
exports.validateuser = (req, res) => {
  const user = req.body;
  const user_id = req.params.id;
  console.log("userrr" + req.body);
  console.log("user" + user_id);
  dbConn.query(
    "update  user_table  set user_firstname=$1 ,user_lastname =$2 ,user_phone=$3,user_email=$4, user_civility=$5, user_speciality=$6, user_adress=$7,  user_birthday=$8, user_seniority=$9 ,user_experience=$10 , user_comment =$11 , cin=$12 , poste=$13 ,verified=$14 where user_id =$15 ",
    [
      user.firstname,
      user.lastname,
      user.phone,
      user.email,
      user.civility,
      user.speciality,
      user.adress,
      user.birthday,
      user.seniority,
      user.experience,
      user.comment,
      user.cin,
      user.poste,
      true,
      user_id,
    ],
    (err, rows, fields) => {
      if (!err) res.send("user successfully updated");
      else console.log(err);
    }
  );
};

// get user images
exports.getuserpictures = (req, res) => {
  dbConn.query(
    "select * from user_images where user_id=$1  ",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows.rows);
      else console.log(err);
    }
  );
};
// add new image
exports.addimage = (req, res) => {
  const id = req.params.id;
  // add new path to store images 
  const newpath = "D:/imagesfolder";
  fs.access(path, (error) => {
    if (error) {
      fs.mkdir(path, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("New Directory created successfully !!");
        }
      });
    } else {
      console.log("Given Directory already exists !!");
    }
  });

  const file = req.files.file;
  const filename = file.name;
  console.log(filename);

  file.mv(`${newpath}${filename}`);
  dbConn.query(
    "insert into user_images(user_id,img_name)  values($1,$2)",
    [id, filename],
    (err, rows, fields) => {
      if (!err) res.send("added");
      else console.log(err);
    }
  );
};
// get content by  language
exports.getcontentbylanguage = (req, res) => {
  const id = req.params.id;
  dbConn.query(
    "SELECT * FROM  language_content where id_lang =$1",
    [id],
    (err, rows, fields) => {
      if (!err) res.send(rows.rows);
      else console.log(err);
    }
  );
};
// get selected language
exports.getlanguage = (req, res) => {
  const id = req.params.id;
  dbConn.query(
    "SELECT * FROM  language where id_lang =$1",
    [id],
    (err, rows, fields) => {
      if (!err) res.send(rows.rows[0]);
      else console.log(err);
    }
  );
};
// get all employers
exports.getallemployes = (req, res) => {
  dbConn.query(
    'SELECT * FROM user_table where id_role=(select id from role where role="employeur") and deleted=false',
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
