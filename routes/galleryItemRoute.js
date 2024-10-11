import express from 'express';
import { getGalleryItems, getGalleryItemById, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/galleryItemController.js';

const galleryItemRouter = express.Router();

galleryItemRouter.get('/gallery', getGalleryItems);            // Get all gallery items
galleryItemRouter.get('/gallery/:id', getGalleryItemById);     // Get specific gallery item by ID
galleryItemRouter.post('/gallery', createGalleryItem);         // Create a new gallery item
galleryItemRouter.put('/gallery/:id', updateGalleryItem);      // Update gallery item by ID
galleryItemRouter.delete('/gallery/:id', deleteGalleryItem);   // Delete gallery item by ID

export default galleryItemRouter;
