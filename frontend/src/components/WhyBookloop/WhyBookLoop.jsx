import React from 'react'
import banner from "../../assets/images/bookbanner3.jpg"

function WhyBookLoop() {
    return (
        <>
            <div className='whyBookLoop' style={{backgroundImage: `url(${banner})`}}>
                <div className='whyHeading'> Why Choose BookLoop? </div>
                <div className='reasonbox'>
                    <div className='emptydiv'></div>
                    <div className='whyReasons'>
                        <p>1. Sustainable Reading</p>
                        <p>2. Save upto 60%</p>
                        <p>3. Easy Rentals</p>
                        <p>4. Secure Transactions</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhyBookLoop
