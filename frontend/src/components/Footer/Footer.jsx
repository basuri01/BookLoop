import React from 'react'
import logo from "../../assets/images/logo2.png"

function Footer() {
    return (
        <>
            <div className='footerSection' id='footer'>
                <div className='footerlogo' style={{backgroundImage: `url(${logo})`}}></div>
                <div className='contact'>
                    <div className='aboutusHeading'>About Us:</div>
                    <div className='aboutus'>
                        <p><b>Read More. Spend Less. Waste Less.</b></p>
                        <p>BookLoop is your one-stop destination to buy, sell, and rent books. We help readers save money, reduce waste, and discover their next favorite book through a simple and trusted platform.</p>
                    </div>
                    <div className='aboutusHeading'>Having Issues? Contact Us..</div>
                    <span><a href="https://wa.me/917818849604"><i class="fa-brands fa-whatsapp"></i></a></span>
                    <span><a href="mailto:gargvanshika01@gmail.com"><i class="fa-brands fa-google"></i></a></span>
                    <span><a href="https://www.instagram.com/gargvanshika01/"><i class="fa-brands fa-instagram"></i></a></span>
                </div>
            </div>
        </>
    )
}

export default Footer
