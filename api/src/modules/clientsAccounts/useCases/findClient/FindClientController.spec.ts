import { app } from '@shared/infra/http/app';
import { connect } from '@shared/infra/mongodb';
import { Connection } from 'mongoose';
import { createAdmin } from '@shared/infra/mongodb/seed/admin';
import { IClientRepository } from '@modules/clientsAccounts/repositories/IClientRepository';
import { ClientRepository } from '@modules/clientsAccounts/infra/mongodb/repositories/ClientRepository';
import request from "supertest";

let connection: Connection;
let clientRepository: IClientRepository;

describe("Find Client Controller", () => {
  beforeAll(async () => {
    connection = await connect();
    await createAdmin();
    clientRepository = new ClientRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to find client", async () => {
    await clientRepository.create({
      name: "test find",
      email: "testandodb@find.com",
      address: "testando 123",
      cpf: 4646445321,
      phone_number: 12457878
    });

    const client = await clientRepository.findByEmail("testandodb@find.com");

    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).get(`/clients/${client.name}`).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toEqual(200);

    expect(response.body.email).toEqual(client.email);
  });

  it("Should not be able to find client an nonexistent", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).get("/clients/clienterror").set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Client not found",
      })
    );
  });

  it("Should not be able to find client if admin not authenticated", async () => {
    const response = await request(app).get(`/clients/usererror`);
    
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "token missing",
      })
    );
  });
});