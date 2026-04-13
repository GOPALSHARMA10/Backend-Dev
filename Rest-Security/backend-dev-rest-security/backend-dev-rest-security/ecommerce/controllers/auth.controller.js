import bcrypt from 'bcrypt';
import {StatusCodes} from 'http-status-codes';
import User from '../models/User.js';


export function register(req,res){
    try{
        const {username,password}=req.body;

        if(!username || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({
                code:StatusCodes.BAD_REQUEST,
                message:"Username and password required"
            });
        }

        bcrypt.hash(password,10)
        .then(hashedPassword=>{
            const newUser=new User({
                username,
                password:hashedPassword
            });
            return newUser.save();
        })
        .then(user=>{
            res.status(StatusCodes.CREATED).json({
                code:StatusCodes.CREATED,
                message:"User registered successfully",
                data:{
                    id:user._id,
                    username:user.username,
                    role:user.role
                }
            });
        })
        .catch(error=>{
            console.error("Registration error:",error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR,
                message:error.message
            });
        });

    }catch(error){
        console.error("Registration error:",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message
        });
    }
}

export function login(req,res){
    try{
        const {username,password}=req.body;
        User.findOne({username})
        .then(user=>{
            if(!user){  
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    code:StatusCodes.UNAUTHORIZED,
                    message:"Invalid username or password"
                });
            }
            bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(!isMatch){   
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        code:StatusCodes.UNAUTHORIZED,
                        message:"Invalid username or password"
                    });
                }
                req.session.userId=user._id;
                req.session.role=user.role;
                req.session.save(err=>{
                    if(err){
                        console.error("Session save error:",err);
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            code:StatusCodes.INTERNAL_SERVER_ERROR,
                            message:"Internal Server Error",
                        });
                    }
                    res.status(StatusCodes.OK).json({
                        code:StatusCodes.OK,
                        message:"Login successful",
                        data:{
                            id:user._id,
                            username:user.username,
                            role:user.role
                        }
                    });
                });
            })
            .catch(error=>{
                console.error("Login error:",error);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    code:StatusCodes.INTERNAL_SERVER_ERROR,
                    message:"Internal Server Error",
                    data:null
                });
            });
        })
        .catch(error=>{
            console.error("Login error:",error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR,
                message:"Internal Server Error",
                data:null
            });
        });
    }
    catch(error){
        console.error("Login error:",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:"Internal Server Error",
            data:null
        });
    }
};