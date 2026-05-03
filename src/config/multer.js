import multer from "multer";
import "dotenv/config";
import crypto from "crypto";
import { extname, resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// recria __filename e __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "tmp", "uploads"),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err);

        return callback(
          null,
          res.toString("hex") + extname(file.originalname)
        );
      });
    },
  }),
};