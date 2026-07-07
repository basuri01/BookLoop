import React from 'react'
import ExamBooks from './ExamBooks'
import books from '../books'

const examBooks= books.filter(
    (book) => book.isExamBook
); 

function ExamBooksSection() {
    return (
        <>
            <div className='bestSellerSection'>
                <div className='bestSellersHeading'> Competitive Exam Books :</div>
                <div className='bestSellersMain'>
                    {
                        examBooks.map((book) => (
                            <ExamBooks
                            key={book.id}
                            BookImage={book.image}
                            BookName={book.title}
                            AuthorName={book.author}
                            Price={book.price}
                            />
                        ))
                    }
                </div>
                
            </div>
        </>
    )
}

export default ExamBooksSection
