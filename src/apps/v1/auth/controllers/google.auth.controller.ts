import { Response, Request } from "express";
import { ErrorsRespones } from "../../../../utils/Response";
import logger from "../../../../libs/configs/logger";
import client from "../../../../libs/configs/prisma";
import { OAuth2Client, authUrl } from "../../../../libs/configs/google";
import { google } from "googleapis";
import { CLIENT_FRONTEND_URL } from "../../../../const/env";
import JsonWebToken from "../../../../services/JsonWebToken";
import defaultUserImage from "../../../../const/readonly/defaultUserProfile";
import generateTokenResponseCookie from "../services/generateTokenResponseCookie";
import isUserExists from "../services/isUserExist";
import createUserIfNotExists from "../services/createUserIfNotExists";
import { User } from "../../../../../generated/client";

export async function redirectGoogleLogin(
  req: Request,
  res: Response
): Promise<void | Response> {
  const Error = new ErrorsRespones();
  try {
    return res.redirect(authUrl);
  } catch (err) {
    logger.error(err);
    return Error.badRequest(res);
  }
}

export async function loginWithGoogle(
  req: Request,
  res: Response
): Promise<void | Response> {
  const Error = new ErrorsRespones();
  try {
    const { code } = req.query;
    const { tokens } = await OAuth2Client.getToken(code as string);

    if (!tokens) return Error.badRequest(res, "The Login Session Was Failed.");
    if (tokens) OAuth2Client.setCredentials(tokens);
    const oAuth2Config = google.oauth2({ version: "v2", auth: OAuth2Client });

    const { data } = await oAuth2Config.userinfo.get();

    if (!data) return res.redirect(`${CLIENT_FRONTEND_URL}/auth/login`);

    const bigNumber: bigint = BigInt(String(data.id));
    const userId: bigint = bigNumber / BigInt(100);

    const isUser: Awaited<User | null> = await isUserExists({
      providerId: userId,
    });

    if (!isUser) {
      await createUserIfNotExists({
        providerId: userId,
        name: data.name!,
        email: data.email!,
        picture: data.picture! || defaultUserImage,
        bio: "",
      });
    }

    const { accessToken, refreshToken } = new JsonWebToken().sign({
      providerId: Number(isUser?.provider_id) || Number(userId),
      name: isUser?.name || data.name!,
      email: isUser?.email || data.email!,
      picture: isUser?.picture || data.picture!,
    });

    generateTokenResponseCookie(res, refreshToken);

    return res.redirect(
      `${CLIENT_FRONTEND_URL}/auth/login/success?token=${accessToken}&type=success`
    );
  } catch (err) {
    logger.error(err);
    return Error.badRequest(res);
  } finally {
    await client.$disconnect();
  }
}
