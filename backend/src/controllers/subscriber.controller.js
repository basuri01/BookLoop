import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscriber } from "../models/subscriber.models.js";

const subscribe = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email || !email.trim()) {
        throw new ApiError(400, "Email is required");
    }

    const existingSubscriber = await Subscriber.findOne({
        email: email.toLowerCase().trim()
    });

    if (existingSubscriber) {
        return res.status(200).json(
            new ApiResponse(
                200,
                existingSubscriber,
                "You are already subscribed"
            )
        );
    }

    const subscriber = await Subscriber.create({
        email: email.toLowerCase().trim()
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            subscriber,
            "Subscribed successfully!"
        )
    );
});

export {
    subscribe
};