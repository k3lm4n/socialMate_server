import express from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { Server } from "socket.io";

import masterRoutes from "../routes/router";

dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   cors({
//     credentials: true,
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );

app.set("trust proxy", 1); // trust first proxy

/** Only Start Server if Mongoose Connects */

/** Log the request */
app.use((req, res, next) => {
  /** Log the req */
  console.log(
    `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    console.log(
      `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
    );
  });

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", [
    "http://localhost:3000/",
    "https://social.oowl.tech/",
  ]);
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  // );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes */
app.use("/api", masterRoutes);

/** Healthcheck */
app.get("/ping", (req, res, next) => res.status(200).json({ hello: "world" }));

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");

  console.log(error);

  res.status(404).json({
    message: error.message,
  });
});

const io = new Server(server, { cors: { origin: "*" } });

export { server, io };
