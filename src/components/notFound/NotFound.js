import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className="container">
          <h2>Shopping Cart</h2>

                  <p>Page not Found</p>
                  <br />
                  <div className={styles.link}>
                      <Link to="/">&larr; Back Home</Link>
                  </div>
    </div>
  )
}
