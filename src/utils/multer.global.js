import multer from "multer";
import path from "path";
import fs from "fs";
import { allowed_types } from "./media.types.js";
import { APIError } from "./APIError.js";
import { STATUS_CODES } from "http";

const storage = (folder) => {
  const final_path = path.resolve(`media/resumes`);

  if (!fs.existsSync(final_path)) fs.mkdirSync(final_path, { recursive: true });

  return multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, final_path);
    },
    filename: function (req, file, callback) {
      callback(
        null,
        `${new Date().getTime()}` + path.extname(file.originalname)
      );
    },
  });
};

const filter = (field) => {
  return (req, file, callback) => {
    const mimetype = allowed_types[field].test(file.mimetype.split("/")[1]);
    const extname = allowed_types[field].test(
      path.extname(file.originalname).toLowerCase().split(".")[1]
    );

    if (mimetype && extname) {
      return callback(null, true);
    }

    const err = new APIError(
      `Error: File upload only supports the following filetypes - ${allowed_types[field]}`,
      STATUS_CODES.BAD_REQUEST
    );
    return callback(err, false);
  };
};

const upload = function (folder, field) {
  return multer({ fileFilter: filter(field), storage: storage(folder) });
};

export default upload;
