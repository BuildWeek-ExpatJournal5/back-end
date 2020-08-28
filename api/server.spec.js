const server = require("./server.js");
const request = require("supertest");
const db = require("../database/dbconfig");

////////////////////////////  AUTH ENDPOINT  ///////////////////////////////

describe("The users route handles user type requests", () => {
  beforeEach(async () => {
    await db("Users").truncate();
  });

  describe("The register endpoint adds new users to the database", () => {
    it("adds user to the database, ", async () => {
      await request(server).post("/api/auth/register").send({
        username: "Bob",
        password: "password",
        email: "email@email.com",
      });

      const user = await db("Users");

      expect(user).toHaveLength(1);
    });

    it("does not crash if supplied extraneous data", async () => {
      await request(server).post("/api/auth/register").send({
        username: "Bob",
        password: "password",
        email: "email@email.com",
        otherData: "Something else",
      });

      const user = await db("Users");

      expect(user).toHaveLength(1);
    });

    it("requires username in the request", async () => {
      const response = await request(server).post("/api/auth/register").send({
        password: "password",
        email: "email@email.com",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("The login endpoint allows users to log in", () => {
    it("returns a token when correct credentials are supplied", async () => {
      await request(server).post("/api/auth/register").send({
        username: "Bob",
        password: "password",
        email: "email@email.com",
      });

      const response = await request(server).post("/api/auth/login").send({
        username: "Bob",
        password: "password",
      });

      expect(response.body.token).toBeTruthy();
    });

    it("does not allow users with invalid credentials to log in", async () => {
      const response = await request(server).post("/api/auth/login").send({
        username: "Bob",
        password: "password",
      });

      expect(response.statusCode).toBe(401);
    });
  });
});

///////////////////////////  STORIES ENDPOINT  ////////////////////////////////

describe("The stories endpoint successfully handles data requests", () => {
  let token = "";

  beforeEach(async () => {
    await db("Users").truncate();
    await db("Stories").truncate();

    await request(server).post("/api/auth/register").send({
      username: "Bob",
      password: "password",
      email: "email@email.com",
    });

    const response = await request(server).post("/api/auth/login").send({
      username: "Bob",
      password: "password",
    });

    token = response.body.token;
  });

  describe("the stories endpoint allows the user to upload a story", () => {
    ////////  POST  ////////
    describe("testing POST requests", () => {
      it("/stories requires a token", async () => {
        //no token set in auth header
        const response = await request(server).post("/api/stories").send({
          user_id: "1",
          title: "Title of adventure",
          body: "This is a story about my adventure.",
        });

        expect(response.statusCode).toBe(401);
      });

      it("accepts a story with author's id, title, body", async () => {
        const response = await request(server)
          .post("/api/stories")
          .set("Authorization", token)
          .send({
            user_id: "1",
            title: "Title of adventure",
            body: "This is a story about my adventure.",
          });

        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
      });

      it("accepts a story with location and image_url as optional fields", async () => {
        const response = await request(server)
          .post("/api/stories")
          .set("Authorization", token)
          .send({
            user_id: "1",
            title: "Title of adventure",
            body: "This is a story about my adventure.",
            location: "The woods",
            image_url:
              "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          });

        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
      });
    });
  });

  /////////////  GET  ///////////////////////
  describe("Testing GET requests", () => {
    it("/stories requires a token", async () => {
      //no token set in auth header
      const response = await request(server).get("/api/stories");

      expect(response.statusCode).toBe(401);
    });

    it("returns an array of stories", async () => {
      await request(server)
        .post("/api/stories")
        .set("Authorization", token)
        .send({
          user_id: "1",
          title: "Title of adventure",
          body: "This is a story about my adventure.",
          location: "The woods",
          image_url:
            "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        });

      const response = await request(server)
        .get("/api/stories")
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
    });
  });

  describe("GET by story id returns the story with that id", () => {
    it("/stories/storyId/:id requires a token", async () => {
      //no token set in auth header
      const response = await request(server).get("/api/stories/storyId/1");

      expect(response.statusCode).toBe(401);
    });

    it("returns the specified story", async () => {
      await request(server)
        .post("/api/stories")
        .set("Authorization", token)
        .send({
          user_id: "1",
          title: "Title of adventure",
          body: "This is a story about my adventure.",
          location: "The woods",
          image_url:
            "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        });

      const response = await request(server)
        .get("/api/stories/storyId/1")
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body[0].id).toBe(1);
    });
  });

  describe("GET by user id returns an array of stories by that user", () => {
    it("/stories/user/:id requires a token", async () => {
      //no token set in auth header
      const response = await request(server).get("/api/stories/user/1");

      expect(response.statusCode).toBe(401);
    });

    it("returns the specified user's stories", async () => {
      await request(server)
        .post("/api/stories")
        .set("Authorization", token)
        .send({
          user_id: "1",
          title: "Title of adventure",
          body: "This is a story about my adventure.",
          location: "The woods",
          image_url:
            "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        });

      const response = await request(server)
        .get("/api/stories/user/1")
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body[0].user_id).toBe(1);
    });
  });

  ///////////////////  PUT  ///////////////////////
  describe("Testing PUT requests", () => {
    it("returns the updated story", async () => {
      await request(server)
        .post("/api/stories")
        .set("Authorization", token)
        .send({
          user_id: "1",
          title: "Title of adventure",
          body: "This is a story about my adventure.",
          location: "The woods",
          image_url:
            "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        });

      const response = await request(server)
        .put("/api/stories/1")
        .set("Authorization", token)
        .send({
          user_id: "1",
          //new title
          title: "This is a new title",
          body: "This is a story about my adventure.",
          location: "The woods",
          image_url:
            "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        });

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body[0].title).toBe("This is a new title");
    });
  });

  ///////////////////  DELETE  ///////////////////////
  describe("Testing DELETE requests", () => {
    it("deletes the specified story", async () => {
      const postResponse = await request(server)
        .post("/api/stories")
        .set("Authorization", token)
        .send({
          user_id: "1",
          title: "Title of adventure",
          body: "This is a story about my adventure.",
          location: "The woods",
          image_url:
            "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        });

      const deleteResponse = await request(server)
        .delete("/api/stories/1")
        .set("Authorization", token);

      const confirmDelete = await request(server)
        .get("/api/stories/storyId/1")
        .set("Authorization", token);

      expect(postResponse.statusCode).toBe(201);
      expect(postResponse.type).toBe("application/json");
      expect(deleteResponse.statusCode).toBe(204);
    });
  });
});
