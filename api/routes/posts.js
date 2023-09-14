const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.get("/:id/email", PostsController.GetEmailByPostId); 
router.post("/", PostsController.Create);
router.put("/:id", PostsController.Update);

module.exports = router;
