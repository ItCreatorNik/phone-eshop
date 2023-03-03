import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        SAVE_URL(state, action) {
            state.previousURL = action.payload;
        },
        ADD_TO_CART(state, action) {
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (productIndex >= 0) {
                state.cartItems[productIndex].cartQuantity += 1;
                toast.info(`${action.payload.brand} increased by one`, {
                    position: "top-left",
                });
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.brand} added to cart`, {
                    position: "top-left",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        DECREASE_CART(state, action) {
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1;
                toast.info(`${action.payload.brand} decreased by one`, {
                    position: "top-left",
                });
            } else if (state.cartItems[productIndex].cartQuantity === 1) {
                const newCartItem = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );
                state.cartItems = newCartItem;
                toast.success(`${action.payload.brand} removed from cart`, {
                    position: "top-left",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        REMOVE_FROM_CART(state, action) {
            const newCartItem = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            );

            state.cartItems = newCartItem;
            toast.success(`${action.payload.brand} removed from cart`, {
                position: "top-left",
            });

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        CALCULATE_TOTAL_QUANTITY(state, action) {
            const array = [];
            state.cartItems.map((item) => {
                const { cartQuantity } = item;
                const quantity = cartQuantity;
                return array.push(quantity);
            });
            const totalQuantity = array.reduce((a, b) => {
                return a + b;
            }, 0);
            state.cartTotalQuantity = totalQuantity;
        },

        CLEAR_CART(state, action) {
            state.cartItems = [];
            toast.info(`Cart cleared`, {
                position: "top-left",
            });

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    }

});

export const { SAVE_URL, ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART } = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;

export default cartSlice.reducer