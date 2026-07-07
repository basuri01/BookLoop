import React from 'react'
import { useState, useEffect } from "react";
import heroImage1 from "../../assets/images/heroImage.jpg"
import heroImage2 from "../../assets/images/heroImage2.jpg"
import heroImage3 from "../../assets/images/heroImage3.jpg"

function HeroSection() {
    const slides = [
    {
        image: heroImage1,
        title: "BUY. SELL. RENT.",
        repeat: "REPEAT",
        punchline: "Meet Your Next Favourite Book",
        discount: "40-60%"
    },

    {
        image: heroImage2,
        title: "READ MORE",
        repeat: "SAVE MORE",
        punchline: "Thousands Of Books Waiting",
        discount: "50%"
    },

    {
        image: heroImage3,
        title: "WHY BUY NEW?",
        repeat: "GO PRELOVED",
        punchline: "Affordable Books For Everyone",
        discount: "70%"
    }
    ];
    const[currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(
                (prev) => (prev + 1) % slides.length
            );
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide(
            (prev) => (prev + 1) % slides.length
        );
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + slides.length) % slides.length
        );
    };

    return (
        <>
            <div className='heroImage' style={{backgroundImage: `url(${slides[currentSlide].image})`}}>
                <button className="leftArrow" onClick={prevSlide}>
                    ❮
                </button>
                <div className='heroSection'>
                    <div className='bsr'>{slides[currentSlide].title}</div>
                    <div className='repeat'> {slides[currentSlide].repeat}</div>
                    <div className='punchline'> {slides[currentSlide].punchline}</div>
                    <div className='discount1'> at</div>
                    <div className='discount2'> {slides[currentSlide].discount}</div>
                    <div className='discount3'> off:)</div>
                </div>
                <button className="rightArrow" onClick={nextSlide}>
                    ❯
                </button>   
            </div>
        </>
    )
}

export default HeroSection
