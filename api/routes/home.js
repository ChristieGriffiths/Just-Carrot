const express = require("express");
const router = express.Router();

router.get("/", PostsController.Index);

const HomeController = require("../controllers/home")