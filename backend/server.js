const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const db = require("./models");
const mysql = require("mysql2/promise");




require("dotenv").config({ path: ".env" });

const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  delete res.locals.user.password;
  res.status(200).json(res.locals.user.dataValues.id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/images", express.static("images"));

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
