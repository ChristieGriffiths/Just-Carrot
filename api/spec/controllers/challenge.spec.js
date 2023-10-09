const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Challenge = require("../../models/challenge");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/challenges", () => {
  beforeAll(async () => {
    const user = new User({ firstName: "test", surname: "test", email: "test@test.com", password: "12345678" });
    await user.save();

    token = JWT.sign(
      {
        user_id: user.id,
        
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  beforeEach(async () => {
    await Challenge.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Challenge.deleteMany({});
  });

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/api/challenges")
        .set("Authorization", `Bearer ${token}`)
        .send({ challenge: "test", userId: "605c72ef68948850941b3c4b", completeTime: "16:22" , completeDate: "2023-10-06T00:00:00.000+00:00", chosenValidation: "test", chosenCharity: "test", incentiveAmount: 15,  token: token });
        console.log(response.body);
      expect(response.status).toEqual(201);
    });
  
//     test("creates a new post", async () => {
//       await request(app)
//         .post("/posts")
//         .set("Authorization", `Bearer ${token}`)
//         .send({ message: "hello world", token: token });
//       let posts = await Post.find();
//       expect(posts.length).toEqual(1);
//       expect(posts[0].message).toEqual("hello world");
//     });
  
//     test("returns a new token", async () => {
//       let response = await request(app)
//         .post("/posts")
//         .set("Authorization", `Bearer ${token}`)
//         .send({ message: "hello world", token: token })
//       let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
//       let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
//       expect(newPayload.iat > originalPayload.iat).toEqual(true);
//     });  
//   });
  
//   describe("POST, when token is missing", () => {
//     test("responds with a 401", async () => {
//       let response = await request(app)
//         .post("/posts")
//         .send({ message: "hello again world" });
//       expect(response.status).toEqual(401);
//     });
  
//     test("a post is not created", async () => {
//       await request(app)
//         .post("/posts")
//         .send({ message: "hello again world" });
//       let posts = await Post.find();
//       expect(posts.length).toEqual(0);
//     });
  
//     test("a token is not returned", async () => {
//       let response = await request(app)
//         .post("/posts")
//         .send({ message: "hello again world" });
//       expect(response.body.token).toEqual(undefined);
//     });
//   })

//   describe("GET, when token is present", () => {
//     test("returns every post in the collection", async () => {
//       let post1 = new Post({message: "howdy!"});
//       let post2 = new Post({message: "hola!"});
//       await post1.save();
//       await post2.save();
//       let response = await request(app)
//         .get("/posts")
//         .set("Authorization", `Bearer ${token}`)
//         .send({token: token});
//       let messages = response.body.posts.map((post) => ( post.message ));
//       expect(messages).toEqual(["howdy!", "hola!"]);
//     })

//     test("the response code is 200", async () => {
//       let post1 = new Post({message: "howdy!"});
//       let post2 = new Post({message: "hola!"});
//       await post1.save();
//       await post2.save();
//       let response = await request(app)
//         .get("/posts")
//         .set("Authorization", `Bearer ${token}`)
//         .send({token: token});
//       expect(response.status).toEqual(200);
//     })

//     test("returns a new token", async () => {
//       let post1 = new Post({message: "howdy!"});
//       let post2 = new Post({message: "hola!"});
//       await post1.save();
//       await post2.save();
//       let response = await request(app)
//         .get("/posts")
//         .set("Authorization", `Bearer ${token}`)
//         .send({token: token});
//       let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
//       let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
//       expect(newPayload.iat > originalPayload.iat).toEqual(true);
//     })
//   })

//   describe("GET, when token is missing", () => {
//     test("returns no posts", async () => {
//       let post1 = new Post({message: "howdy!"});
//       let post2 = new Post({message: "hola!"});
//       await post1.save();
//       await post2.save();
//       let response = await request(app)
//         .get("/posts");
//       expect(response.body.posts).toEqual(undefined);
//     })

//     test("the response code is 401", async () => {
//       let post1 = new Post({message: "howdy!"});
//       let post2 = new Post({message: "hola!"});
//       await post1.save();
//       await post2.save();
//       let response = await request(app)
//         .get("/posts");
//       expect(response.status).toEqual(401);
//     })

//     test("does not return a new token", async () => {
//       let post1 = new Post({message: "howdy!"});
//       let post2 = new Post({message: "hola!"});
//       await post1.save();
//       await post2.save();
//       let response = await request(app)
//         .get("/posts");
//       expect(response.body.token).toEqual(undefined);
//     })
  })
});
