import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_CHANGED } from '../../../store/slice/productSlice';
import { ProductItem } from '../productItem/ProductItem';
import styles from "./ProductList.module.scss"

export const ProductList = ({products}) => {


    const activeFilterSelect = useSelector(state => state.product.activeFilter);

    const dispatch = useDispatch();

    
    const sortedProducts = createSelector(
        (state) => state.product.activeFilter,
        (state) => state.product.products,
        (filter, products) => {
            let tempProducts = [];

            if (filter === "a-z") {
                return tempProducts = products.slice().sort((a, b) => {
                    return a.brand.localeCompare(b.brand);
                });
            } else if (filter === "z-a") {
                return tempProducts = products.slice().sort((a, b) => {
                    return b.brand.localeCompare(a.brand);
                });
            } else if (filter === "low-high") {
                return tempProducts = products.slice().sort((a, b) => {
                    return a.price - b.price;
                })
            }
            else if (filter === "high-low") {
                return tempProducts = products.slice().sort((a, b) => {
                    return b.price - a.price;
                })
            }
            else if (filter === "rate") {
                return tempProducts = products.slice().sort((a, b) => {
                    return b.rate - a.rate;
            })
        }
        });

    const sortedProductsSelector = useSelector(sortedProducts)


  return (
    <>
      <h2 className={styles.product__title}>Product List</h2>
          <div className={styles.product__sort}>
              <label>Sort by:</label>
              <select value={activeFilterSelect} onChange={(e) => dispatch(FILTER_CHANGED(e.target.value))}>
                  <option value="a-z">A - Z</option>
                  <option value="z-a">Z - A</option>
                  <option value="low-high">Low-High</option>
                  <option value="high-low">High-Low</option>
                  <option value="rate">Rate</option>
              </select>
          </div>

          <div className={styles.product__wrapper}>
              {products.lenght === 0 ? (
                  <p>No product found.</p>
              ) : (
                  <>
                      {sortedProductsSelector.map((product) => {
                          return (
                              <div key={product.id}>
                                  <ProductItem {...product} product={product} />
                              </div>
                          );
                      })}
                  </>

              )}
          </div>
    </>
    
  )
}
