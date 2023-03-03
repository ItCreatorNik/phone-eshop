import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    activeFilter: "a-z",
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        STORE_PRODUCTS: (state, action) => {
            state.products = action.payload.products
        },
        FILTER_CHANGED: (state, action) => {
            state.activeFilter = action.payload;
        },
    }
});

export const { STORE_PRODUCTS, FILTER_CHANGED } = productSlice.actions

export const selectProducts = (state) => state.product.products


export default productSlice.reducer