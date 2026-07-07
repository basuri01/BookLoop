import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useParams } from "react-router-dom";
import books from '../components/books';

function SearchPage() {
    const { searchTerm }= useParams();
    const filteredBooks = books.filter(
        (book) =>
            book.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

            ||

            book.author
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

            ||

            book.category
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <Navbar/>
            <h1>Search Results</h1>
            {
                filteredBooks.map((book) => (
                    <div key={book.id}>
                        <div className='searchimage' style={{backgroundImage: `url(${book.image})`}}></div>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p>{book.price}</p>
                    </div>
                ))
            }
        </>
    )
}

export default SearchPage
