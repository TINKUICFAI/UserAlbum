const AlbumMedia = require("../models/AlbumMedia");

module.exports = () => {
  const addAlbumMedia = (data) => {
    console.log("AlbumMediaService => addAlbumMedia");
    return new Promise(function (resolve, reject) {
      AlbumMedia.create(data).then(resolve).catch(reject);
    });
  };

  const fetch = (id) => {
    console.log("AlbumMediaService => fetch");
    return new Promise(function (resolve, reject) {
      let orm = AlbumMedia.findById(id);
      orm.then(resolve).catch(reject);
    });
  };

  const fetchByQuery = (query) => {
    console.log("AlbumMediaService => fetchByQuery");
    return new Promise(function (resolve, reject) {
      let orm = AlbumMedia.findOne(query).select("-password");

      orm.then(resolve).catch(reject);
    });
  };

  const deleteAlbumMedia = (id) => {
    console.log("AlbumMediaService => deleteAlbumMedia");
    return new Promise(function (resolve, reject) {
      let orm = AlbumMedia.deleteOne({ _id: id });
      orm.then(resolve).catch(reject);
    });
  };

  const updateAlbumMedia = (AlbumMediaId, data) => {
    console.log("AlbumMediaService => updateAlbumMedia");
    return new Promise(async function (resolve, reject) {
      await AlbumMedia.findByIdAndUpdate({ _id: AlbumMediaId }, data)
        .then(resolve)
        .catch(reject);
    });
  };

  const getAlbumMedia = (query, page, limit) => {
    console.log("AlbumMediaService => getAlbumMedia");

    if (page) {
      page -= 1;
    }
    return new Promise(function (resolve, reject) {
      let orm = AlbumMedia.find(query)
        .sort({ _id: -1 })
        .skip(page * limit)
        .limit(limit);
      orm.then(resolve).catch(reject);
    });
  };

  const countAlbumMedia = (query) => {
    console.log("AlbumMediaService => countAlbumMedia");
    return new Promise(function (resolve, reject) {
      let orm = AlbumMedia.countDocuments(query);
      orm.then(resolve).catch(reject);
    });
  };

  const deleteMultipleAlbumMedia = (query) => {
    return new Promise(function (resolve, reject) {
      let orm = AlbumMedia.deleteMany(query);
      orm.then(resolve).catch(reject);
    });
  };
  return {
    addAlbumMedia,
    fetch,
    fetchByQuery,
    deleteAlbumMedia,
    updateAlbumMedia,
    getAlbumMedia,
    countAlbumMedia,
    deleteMultipleAlbumMedia,
  };
};
