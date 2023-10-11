const mongoose = require("mongoose");
const app = require("../../app");
const request = require("supertest");
const User = require('../../models/user');

// Setup MongoDB connection for testing
beforeAll(async () => {
  const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/testDatabase";
  await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

  const user = new User({ 
    firstName: 'test', 
    surname: 'test', 
    email: "test@test.com", 
    password: "12345678" 
  });
  await user.save();
});

// Teardown MongoDB connection
afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

// Test suite
describe("/tokens", () => {

  test("a token is returned when creds are valid", async () => {
    const response = await request(app)
      .post("/api/tokens")
      .send({ email: "test@test.com", password: "12345678" });

    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("OK");
  });

  test("a token is not returned when creds are invalid", async () => {
    const response = await request(app)
      .post("/api/tokens")
      .send({ email: "test@test.com", password: "wrong-password" });

    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("auth error");
  });

});
