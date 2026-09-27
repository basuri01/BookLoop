import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createOrder, getOrder, returnRental, getMyOrders } from "../controllers/order.controller.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    createOrder
);
router.get(
    "/:orderId",
    verifyJWT,
    getOrder
);

router.patch(
    "/:orderId/return/:bookId",
    verifyJWT,
    returnRental
);

router.get(
    "/",
    verifyJWT,
    getMyOrders
);

export default router;