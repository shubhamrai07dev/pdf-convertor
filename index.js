import express from "express";
import multer from "multer";
import docxToPdf from "docx-pdf";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 4001;
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// disk storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "upload file first" });
    }
    // define output file path
    let outputPath = path.join(
      __dirname,
      "files",
      `${req.file.originalname}.pdf`
    );
    docxToPdf(req.file.path, outputPath, function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Error converting docx to pdf" });
      }
      res.download(outputPath, () => {
        console.log("file downloaded");
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "dist")))
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
})

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
