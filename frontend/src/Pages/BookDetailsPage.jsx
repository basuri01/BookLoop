import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import api from "../api/axios.js";
import "../BookDetailsPage.css";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

function BookDetailsPage() {
    const { bookId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isRentMode = searchParams.get("mode") === "rent";
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { addToCart, isInCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await api.get(`/books/${bookId}`);
                console.log(response.data);
                setBook(response.data.data);
            } catch (error) {
                console.log("Error fetching book:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        getBook();
    }, [bookId]);

    const handleAddToCart = async () => {
        const type = isRentMode ? "rent" : "buy";
        const result = await addToCart(
            book._id,
            type
        );
        if (!result.success) {
            alert(result.message);
        }
    };

    const handleBuyNow = async () => {
        if (alreadyInCart) {
            navigate("/checkout");
            return;
        }

        const result = await addToCart(book._id, "buy");

        if (!result.success) {
            alert(result.message);
            return;
        }

        navigate("/checkout");
    };

    const alreadyInCart = book
        ? isInCart(
            book._id,
            isRentMode ? "rent" : "buy"
        )
        : false;

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="bookDetailsMessage">
                    Loading book...
                </div>
            </>
        );
    }

    if (error || !book) {
        return (
            <>
                <Navbar />
                <div className="bookDetailsMessage">
                    Book not found.
                </div>
            </>
        );
    }

    const alreadyInWishlist = book
    ? isInWishlist(book._id)
    : false;

    const handleWishlist = async () => {
        const result = alreadyInWishlist
            ? await removeFromWishlist(book._id)
            : await addToWishlist(book._id);

        if (!result.success) {
            alert(result.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bookDetailsPage">
                <div className="bookDetailsContainer">
                    <div className="bookDetailsImageSection">
                        <img
                            src={book.coverImage || book.images?.[0]}
                            alt={book.title}
                            className="bookDetailsImage"
                        />
                    </div>

                    <div className="bookDetailsInfo">
                        <h1>{book.title}</h1>

                        <p className="bookDetailsAuthor">
                            by {book.author}
                        </p>

                        <div className="bookDetailsPrice">
                            ₹{isRentMode ? book.rentPrice : book.sellPrice}
                            {isRentMode && book.rentDuration && (
                                <span>
                                    {" "}/ {book.rentDuration} days
                                </span>
                            )}
                        </div>

                        <div className="bookDetailsFields">
                            <div>
                                <span>Category</span>
                                <strong>{book.category}</strong>
                            </div>

                            <div>
                                <span>Condition</span>
                                <strong>{book.condition}</strong>
                            </div>

                            {book.edition && (
                                <div>
                                    <span>Edition</span>
                                    <strong>{book.edition}</strong>
                                </div>
                            )}

                            {book.course && (
                                <div>
                                    <span>Course</span>
                                    <strong>{book.course}</strong>
                                </div>
                            )}

                            {book.semester && (
                                <div>
                                    <span>Semester</span>
                                    <strong>{book.semester}</strong>
                                </div>
                            )}
                        </div>

                        <div className="bookDescription">
                            <h2>Description</h2>
                            <p>{book.description}</p>
                        </div>

                        <div className="bookActions">
                            <button
                                className={`wishlistButton ${alreadyInWishlist ? "addedToWishlist" : ""}`}
                                onClick={handleWishlist}
                            >
                                {alreadyInWishlist ? "♥ Wishlisted" : "♡ Wishlist"}
                            </button>

                            {isRentMode ? (
                                <button
                                    className={`cartButton ${
                                        alreadyInCart ? "addedToCart" : ""
                                    }`}
                                    onClick={handleAddToCart}
                                    disabled={alreadyInCart}
                                >
                                    {alreadyInCart
                                        ? "✓ Added to Cart"
                                        : "🛒 Add to Cart"}
                                </button>
                            ) : (
                                <>
                                    <button
                                        className={`cartButton ${alreadyInCart ? "addedToCart" : ""}`}
                                        onClick={handleAddToCart}
                                        disabled={alreadyInCart}
                                    >
                                        {alreadyInCart
                                            ? "✓ Added to Cart"
                                            : "🛒 Add to Cart"}
                                    </button>

                                    <button
                                        className="buyButton"
                                        onClick={handleBuyNow}
                                    >
                                        Buy Now
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {!isRentMode && book.listingType === "both" && (
                    <div className="rentSection">
                        <div>
                            <h2>Also Available for Rent</h2>
                            <p>Rent this book instead of buying it.</p>

                            <strong>
                                ₹{book.rentPrice}
                            </strong>

                            {book.rentDuration && (
                                <span>
                                    {" "}/ {book.rentDuration} days
                                </span>
                            )}
                        </div>

                        <button
                            className="rentButton"
                            onClick={() => {
                                window.location.href =
                                    `/book/${book._id}?mode=rent`;
                            }}
                        >
                            Rent Book
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default BookDetailsPage;