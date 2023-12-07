import { Request, Response } from "express";
import logger from "../../../../libs/configs/logger";
import client from "../../../../libs/configs/prisma";
import { ErrorsRespones, SuccessRespones } from "../../../../utils/Response";
import validator from "validator";
import messege from "../../../../const/readonly/messege";
import FilesSystem from "../../../../services/FilesSystem";
import { User } from "../../../../../generated/client";
import checkIfPictureIsInternalPicture from "../../../../utils/checkIfPictureIsInternalPicture";
import getFilename from "../../../../utils/getFilename";
import getPictureFilepath from "../../../../utils/getPictureFilepath";

export default async function deleteUser(
  req: Request,
  res: Response
): Promise<void | Response> {
  const Error = new ErrorsRespones();
  const filesSystem = new FilesSystem();
  try {
    const { id } = req.params;

    if (!validator.isNumeric(id))
      return Error.badRequest(res, messege.wrongRequestID);

    const user: Awaited<User | null> = await client.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) return Error.notFound(res);

    const picture: string = user.picture;
    const isInternalPicture: boolean | null = checkIfPictureIsInternalPicture({
      picturePath: picture,
      usage: "users",
    });

    if (isInternalPicture) {
      const pictureFilePath: string = getPictureFilepath({ usage: "users" });
      const fileName: string | null = getFilename(picture);
      const filePath: string = `./public/${pictureFilePath}/${fileName}`;
      console.log(filePath);

      filesSystem.deleteFile(filePath);
    }

    await client.user.delete({
      where: { id: Number(id) },
    });

    return new SuccessRespones().success(res, "deleted");
  } catch (err) {
    logger.error(err);
    return Error.badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
