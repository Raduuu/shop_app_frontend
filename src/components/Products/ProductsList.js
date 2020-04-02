import React from 'react'
import Product from './Product'

const ProductsList = ({ products, updateProducts, isAdmin }) => {
    return products.map(product => (
        <Product updateProducts={updateProducts} key={product._id} product={product} isAdmin={isAdmin} />
    ))
}

export default ProductsList
