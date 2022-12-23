let express = require("express");
const app = require("..");
let router = express.Router();
const controller = require("../controllers/PermissionsController");
router.get("/permissions", controller.getallpermissions);
router.post("/add/permissions", controller.addnewpermission);
router.get("/permissions/:id", controller.getperbyuser);
router.put("/permissions/:id", controller.deletepermission);
module.exports = router;
