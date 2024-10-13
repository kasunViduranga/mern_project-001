import mongoose from "mongoose";
console.log("galleryItem model");

const galleryItemSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
});

const GalleryItem = mongoose.model("galleryitems", galleryItemSchema);

export default GalleryItem;