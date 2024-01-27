const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const AlbumSchema = new Schema(
  {
    albumName: {
      type: String,
      required: [true, "AlbumName is required!"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId require!"],
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

var Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
