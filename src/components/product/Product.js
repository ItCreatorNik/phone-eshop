import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFetchCollection } from '../../customHooks/useFetchCollection';
import { selectProducts, STORE_PRODUCTS } from '../../store/slice/productSlice';
import { Loader } from '../loader/Loader';
import { ProductList } from './productList/ProductList';

export const Product = () => {

    const { data, isLoading } = useFetchCollection("products");


    const dispatch = useDispatch();

    const products = useSelector(selectProducts);




    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: data,
            })
        );
    }, [dispatch, data])


    return (
        <section>
            <div className={"container"}>
                {isLoading ? (
                    <Loader/>
                ) : (
                    <ProductList products={products} />
                )}
            </div>
        </section>
    )
}
