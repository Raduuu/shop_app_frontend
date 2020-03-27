import React from 'react'
import Product from './Product'

const ProductsList = ({ products, updateProducts }) => {
    return products.map(product => <Product updateProducts={updateProducts} key={product._id} product={product} />)
}

export default ProductsList
