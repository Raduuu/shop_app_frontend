import React, { useState, useEffect } from 'react'
import FilterBar from './FilterBar'
import Product from './Product'
import { get } from '../../utils/utils'
import PropTypes from 'prop-types'

const ProductsList = ({
    products,
    updateProducts,
    isAdmin,
    setCartProducts,
    handleSelect,
    handleSearch,
    handlePriceSelect,
}) => {
    const [categories, setCategories] = useState(null)
    useEffect(() => {
        get('api/category', (res) => {
            res && setCategories(res.data.data)
        })
    }, [])

    return (
        <>
            <FilterBar
                handleSelect={handleSelect}
                handlePriceSelect={handlePriceSelect}
                handleSearch={handleSearch}
                categories={categories}
            />
            {products &&
                products.map((product) => (
                    <Product
                        updateProducts={updateProducts}
                        key={product._id}
                        product={product}
                        isAdmin={isAdmin}
                        setCartProducts={setCartProducts}
                    />
                ))}
        </>
    )
}

ProductsList.propTypes = {
    products: PropTypes.array,
    updateProducts: PropTypes.func,
    editProduct: PropTypes.func,
    isAdmin: PropTypes.bool,
    setCartProducts: PropTypes.func,
    handleSelect: PropTypes.func,
    handleSearch: PropTypes.func,
    handlePriceSelect: PropTypes.func,
}

ProductsList.defaultProps = {
    products: [],
    updateProducts: () => {},
    editProduct: () => {},
    isAdmin: false,
    setCartProducts: () => {},
    handleSelect: () => {},
    handleSearch: () => {},
    handlePriceSelect: () => {},
}

export default ProductsList
