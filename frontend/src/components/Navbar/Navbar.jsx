import React from 'react'
import { useState } from "react";
import logo from "../../assets/images/logo2.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import books from '../books';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
    const[showCategories, setShowCategories]= useState(false);
    const[showAuthors, setShowAuthors]= useState(false);
    const[searchTerm, setSearchTerm]= useState("");
    const navigate= useNavigate();
    const { user } = useAuth();
    console.log(user);
    const categories = [
        "Academic Books",
        "Competitive Exams",
        "Fiction",
        "Programming",
        "Business",
        "Novels",
        "Self Help",
        "Engineering",
        "Medical",
        "School Books"
    ];
    const authors= [...new Set(
        books.map(book => book.author)
    )];
    
    const goToFooter = () => {
        navigate("/", {
            state: {
                scrollToFooter: true
            }
        });
    }
    const handleSearch = () =>{
        if(searchTerm.trim()==="") return;
        navigate(
            `/search/${searchTerm}`
        )
    }

    return (
        <>
            <div className="navbar">
                <div className="nav-div1" style={{backgroundImage: `url(${logo})`}}></div>
                <div className="nav-div2">
                    <div className='menuItems'>
                        <Link to='/'> Home</Link>
                        <div onClick={() => setShowCategories(!showCategories)} className='categoryMenu'> 
                            Categories ▼ 
                            {showCategories &&(
                                <div className='dropdown'>
                                    {categories.map((category) => (
                                        <Link 
                                            key={category}
                                            to={`/category/${category}`}
                                            className='dropDownItem'
                                        > 
                                            {category} 
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div onClick={() => setShowAuthors(!showAuthors)} className='categoryMenu'> 
                            Authors ▼ 
                            {showAuthors &&(
                                <div className='dropdown'>
                                    {authors.map((author) => (
                                        <Link 
                                            key={author}
                                            to={`/author/${author}`}
                                            className='dropDownItem'
                                        > 
                                            {author} 
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="navLink" onClick={goToFooter}> About Us</p>
                        <p className="navLink" onClick={goToFooter}> Contact Us</p>
                    </div>
                    <div class="nav-search">
                        <select id="searchall">
                            <option>All</option>
                        </select>
                        <input 
                            placeholder="Search.."
                            class="searchplace" 
                            value={searchTerm} 
                            onChange={(e)=> setSearchTerm(e.target.value)}
                        />
                        <i class="fa-solid fa-magnifying-glass" id="searchicon" onClick={handleSearch}></i>
                    </div>
                </div>
                <div className="nav-div3">
                    <i className="fa-solid fa-cart-shopping" id="cart"></i>
                    
                    <i className="fa-regular fa-heart" id="wishlist"></i>
                    
                    <Link to="/user" className="userProfileLink">
                        {user? (
                            <>
                            <p>Hi,</p>
                            <p>{user.fullname.split(" ")[0]}</p>
                            </>
                        ) : (
                            <i className="fa-solid fa-user" id="user"></i>
                        )}
                    </Link>
                    
                </div>
            </div>
        </>
    )
}

export default Navbar
