import { app } from '@shared/infra/http/app';
import { connect } from '@shared/infra/mongodb';
import { Connection } from 'mongoose';
import { createAdmin } from '@shared/infra/mongodb/seed/admin';
import request from "supertest";
import { IClientRepository } from '@modules/clientsAccounts/repositories/IClientRepository';
import { ClientRepository } from '@modules/clientsAccounts/infra/mongodb/repositories/ClientRepository';

let connection: Connection;
let clientRepository: IClientRepository;


describe("Delete Client Controller", () => {
  beforeAll(async () => {
    connection = await connect();
    await createAdmin();
    clientRepository = new ClientRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to delete client", async () => {
    await clientRepository.create({
      name: "test db",
      email: "testandodb@teste.com",
      address: "testando 123",
      cpf: 124578,
      phone_number: 12457878
    });

    const client = await clientRepository.findByEmail("testandodb@teste.com");

    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).delete(`/clients/${client.id}`).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toEqual(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Success",
      })
    );
  });

  it("Should not be able to delete client if admin not authenticated", async () => {
    const response = await request(app).delete(`/clients/63c5ce8de817e`);
    
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "token missing",
      })
    );
  });

  it("Should not be able to delete client an nonexistent", async () => {
    const responseToken = await request(app).post("/session").send({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    const { token } = responseToken.body;

    const response = await request(app).delete("/clients/63c5ce8de817e").set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Client not found",
      })
    );
  });
});