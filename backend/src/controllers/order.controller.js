import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.models.js";
import { Order } from "../models/order.models.js";

const createOrder = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({
        user: req.user._id
    }).populate("items.book");

    if (!cart || cart.items.length === 0) {
        throw new ApiError(400, "Your cart is empty");
    }

    const items = cart.items.map((item) => {
        const book = item.book;

        if (!book) {
            throw new ApiError(400, "Book no longer exists");
        }

        const price =
            item.type === "rent"
                ? book.rentPrice
                : book.sellPrice;

        return {
            book: book._id,
            title: book.title,
            coverImage: book.coverImage || book.images?.[0],
            price,
            type: item.type,
            rentDuration:
                item.type === "rent"
                    ? book.rentDuration
                    : undefined
        };
    });

    const totalAmount = items.reduce(
        (total, item) => total + item.price,
        0
    );

    const order = await Order.create({
        buyer: req.user._id,
        items,
        totalAmount
    });

    cart.items = [];
    await cart.save();

    const createdOrder = await Order.findById(order._id);

    return res.status(201).json(
        new ApiResponse(
            201,
            createdOrder,
            "Order placed successfully"
        )
    );
});

const getOrder = asyncHandler(async (req, res) => {
        const order = await Order.findOne({
            _id: req.params.orderId,
            buyer: req.user._id
        });

        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                order,
                "Order fetched successfully"
            )
        );
});

const returnRental = asyncHandler(async (req, res) => {
    const { orderId, bookId } = req.params;

    const order = await Order.findOne({
        _id: orderId,
        buyer: req.user._id
    });

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    const item = order.items.find(
        (item) =>
            item.book.toString() === bookId &&
            item.type === "rent"
    );

    if (!item) {
        throw new ApiError(404, "Rental not found");
    }

    if (item.returned) {
        throw new ApiError(400, "This book has already been returned");
    }

    item.returned = true;
    item.returnedAt = new Date();

    await order.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Book returned successfully"
        )
    );
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({
        buyer: req.user._id
    }).sort({
        createdAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully"
        )
    );
});

export { createOrder, getOrder, returnRental, getMyOrders };