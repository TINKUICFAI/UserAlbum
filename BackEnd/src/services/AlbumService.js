const Album = require("../models/Album.js");

module.exports = () => {
  const addAlbum = (data) => {
    return new Promise(function (resolve, reject) {
      Album.create(data).then(resolve).catch(reject);
    });
  };

  const fetch = (id) => {
    return new Promise(function (resolve, reject) {
      let orm = Album.findById(id).select("-__v");
      orm.then(resolve).catch(reject);
    });
  };

  const fetchByQuery = (query) => {
    console.log("AlbumService => fetchByQuery");
    return new Promise(function (resolve, reject) {
      let orm = Album.findOne(query).select("").sort({ _id: -1 });
      orm.then(resolve).catch(reject);
    });
  };

  const updateAlbum = (AlbumId, data) => {
    console.log("AlbumService => updateAlbum");
    return new Promise(async function (resolve, reject) {
      await Album.findByIdAndUpdate({ _id: AlbumId }, data)
        .then(resolve)
        .catch(reject);
    });
  };

  const getAlbum = (query, page, limit) => {
    if (page > 0) {
      page -= 1;
    }
    return new Promise(function (resolve, reject) {
      let orm = Album.find(query)
        .select(" -__v")
        .sort({ rank: 1 })
        .skip(page * limit)
        .limit(limit);
      orm.then(resolve).catch(reject);
    });
  };

  const countAlbum = (query) => {
    return new Promise(function (resolve, reject) {
      let orm = Album.countDocuments(query);
      orm.then(resolve).catch(reject);
    });
  };

  const deleteAlbum = (id) => {
    return new Promise(function (resolve, reject) {
      let orm = Album.deleteOne({ _id: id });
      orm.then(resolve).catch(reject);
    });
  };

  return {
    addAlbum,
    fetch,
    fetchByQuery,
    updateAlbum,
    getAlbum,
    countAlbum,
    deleteAlbum,
  };
};
