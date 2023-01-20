import { app } from '@shared/infra/http/app';
import { connect } from '@shared/infra/mongodb';
import { Connection } from 'mongoose';
import { createAdmin } from '@shared/infra/mongodb/seed/admin';
import { IClientRepository } from '@modules/clientsAccounts/repositories/IClientRepository';
import { ClientRepository } from '@modules/clientsAccounts/infra/mongodb/repositories/ClientRepository';
import request from "supertest";

let connection: Connection;
let clientRepository: IClientRepository;

describe("Get Clients Controller", () => {
  beforeAll(async () => {
    connection = await connect();
    await createAdmin();
    clientRepository = new ClientRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to get all clients", async () => {
    await clientRepository.create({
      name: "test find",
      email: "testandodb@find.com",
      address: "testando 123",
      cpf: 4646445321,
      phone_number: 12457878
    });

    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).get("/clients").set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toEqual(200);

    expect(response.body.length).toEqual(1);
  });

  it("Should not be able to get all clients if admin not authenticated", async () => {
    const response = await request(app).get(`/clients/usererror`);
    
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "token missing",
      })
    );
  });
})