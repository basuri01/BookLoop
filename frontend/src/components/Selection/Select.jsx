import React from 'react'
import { Link } from 'react-router-dom';

function Select({image, heading, link}) {
    return (
        <>
            <Link to={link} className='selectLink'>
                <div className="choose" style={{ backgroundImage: `url(${image})` }}>
                    <div className='heading'>{heading}</div>
                </div>
            </Link>
            
        </>
    );
}

export default Select

