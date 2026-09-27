import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [
            {
                book: {
                    type: Schema.Types.ObjectId,
                    ref: "Book",
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                coverImage: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                type: {
                    type: String,
                    enum: ["buy", "rent"],
                    required: true
                },
                rentDuration: {
                    type: Number
                },
                returned: {
                    type: Boolean,
                    default: false
                },

                returnedAt: {
                    type: Date
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["placed", "completed", "cancelled"],
            default: "placed"
        }
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model("Order", orderSchema);