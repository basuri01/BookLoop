import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Book } from "../models/book.models.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const listBookForSale = asyncHandler( async(req, res)=>{

    //taking all the fields from the frontend
    //validate all the required fields
    //if listForRent is true then validate  rent price and rent duration
    //create book to sell or rent accordingly 
    //return response
    const {title, author, category, description, condition, edition, sellPrice, rentPrice, listForRent, rentDuration, course, semester} = req.body;

    if(
        [title, author, category, description, condition].some(
            (field) => !field || field.toString().trim()===""
        )
    ){
        throw new ApiError(400, "All required fields are required")
    }

    if(sellPrice== null){
        throw new ApiError(400, "Selling price is required");
    }

    let listingType= "sell";
    if(listForRent){
        listingType= "both";
        if(rentPrice== null){
            throw new ApiError(400, "Rent price is required");
        }
        if(rentDuration== null){
            throw new ApiError(400, "Rent duration is required");
        }
    }

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "Please upload at least one image");
    }

    const imageUrls = [];
    for (const file of req.files) {
        const uploadedImage = await uploadOnCloudinary(file.path);
        if (!uploadedImage) {
            throw new ApiError(500, "Error while uploading images");
        }
        imageUrls.push(uploadedImage.secure_url);
    }

    const book = await Book.create({
        title,
        author, 
        category,
        description, 
        condition,
        edition,
        sellPrice,
        rentPrice,
        rentDuration,
        course,
        semester,
        listingType,
        seller: req.user._id,
        images: imageUrls,
    });

    const createdBook = await Book.findById(book._id);
    if(!createdBook){
        throw new ApiError(500, "Something went wrong while listing a book");
    } 

    return res.status(201).json(
        new ApiResponse(201, createdBook, "Book listed successfully") 
    )
})

const listBookForRent = asyncHandler( async(req, res)=>{

    //taking all the fields from the frontend
    //validate all the required fields
    //if listForSell is true then validate sell price
    //create book to sell or rent accordingly 
    //return response
    const {title, author, category, description, condition, edition, sellPrice, rentPrice, listForSale, rentDuration, course, semester} = req.body;

    if(
        [title, author, category, description, condition].some(
            (field) => !field || field.toString().trim()===""
        )
    ){
        throw new ApiError(400, "All required fields are required")
    }
    
    if(rentPrice== null){
            throw new ApiError(400, "Rent price is required");
        }
    if(rentDuration== null){
            throw new ApiError(400, "Rent duration is required");
    }

    let listingType= "rent";
    if(listForSale){
        listingType= "both";
        if(sellPrice== null){
            throw new ApiError(400, "Selling price is required");
        }
    }

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "Please upload at least one image");
    }

    const imageUrls = [];
    for (const file of req.files) {
        const uploadedImage = await uploadOnCloudinary(file.path);
        if (!uploadedImage) {
            throw new ApiError(500, "Error while uploading images");
        }
        imageUrls.push(uploadedImage.secure_url);
    }

    const book = await Book.create({
        title,
        author, 
        category,
        description, 
        condition,
        edition,
        sellPrice,
        rentPrice,
        rentDuration,
        course,
        semester,
        listingType,
        images: imageUrls,
        seller: req.user._id
    });

    const createdBook = await Book.findById(book._id);
    if(!createdBook){
        throw new ApiError(500, "Something went wrong while listing a book");
    } 

    return res.status(201).json(
        new ApiResponse(201, createdBook, "Book listed successfully") 
    )
})



export {
    listBookForRent,
    listBookForSale
}