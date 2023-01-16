import { app } from '@shared/infra/http/app';
import { connect } from '@shared/infra/mongodb';
import { Connection } from 'mongoose';
import { createAdmin } from '@shared/infra/mongodb/seed/admin';
import request from "supertest";

let connection: Connection;

describe("Create Client Controller", () => {
  beforeAll(async () => {
    connection = await connect();

    await createAdmin();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create client", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/clients").set({
      Authorization: `Bearer ${token}`,
    }).send({
      name: "test db",
      email: "testandodb@teste.com",
      address: "testando 123",
      cpf: 124578,
      phone_number: 12457878
    });
    
    expect(response.status).toBe(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Created",
      })
    );
  });

  it("Should not be able to create client if admin not authenticated", async () => {
    const response = await request(app).post("/clients").send({
      name: "test db",
      email: "testandodb@teste.com",
      address: "testando 123",
      cpf: 124578,
      phone_number: 12457878
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "token missing",
      })
    );
  });
});
