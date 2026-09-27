import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Wishlist } from "../models/wishlist.models.js";
import { Book } from "../models/book.models.js";

const getWishlist = asyncHandler(async (req, res) => {
    let wishlist = await Wishlist.findOne({
        user: req.user._id
    }).populate("books");

    if (!wishlist) {
        wishlist = await Wishlist.create({
            user: req.user._id,
            books: []
        });
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            wishlist,
            "Wishlist fetched successfully"
        )
    );
});

const addToWishlist = asyncHandler(async (req, res) => {
    const { bookId } = req.body;

    if (!bookId) {
        throw new ApiError(400, "Book ID is required");
    }

    const book = await Book.findById(bookId);

    if (!book) {
        throw new ApiError(404, "Book not found");
    }

    let wishlist = await Wishlist.findOne({
        user: req.user._id
    });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            user: req.user._id,
            books: [bookId]
        });
    } else {
        const alreadyExists = wishlist.books.some(
            (id) => id.toString() === bookId
        );

        if (alreadyExists) {
            const populatedWishlist = await Wishlist.findById(wishlist._id)
                .populate("books");

            return res.status(200).json(
                new ApiResponse(
                    200,
                    populatedWishlist,
                    "Book is already in your wishlist"
                )
            );
        }

        wishlist.books.push(bookId);
        await wishlist.save();
    }

    const updatedWishlist = await Wishlist.findById(wishlist._id)
        .populate("books");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedWishlist,
            "Book added to wishlist successfully"
        )
    );
});

const removeFromWishlist = asyncHandler(async (req, res) => {
    const { bookId } = req.params;

    const wishlist = await Wishlist.findOne({
        user: req.user._id
    });

    if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }

    const exists = wishlist.books.some(
        (id) => id.toString() === bookId
    );

    if (!exists) {
        throw new ApiError(404, "Book is not in your wishlist");
    }

    wishlist.books = wishlist.books.filter(
        (id) => id.toString() !== bookId
    );

    await wishlist.save();

    const updatedWishlist = await Wishlist.findById(wishlist._id)
        .populate("books");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedWishlist,
            "Book removed from wishlist successfully"
        )
    );
});

export {
    getWishlist,
    addToWishlist,
    removeFromWishlist
};