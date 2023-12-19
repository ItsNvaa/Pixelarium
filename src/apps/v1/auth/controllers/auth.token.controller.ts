import { Request, Response } from "express";
import logger from "../../../../libs/configs/logger";
import { ErrorsRespones } from "../../../../utils/Response";
import { jwtDecode } from "jwt-decode";
import client from "../../../../libs/configs/prisma";
import type {
  TDecodedUser,
  TDecodedToken,
} from "../interfaces/types/DecodedUserTypes";
import { JWT_REFRESH_TOKEN, JWT_ACCESS_TOKEN } from "../../../../const/env";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { isUserExistByIdOrProviderId } from "../../../../utils/isUser";

export default async function tokenRotation(req: Request, res: Response) {
  const Error = new ErrorsRespones();
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      return Error.unauth(res, "The user must be login first!");

    const decode: TDecodedUser = jwtDecode(refreshToken);

    const isUser = await isUserExistByIdOrProviderId({
      field: "provider_id",
      value: decode.providerId,
    });

    if (!isUser) return Error.unauth(res, "Unauthorized User");

    jwt.verify(
      refreshToken,
      JWT_REFRESH_TOKEN as string,
      // @ts-expect-error Types doesn't match
      (err: VerifyErrors | null, decoded: TDecodedToken | undefined) => {
        if (err)
          return Error.unprocessable(res, "The refresh token is invalid!");

        const { providerId, name, email, picture } = decoded as TDecodedToken;
        const accessToken: string = jwt.sign(
          { providerId, email, name, picture },
          JWT_ACCESS_TOKEN as string,
          {
            expiresIn: "1800s",
          }
        );

        return res.status(200).json({
          token: accessToken,
          status: "OK",
        });
      }
    );
  } catch (err) {
    logger.error(err);
    return Error.badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
