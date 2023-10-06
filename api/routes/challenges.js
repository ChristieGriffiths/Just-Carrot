const express = require("express");
const router = express.Router();
const ChallengesController = require("../controllers/challenges");

router.get("/", ChallengesController.Index);
router.get("/:id/email", ChallengesController.GetEmailByChallengeId); 
router.post("/", ChallengesController.Create);
router.put("/:id", ChallengesController.Update);

module.exports = router;
