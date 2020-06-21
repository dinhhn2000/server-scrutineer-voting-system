var express = require("express");
var router = express.Router();
const UserController = require("../components/users/controllers");
const BlockchainController = require("../components/blockchains/controllers");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Blockchain based voting system" });
});

router.post("/sign-in", UserController.signIn);
router.post("/sign-up", UserController.signUp);
router.post("/add-vote", BlockchainController.addVote);
router.get("/pending-votes", BlockchainController.getPendingVotes);
router.get("/all-votes", BlockchainController.getAllVotes);
router.post("/confirm-votes", BlockchainController.addBlock);
router.post("/update", BlockchainController.updateChain);

module.exports = router;
