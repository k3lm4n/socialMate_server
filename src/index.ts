import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import http from "http";

import masterRoutes from "./routes/router";

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT;

async function main() {
  console.log("Starting server...", await prisma.$connect());
}

main()
  .then(() => {
    StartServer();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
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
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  app.use("/api", masterRoutes);

  /** Healthcheck */
  app.get("/ping", (req, res, next) =>
    res.status(200).json({ hello: "world" })
  );


  /** Error handling */
  app.use((req, res, next) => {
    const error = new Error("Not found");

    console.log(error);

    res.status(404).json({
      message: error.message,
    });
  });

  http
    .createServer(app)
    .listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

// app.use("/api/", masterRoutes);

// app.use(cors());

// // # if you want anyone to be able to connect
// // app.use(cors({ origin: true }))
// // // # if you want only your frontend to connect
// app.use(cors({ origin: "http://localhost:3000" }));

// // regular middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // cookie middleware
// app.use(cookieParser());

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}`);
// });
