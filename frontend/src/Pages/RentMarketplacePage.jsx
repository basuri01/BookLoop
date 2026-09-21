import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import RentBookCard from "../components/RentBookCard/RentBookCard.jsx";
import api from "../api/axios.js";
import "../RentMarketplace.css";

function RentMarketplacePage() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getRentBooks = async () => {
            try {
                const response = await api.get("/books/rent");
                console.log("Rent books:", response.data);
                setBooks(response.data.data);
            } catch (error) {
                console.log(
                    "Error fetching rental books:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        getRentBooks();
    }, []);

    const handleBookClick = (book) => {
        navigate(`/book/${book._id}?mode=rent`);
    };

    return (
        <>
            <Navbar />

            <div className="rentMarketplace">
                {/* HEADER */}
                <div className="rentMarketplaceHeader">
                    <div>
                        <h1>
                            Rent Books
                        </h1>

                        <p>
                            Find books available for rent from other readers.
                        </p>
                    </div>

                    <button
                        className="rentYourBookButton"
                        onClick={() => navigate("/rent/form")}
                    >
                        + Rent Your Own Book
                    </button>
                </div>

                {/* BOOKS */}
                {loading ? (

                    <p className="rentLoading">
                        Loading books...
                    </p>

                ) : books.length === 0 ? (

                    <p className="rentEmpty">
                        No books are available for rent right now.
                    </p>

                ) : (

                    <div className="rentBooksGrid">
                        {books.map((book) => (
                            <RentBookCard
                                key={book._id}
                                book={book}
                                onClick={handleBookClick}
                            />
                        ))}
                    </div>
                )}

            </div>
        </>
    );
}

export default RentMarketplacePage;