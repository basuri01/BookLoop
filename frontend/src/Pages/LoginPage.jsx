import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){

    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
         try {
            const response = await api.post(
                "/users/login",
                formData
            );
            console.log(response.data);
            setUser(response.data.data.user);
            // alert("Login Successful!");
            navigate("/");
        } catch (error) {
            console.log(error);
            alert("Login Failed!");
        }
    }

    return(
        <>
            <Navbar/>
            <div class="login">
                <form class="loginuser" onSubmit={handleSubmit}>
                <h2>Login User</h2>
                <h4>Enter your email</h4>
                <input
                        type="email"
                        name="email"
                        className="mailenter"
                        value={formData.email}
                        onChange={handleChange}
                />
                <h4>Enter your password</h4>
                <input
                        type="password"
                        name="password"
                        className="mailenter"
                        value={formData.password}
                        onChange={handleChange}
                />
                <br/>
                <a href="#">Forgot Password?</a>
                <br/>
                <br/>
                <button type="submit">Login</button>
                <p>Don't have an account?</p>
                <Link to="/register">Register</Link>
        
                </form>
            </div>
            
        </>
    )
}

export default Login