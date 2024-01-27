const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
  const validateAlbum = async (req, res, next) => {
    const v = new Validator(req.body, {
      albumName: validations.album.albumName,
    });

    validate(v, res, next, req);
  };

  const validateAlbumId = async (req, res, next) => {
    const v = new Validator(req.params, {
      id: validations.album.id,
    });

    validate(v, res, next, req);
  };

  return { validateAlbum, validateAlbumId };
};
