require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const phaseRoutes = require("./routes/phase");
const activityRoutes = require("./routes/activity");
const layerRoutes = require("./routes/layer");
const sublayerRoutes = require("./routes/sublayer");
const roleRoutes = require("./routes/role");
const subroleRoutes = require("./routes/subrole");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// express app
const app = express();

// middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Configure multer to specify the destination folder for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File Uploaded Successfully");
  } catch (err) {
    console.log(err);
  }
});

// Define a route to handle the /uploads request
app.get("/uploads", (req, res) => {
  const uploadFolder = path.join(__dirname, "public/uploads");

  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      console.error("Error reading upload folder:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Filter out any non-file items (e.g., directories)
    const fileNames = files.filter((file) =>
      fs.statSync(path.join(uploadFolder, file)).isFile()
    );

    // Send the file names as JSON response
    res.json({ files: fileNames });
  });
});

// routes
app.use("/api/phase", phaseRoutes);
app.use("/api/user", userRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/layer", layerRoutes);
app.use("/api/sublayer", sublayerRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/subrole", subroleRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
