import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "./AuthContext.jsx";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const fetchWishlist = async () => {
        try {
            const response = await api.get("/wishlist");
            setWishlist(response.data.data);
        } catch (error) {
            console.log("Error fetching wishlist:", error);
            setWishlist(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // User is logged out
        if (!user) {
            setWishlist(null);
            setLoading(false);
            return;
        }

        // User is logged in
        setLoading(true);
        fetchWishlist();
    }, [user]);

    const addToWishlist = async (bookId) => {

        if (!user) {
            return {
                success: false,
                message: "Please login to add books to wishlist"
            };
        }

        try {
            const response = await api.post("/wishlist", {
                bookId
            });

            setWishlist(response.data.data);

            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            console.log("Error adding to wishlist:", error);

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Could not add book to wishlist"
            };
        }
    };

    const removeFromWishlist = async (bookId) => {

        if (!user) {
            return {
                success: false,
                message: "Please login first"
            };
        }

        try {
            const response = await api.delete(
                `/wishlist/${bookId}`
            );

            setWishlist(response.data.data);

            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            console.log("Error removing from wishlist:", error);

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Could not remove book from wishlist"
            };
        }
    };

    const isInWishlist = (bookId) => {

        if (!user || !wishlist?.books) {
            return false;
        }

        return wishlist.books.some(
            (book) => book._id === bookId
        );
    };

    const wishlistCount = user
        ? wishlist?.books?.length || 0
        : 0;

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                loading,
                wishlistCount,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                fetchWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}