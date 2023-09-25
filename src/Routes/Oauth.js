const express = require("express");
const route = express.Router();
const passport = require("passport");
const Oauth = require("../Controllers/ControlOauth");

//!Oauth Google

route.get("/google", passport.authenticate("google", { scope: ["profile"] }));
route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "/login/failed",
  })
);

//!Ouath github

route.get("/github", passport.authenticate("github", { scope: ["profile"] }));
route.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "/login/failed",
  })
);

//!Global Oauth

route.get("/login/success", Oauth.loginSucces);

route.get("/logout", Oauth.Logout);

route.get("/login/failed", Oauth.LoginError);

// route.get("/google", passport.authenticate("google", { scope: ["profile"] }));
// route.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/home");
//   }
// );
module.exports = route;
