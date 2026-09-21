import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
        type: {
            type: String,
            enum: ["buy", "rent"],
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    },
    {
        _id: false
    }
);

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        items: {
            type: [cartItemSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

export const Cart = mongoose.model("Cart", cartSchema);