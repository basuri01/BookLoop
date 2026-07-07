import React from "react";
import '../App.css'
import Navbar from '../components/Navbar/Navbar';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function User(){

    const { user } = useAuth();
    const navigate = useNavigate();
    const { setUser } = useAuth();


    const handleLogout = async () => {
    try {
        await api.post("/users/logout");
        setUser(null);
        navigate("/");
    } catch (error) {
        console.log(error);
        alert("Logout Failed");
    }
};
    return(
        <>
            <Navbar/>

            {user ? (
                <>
                    <h1>Welcome Back, {user.fullname.split(" ")[0]}</h1>
                    <h2>Profile Dashboard</h2>
                    <p>Profile</p>
                    <p>Orders</p>
                    <p>Rented Books</p>
                    <p>Selling Books</p>
                    <p>Wishlist</p>
                    <button onClick={handleLogout}>Logout</button>
                    
                </>
            ) : (
                <>
                    <p>Continue your journey</p>
                    <Link to="/login">Login</Link>
                    <p>Don't have an account?</p>
                    <Link to="/register">[Create Account]</Link>
                </>
            )}
        </>
    )
}

export default User