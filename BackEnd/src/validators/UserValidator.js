const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
  const validateMobile = async (req, res, next) => {
    const v = new Validator(req.body, {
      // countryCode: validations.general.requiredString,
      mobile: validations.user.mobile,
    });

    validate(v, res, next, req);
  };

  const validateOtp = async (req, res, next) => {
    const v = new Validator(req.body, {
      // countryCode: validations.general.requiredString,
      mobile: validations.user.existsmobile,
      code: validations.general.requiredInt,
    });

    validate(v, res, next, req);
  };

  const validateEmailAndPassword = async (req, res, next) => {
    const v = new Validator(req.body, {
      email: validations.user.email,
      password: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateCompleteProfile = async (req, res, next) => {
    const v = new Validator(req.body, {
      name: validations.general.requiredString,
      dob: validations.general.requiredString,
      gender: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateEditProfile = async (req, res, next) => {
    const v = new Validator(req.body, {
      fullName: validations.general.requiredString,
      gender: validations.general.requiredString,
      mobile: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateUserRegister = async (req, res, next) => {
    const v = new Validator(req.body, {
      email: validations.user.email,
      password: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  return {
    validateMobile,
    validateOtp,
    validateEmailAndPassword,
    validateCompleteProfile,
    validateEditProfile,
    validateUserRegister,
  };
};
