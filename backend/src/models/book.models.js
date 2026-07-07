import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        condition: {
            type: String,
            enum: [
                "New",
                "Like New",
                "Good",
                "Fair"
            ],
            required: true
        },
        edition: {
            type: String
        },
        sellPrice: {
            type: Number,
            default: 0
        },
        rentPrice: {
            type: Number,
            default: 0
        },
        listingType: {
            type: String,
            enum: [
                "sell",
                "rent",
                "both"
            ],
            required: true
        },
        images: {
            type: String
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: [
                "available",
                "sold",
                "rented"
            ],
            default: "available"
        },
        rentDuration: {
            type: Number
        },
        course: {
            type: String
        },
        semester: {
            type: Number
        }
    },{
        timestamps: true
    }
)


export const Book = mongoose.model("Book", bookSchema);