import express from "express";
import { getCategories, addCategory, updateCategory, deleteCategory, } from "../controllers/categoryController.js";

const router = express.Router();

// Route to get categories with pagination
router.post("/all", getCategories);

// Route to create a new category
router.post("/", addCategory);

// Route to update a category by id
router.put("/:id", updateCategory);

// Route to delete a category by id
router.delete("/:id", deleteCategory);

export default router;
