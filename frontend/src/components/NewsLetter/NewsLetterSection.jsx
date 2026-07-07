import React from 'react'

function NewsLetterSection() {
    return (
        <>
            <div className='newsLetterSection'>
                <div className='newsHeading'>Get notified when your favorite books become available. </div>
                <div className='mailholder'>
                    <input  placeholder='Enter your Email..' className='mailenter'/>
                    <button>Submit</button>
                </div>
                <div className='suscribeButton'>
                    <button>Subscribe</button>
                </div>
            </div>
        </>
    )
}

export default NewsLetterSection
