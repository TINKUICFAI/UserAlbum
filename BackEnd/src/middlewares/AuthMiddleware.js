const jwt = require("jsonwebtoken");
const ResponseMiddleware = require("./ResponseMiddleware");
const JWTSECRET = process.env.JWTSECRET;
const UserService = require("../services/UserService");

module.exports = () => {
  const verifyUserToken = async (req, res, next) => {
    console.log("AuthMiddleware => verifyUserToken");
    let usertoken = req.headers.authorization;

    try {
      if (usertoken) {
        let tokens = usertoken.split(" ");

        let token = tokens[1];
        // console.log("Token", token)
        let payload = jwt.verify(token, JWTSECRET);

        let user = await UserService().fetchByQuery({
          _id: payload.userId,
          token,
        });

        //checking user must exist in our DB else throwing error
        if (user) {
          console.log(`User with ID ${user._id} entered.`);
          req.body.userId = user._id;
          req.body.userNameData = user.name;
          req.body.emailData = user.email;
          req.authUser = user;
          req.body.userTypes = user.userType;
          next();
        } else {
          throw new Error("invalid_token");
        }
      } else {
        throw new Error("invalid_token");
      }
    } catch (ex) {
      // console.log("heres",ex)

      req.msg = "invalid_token";
      if (ex.message == "ac_deactivated") req.msg = ex.message;

      req.rCode = 0;
      ResponseMiddleware(req, res, next);
    }
  };

  return {
    verifyUserToken,
  };
};
