import React from 'react'

function ExamBooks({BookImage, BookName, AuthorName, Price}) {
    return (
        <>
            <div className='book'> 
                <div className='bsBookImage' style={{backgroundImage: `url(${BookImage})`}}></div>
                <div className='bookdetails'>
                    <div className='detail1'>{BookName}</div>
                    <div className='detail1'>{AuthorName}</div>
                    <div className='detail1'>{Price}</div>
                </div>
            </div>
        </>
    )
}

export default ExamBooks
