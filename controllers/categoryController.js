import Category from "../models/category.js"; // Assuming you have a Category model

// Get all categories with pagination
export const getCategories = async (req, res) => {
  try {
    const { page = 1, pageSize = 5 } = req.body; // Default to 5 items per page

    const categories = await Category.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalCategories = await Category.countDocuments();
    const totalPages = Math.ceil(totalCategories / pageSize);

    res.status(200).json({
      categories,
      pagination: {
        totalPages,
        currentPage: page,
        totalCategories,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new category
export const addCategory = async (req, res) => {
  const { name, description, price, features } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({
      name,
      description,
      price,
      features,
    });

    await newCategory.save();
    res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, features } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    category.description = description;
    category.price = price;
    category.features = features;

    await category.save();
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  console.log(req.params); // Debugging: Check the received params

  try {
    // Validate if the category ID is valid
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Correct method to delete the category by ID
    await Category.findByIdAndDelete(id); // This will delete the category

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: error.message });
  }
};
