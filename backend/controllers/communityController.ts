import type { Request, Response } from "express";
import db from "../models/index.ts";

const { Post, User } = db as any;

// @desc    Submit a new post for moderation
// @route   POST /api/community/posts
export const createCommunityPost = async (req: any, res: Response): Promise<void> => {
  try {
    const { content, category, imageUrl } = req.body;

    const post = await Post.create({
      userId: req.user.id,
      content,
      category,
      imageUrl,
      status: 'pending', // Always pending by default
    });

    res.status(201).json({ message: "Post submitted for verification", post });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get approved posts for feed
// @route   GET /api/community/feed
export const getCommunityFeed = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.findAll({
      where: { status: 'approved' },
      include: [
        { model: User, as: 'author', attributes: ['name', 'role'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
