const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const MediaSchema = new Schema(
  {
    mediaUrl: {
      type: String,
      default: "",
    },
    albumId: {
      type: Schema.Types.ObjectId,
      ref: "Album",
      required: [true, "albumId require!"],
    },
  },
  { timestamps: true }
);

var Media = mongoose.model("Media", MediaSchema);

module.exports = Media;
