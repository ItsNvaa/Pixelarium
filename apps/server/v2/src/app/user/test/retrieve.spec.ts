/* eslint-disable no-console */
import app from "@/main";
import supertest from "supertest";
import { expect, describe, test } from "bun:test";
import http from "@/constant/code";
import defaultErrorMessege from "@/constant/default-error-messege";
import prisma from "@/libs/prisma";
import { User } from "prisma/generated/client";

describe("GET /user/:name", () => {
  test("should be return 404 status code if the user doesn't exist", async () => {
    const request: Awaited<supertest.Request | supertest.Response> =
      await supertest(app.server).get("/user/0");

    console.log(request.body);
    expect(request.status).toBe(http.StatusNotFound);
    expect(request.body.messege).toBe(defaultErrorMessege.notFound);
    expect(request.body.status).toBe("KO");
  });
  test("should be return 200 status code", async () => {
    const user: Awaited<User | null> = await prisma.user.findFirst();
    console.log(user);
    const request: Awaited<supertest.Request | supertest.Response> =
      await supertest(app.server).get("/user/" + user?.name);

    console.log(request.body);
    expect(request.status).toBe(http.StatusOk);
    expect(request.body.status).toBe("OK");
  });
  test("user field should be defined", async () => {
    const user: Awaited<User | null> = await prisma.user.findFirst();
    const request: Awaited<supertest.Request | supertest.Response> =
      await supertest(app.server).get("/user/" + user?.name);

    console.log(request.body);
    expect(request.status).toBe(http.StatusOk);
    expect(request.body.user).toBeDefined();
    expect(request.body.user).not.toBeUndefined();
    expect(request.body.user).not.toBeNull();
  });
  test("user field should be match to user data", async () => {
    const user: Awaited<User | null> = await prisma.user.findFirst();
    const request: Awaited<supertest.Request | supertest.Response> =
      await supertest(app.server).get("/user/" + user?.name);

    console.log(request.body);
    expect(request.status).toBe(http.StatusOk);
    expect(JSON.stringify(request.body.user)).toMatch(JSON.stringify(user));
  });
});