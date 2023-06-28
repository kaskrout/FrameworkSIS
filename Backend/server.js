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



// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
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
