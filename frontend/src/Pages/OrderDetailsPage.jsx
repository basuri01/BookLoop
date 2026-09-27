import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import api from "../api/axios.js";
import "../OrderDetailsPage.css";

function OrderDetailsPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await api.get(`/orders/${orderId}`);
                setOrder(response.data.data);
            } catch (error) {
                console.log("Error fetching order:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getOrder();
    }, [orderId]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="orderMessage">Loading order...</div>
            </>
        );
    }

    if (error || !order) {
        return (
            <>
                <Navbar />
                <div className="orderMessage">
                    <h2>Order not found</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="orderDetailsPage">
                <div className="orderSuccess">
                    <div className="successIcon">✓</div>
                    <h1>Order Placed Successfully!</h1>
                    <p>Thank you for choosing BookLoop.</p>
                </div>

                <div className="orderInfo">
                    <div>
                        <span>Order ID</span>
                        <strong>{order._id}</strong>
                    </div>

                    <div>
                        <span>Order Date</span>
                        <strong>
                            {new Date(order.createdAt).toLocaleDateString()}
                        </strong>
                    </div>

                    <div>
                        <span>Status</span>
                        <strong>{order.status}</strong>
                    </div>
                </div>

                <div className="orderedItems">
                    <h2>Order Items</h2>

                    {order.items.map((item) => (
                        <div className="orderedItem" key={`${item.book}-${item.type}`}>
                            <img
                                src={item.coverImage}
                                alt={item.title}
                            />

                            <div className="orderedItemInfo">
                                <h3>{item.title}</h3>

                                <span>
                                    {item.type === "rent" ? "Rent" : "Buy"}
                                </span>

                                {item.type === "rent" && item.rentDuration && (
                                    <p>
                                        Duration: {item.rentDuration} days
                                    </p>
                                )}
                            </div>

                            <strong>₹{item.price}</strong>
                        </div>
                    ))}
                </div>

                <div className="orderTotal">
                    <span>Total Amount</span>
                    <strong>₹{order.totalAmount}</strong>
                </div>

                <button
                    className="continueShoppingButton"
                    onClick={() => navigate("/buy")}
                >
                    Continue Shopping
                </button>
            </div>
        </>
    );
}

export default OrderDetailsPage;