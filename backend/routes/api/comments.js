const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
const winston = require("winston");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    /**
     * Retrieves all comments from the database, sorted by creation date in descending order.
     * @type {Promise<Array<Comment>>}
     */
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      winston.error("Error fetching comments:", error);
    } else {
      winston.error("Error fetching comments");
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
);