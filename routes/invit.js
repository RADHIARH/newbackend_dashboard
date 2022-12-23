let express = require("express");
const app = require("..");
let router = express.Router();
const controller = require("../controllers/InvitationController");
router.post("/send/email", controller.sendemail);
router.get("/invitations", controller.getinvit);
router.post("/send/whatssapp", controller.sendbywhatsapp);
module.exports = router;
