import express, { Router, Request, Response } from "express";
import { initializeApp } from "firebase/app";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase.config";
import multer from "multer";
import upload from "../middleware/storage";

function giveCurrentDateTime() {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
}

class FileController {
  async upload(req: Request, res: Response) {
    try {
      const dateTime = giveCurrentDateTime();
      // const dateTime = "giveCurrentDateTime()";

      const storageRef = ref(
        storage,
        `files/${req.file?.originalname + "       " + dateTime}`
      );

      const metadata = {
        contentType: req.file?.mimetype,
      };

      console.log(req.files);

      // if (!req.file) {
      //   const error = new Error("Please upload a file");
      //   return res.status(400).send(error.message);
      // }
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log("File successfully uploaded.");
      return res.send({
        message: "file uploaded to firebase storage",
        name: req.file?.originalname,
        type: req.file?.mimetype,
        downloadURL: downloadURL,
      });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}

export default FileController;
