import Navbar from "../components/Navbar/Navbar.jsx";
import BookForm from "../components/BookForm/BookForm.jsx";

function SellBook() {
    return (
        <>
            <Navbar />
            <BookForm mode="sell" />
        </>
    );
}

export default SellBook;