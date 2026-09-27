import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const fetchCart = async () => {
        try {
            const response = await api.get("/cart");
            setCart(response.data.data);
        } catch (error) {
            console.log("Error fetching cart:", error);
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            // User logged out → clear cart immediately
            setCart(null);
            setLoading(false);
            return;
        }

        // User logged in → fetch their cart
        setLoading(true);
        fetchCart();
    }, [user]);

    const addToCart = async (bookId, type) => {

        if (!user) {
            return {
                success: false,
                message: "Please login to add books to your cart"
            };
        }

        try {
            const response = await api.post("/cart", {
                bookId,
                type
            });

            setCart(response.data.data);

            return {
                success: true,
                message: response.data.message
            };

        } catch (error) {
            console.log("Error adding to cart:", error);

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Could not add book to cart"
            };
        }
    };

    const removeFromCart = async (bookId, type) => {

        if (!user) {
            return {
                success: false,
                message: "Please login first"
            };
        }

        try {
            const response = await api.delete(`/cart/${bookId}`, {
                params: {
                    type
                }
            });

            setCart(response.data.data);

            return {
                success: true,
                message: response.data.message
            };

        } catch (error) {
            console.log(
                "Remove cart error:",
                error.response?.data || error
            );

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Could not remove book from cart"
            };
        }
    };

    const isInCart = (bookId, type) => {

        if (!user || !cart?.items) {
            return false;
        }

        return cart.items.some(
            (item) =>
                item.book?._id === bookId &&
                item.type === type
        );
    };

    const cartCount = user
        ? cart?.items?.length || 0
        : 0;

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                cartCount,
                addToCart,
                removeFromCart,
                isInCart,
                fetchCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}