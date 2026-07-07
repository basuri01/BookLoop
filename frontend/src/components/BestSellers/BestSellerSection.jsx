import React from 'react'
import BestSeller from './BestSeller'
import books from '../books'

const bestSellerBooks= books.filter(
    (book) => book.isBestSeller
); 

function BestSellerSection() {
    return (
        <>
            <div className='bestSellerSection'>
                <div className='bestSellersHeading'> Best sellers :</div>
                <div className='bestSellersMain'>
                    {
                        bestSellerBooks.map((book) =>(
                            <BestSeller
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

export default BestSellerSection
