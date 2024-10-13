import GalleryItem from "../models/galleryItem.js";

// Get all gallery items
export const getGalleryItems = async (req, res) => {
    try {
        const galleryItems = await GalleryItem.find();
        res.status(200).json(galleryItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery items', error });
    }
};

// Get a specific gallery item by ID
export const getGalleryItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const galleryItem = await GalleryItem.findById(id);
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }
        res.status(200).json(galleryItem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery item', error });
    }
};

// Create a new gallery item
export function createGalleryItem (req, res){

    const user = req.user;

    //check if user is logged in
    if(user == null){
        res.status(403).json({ message: 'please login to add gallery item'});
        return;
    }

    //check if user is admin
    if(user.type != "admin"){
        res.status(403).json({ message: 'you are not authorized to add gallery item'});
        return;
    }

    const galleryItem = req.body.item;
    const newGalleryItem = new GalleryItem(galleryItem);
    
    newGalleryItem.save().then((galleryItem) => {
        res.json({ message: "Gallery item created successfully"});
    }).catch((err) => {
        res.json({ message: "Gallery item creation failed"});
    });
};

// Update a gallery item by ID
export const updateGalleryItem = async (req, res) => {
    const { id } = req.params;
    const { name, image, description } = req.body;

    try {
        const updatedGalleryItem = await GalleryItem.findByIdAndUpdate(
            id,
            { name, image, description },
            { new: true } // To return the updated document
        );

        if (!updatedGalleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        res.status(200).json(updatedGalleryItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating gallery item', error });
    }
};

// Delete a gallery item by ID
export const deleteGalleryItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGalleryItem = await GalleryItem.findByIdAndDelete(id);

        if (!deletedGalleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        res.status(200).json({ message: 'Gallery item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting gallery item', error });
    }
};
