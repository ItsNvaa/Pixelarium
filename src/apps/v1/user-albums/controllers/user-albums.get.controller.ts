import { Response, Request } from "express";
import logger from "../../../../libs/configs/logger";
import { httpBadRequestResponse } from "../../../../utils/responses/httpErrorsResponses";
import client from "../../../../libs/configs/prisma";

export default async function userAlbums(
  req: Request,
  res: Response
): Promise<void | Response> {
  try {
    res.send("testtttt");
  } catch (err) {
    logger.error(err);
    return httpBadRequestResponse({ response: res });
  } finally {
    await client.$disconnect();
  }
}
