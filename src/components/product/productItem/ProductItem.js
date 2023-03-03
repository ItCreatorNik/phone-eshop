import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectIsLoggedIn } from '../../../store/slice/authSlice';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../store/slice/cartSlice';
import styles from "./ProductItem.module.scss"

export const ProductItem = ({ brand, price, imageUrl, product }) => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);


    const addToCart = (product) => {
        if (isLoggedIn) {
            dispatch(ADD_TO_CART(product));
            dispatch(CALCULATE_TOTAL_QUANTITY());
        } else {
            toast.info("Account is not authorized", {
                position: toast.POSITION.TOP_LEFT,
            })
        }

    };


    return (
        <div className={styles.card}>
            <div className={styles.card__img}>
                <img src={imageUrl} alt="phone" />
            </div>
            <div className={styles.card__contend}>
                <div className={styles.card__brand}>{brand}</div>
                <div className={styles.card__price}>{price} $</div>
                <button className={styles.card__button} onClick={() => addToCart(product)}>Add Product</button>
            </div>
        </div>
    )
}
