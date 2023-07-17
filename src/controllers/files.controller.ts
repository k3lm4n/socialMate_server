import { Request, Response } from "express";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase.config";

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

      const storageRef = ref(
        storage,
        `files/${req.file?.originalname + "       " + dateTime}`
      );

      const metadata = {
        contentType: req.file?.mimetype,
      };

      if (!req.file) {
        const error = new Error("Please upload a file");
        return res.status(400).send(error.message);
      }

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      return res.send({
        originalName: req.file?.originalname,
        mimetype: req.file?.mimetype,
        url: downloadURL,
      });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}

export default FileController;
