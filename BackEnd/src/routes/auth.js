const express = require("express");
const authRouter = express.Router();
const AuthValidator = require("../validators/AuthValidator");
const AuthController = require("../controllers/AuthController");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

//user login
authRouter.post(
  "/login",
  AuthValidator().validateEmailLogin,
  ErrorHandlerMiddleware(AuthController().login),
  ResponseMiddleware
);

//verifyOtp
// authRouter.post(
//   "/verifyOtp",
//   AuthValidator().validateOtp,
//   ErrorHandlerMiddleware(AuthController().verifyOtp),
//   ResponseMiddleware
// );

// authRouter.put(
//   "/resendOtp",
//   AuthValidator().validateLogin,
//   ErrorHandlerMiddleware(AuthController().resendOtp),
//   ResponseMiddleware
// );

// authRouter.get(
//   "/logout",
//   AuthMiddleware().verifyUserToken,
//   ErrorHandlerMiddleware(AuthController().logout),
//   ResponseMiddleware
// );

module.exports = authRouter;
