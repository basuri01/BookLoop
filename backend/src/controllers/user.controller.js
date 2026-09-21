import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"


const generateAccessAndRefreshTokens= async(userId) =>{
    try {
        const user= await User.findById(userId)
        if(!user){
            throw new ApiError(404, "User not found");
        }

        const accessToken= user.generateAccessTokens()
        const refreshToken= user.generateRefreshTokens()

        user.refreshTokens= refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access tokens")
    }
}

const registerUser= asyncHandler( async(req, res) => {
    //1.get user details from frontend
    //2.validation- not empty
    //3.check if user already exists
    //6.create user object- create entry in db 
    //7.remove password and refresh token from response
    //8.check for user creation
    //9.return res

    //1
    const {fullname, email, username, password} = req.body

    ///2
    if(
        [fullname, email, username, password].some( (field)=>
            field?.trim() ==="")
    ){
        throw new ApiError(400, "All fields are required")
    }

    //3
    const existedUser= await User.findOne({
        $or: [{username}, {email}]
    })
    if(existedUser){
        throw new ApiError(409, "User already existed")
    }

    //6
    const user= await User.create({
        fullname,
        email, 
        password,
        username: username.toLowerCase()
    })
    
    //7 & 8
    const createdUser= await User.findById(user._id).select(
        "-password -refreshTokens"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    //9
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully") 
    )
    

})

const loginUser= asyncHandler( async(req, res) => {
    //request data from body
    //check username or email
    //find user
    //check password
    //generate access and refresh token
    //send cookies

    const{email, username, password} = req.body;

    if(!username && !email){
        throw new  ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid= await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid Password");
    }

    const {accessToken, refreshToken}= await generateAccessAndRefreshTokens(user._id)

    const loggedInUser= await User.findById(user._id).
    select("-password -refreshToken")

    const options= {
        httpOnly: true, 
        secure: false
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {user: loggedInUser, accessToken, refreshToken}, 
            "User logged in successfully")
    )

})

const logoutUser= asyncHandler( async(req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {refreshToken: 1}
    },
    {
        new: true
    }
    )

    const options= {
        httpOnly: true, 
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200, {}, "User logged out successfully")
    )

})  

const getCurrentUser= asyncHandler( async(req, res) => {
    return res
    .status(200)
    .json(200, req.user, "current user fetched successfully")
})



export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}










