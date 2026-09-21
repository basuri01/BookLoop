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
    const rentEnabled = listForRent === "true";
    if(rentEnabled){
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

    const coverImage = imageUrls[0];
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
        coverImage
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
    const rentEnabled = listForSale === "true";
    if(rentEnabled){
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

    const coverImage = imageUrls[0];

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
        coverImage,
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

const getBooksForSale = asyncHandler(async (req, res) => {

    const books = await Book.find({
        listingType: {
            $in: ["sell", "both"]
        },
        status: "available"
    }).sort({
        createdAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            books,
            "Books fetched successfully"
        )
    );
});

const getBooksForRent = asyncHandler(async (req, res) => {

    const books = await Book.find({
        listingType: {
            $in: ["rent", "both"]
        },
        status: "available"
    }).sort({
        createdAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            books,
            "Books available for rent fetched successfully"
        )
    );
});

const getBookById = asyncHandler(async (req, res) => {

    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
        throw new ApiError(404, "Book not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            book,
            "Book fetched successfully"
        )
    );
});

export {
    listBookForRent,
    listBookForSale, 
    getBooksForSale, 
    getBooksForRent,
    getBookById
}