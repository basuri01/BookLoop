import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} from "../controllers/wishlist.controller.js";

const router = Router();

router.get(
    "/",
    verifyJWT,
    getWishlist
);

router.post(
    "/",
    verifyJWT,
    addToWishlist
);

router.delete(
    "/:bookId",
    verifyJWT,
    removeFromWishlist
);

export default router;