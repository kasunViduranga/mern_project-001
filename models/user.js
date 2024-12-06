import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    firstName : {
        type: String
    },
    lastName : {
        type: String
    },
    type : {
        type: String,
        required: true,
        default: "customer"
    },
    whatsapp : {
        type: String
    },
    image : {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
    },
    phone : {
        type: String
    },
    disabled : {
        type: Boolean,
        default: false
    },
    emailVerified : {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("Users", userSchema);

export default User;