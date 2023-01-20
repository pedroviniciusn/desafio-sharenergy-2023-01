import { app } from '@shared/infra/http/app';
import { connect } from '@shared/infra/mongodb';
import { createAdmin } from '@shared/infra/mongodb/seed/admin';
import { Connection } from 'mongoose';
import request from "supertest";

let connection: Connection;

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await connect();

    await createAdmin();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to Authenticate user", async () => {
    const response = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("token");

    expect(response.body.user).toEqual(
      expect.objectContaining({
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
      })
    );
  });

  it("Should not be able to authenticated user if incorrect e-mail or password", async () => {
    const response = await request(app).post("/session").send({
      username: "User Error",
      password: "error",
    });

    expect(response.status).toBe(400);
    
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Email or password incorrect",
      })
    );
  });
});