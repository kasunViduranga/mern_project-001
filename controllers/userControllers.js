import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export function getUsers(req, res) {
    User.find().then((usersList) => {
        res.json({ list: usersList });
    }).catch((err) => {
        res.json({ message: "Error fetching users" });
    });
}

// save users
export function postUser(req, res) {

    const user = req.body
    const password = req.body.password;

    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    user.password = passwordHash;

    const newUser = new User(user);

    newUser.save().then((user) => {
        res.json({ message: "User created successfully" });
    }).catch((err) => {
        res.json({ message: "User creation failed" });
    });
}

// login user
export function loginUser(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email }).then((user) => {
        if (user == null) {
            return res.status(404).json({
                message: "User not found"
            });
        } else {

            const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);

            if (!isPasswordValid) {
                res.status(403).json({
                    message: 'Incorrect password',
                });
            } else {
                const payload = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type,
                };

                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '48h' });

                res.json({
                    message: 'User found',
                    user: user,
                    token: token,
                });
            }
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

//Admin Validation
export function isAdminValid(req) {

    if (req.user == null) {
        return false
    }
    if (req.user.type != "admin") {
        return false
    }
    return true;

}

//Customer Validation
export function isCustomerValid(req){

    if(req.user == null){
      return false
    }
    console.log(req.user)
    if(req.user.type != "customer"){
      return false
    }
  
    return true;
    
  }