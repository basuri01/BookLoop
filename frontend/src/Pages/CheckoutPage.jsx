import Navbar from "../components/Navbar/Navbar.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../CheckoutPage.css";
import api from "../api/axios.js";

function CheckoutPage() {
    const { cart, loading, fetchCart} = useCart();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        try {
            const response = await api.post("/orders");

            // Refresh cart after successful order
            await fetchCart();

            alert("Order placed successfully!");

            navigate(`/order/${response.data.data._id}`);
        } catch (error) {
            console.log(
                "Error placing order:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Could not place order"
            );
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="checkoutMessage">Loading checkout...</div>
            </>
        );
    }

    if (authLoading) {
        return (
            <>
                <Navbar />
                <div className="checkoutMessage">
                    Checking login...
                </div>
            </>
        );
    }

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="checkoutMessage">
                    <h2>Please login to continue</h2>

                    <button onClick={() => navigate("/login")}>
                        Login
                    </button>
                </div>
            </>
        );
    }

    const items = cart?.items || [];

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <div className="checkoutMessage">
                    <h2>Your cart is empty</h2>
                    <button onClick={() => navigate("/buy")}>
                        Continue Shopping
                    </button>
                </div>
            </>
        );
    }

    const total = items.reduce((sum, item) => {
        const book = item.book;
        const price = item.type === "rent"
            ? book?.rentPrice || 0
            : book?.sellPrice || 0;
        return sum + price;
    }, 0);

    return (
        <>
            <Navbar />
            <div className="checkoutPage">
                <h1>Checkout</h1>
                <div className="checkoutContent">
                    <div className="checkoutItems">
                        <h2>Your Items</h2>
                        {items.map((item) => {
                            const book = item.book;
                            if (!book) return null;
                            const price = item.type === "rent"
                                ? book.rentPrice
                                : book.sellPrice;

                            return (
                                <div className="checkoutItem" key={`${book._id}-${item.type}`}>
                                    <img
                                        src={book.coverImage || book.images?.[0]}
                                        alt={book.title}
                                        className="checkoutItemImage"
                                    />
                                    <div className="checkoutItemInfo">
                                        <h3>{book.title}</h3>
                                        <p>by {book.author}</p>
                                        <span className={`checkoutType ${item.type === "rent" ? "rentType" : "buyType"}`}>
                                            {item.type === "rent" ? "Rent" : "Buy"}
                                        </span>
                                    </div>
                                    <strong className="checkoutItemPrice">
                                        ₹{price}
                                    </strong>
                                </div>
                            );
                        })}
                    </div>
                    <div className="checkoutSummary">
                        <h2>Order Summary</h2>
                        <div className="summaryRow">
                            <span>Items</span>
                            <span>{items.length}</span>
                        </div>
                        <div className="summaryRow">
                            <span>Total</span>
                            <strong>₹{total}</strong>
                        </div>
                        <button className="placeOrderButton" onClick={handlePlaceOrder}>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;