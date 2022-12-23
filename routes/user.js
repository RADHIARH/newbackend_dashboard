let express = require("express");
let router = express.Router();
const controller = require("../controllers/UserController");
// get all users(users,admin and employes)

router.get("/allusers", controller.getallusers);
// get all users
router.get("/users", controller.getusers);
// get all employes
router.get("/employes", controller.getallemployes);
// add new user
router.post("/add/user", controller.adduser);
// delete user
router.delete("/delete/user/:id", controller.deleteuser);
// get user by id
router.get("/users/:id", controller.getuserbyid);
// update user password
router.put("/edit/password", controller.updateuserpassword);
// validate informations
router.put("/validate/user/:id", controller.validateuser);
//get user pictures
router.get("/images/:id", controller.getuserpictures);
// add image
router.post("/upload/:id", controller.addimage);
// manage languages
router.get("/language/:id", controller.getcontentbylanguage);
router.get("/lang/:id", controller.getlanguage);
module.exports = router;
