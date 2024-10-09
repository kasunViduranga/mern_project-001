import User from "../models/user.js";


export function getUsers(req, res) {
    User.find().then((usersList) => {
        res.json({ list : usersList });
    }).catch((err) => {
        res.json({ message: "Error fetching users"});
    });
}

export function postUser(req, res) {

    const user = req.body
    const newUser = new User(user);

    newUser.save().then((user) => {
        res.json({ message: "User created successfully"});
    }).catch((err) => {
        res.json({ message: "User creation failed"});
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