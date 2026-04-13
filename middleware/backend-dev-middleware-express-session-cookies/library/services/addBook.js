import Book from "../model/book.model.js";
import {StatusCodes} from "http-status-codes";

export function addbook(req,res){
    const book=new Book(req.body);
    book.save()
    .then(data=>{
        res.status(StatusCodes.CREATED).json({
            code:StatusCodes.CREATED,
            message:"Book added",
            data:book
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