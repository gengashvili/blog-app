import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("author", "username");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, summary, image, content, author } = req.body;

    const newPost = new Post({
      title,
      summary,
      image,
      content,
      author,
    });

    await newPost.save();

    res.status(201).json({ post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.put("/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, summary, image, content } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    post.title = title || post.title;
    post.summary = summary || post.summary;
    post.image = image || post.image;
    post.content = content || post.content;

    await post.save();

    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post" });
    }

    await Post.deleteOne({ _id: postId });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
