import React, { useState } from "react";
import api from "../../api/axios.js";

function NewsLetterSection() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setMessage("Please enter your email.");
            return;
        }

        try {
            const response = await api.post("/newsletter/subscribe", {
                email
            });

            setMessage(response.data.message);
            setEmail("");
        } catch (error) {
            console.log("Subscription error:", error);

            setMessage(
                error.response?.data?.message ||
                "Could not subscribe. Please try again."
            );
        }
    };

    return (
        <div className="newsLetterSection">
            <div className="newsHeading">
                Get notified when your favorite books become available.
            </div>

            <form
                className="mailholder"
                onSubmit={handleSubscribe}
            >
                <input
                    type="email"
                    placeholder="Enter your Email.."
                    className="mailenter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">
                    Subscribe
                </button>
            </form>

            {message && (
                <p className="subscribeMessage">
                    {message}
                </p>
            )}
        </div>
    );
}

export default NewsLetterSection;