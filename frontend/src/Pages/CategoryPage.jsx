import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import books from '../components/books';
import ShowCategoryPage from './showCategoryPage';

function CategoryPage() {
    const {categoryName}= useParams();
    const filteredBooks= books.filter(
        (book) => book.category=== categoryName
    );

    return (
        <>
            <Navbar/>
            <h1>{categoryName} Category</h1>
             {
                filteredBooks.map((book) => (
                    <ShowCategoryPage
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

export default CategoryPage
