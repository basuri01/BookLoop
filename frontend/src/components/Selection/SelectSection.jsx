import React from 'react'
import book1 from "../../assets/images/books1.jpg"
import book2 from "../../assets/images/book2.jpg"
import book3 from "../../assets/images/book3.jpg"
import Select from './Select'

function SelectSection() {
    return (
        <>
            <div className='selection'>
                <Select heading="BUY" image={book1} link="/buy"/>
                <Select heading="SELL" image={book2} link="/sell"/>
                <Select heading="RENT" image={book3} link="/rent"/>
            </div>
        </>
    )
}

export default SelectSection
