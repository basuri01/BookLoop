import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.models.js";
import { Book } from "../models/book.models.js";

const addToCart = asyncHandler(async (req, res) => {
    const { bookId, type } = req.body;

    if (!bookId || !type) {
        throw new ApiError(400, "Book ID and cart type are required");
    }

    if (!["buy", "rent"].includes(type)) {
        throw new ApiError(400, "Invalid cart type");
    }

    const book = await Book.findById(bookId);

    if (!book) {
        throw new ApiError(404, "Book not found");
    }

    if (book.status !== "available") {
        throw new ApiError(400, "This book is no longer available");
    }

    if (type === "buy" && !["sell", "both"].includes(book.listingType)) {
        throw new ApiError(400, "This book is not available for sale");
    }

    if (type === "rent" && !["rent", "both"].includes(book.listingType)) {
        throw new ApiError(400, "This book is not available for rent");
    }

    let cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: [
                {
                    book: bookId,
                    type,
                    quantity: 1
                }
            ]
        });
    } else {
        const existingItem = cart.items.find(
            (item) =>
                item.book.toString() === bookId &&
                item.type === type
        );

        if (existingItem) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    cart,
                    "Book is already in your cart"
                )
            );
        }

        cart.items.push({
            book: bookId,
            type,
            quantity: 1
        });

        await cart.save();
    }

    const updatedCart = await Cart.findById(cart._id)
        .populate("items.book");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedCart,
            "Book added to cart successfully"
        )
    );
});

const getCart = asyncHandler(async (req, res) => {
    let cart = await Cart.findOne({
        user: req.user._id
    }).populate("items.book");

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: []
        });
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart fetched successfully"
        )
    );
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const { type } = req.query;

    if (!type || !["buy", "rent"].includes(type)) {
        throw new ApiError(400, "Valid cart type is required");
    }

    const cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const itemExists = cart.items.some(
        (item) =>
            item.book.toString() === bookId &&
            item.type === type
    );

    if (!itemExists) {
        throw new ApiError(404, "Book is not in your cart");
    }

    cart.items = cart.items.filter(
        (item) =>
            !(
                item.book.toString() === bookId &&
                item.type === type
            )
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
        .populate("items.book");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedCart,
            "Book removed from cart successfully"
        )
    );
});

export {
    addToCart,
    getCart,
    removeFromCart
};