import "./RentBookCard.css";

function RentBookCard({ book, onClick }) {

    return (
        <div
            className="rentBookCard"
            onClick={() => onClick(book)}
        >
            <div className="rentBookImageContainer">
                <img
                    src={book.coverImage || book.images?.[0]}
                    alt={book.title}
                    className="rentBookImage"
                />
            </div>

            <div className="rentBookInfo">
                <h3>
                    {book.title}
                </h3>
                <p>
                    ₹{book.rentPrice}
                </p>
            </div>
        </div>
    );
}

export default RentBookCard;