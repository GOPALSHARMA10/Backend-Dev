import {StatusCodes} from 'http-status-codes';
import Product from '../models/Product.js';

export function addProduct(req,res){
    try{
        const {name,price}=req.body;
        if(!name || price=== undefined || price < 0){
            return res.status(StatusCodes.BAD_REQUEST).json({
                code:StatusCodes.BAD_REQUEST,
                message:"Name and price are required, and price must be non-negative"
            });
        }
        const newProduct=new Product({name,price});
        newProduct.save()
        .then(product=>{
            res.status(StatusCodes.CREATED).json({
                code:StatusCodes.CREATED,
                message:"Product added successfully",
                data:product
            });
        })
        .catch(error=>{
            console.error("Error adding product:",error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR,
                message:"Internal Server Error",
                data:null
            });
        });
    }
    catch(error){
        console.error("Error adding product:",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:"Internal Server Error",
            data:null
        });
    }

};

export function searchProducts(req,res){
    try{
        const {name}=req.query;
        if(!name){
            return res.status(StatusCodes.BAD_REQUEST).json({
                code:StatusCodes.BAD_REQUEST,
                message:"Name query parameter is required"
            });
        }
        Product.find({name:{$regex:name,$options:"i"}})
        .then(products=>{
            res.status(StatusCodes.OK).json({
                code:StatusCodes.OK,
                message:"Products retrieved successfully",
                data:products
            });
        })
        .catch(error=>{
            console.error("Error searching products:",error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR,
                message:"Internal Server Error",
                data:null
            });
        });
    }
    catch(error){
        console.error("Error searching products:",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:"Internal Server Error",
            data:null
        });
    }
};

