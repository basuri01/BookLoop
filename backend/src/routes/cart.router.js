import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    addToCart
);

router.get(
    "/",
    verifyJWT,
    getCart
);

router.delete(
    "/:bookId",
    verifyJWT,
    removeFromCart
);

export default router;