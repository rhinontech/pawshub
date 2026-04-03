import type { Request, Response } from "express";
import db from "../models/index.ts";

const { Post, User, Pet } = db as any;

// @desc    Get all pending community posts
// @route   GET /api/admin/pending-posts
export const getPendingPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.findAll({
      where: { status: 'pending' },
      include: [
        { model: User, as: 'author', attributes: ['name', 'role'] }
      ]
    });
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve or Reject a post
// @route   PATCH /api/admin/posts/:id/moderate
export const moderatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      res.status(400).json({ message: "Invalid status. Must be 'approved' or 'rejected'." });
      return;
    }

    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    post.status = status;
    await post.save();

    res.json({ message: `Post ${status} successfully`, post });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get unverified veterinarians
// @route   GET /api/admin/unverified-vets
export const getUnverifiedVets = async (req: Request, res: Response): Promise<void> => {
  try {
    const vets = await User.findAll({
      where: { role: 'veterinarian', isVerified: false }
    });
    res.json(vets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify a veterinarian
// @route   PATCH /api/admin/vets/:id/verify
export const verifyVet = async (req: Request, res: Response): Promise<void> => {
  try {
    const vet = await User.findOne({ where: { id: req.params.id, role: 'veterinarian' } });
    if (!vet) {
      res.status(404).json({ message: "Veterinarian not found" });
      return;
    }

    vet.isVerified = true;
    await vet.save();

    res.json({ message: "Veterinarian verified successfully", vet });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get all pets across ecosystem
// @route   GET /api/admin/pets
export const getAllPets = async (req: Request, res: Response): Promise<void> => {
  try {
    const pets = await Pet.findAll({
      include: [
        { model: User, as: 'owner', attributes: ['name', 'email'] }
      ]
    });
    res.json(pets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users in the system
// @route   GET /api/admin/users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get platform stats overview
// @route   GET /api/admin/stats
export const getAdminStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Appointment } = db as any;

    const [totalUsers, totalPets, totalPosts, pendingPosts, pendingVets, totalAppointments] = await Promise.all([
      User.count(),
      Pet.count(),
      Post.count({ where: { status: 'approved' } }),
      Post.count({ where: { status: 'pending' } }),
      User.count({ where: { role: 'veterinarian', isVerified: false } }),
      Appointment ? Appointment.count() : Promise.resolve(0),
    ]);

    res.json({
      totalUsers,
      totalPets,
      totalPosts,
      pendingPosts,
      pendingVets,
      totalAppointments,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
