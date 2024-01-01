import { plan, status } from "../../../generated/client";
import { faker } from "@faker-js/faker";
import client from "../../libs/configs/prisma";
import generateClientId from "../../services/generateClientId";
import generateTestUserGalleryPictureData from "./generateTestUserGalleryPictureData";
import logger from "../../libs/configs/logger";

export default async function createTestUser({
  providerId,
  plan,
  status,
}: {
  providerId: number;
  plan: plan;
  status: status;
}): Promise<void> {
  try {
    const clientId: string = generateClientId(providerId);
    const [pictures] = await Promise.all([
      generateTestUserGalleryPictureData(5),
    ]);

    await client.user.create({
      data: {
        provider_id: providerId,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: null,
        picture: faker.internet.url(),
        bio: faker.lorem.sentence(),
        client_keys: {
          create: {
            client_id: clientId,
            client_secret:
              "a93efc24cf7b6783b87a7487afe2de9035125f66257da682f8b10dc6544a63c2",
          },
        },
        subscription: {
          create: {
            plan,
            status,
          },
        },
        gallery: {
          create: {
            pictures: {
              createMany: {
                data: pictures,
                skipDuplicates: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    logger.error(err);
  } finally {
    await client.$disconnect();
  }
}
