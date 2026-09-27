import React from "react";
import { useNavigate } from "react-router-dom";
import returnImage from "../../assets/images/return.png";

function Return() {
    const navigate = useNavigate();

    return (
        <div
            className="returnSection"
            style={{ backgroundImage: `url(${returnImage})` }}
            onClick={() => navigate("/rentals")}
        >
            <div className="returnHeading">
                Return Your Rental
            </div>
        </div>
    );
}

export default Return;