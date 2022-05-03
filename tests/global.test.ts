import faker from "@faker-js/faker";
import supertest from "supertest"
import app from '../src/app';
import { prisma } from '../src/database.js';
import userBodyFactory from './factories/userBodyFactory.js';
import userFactory from "./factories/userFactoty";

describe( "User tests POST /sign-up", ()=>{
    beforeEach(truncateUsers());
    afterAll(disconnect())


    it("should return 201  and persist the user  given a valid body", async () => {
        const body = userBodyFactory();

        const result = await supertest(app).post("/sign-up").send(body);
        const createdUser = await prisma.user.findUnique({
            where: { email: body.email} 
        });

        expect(result.status).toEqual(201);
        expect(createdUser).not.toBeNull();

    });

    it("should return 422  given a invalid body", async () => {
        const body = {};

        const response = await supertest(app).post("/sign-up").send(body);

        const users = await prisma.user.findMany();

        expect(response.status).toEqual(422);
    });

    it("should return 409  given a duplicate email", async () => {
    const body = userBodyFactory();

    await supertest(app).post("/sign-up").send(body);


    const response = await supertest(app).post("/sign-up").send(body);
    const user = await prisma.user.findMany({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toEqual(409);
    expect(user.length).toEqual(1);
  });
});



describe("Users tests - POST /sign-in", () => {
  beforeEach(truncateUsers());

  afterAll(disconnect());

  it("should return 200 and a token, given valid credentials", async () => {
    const body = userBodyFactory();

    await userFactory(body);

    const response = await supertest(app).post("/sign-in").send(body);

    expect(response.status).toEqual(200);
    expect(typeof response.body.token).toEqual("string");
  });

  it("should return 401, given invalid email", async () => {
    const body = userBodyFactory();

    await userFactory(body);

    const response = await supertest(app)
      .post("/sign-in")
      .send({
        ...body,
        email: "blabla",
      });

    expect(response.status).toEqual(401);
    expect(response.body.token).toBeUndefined();
  });

  it("should return 401, given invalid password", async () => {
    const body = userBodyFactory();

    await userFactory(body);

    const response = await supertest(app)
      .post("/sign-in")
      .send({
        ...body,
        password: "123banana",
      });

    expect(response.status).toEqual(401);
    expect(response.body.token).toBeUndefined();
  });
});



describe("SearchBy GET /disciplines", () => {
    beforeEach(truncateUsers());
    afterAll(disconnect())

    it("should return 200 for a valid query param", async () => {
       
        const userBody = userBodyFactory();
        await userFactory(userBody);
        const login = await supertest(app).post("/sign-in").send(userBody);

        const disciplineName = "ingles"

        const response = await supertest(app)
            .get(`/disciplines/searchBy?discipline=${disciplineName}`)
            .set("Authorization", `Bearer ${login.body.token}`);

        expect(response.status).toEqual(200);
  });

    it.todo("should return 401 for invalid credentials");
});

function disconnect(){
    return async () => {
        await prisma.$disconnect();
    };
}

function truncateUsers() {
    return async () => {
        await prisma.$executeRaw`TRUNCATE TABLE users;`;
    };
}

