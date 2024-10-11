import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function getUsers(req, res) {
    User.find().then((usersList) => {
        res.json({ list : usersList });
    }).catch((err) => {
        res.json({ message: "Error fetching users"});
    });
}

// save users
export function postUser(req, res) {

    const user = req.body
    // const password = req.body.password;

    // const saltRounds = 10;
    // const passwordHash = bcrypt.genSaltSync(password,saltRounds);

    // console.log(passwordHash);

    const newUser = new User(user);

    newUser.save().then((user) => {
        res.json({ message: "User created successfully"});
    }).catch((err) => {
        res.json({ message: "User creation failed"});
    });
}

// login user
export function loginUser(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email, password: credentials.password }).then((user) => {
        if (user == null) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }else{

            const payload = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type
            };
            const token = jwt.sign(payload, "secretkey", { expiresIn: "48h" });
            res.json({
                message: "User logged in successfully",
                user: user,
                token: token
            });
        }
    });
}

export function updateUser(req, res) {
    const { id, ...updateData } = req.body;

    User.findByIdAndUpdate(id, updateData, { new: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User updated successfully", user: updatedUser });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error updating user", error: err.message });
        });
}

export function deleteUser(req, res) {
    res.json({ message: "Hello World - delete" });
}