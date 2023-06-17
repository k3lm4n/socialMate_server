import { Request, Response } from "express";
import fs from "fs";
import { resolve } from "path";

import mime from "mime-types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface IFile {
  originalName: string;
  filename: string;
}

class FilesController {
  async uploadImage(req: Request, res: Response) {
    var file = {} as IFile;
    if (req.file) {
      file = {
        originalName: req.file.originalname,
        filename: req.file.filename,
      };
      const { filename } = file;

      return res
        .status(200)
        .json({ filename, message: "Upload realizado com sucesso" });
    }
    return res.status(400).json({ message: "Nenhum ficheiro enviado" });
  }

  async getFile(req: Request, res: Response) {
    const { filename } = req.params;

    const path = resolve(__dirname, "..", "..", "uploads", filename);

    try {
      if (!fs.existsSync(path)) {
        return res.status(400).json({ message: "Ficheiro não encontrado" });
      }

      const mimeType = mime.lookup(path) as string;

      return res
        .setHeader("Content-Disposition", "Inline")
        .type(mimeType)
        .sendFile(path);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Ficheiro não encontrado" });
    }
  }

  async getImage(req: Request, res: Response) {
    const { filename } = req.params;

    const path = resolve(__dirname, "..", "..", "images", filename);

    if (!fs.existsSync(path)) {
      return res.status(400).json({ message: "Ficheiro não encontrado" });
    }

    return res.type("image/*").sendFile(path);
  }

  async uploadFiles(req: Request, res: Response) {
    var filePath = [] as IFile[];
    for (const file of req.files as Express.Multer.File[]) {
      filePath.push({
        originalName: file.originalname,
        filename: file.filename,
      });
    }

    if (filePath.length === 0) {
      return res.status(400).json({ message: "Nenhum ficheiro enviado" });
    }

    return res
      .status(200)
      .json({ filePath, message: "Upload realizado com sucesso" });
  }

  // async deleteFile(req: Request, res: Response) {
  //   const { filename } = req.params;

  //   const path = resolve(__dirname, "..", "..", "uploads", filename);

  //   try {
  //     fs.unlink(path, async (err) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(400).json({ message: "Ficheiro não encontrado" });
  //       }
  //       const file = await prisma.attachment.delete({
  //         where: {
  //           filename: filename,
  //         },
  //       });
  //       return res
  //         .status(200)
  //         .json({ file, message: "Ficheiro apagado com sucesso" });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({ message: "Ficheiro não encontrado" });
  //   }
  // }

  async deleteImage(req: Request, res: Response) {
    const { filename } = req.params;

    const path = resolve(__dirname, "..", "..", "image", filename);

    try {
      fs.unlink(path, async (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Ficheiro não encontrado" });
        }

        return res
          .status(200)
          .json({ message: "Ficheiro apagado com sucesso" });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Ficheiro não encontrado" });
    }
  }

  // async updateFiles(req: Request, res: Response) {
  //   const { id, filename } = req.params;
  //   const path = resolve(__dirname, "..", "..", "uploads", filename);

  //   const attachment = req.body.attachment as IFile;

  //   try {
  //     fs.unlink(path, async (err) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(400).json({ message: "Ficheiro não encontrado" });
  //       }
  //       try {
  //         const file = await prisma.$transaction([
  //           prisma.attachment.delete({
  //             where: {
  //               filename: filename,
  //             },
  //           }),
  //           prisma.process.update({
  //             where: {
  //               id,
  //             },
  //             data: {
  //               attachment: {
  //                 create: { ...attachment },
  //               },
  //             },
  //             select: {
  //               attachment: true,
  //             },
  //           }),
  //         ]);
  //         return res
  //           .status(200)
  //           .json({ file, message: "Ficheiro Actualizado" });
  //       } catch (error) {
  //         console.log(error);
  //         return res
  //           .status(400)
  //           .json({ message: "Não foi possivel actualizar o ficheiro" });
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res
  //       .status(400)
  //       .json({ message: "Não foi possivel actualizar o ficheiro" });
  //   }
  // }

  // async updateFilesRelatives(req: Request, res: Response) {
  //   const { id, filename } = req.params;
  //   const path = resolve(__dirname, "..", "..", "uploads", filename);

  //   const attachment = req.body.attachment as IFile;

  //   try {
  //     fs.unlink(path, async (err) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(400).json({ message: "Ficheiro não encontrado" });
  //       }
  //       try {
  //         const file = await prisma.$transaction([
  //           prisma.attachment.delete({
  //             where: {
  //               filename: filename,
  //             },
  //           }),
  //           prisma.parent.update({
  //             where: {
  //               id,
  //             },
  //             data: {
  //               attachment: {
  //                 create: {
  //                   ...attachment,
  //                 },
  //               },
  //             },
  //             select: {
  //               attachment: true,
  //             },
  //           }),
  //         ]);
  //         return res
  //           .status(200)
  //           .json({ file, message: "Ficheiro Actualizado" });
  //       } catch (error) {
  //         console.log(error);
  //         return res

  //           .status(400)
  //           .json({ message: "Não foi possivel actualizar o ficheiro" });
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({ message: "Error" });
  //   }
  // }
}

export default FilesController;
