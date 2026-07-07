import React from 'react'
import returnImage from "../../assets/images/return.png"

function Return() {
    return (
        <>
            <div className='returnSection' style={{backgroundImage: `url(${returnImage})`}}>
                <a href='#' className='returnHeading'> Return Your Rental</a>
            </div>
        </>
    )
}

export default Return
