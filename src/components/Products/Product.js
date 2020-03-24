import React from 'react'

const Product = ({ name, description, quantity }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{quantity} in stock</p>
        </div>
    )
}

export default Product
