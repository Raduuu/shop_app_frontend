import React from 'react'
import Product from './Product'

const ProductsList = ({ products }) => {
    return products.map(product => <Product {...product} />)
}

export default ProductsList
