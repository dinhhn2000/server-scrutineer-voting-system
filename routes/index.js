var express = require('express');
var router = express.Router();
const userController = require("../components/users/controllers");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blockchain based voting system' });
});

router.post("/sign-in", userController.signIn);
router.post("/sign-up", userController.signUp);

module.exports = router;
