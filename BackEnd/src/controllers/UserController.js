"use strict";

const UserService = require("../services/UserService");
const AlbumService = require("../services/AlbumService");
const AlbumMediaService = require("../services/AlbumMediaService");
const RegexEscape = require("regex-escape");
const fs = require("fs");
const helpers = require("../util/helpers");
module.exports = () => {
  const addUser = async (req, res, next) => {
    console.log("UserController => addUser");

    let { email, password } = req.body;

    if (email) req.body.email = email.toLowerCase();
    if (password) {
      req.body.password = await helpers().hashPassword(password);
    }

    let user = await UserService().registerUser(req.body);

    req.msg = "register_success";
    req.rData = user;

    next();
  };

  const getDetails = async (req, res, next) => {
    console.log("UserController => getDetails");
    let { userId } = req.body;
    if (!userId) userId = req.query.userId;
    let user = await UserService().fetch(userId);

    req.msg = "user_details";
    req.rData = user;

    next();
  };

  const editProfile = async (req, res, next) => {
    console.log("UserController => editProfile");
    let userId = req.body.userId;
    let { mobileNumber, fullName, gender, profilePicture } = req.body;

    let user = {
      mobileNumber,
      fullName,
      gender,
      profilePicture,
    };

    user = await UserService().updateProfile(userId, user);

    user = await UserService().fetch(userId);

    req.msg = "profile_changed";

    req.rData = user;
    // }
    next();
  };

  /**
   * Albums
   */

  const createAlbum = async (req, res, next) => {
    console.log("UserController => createAlbum");

    let { albumName, userId, description } = req.body;

    let image = "";

    // if (req.files.file) {
    //   const file = req.files.file;

    //   if (file.length > 0) {
    //     return res.status(400).send({
    //       data:{},code:0,message:"Album has only one p"
    //     });
    //   } else {
    //     var fileName = file.name;
    //     let d = new Date();
    //     fileName =
    //       d.getDate() +
    //       "-" +
    //       (d.getMonth() + 1) +
    //       "-" +
    //       d.getFullYear() +
    //       "-" +
    //       d.getHours() +
    //       "_" +
    //       d.getMinutes() +
    //       fileName;

    //     let fName = `http://localhost:4000/${fileName}`;

    //     file.mv("./public/" + fileName, (err) => {
    //       return res.status(500).send(err);
    //     });
    //   }
    // }

    let album = await AlbumService().fetchByQuery({
      albumName,
      userId,
    });

    if (album) {
      req.rCode = 0;
      req.msg = "album_found";
      req.rData = {};
    } else {
      await AlbumService().addAlbum({
        albumName,
        userId,
        description,
      });
      req.msg = "success";
      req.rData = {};
    }

    next();
  };

  const getAllAlbums = async (req, res, next) => {
    console.log("UserController => getAllAlbums");

    let { userId } = req.body;
    let { search, page, limit, isActive } = req.query;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;

    let query = {};
    query.userId = userId;

    if (search) {
      query.albumName = { $regex: RegexEscape(search), $options: "i" };
    }

    if (isActive) {
      query.isActive = isActive;
    }

    query.isDeleted = false;

    let album = await AlbumService().getAlbum(query, page, limit);
    let total = await AlbumService().countAlbum(query);

    req.msg = "success";
    req.rData = { page, limit, search, isActive, total, album };

    next();
  };

  const getAlbumDetail = async (req, res, next) => {
    console.log("UserController => getAlbumDetail");
    let albumId = req.params.id;

    let album = await AlbumService().fetch(albumId);

    if (album) {
      req.rData = album;
    } else {
      req.rCode = 0;
      req.msg = "album_not_found";
      req.rData = {};
    }

    next();
  };

  const editAlbum = async (req, res, next) => {
    console.log("UserController => editAlbum");
    let albumId = req.params.id;
    let { albumName, userId, description } = req.body;

    let album = await AlbumService().fetch(albumId);

    if (album) {
      await AlbumService().updateAlbum(albumId, {
        description,
        albumName,
      });
      req.rData = {};
    } else {
      req.rCode = 0;
      req.msg = "album_not_found";
      req.rData = {};
    }

    next();
  };

  const activeInActiveAlbum = async (req, res, next) => {
    console.log("UserController => activeInActiveAlbum");
    let albumId = req.params.id;

    let album = await AlbumService().fetch(albumId);

    if (album) {
      let { isActive } = album;
      if (isActive) {
        req.msg = "album_not_active";
        isActive = false;
      } else {
        req.msg = "album_active";
        isActive = true;
      }

      await AlbumService().updateAlbum(albumId, { isActive });
    } else {
      req.rCode = 0;
      req.msg = "album_not_found";
      req.rData = {};
    }

    next();
  };

  const deleteAlbum = async (req, res, next) => {
    console.log("UserController => deleteAlbum");
    let albumId = req.params.id;

    let album = await AlbumService().fetch(albumId);

    if (album) {
      await AlbumService().updateAlbum(albumId, {
        isDeleted: true,
      });
      req.msg = "album_deleted";
      req.rData = {};
    } else {
      req.rCode = 0;
      req.msg = "album_not_found";
      req.rData = {};
    }

    next();
  };

  /**
   * Album Images
   */

  const uploadFile = async (req, res, next) => {
    let { id } = req.params;
    if (!req.files || !req.files.file) {
      return res.status(400).send("No files were uploaded.");
    }
    const file = req.files.file;

    let files = [];

    // Upload multiple files at once
    if (file.length > 0) {
      for (const item of file) {
        var fileName = item.name;

        let d = new Date();
        fileName =
          d.getDate() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getFullYear() +
          "-" +
          d.getHours() +
          "_" +
          d.getMinutes() +
          fileName;

        let fName = `http://localhost:4000/${fileName}`;
        await AlbumMediaService().addAlbumMedia({
          mediaUrl: fName,
          albumId: id,
        });
        files.push({ file: fName });

        item.mv("./public/" + fileName, (err) => {
          if (err) return res.status(500).send(err);
        });
      }
    }
    // Upload single file
    else {
      var fileName = file.name;
      let d = new Date();
      fileName =
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear() +
        "-" +
        d.getHours() +
        "_" +
        d.getMinutes() +
        fileName;

      let fName = `http://localhost:4000/${fileName}`;
      await AlbumMediaService().addAlbumMedia({ mediaUrl: fName, albumId: id });

      files.push({ file: fName });
      file.mv("./public/" + fileName, (err) => {
        if (err) return res.status(500).send(err);
      });
    }

    req.msg = "file_upload";
    req.rData = files;
    next();
  };

  const filesList = async (req, res, next) => {
    console.log("UserController => filesList");
    let { id, page, limit } = req.params;

    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;

    let query = { albumId: id };

    let files = await AlbumMediaService().getAlbumMedia(query, page, limit);

    let total = await AlbumMediaService().countAlbumMedia(query);

    req.msg = "success";
    req.rData = {
      page,
      limit,
      total,
      files,
    };

    next();
  };

  const fileDetail = async (req, res, next) => {
    console.log("UserController => fileDetail");

    let { fileId } = req.params;

    let file = await AlbumMediaService().fetch(fileId);

    if (!file) {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    req.msg = "success";
    req.rData = file;
    next();
  };

  const updateFile = async (req, res, next) => {
    console.log("UserController => updateFile");

    let { fileId } = req.params;

    let file = await AlbumMediaService().fetch(fileId);

    if (!file) {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    let filePath = file.mediaUrl;
    filePath = filePath.split("4000/")[1];
    filePath = "./public/" + filePath;
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send({ msg: "Failed to delete the file", data: {} });
        }
      });

      const file = req.files.file;

      var fileName = file.name;
      let d = new Date();
      fileName =
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear() +
        "-" +
        d.getHours() +
        "_" +
        d.getMinutes() +
        fileName;

      let fName = `http://localhost:4000/${fileName}`;
      await AlbumMediaService().updateAlbumMedia(fileId, {
        mediaUrl: fName,
      });

      file.mv("./public/" + fileName, (err) => {
        return res.status(500).send(err);
      });

      return res.send({ msg: "File update successfully!", data: {} });
    } else {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    // next();
  };

  const removeFile = async (req, res, next) => {
    console.log("UserController => removeFile");

    let { fileId } = req.params;

    let file = await AlbumMediaService().fetch(fileId);

    if (!file) {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    let filePath = file.mediaUrl;
    filePath = filePath.split("4000/")[1];
    filePath = "./public/" + filePath;
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send({ msg: "Failed to delete the file", data: {} });
        }

        await AlbumMediaService().deleteAlbumMedia(fileId);
        res.status(200).send({ msg: "File deleted successfully", data: {} });
      });
    } else {
      return res.status(400).send({ msg: "File not found", data: {} });
    }

    // next();
  };

  return {
    addUser,
    getDetails,
    editProfile,
    /**
     * Albums
     */
    createAlbum,
    getAlbumDetail,
    getAllAlbums,
    editAlbum,
    activeInActiveAlbum,
    deleteAlbum,
    /**
     * Album Media
     */
    updateFile,
    filesList,
    fileDetail,
    uploadFile,
    removeFile,
  };
};
