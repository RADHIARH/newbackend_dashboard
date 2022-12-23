let dbConn = require("../db");
// get all permissions
exports.getallpermissions = (req, res) => {
  dbConn.query("select * from  permission ", (err, rows, fields) => {
    if (!err) res.send(rows.rows);
    else console.log(err);
  });
};
// add a new permission
exports.addnewpermission = (req, res) => {
  const user = req.body;
  dbConn.query(
    "insert into   user_permissions	(user_permission_value ,id_user,id_permission ) values($1,$2,$3) ",

    [true, user.id, user.id_permission],
    (err, rows, fields) => {
      if (!err) res.send(rows.rows);
      else console.log(err);
    }
  );
};
// get permissions by user
exports.getperbyuser = (req, res) => {
  const user = req.params.id;
  dbConn.query(
    "select * from  user_permissions	where id_user =$1 ",
    [user],
    (err, rows, fields) => {
      if (!err) res.send(rows.rows);
      else console.log(err);
    }
  );
};
// delete permission
exports.deletepermission = (req, res) => {
  const user = req.params.id;
  dbConn.query(
    "update  user_permissions	 set user_permission_value =false where id_user_permission =$1  ",
    [user],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows.rows);
        console.log(rows);
      } else console.log(err);
    }
  );
};
