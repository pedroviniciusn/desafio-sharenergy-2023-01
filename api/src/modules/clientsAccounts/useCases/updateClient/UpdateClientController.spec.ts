import { app } from '@shared/infra/http/app';
import { connect } from '@shared/infra/mongodb';
import { Connection } from 'mongoose';
import { createAdmin } from '@shared/infra/mongodb/seed/admin';
import { IClientRepository } from '@modules/clientsAccounts/repositories/IClientRepository';
import { ClientRepository } from '@modules/clientsAccounts/infra/mongodb/repositories/ClientRepository';
import request from "supertest";

let connection: Connection;
let clientRepository: IClientRepository;

describe("Update Client Controller", () => {
  beforeAll(async () => {
    connection = await connect();
    await createAdmin();
    clientRepository = new ClientRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to update client", async () => {
    await clientRepository.create({
      name: "test",
      email: "testandodb@update.com",
      address: "testando 123",
      cpf: 45646879,
      phone_number: 12457878
    });

    const client = await clientRepository.findByEmail("testandodb@update.com");

    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).put(`/clients/${client.id}`).set({
      Authorization: `Bearer ${token}`,
    }).send({
      name: "New Name",
    });

    expect(response.body.name).toEqual("New Name");
  });

  it("Should not be able to update client an nonexistent", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).put("/clients/63c5d7749adf42f828ef534b").set({
      Authorization: `Bearer ${token}`,
    }).send({
      name: "New Name",
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Client not found",
      })
    );
  });

  it("Should not be able to update client if admin not authenticated", async () => {
    await clientRepository.create({
      name: "test",
      email: "testandodb@error.com",
      address: "testando 123",
      cpf: 45646879,
      phone_number: 12457878
    });

    const client = await clientRepository.findByEmail("testandodb@error.com");

    const response = await request(app).put(`/clients/${client.id}`).send({
      name: "New Name",
    });
    
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "token missing",
      })
    );
  });
});