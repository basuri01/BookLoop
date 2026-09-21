import "./BookCard.css";

function BookCard({ book, onClick }) {

    return (

        <div
            className="bookCard"
            onClick={() => onClick(book)}
        >
            <div className="bookImageContainer">
                <img
                    src={book.coverImage || book.images?.[0]}
                    alt={book.title}
                    className="bookImage"
                />
            </div>

            <div className="bookInfo">
                <h3 className="bookTitle">
                    {book.title}
                </h3>

                <p className="bookPrice">
                    ₹{book.sellPrice}
                </p>

            </div>
        </div>
    );
}

export default BookCard;