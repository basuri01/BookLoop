import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { listBookForRent, listBookForSale } from "../controllers/book.controller.js";

const router = Router();

router.post(
    "/sell",
    verifyJWT,
    upload.array("images", 5),
    listBookForSale
);

router.post(
    "/rent",
    verifyJWT,
    upload.array("images", 5),
    listBookForRent
);

export default router;