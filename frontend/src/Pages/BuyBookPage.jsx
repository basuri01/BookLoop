import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import BookCard from "../components/BookCard/BookCard.jsx";
import api from "../api/axios.js";
import "../BuyBook.css";
import { useNavigate } from "react-router-dom";

function BuyBook() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate= useNavigate();

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await api.get("/books/buy");
                console.log(response.data);
                setBooks(response.data.data);
            } catch (error) {
                console.log("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        getBooks();
    }, []);

    const handleBookClick = (book) => {
        navigate(`/book/${book._id}`);
    };


    return (
        <>
            <Navbar />
            <div className="buyPage">
                <div className="buyHeader">
                    <h1>Buy Books</h1>
                    <p>
                        Discover books from other readers.
                    </p>
                </div>

                {loading ? (
                    <p className="loadingText">
                        Loading books...
                    </p>
                ) : books.length === 0 ? (
                    <p className="emptyText">
                        No books are available for sale right now.
                    </p>

                ) : (

                    <div className="booksGrid">
                        {books.map((book) => (

                            <BookCard
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

export default BuyBook;