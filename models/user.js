import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String
    },
    password : {
        type: String,
        required: true
    },
    Image : {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
});

const User = mongoose.model("Users", userSchema);

export default User;