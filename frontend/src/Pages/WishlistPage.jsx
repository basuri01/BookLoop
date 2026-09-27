import Navbar from "../components/Navbar/Navbar.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useNavigate } from "react-router-dom";
import "../WishlistPage.css";

function WishlistPage() {
    const { wishlist, loading, removeFromWishlist } = useWishlist();
    const navigate = useNavigate();

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="wishlistMessage">
                    Loading wishlist...
                </div>
            </>
        );
    }

    const books = wishlist?.books || [];

    const handleRemove = async (bookId) => {
        const result = await removeFromWishlist(bookId);

        if (!result.success) {
            alert(result.message);
        }
    };

    return (
        <>
            <Navbar />

            <div className="wishlistPage">
                <div className="wishlistHeader">
                    <h1>Your Wishlist</h1>
                    <p>
                        {books.length}{" "}
                        {books.length === 1 ? "book" : "books"}
                    </p>
                </div>

                {books.length === 0 ? (
                    <div className="emptyWishlist">
                        <div className="emptyWishlistIcon">♡</div>
                        <h2>Your wishlist is empty</h2>
                        <p>
                            Books you save will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="wishlistGrid">
                        {books.map((book) => (
                            <div
                                className="wishlistCard"
                                key={book._id}
                            >
                                <div
                                    className="wishlistImageContainer"
                                    onClick={() =>
                                        navigate(`/book/${book._id}`)
                                    }
                                >
                                    <img
                                        src={
                                            book.coverImage ||
                                            book.images?.[0]
                                        }
                                        alt={book.title}
                                    />
                                </div>

                                <div className="wishlistInfo">
                                    <h3>{book.title}</h3>
                                    <p>by {book.author}</p>

                                    {book.listingType !== "rent" && (
                                        <strong>
                                            ₹{book.sellPrice}
                                        </strong>
                                    )}
                                </div>

                                <button
                                    className="removeWishlistButton"
                                    onClick={() =>
                                        handleRemove(book._id)
                                    }
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default WishlistPage;