const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const Auth = require("../Controllers/ControlAuthentication");
const { validateToken } = require("../Midleware/jwt");

//!login

route.post("/Auth/Login", Auth.Login);

//!create
route.post(
  "/Auth",
  [
    body("username")
      .isLength({ min: 1, max: 12 })
      .withMessage("username min 1 max 12"),
    body("password")
      .isLength({ min: 1, max: 12 })
      .withMessage("username min 1 max 12"),
  ],
  Auth.Create
);
//!get all
route.get("/Auth", validateToken, Auth.getAll);

//!update
route.put(
  "/Auth/:id",
  validateToken,
  [
    body("username")
      .isLength({ min: 1, max: 12 })
      .withMessage("username min 1 max 12"),
    body("password")
      .isLength({ min: 1, max: 12 })
      .withMessage("username min 1 max 12"),
  ],
  Auth.Update
);

//!hapus
route.delete("/Auth/:idDelete", validateToken, Auth.Delete);

module.exports = route;
