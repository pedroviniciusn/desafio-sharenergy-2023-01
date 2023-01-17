import { app } from '@shared/infra/http/app';
import { connect } from '@shared/infra/mongodb';
import { createAdmin } from '@shared/infra/mongodb/seed/admin';
import { Connection } from 'mongoose';
import request from "supertest";

let connection: Connection;

describe("List Users Controller", () => {
  beforeAll(async () => {
    connection = await connect();

    await createAdmin();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to list users from page 1", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).get("/users/1").set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body.length).toEqual(10);
  });

  it("Should be able to list users from page 2", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).get("/users/2").set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body.length).toEqual(10);
  });

  it("Should be able to list users from page 3", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).get("/users/3").set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body.length).toEqual(10);
  });

  it("Should not be able to list users from page an nonexistent", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).get("/users/4").set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Page not found!",
      })
    );
  });

  it("Should not be able to list users if admin not authenticated", async () => {
    const response = await request(app).get("/users/1");
    
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "token missing",
      })
    );
  });
})