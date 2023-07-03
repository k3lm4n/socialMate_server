import express from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import http from "http";
// import logger from "morgan";

import { Server } from "socket.io";

import masterRoutes from "../routes/router";

dotenv.config();

const app = express();

const server = http.createServer(app);

// app.use(logger("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use(
  cors({
    origin: [
      "http://localhost:3030",
      "https://social.oowl.tech/",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

app.set("trust proxy", 1); // trust first proxy

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

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3030",
      "https://social.oowl.tech/",
      "http://localhost:3000",
    ],
    credentials: true,
  },
});

export { server, io };
