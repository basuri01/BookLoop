import Navbar from "../components/Navbar/Navbar.jsx";
import { useCart } from "../context/CartContext.jsx";
import "../CartPage.css";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const {
        cart,
        loading,
        removeFromCart
    } = useCart();
    const navigate = useNavigate();

    const goToBookDetails = (bookId, type) => {
        navigate(
            `/book/${bookId}${type === "rent" ? "?mode=rent" : ""}`
        );
    };

    const handleRemove = async (bookId, type) => {
        const result = await removeFromCart(bookId, type);

        if (!result.success) {
            alert(result.message);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="cartMessage">
                    Loading cart...
                </div>
            </>
        );
    }

    const items = cart?.items || [];

    const total = items.reduce((sum, item) => {
        const price =
            item.type === "rent"
                ? item.book?.rentPrice || 0
                : item.book?.sellPrice || 0;

        return sum + price;
    }, 0);

    return (
        <>
            <Navbar />
            <div className="cartPage">
                <div className="cartHeader">
                    <h1>Your Cart</h1>
                    <p>
                        {items.length}{" "}
                        {items.length === 1 ? "item" : "items"}
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="emptyCart">
                        <div className="emptyCartIcon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>
                            Books you add to your cart will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="cartContent">
                        <div className="cartItems">
                            {items.map((item) => {
                                const book = item.book;

                                if (!book) {
                                    return null;
                                }

                                const price =
                                    item.type === "rent"
                                        ? book.rentPrice
                                        : book.sellPrice;

                                return (
                                    <div
                                        className="cartItem"
                                        key={`${book._id}-${item.type}`}
                                        onClick={() =>
                                            navigate(
                                                item.type === "rent"
                                                    ? `/book/${book._id}?mode=rent`
                                                    : `/book/${book._id}`
                                            )
                                        }
                                    >
                                        <img
                                            src={
                                                book.coverImage ||
                                                book.images?.[0]
                                            }
                                            alt={book.title}
                                            className="cartItemImage"
                                            onClick={() => goToBookDetails(book._id, item.type)}
                                        />

                                        <div className="cartItemInfo">
                                            <h2
                                                className="cartBookTitle"
                                                onClick={() => goToBookDetails(book._id, item.type)}
                                            >
                                                {book.title}
                                            </h2>
                                            <p>by {book.author}</p>
                                            <span
                                                className={`cartType ${
                                                    item.type === "rent"
                                                        ? "rentType"
                                                        : "buyType"
                                                }`}
                                            >
                                                {item.type === "rent"
                                                    ? "Rent"
                                                    : "Buy"}
                                            </span>
                                        </div>

                                        <div className="cartItemPrice">
                                            <strong>₹{price}</strong>
                                            {item.type === "rent" &&
                                                book.rentDuration && (
                                                    <small>
                                                        / {book.rentDuration} days
                                                    </small>
                                                )}
                                        </div>

                                        <button
                                            className="removeCartButton"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemove(book._id, item.type);
                                            }}
                                            title="Remove from cart"
                                        >
                                            ×
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="cartSummary">
                            <h2>Order Summary</h2>
                            <div className="summaryRow">
                                <span>Items</span>
                                <span>{items.length}</span>
                            </div>
                            <div className="summaryRow">
                                <span>Total</span>
                                <strong>₹{total}</strong>
                            </div>
                            <button className="checkoutButton" onClick={() => navigate("/checkout")}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartPage;