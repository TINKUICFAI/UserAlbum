module.exports = (lang = "en") => {
  const success = {
    en: "success",
  };

  const register_success = {
    en: "user registered successfully",
  };

  const email_register = {
    en: "User already registered with given email!",
  };

  const incorrect_password = {
    en: "You have entered wrong password!",
  };

  const user_not_found = {
    en: "User not found with given email!",
  };

  const invalid_token = {
    en: "Invalid token!",
  };

  const album_found = {
    en: "Album already found with given name!",
  };

  const album_not_found = {
    en: "Album not found with given id!",
  };

  const album_active = {
    en: "Album active successfully",
  };

  const album_not_active = {
    en: "Album inactive successfully!",
  };

  const album_deleted = {
    en: "Album deleted successfully",
  };

  const profile_changed = {
    en: "Profile update successfully",
  };

  const file_upload = {
    en: "File uploaded!",
  };
  return {
    success: success[lang],
    email_register: email_register[lang],
    register_success: register_success[lang],
    user_not_found: user_not_found[lang],
    incorrect_password: incorrect_password[lang],
    invalid_token: invalid_token[lang],
    album_found: album_found[lang],
    album_not_found: album_not_found[lang],
    profile_changed: profile_changed[lang],
    album_active: album_active[lang],
    album_not_active: album_not_active[lang],
    album_deleted: album_deleted[lang],
    file_upload: file_upload[lang],
  };
};
