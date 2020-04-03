import React from 'react'
import Product from './Product'

const ProductsList = ({ products, updateProducts, editProduct, isAdmin }) => {
    return products.map(product => (
        <Product
            updateProducts={updateProducts}
            editProduct={editProduct}
            key={product._id}
            product={product}
            isAdmin={isAdmin}
        />
    ))
}

export default ProductsList
