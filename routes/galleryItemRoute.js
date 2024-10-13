import express from 'express';
import { getGalleryItems, getGalleryItemById, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/galleryItemController.js';
console.log("galleryItemRoute");
const galleryItemRouter = express.Router();

galleryItemRouter.get('/', getGalleryItems);            // Get all gallery items
galleryItemRouter.get('/:id', getGalleryItemById);     // Get specific gallery item by ID
galleryItemRouter.post('/', createGalleryItem);         // Create a new gallery item
galleryItemRouter.put('/:id', updateGalleryItem);      // Update gallery item by ID
galleryItemRouter.delete('/:id', deleteGalleryItem);   // Delete gallery item by ID

export default galleryItemRouter;
