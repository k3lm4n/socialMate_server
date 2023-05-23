import multer from "multer";
import path from "path";
import crypto from "crypto";
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

var serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "Error";

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "gs://socialmate-14e33.appspot.com/",
});

const bucket = getStorage().bucket();

export const StorageTrack = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve("uploads/audio"));
  },

  filename: (req, file, callback) => {
    const hash = crypto.randomBytes(6).toString("hex");
    const filename = `${hash}-${file.originalname}`;

    callback(null, filename);
  },
});

export const StorageVideo = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve("uploads/video"));
  },

  filename: (req, file, callback) => {
    const hash = crypto.randomBytes(6).toString("hex");
    const filename = `${hash}-${file.originalname}`;

    callback(null, filename);
  },
});

export const StorageFile = multer.memoryStorage();

export const StorageImage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve("uploads/image"));
  },

  filename: (req, file, callback) => {
    const hash = crypto.randomBytes(6).toString("hex");
    const filename = `${hash}-${file.originalname}`;

    callback(null, filename);
  },
});
