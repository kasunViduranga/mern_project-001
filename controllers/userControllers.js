import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function getAllUsers(req, res) {
    // Validate admin
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }

  // Extract page and pageSize from query parameters
  const page = parseInt(req.body.page) || 1; // Default to page 1
  const pageSize = parseInt(req.body.pageSize) || 10; // Default to 10 items per page
  const skip = (page - 1) * pageSize;

  User.find()
    .skip(skip)
    .limit(pageSize)
    .then((users) => {
      User.countDocuments().then((totalCount) => {
        res.json({
          message: "Users found",
          users: users,
          pagination: {
            currentPage: page,
            pageSize: pageSize,
            totalUsers: totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching users",
        error: err,
      });
    });
    
}

export function getUser(req, res) {
  const user = req.user;
  console.log(user);
  console.log("-------------------");
  
  if (user == null) {
    res.json({
      message: "not found",
    });
  } else {
    res.json({
      message: "found",
      user: user,
    });
  }
}

// save users
export function postUser(req, res) {
  const user = req.body;
  const password = req.body.password;

  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  user.password = passwordHash;

  const newUser = new User(user);

  newUser
    .save()
    .then((user) => {
      res.json({ message: "User created successfully" });
    })
    .catch((err) => {
      res.json({ message: "User creation failed" });
    });
}

// save admins
export function createAdmin(req, res) {
  const user = req.body;
  const password = req.body.password;

  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  user.password = passwordHash;

  const newUser = new User(user);

  newUser
    .save()
    .then((user) => {
      res.json({ message: "User created successfully" });
    })
    .catch((err) => {
      res.json({ message: "User creation failed" });
    });
}

// login user
export function loginUser(req, res) {
  
  const credentials = req.body;

  User.findOne({ email: credentials.email }).then((user) => {
    if (user == null) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      const isPasswordValid = bcrypt.compareSync(
        credentials.password,
        user.password
      );

      if (!isPasswordValid) {
        res.status(403).json({
          message: "Incorrect password",
        });
      } else {
        const payload = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
        };

        const token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: "48h",
        });

        res.json({
          message: "User found",
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
      res
        .status(500)
        .json({ message: "Error updating user", error: err.message });
    });
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user.", error: error.message });
  }
};



//Admin Validation
export function isAdminValid(req) {
  if (req.user == null) {
    return false;
  }
  if (req.user.type != "admin") {
    return false;
  }
  return true;
}

//Customer Validation
export function isCustomerValid(req) {
  if (req.user == null) {
    return false;
  }
  console.log(req.user);
  if (req.user.type != "customer") {
    return false;
  }

  return true;
}
