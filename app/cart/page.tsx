"use client"
import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@/contexts/AuthContext";
import { getOrder, updateOrderStatus } from '@/utils/cloudkit-utils';
import { Order } from '@/types/cloudkit';

const CartPage: React.FC = () => {
    const { user } = useAuthContext();
    const [cart, setCart] = useState<Order | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                try {
                    const userCart = await getOrder(user.uid, 'InCart');
                    setCart(userCart);
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            }
        };

        fetchCart();
    }, [user]);

    const handleCheckout = async () => {
        if (cart) {
            try {
                await updateOrderStatus(cart.recordName, 'Pending');
                alert('Order placed successfully!');
                setCart(null);
            } catch (error) {
                console.error('Error placing order:', error);
                alert('Failed to place order. Please try again.');
            }
        }
    };

    if (!user) {
        return <div>Please sign in to view your cart.</div>;
    }

    if (!cart) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <div className="space-y-4">
                <div className="flex justify-between font-bold">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                </div>
                <div>
                    <h2>{cart.fields.name}</h2>
                    <p>Quantity: {cart.fields.quantity}</p>
                    <p>Price: ${cart.fields.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="mt-8">
                <p className="text-xl font-bold">Total: ${cart.fields.price.toFixed(2)}</p>
                <button
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;