import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import server from "../server.js";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

describe("Tickets API", () => {
  let token;

  beforeAll(async () => {
    await User.deleteMany({});
    const response = await request(app).post("/api/users/signup").send({
      name: "Test User",
      email: "test2@email.com",
      password: "12345678",
    });

    token = response.body.token;

    const ticket1 = await Ticket.create({
      title: "Ticket 1",
      description: "Ticket 1 Description",
      priority: "low",
      status: "open",
      user: "test-user-id",
    });
    await ticket1.save();

    const ticket2 = await Ticket.create({
      title: "Ticket 2",
      description: "Ticket 2 Description",
      priority: "medium",
      status: "in-progress",
      user: "test-user-id",
    });
    await ticket2.save();
  });

  afterAll(async () => {
    await Ticket.deleteMany({});
    server.close();
    await mongoose.connection.close();
  });

  test("create a new ticket", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user: "Test User",
        title: "Test Ticket",
        description: "Test Ticket Description",
        priority: "high",
        status: "open",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("ticket");
    expect(response.body.ticket).toHaveProperty("title", "Test Ticket");
    expect(response.body.ticket).not.toHaveProperty("_id");
  });

  test("create a new ticket with wrong token", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer wrongtoken`)
      .send({
        user: "Test User",
        title: "Test Ticket",
        description: "Test Ticket Description",
        priority: "high",
        status: "open",
      });

    expect(response.status).toBe(400);
  });

  test("Get all tickets", async () => {

    const response = await request(app).get("/api/tickets");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("results");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("currentPage");

    expect(response.body.total).toBe(3);
    expect(response.body.currentPage).toBe(1);
    expect(response.body.results).toHaveLength(3);
    expect(response.body.results[0]).toHaveProperty("title", "Ticket 1");
    expect(response.body.results[0]).not.toHaveProperty("_id");

    // test paginate
    const responsePage = await request(app).get("/api/tickets?pageSize=1&page=2");

    expect(responsePage.status).toBe(200);
    expect(responsePage.body).toHaveProperty("results");
    expect(responsePage.body).toHaveProperty("total");
    expect(responsePage.body).toHaveProperty("currentPage");

    expect(responsePage.body.total).toBe(3);
    expect(responsePage.body.currentPage).toBe(2);
    expect(responsePage.body.results).toHaveLength(1);

    //test status open

    const responseopen = await request(app).get("/api/tickets?status=open");

    expect(responseopen.status).toBe(200);
    expect(responseopen.body).toHaveProperty("results");
    expect(responseopen.body).toHaveProperty("total");
    expect(responseopen.body).toHaveProperty("currentPage");

    expect(responseopen.body.total).toBe(3);
    expect(responseopen.body.currentPage).toBe(1);
    expect(responseopen.body.results).toHaveLength(2);
  });


  test("Get ticket by ID", async () => {
  
    const response = await request(app).get("/api/tickets/");
    let id1 = response.body.results[0].id;
    const responseGetId =  await request(app).get(`/api/tickets/${id1}`);
    expect(responseGetId.status).toBe(200);

  });

  test("Update ticket by ID", async () => {
    
    const response = await request(app).get("/api/tickets/");
    let id1 = response.body.results[0].id;
    const responseUpdate =  await request(app).put(`/api/tickets/${id1}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Test Ticket",
      description: "Test Ticket Description",
      priority: "high",
      status: "open",
      user: "test-user-id",
    });
    expect(responseUpdate.status).toBe(200);

  });

  test("Update ticket by wrong ID", async () => {
    const responseUpdate =  await request(app).put(`/api/tickets/wrongID`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Test Ticket",
      description: "Test Ticket Description",
      priority: "high",
      status: "open",
      user: "test-user-id",
    });
    expect(responseUpdate.status).toBe(404);

  });
});


