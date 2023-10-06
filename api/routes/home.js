const express = require("express");
const router = express.Router();
const ChallengesController = require("../controllers/challenges");

router.get("/", ChallengesController.Index);