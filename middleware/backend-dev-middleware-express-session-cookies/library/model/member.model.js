import mongoose from "mongoose";

const memberSchema=new mongoose.Schema({
    memberId:Number,
    name:String,
    membershipType:String

});
export default mongoose.model("Member",memberSchema);