const UserService = require("../services/UserService");
const helpers = require("../util/helpers.js");

module.exports = () => {
  const login = async (req, res, next) => {
    console.log("AuthController => login");
    let { email, password } = req.body;

    let email_query = { email };

    let user = await UserService().fetchByQuery(email_query);
    if (user) {
      let passwordVerify = await UserService().verifyPassword(
        user._id,
        password
      );

      if (!passwordVerify) {
        req.rCode = 0;
        req.msg = "incorrect_password";
        req.rData = {};
      } else {
        token = await helpers().createJWT({ userId: user._id });
        await UserService().updateProfile(user._id, {
          token,
        });
        req.rData = { token };
      }
    } else {
      req.rCode = 0;
      req.msg = "user_not_found";
      req.rData = {};
    }

    next();
  };

  const verifyOtp = async (req, res, next) => {
    console.log("AuthController => verifyOtpForLogin");
    let { countryCode, mobileNumber, otp } = req.body;

    // var verify = code == "1234" ? true : false;
    let otpUser = 1234;

    // let query = { countryCode, mobileNumber };
    let query = { mobileNumber };

    let user;

    user = await UserService().fetchByQuery(query);

    if (user) otpUser = user.otp;

    var verify = otp == otpUser || 1234 ? true : false;
    // var verify = code == otpUser ? true : false;

    if (user) {
      if (verify) {
        user = await UserService().fetchByQuery(query);

        token = await helpers().createJWT({ userId: user._id });

        req.rData = { token, userId: user._id };
        req.msg = "otp_verified";
      } else {
        req.rCode = 0;
        req.msg = "incorrect_otp";
      }
    } else {
      req.rCode = 0;
      req.msg = "user_not_found";
    }
    next();
  };

  const resendOtp = async (req, res, next) => {
    console.log("AuthController => resendOtpFormobileNumber");
    let { countryCode, mobileNumber } = req.body;

    // let query = { countryCode, mobileNumber };
    let query = { mobileNumber };
    let user = await UserService().fetchByQuery(query);
    if (user) {
      let otp = helpers().generateOTP();

      await UserService().updateProfile(user._id, { otp });

      req.rData = {};
      req.msg = "otp_sent";
    } else {
      req.rCode = 0;
      req.msg = "user_not_found";
      req.rData = {};
    }

    next();
  };

  const socialLogin = async (req, res, next) => {
    console.log("AuthController => socialLogin");
    let { facebookId, googleId, email, firstName, lastName } = req.body;
    let query = {};
    let exists = null;
    if (facebookId && exists == null) {
      query = { facebookId };
      exists = await UserService().fetchByQuery(query);
    }

    if (googleId && exists == null) {
      query = { googleId };
      exists = await UserService().fetchByQuery(query);
    }
    // if (appleId && exists == null) {
    //     query = { appleId };
    //     exists = await UserService().fetchByQuery(query);
    // }
    if (email && exists == null) {
      query = { email };
      exists = await UserService().fetchByQuery(query);
    }

    if (exists) {
      console.log("existes", exists);
      console.log("sdfj", exists._id);
      let data = {};
      if (!exists.firstName && firstName) data.firstName = firstName;
      if (!exists.lastName && lastName) data.lastName = lastName;
      if (facebookId) data.facebookId = facebookId;
      if (googleId) data.googleId = googleId;
      // if (appleId) data.appleId = appleId;
      if (email) data.email = email;

      let user = await UserService().updateProfile(exists._id, data);
      user = await UserService().fetch(exists._id);
      let token = await helpers().createJWT({ userId: exists._id });

      req.rData = { user, token, user_type: "user" };
      req.rCode = 1;
    } else {
      let user = { facebookId, googleId, email, firstName, lastName };
      console.log(user);
      let add_result = await UserService().addNormalUser(user);
      let token = await helpers().createJWT({ userId: add_result._id });
      user = await UserService().fetch(add_result._id);

      req.rData = { user, token };
    }

    next();
  };

  const logout = async (req, res, next) => {
    console.log("AuthController => logout");
    let { userId } = req.body;

    let user = { device_token: null };
    user = await UserService().updateProfile(userId, user);
    req.msg = "logout";
    next();
  };

  return {
    login,
    verifyOtp,
    resendOtp,
    socialLogin,
    logout,
  };
};
