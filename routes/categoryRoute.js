import express from "express";
import {createCategory, deleteCategory, getCategory, getCategoryByName, updateCategory} from "../controllers/categoryController.js";
const categoryRouter = express. Router();

categoryRouter.post("/", createCategory)

categoryRouter.delete("/:name",deleteCategory)



categoryRouter.get("/searchByPrice", (req,res)=>{
  res.json({
    message : "searchByPrice"
  })
})

categoryRouter.get("/:name",getCategoryByName);

categoryRouter.get("/",getCategory);

//category update router
categoryRouter.put("/:name",updateCategory);
export default categoryRouter;