const express = require("express");
const { route } = require("./listing");
const router = express.Router();
const User = require("../models/user");
const wrapasync = require("../utils/wrapasync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");

router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapasync(userController.signUp));

router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), userController.login);

router.get("/logout", userController.logout);

module.exports = router;
