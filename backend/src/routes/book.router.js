import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { listBookForRent, listBookForSale, getBooksForSale, getBooksForRent, getBookById } from "../controllers/book.controller.js";

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

router.get(
    "/buy",
    getBooksForSale
);

router.get(
    "/rent",
    getBooksForRent
);

router.get(
    "/:bookId",
    getBookById
);

export default router;