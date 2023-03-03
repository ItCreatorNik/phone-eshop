import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, selectCartItems } from '../../store/slice/cartSlice';
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import styles from './Cart.module.scss';

export const Cart = () => {

  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems);


  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div className={styles.cart__link}>
              <Link to="/">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, brand, price, imageUrl, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{brand}</b>
                        </p>
                        <img
                          src={imageUrl}
                          alt={brand}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price} $</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className={`${styles.btn} ${styles.btn_delete}`}
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className={`${styles.btn} ${styles.btn_add}`}
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className={`${styles.btn} ${styles.btn_delete}`} onClick={clearCart}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </section>
  )
}
