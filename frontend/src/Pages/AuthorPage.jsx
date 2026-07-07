import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import books from '../components/books';
import ShowAuthorPage from './ShowAuthorPage';

function AuthorPage() {
    const {authorName}= useParams();
    const filteredBooks= books.filter(
        (book) => book.author=== authorName
    );

    return (
        <>
            <Navbar/>
            <h1>{authorName} Books</h1>
             {
                filteredBooks.map((book) => (
                    <ShowAuthorPage
                        key={book.id}
                        BookImage={book.image}
                        BookName={book.title}
                        AuthorName={book.author}
                        Price={book.price}
                    />
                ))
            }
        </>
    )
}

export default AuthorPage
