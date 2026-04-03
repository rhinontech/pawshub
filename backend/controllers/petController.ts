import type { Request, Response } from "express";
import db from "../models/index.ts";

const { Pet } = db as any;

// @desc    Get logged in user's pets
// @route   GET /api/pets
export const getMyPets = async (req: any, res: Response): Promise<void> => {
  try {
    const pets = await Pet.findAll({
      where: { ownerId: req.user.id }
    });
    res.json(pets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new pet
// @route   POST /api/pets
export const createPet = async (req: any, res: Response): Promise<void> => {
  try {
    const { name, species, breed, age, weight, city } = req.body;

    const pet = await Pet.create({
      ownerId: req.user.id,
      name,
      species,
      breed,
      age,
      weight,
      city,
    });

    res.status(201).json(pet);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle adoption or foster status
// @route   PATCH /api/pets/:id/listing
export const updateListingStatus = async (req: any, res: Response): Promise<void> => {
  try {
    const { isAdoptionOpen, isFosterOpen } = req.body;
    
    const pet = await Pet.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }

    if (isAdoptionOpen !== undefined) pet.isAdoptionOpen = isAdoptionOpen;
    if (isFosterOpen !== undefined) pet.isFosterOpen = isFosterOpen;

    await pet.save();
    
    res.json(pet);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
