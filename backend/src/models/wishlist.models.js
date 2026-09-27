import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        books: [
            {
                type: Schema.Types.ObjectId,
                ref: "Book"
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);