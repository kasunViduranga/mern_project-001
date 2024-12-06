import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  price :{
    type:Number,
    required:true
  },
  features : [
    {
      type:String,
    }
  ],
  description : {
    type:String,
    required:true
  }  
})


const Category = mongoose.model("categories",categorySchema)
export default Category;