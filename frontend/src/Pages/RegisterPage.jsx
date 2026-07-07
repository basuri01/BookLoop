import React, {useState} from "react";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Register(){
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                "/users/register",
                formData
            );
            console.log(response.data);
            alert("Registration Successful!");
        } catch (error) {
            console.log(error);
            alert("Registration Failed!");
        }
    };

    return(
        <>
        <Navbar/>
            <div className="register">
                <form className="registeruser" onSubmit={handleSubmit}>
                    <h2>Register User</h2>
                    <h4>Enter your full name</h4>
                    <input
                        type="text"
                        name="fullname"
                        className="mailenter"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                    <h4>Enter your username</h4>
                    <input
                        type="text"
                        name="username"
                        className="mailenter"
                        value={formData.username}
                        onChange={handleChange}
                    />
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
                    <br/>
                    <button type="submit">Register</button>
                    <p>Already have an account?</p>
                    <Link to="/login">Login</Link>
        
                </form>
            </div>
        </>
    )
}

export default Register