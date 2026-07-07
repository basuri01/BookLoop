import React from 'react'

function ShowCategoryPage({BookImage, BookName, AuthorName, Price}) {
    return (
        <>
            <section className='Category'>
                <div className='showCategoryBook'>
                    <div className='scbookImage' style={{backgroundImage: `url(${BookImage})`}}></div>
                    <div className='scbookDetails'>
                        <div className='detail1'>{BookName}</div>
                        <div className='detail1'>{AuthorName}</div>
                        <div className='detail1'>{Price}</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShowCategoryPage
