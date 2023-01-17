import { app } from '@shared/infra/http/app';
import { connect } from '@shared/infra/mongodb';
import { createAdmin } from '@shared/infra/mongodb/seed/admin';
import { Connection } from 'mongoose';
import request from "supertest";

let connection: Connection;

describe("Find user Controller", () => {
  beforeAll(async () => {
    connection = await connect();

    await createAdmin();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to find user by name", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/users/").set({
      Authorization: `Bearer ${token}`,
    }).send({
      data: "Miss Laura Woods",
    });

    expect(response.body.full_name).toEqual("Miss Laura Woods");
  });

  it("Should be able to find user by email", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/users/").set({
      Authorization: `Bearer ${token}`,
    }).send({
      data: "laura.woods@example.com",
    });

    expect(response.body.email).toEqual("laura.woods@example.com");
  });

  it("Should be able to find user by username", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/users/").set({
      Authorization: `Bearer ${token}`,
    }).send({
      data: "angryostrich988",
    });

    expect(response.body.username).toEqual("angryostrich988");
  });

  it("Should not be able to find user if admin not authenticated", async () => {
    const response = await request(app).post("/users/").send({
      data: "angryostrich988",
    });
    
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "token missing",
      })
    );
  });

  it("Should not be able to find user an nonexistent", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/users/").set({
      Authorization: `Bearer ${token}`,
    }).send({
      data: "User Error",
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "User does not exists!",
      })
    );
  });
});