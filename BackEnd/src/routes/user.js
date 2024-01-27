const userRouter = require("express").Router();
const UserValidator = require("../validators/UserValidator");
const AlbumValidator = require("../validators/AlbumValidator");
const UserController = require("../controllers/UserController");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

userRouter.post(
  "/register",
  UserValidator().validateUserRegister,
  ErrorHandlerMiddleware(UserController().addUser),
  ResponseMiddleware
);

userRouter.put(
  "/editProfile",
  AuthMiddleware().verifyUserToken,
  UserValidator().validateEditProfile,
  ErrorHandlerMiddleware(UserController().editProfile),
  ResponseMiddleware
);

userRouter.get(
  "/details",
  AuthMiddleware().verifyUserToken,
  ErrorHandlerMiddleware(UserController().getDetails),
  ResponseMiddleware
);

/**
 * Albums
 */

userRouter.post(
  "/albums",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbum,
  ErrorHandlerMiddleware(UserController().createAlbum),
  ResponseMiddleware
);

userRouter.get(
  "/albums",
  AuthMiddleware().verifyUserToken,
  ErrorHandlerMiddleware(UserController().getAllAlbums),
  ResponseMiddleware
);

userRouter.get(
  "/albums/:id",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbumId,
  ErrorHandlerMiddleware(UserController().getAlbumDetail),
  ResponseMiddleware
);

userRouter.put(
  "/albums/:id",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbumId,
  ErrorHandlerMiddleware(UserController().editAlbum),
  ResponseMiddleware
);

userRouter.patch(
  "/albums/:id",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbumId,
  ErrorHandlerMiddleware(UserController().activeInActiveAlbum),
  ResponseMiddleware
);

userRouter.delete(
  "/albums/:id",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbumId,
  ErrorHandlerMiddleware(UserController().deleteAlbum),
  ResponseMiddleware
);

/**
 * Album Media
 */

userRouter.post(
  "/albums/:id/files",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbumId,
  ErrorHandlerMiddleware(UserController().uploadFile),
  ResponseMiddleware
);

userRouter.get(
  "/albums/:id/files",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbumId,
  ErrorHandlerMiddleware(UserController().filesList),
  ResponseMiddleware
);

userRouter.get(
  "/albums/:id/files/:fileId",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbumId,
  ErrorHandlerMiddleware(UserController().fileDetail),
  ResponseMiddleware
);

userRouter.put(
  "/albums/:id/files/:fileId",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbumId,
  ErrorHandlerMiddleware(UserController().updateFile),
  ResponseMiddleware
);

userRouter.delete(
  "/albums/:id/files/:fileId",
  AuthMiddleware().verifyUserToken,
  AlbumValidator().validateAlbumId,
  ErrorHandlerMiddleware(UserController().removeFile),
  ResponseMiddleware
);

module.exports = userRouter;
