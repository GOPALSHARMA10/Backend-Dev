import Member from "../model/member.model.js";
import Book from "../model/book.model.js";
import Borrow from "../model/borrow.model.js";

export function borrow(req,res){
    const user=req.session.user;
    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            code:StatusCodes.UNAUTHORIZED,
            message:"Unauthorized",
            data:null
        });

    }
    const booksIds=req.session.cart||[];
    Book.find({bookId:{$in:bookIds}})
        .then(books=>{
            Member.findOne({name:user.username})
                .then(member=>{
                    const record=new Borrow({
                        member:member._id,
                        books:books.map(b=>b._id)
                    });
                    record.save()
                        .then(data=>{
                            req.session.cart=[];
                            res.json({
                                code:StatusCodes.OK,
                                message:"Books borrowed",
                                data:null
                            });
                        });
                });
        })
        .catch(err=>{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR,
                message:StatusCodes.INTERNAL_SERVER_ERROR,
                data:null
            });
        }); 
        
}
