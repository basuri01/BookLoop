import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import api from "../api/axios.js";
import "../RentalsPage.css";

function RentalsPage() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRentals = async () => {
        try {
            const response = await api.get("/orders");
            const orders = response.data.data || [];
            const rentalItems = [];

            orders.forEach((order) => {
                order.items.forEach((item) => {
                    if (item.type === "rent" && !item.returned) {
                        rentalItems.push({
                            ...item,
                            orderId: order._id
                        });
                    }
                });
            });

            setRentals(rentalItems);
        } catch (error) {
            console.log("Error fetching rentals:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentals();
    }, []);

    const handleReturn = async (orderId, bookId) => {
        try {
            const response = await api.patch(
                `/orders/${orderId}/return/${bookId}`
            );

            alert(response.data.message);

            setRentals((prevRentals) =>
                prevRentals.filter(
                    (rental) =>
                        !(
                            rental.orderId === orderId &&
                            rental.book === bookId
                        )
                )
            );
        } catch (error) {
            console.log("Error returning book:", error);

            alert(
                error.response?.data?.message ||
                "Could not return book"
            );
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="rentalsMessage">
                    Loading your rentals...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="rentalsPage">
                <div className="rentalsHeader">
                    <h1>My Rentals</h1>
                    <p>
                        {rentals.length}{" "}
                        {rentals.length === 1 ? "rental" : "rentals"}
                    </p>
                </div>

                {rentals.length === 0 ? (
                    <div className="emptyRentals">
                        <div className="emptyRentalsIcon">📚</div>
                        <h2>No active rentals</h2>
                        <p>
                            Books you rent will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="rentalsList">
                        {rentals.map((rental, index) => (
                            <div
                                className="rentalCard"
                                key={`${rental.orderId}-${rental.book}-${index}`}
                            >
                                <img
                                    src={rental.coverImage}
                                    alt={rental.title}
                                />

                                <div className="rentalInfo">
                                    <h2>{rental.title}</h2>
                                    <p>
                                        Rental duration:{" "}
                                        {rental.rentDuration} days
                                    </p>
                                    <p>
                                        Price: ₹{rental.price}
                                    </p>
                                </div>

                                <button
                                    className="returnBookButton"
                                    onClick={() =>
                                        handleReturn(
                                            rental.orderId,
                                            rental.book
                                        )
                                    }
                                >
                                    Return Book
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default RentalsPage;