import React from 'react'
import '../App.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import HeroSection from '../components/HeroSection/HeroSection.jsx'
import SelectSection from '../components/Selection/SelectSection.jsx'
import BestSellerSection from '../components/BestSellers/BestSellerSection.jsx'
import Return from '../components/ReturnSection/Return.jsx'
import ExamBooksSection from '../components/CompetitiveBooks/ExamBooksSection.jsx'
import WhyBookLoop from '../components/WhyBookloop/WhyBookLoop.jsx'
import NewsLetterSection from '../components/NewsLetter/NewsLetterSection.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
    const location= useLocation();
    useEffect(() => {
        if(location.state?.scrollToFooter){
            const footer =
                document.getElementById("footer");
            footer?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [location]);

    return (
        <>
            <Navbar/>
            <HeroSection/>
            <SelectSection/> 
            <Return/>
            <BestSellerSection/>
            <ExamBooksSection/>
            <WhyBookLoop/>
            <NewsLetterSection/>
            <Footer/>
        </>
    )
}

export default Home
