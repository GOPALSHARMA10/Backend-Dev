import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    bookId:Number,
    title:String,
    author:String,
    price:Number

});
export default mongoose.model("Book",bookSchema);