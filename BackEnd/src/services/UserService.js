const User = require("../models/User.js");
const helpers = require("../util/helpers.js");

module.exports = () => {
  const registerUser = (data) => {
    return new Promise(function (resolve, reject) {
      User.create(data).then(resolve).catch(reject);
    });
  };

  const fetch = (id) => {
    return new Promise(function (resolve, reject) {
      let orm = User.findById(id).select("-password -token -otp -__v");
      orm.then(resolve).catch(reject);
    });
  };

  const fetchByQuery = (query) => {
    console.log("UserService => fetchByQuery");
    return new Promise(function (resolve, reject) {
      let orm = User.findOne(query)
        .select("-password -token -otp")
        .sort({ _id: -1 });
      orm.then(resolve).catch(reject);
    });
  };

  const verifyPassword = (id, password) => {
    console.log("UserService => verifyPassword");
    return new Promise(async function (resolve, reject) {
      let user = await User.findById(id);

      if (!user) resolve(false);
      let v = await helpers().checkPassword(password, user.password);

      return resolve(v);
    });
  };

  const updateProfile = (userId, data) => {
    console.log("UserService => resetPassword");
    return new Promise(async function (resolve, reject) {
      let user = await User.findByIdAndUpdate({ _id: userId }, data)
        .then(resolve)
        .catch(reject);
    });
  };

  const deleteUser = (id) => {
    return new Promise(function (resolve, reject) {
      let orm = User.deleteOne({ _id: id });
      orm.then(resolve).catch(reject);
    });
  };

  return {
    registerUser,
    fetch,
    fetchByQuery,
    verifyPassword,
    updateProfile,
    deleteUser,
  };
};
