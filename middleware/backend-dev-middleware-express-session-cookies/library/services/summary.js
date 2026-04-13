import Borrow from "../model/borrow.model.js";

export function summary(req,res){
    Borrow.find()
    .populate("member")
    .populate("books")
    .then(records=>{
        const summary=records.map(r=>({
            memberName:r.member.name,
            books:r.books.map(b=>b.title),
            borrowDate:r.borrowDate
        }));
        res.json({
            code:200,
            message:"Summary retrieved",
            data:summary
        });
    })
    .catch(err=>{
        res.status(500).json({
            code:500,
            message:"Internal Server Error",
            data:null
        });
    });
}