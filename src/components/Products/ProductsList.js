import React from 'react'
import FilterBar from './FilterBar'
import Product from './Product'
import { get } from '../../utils/utils'
import PropTypes from 'prop-types'

export default class ProductsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: null,
        }
    }

    componentDidMount() {
        get('api/category', (res) => {
            res && this.setState({ categories: res.data.data })
        })
    }

    render() {
        const {
            products,
            updateProducts,
            editProduct,
            isAdmin,
            setCartProducts,
            handleSelect,
            handleSearch,
            handlePriceSelect,
        } = this.props

        return (
            <>
                <FilterBar
                    handleSelect={handleSelect}
                    handlePriceSelect={handlePriceSelect}
                    handleSearch={handleSearch}
                    categories={this.state.categories}
                />
                {products.map((product) => (
                    <Product
                        updateProducts={updateProducts}
                        editProduct={editProduct}
                        key={product._id}
                        product={product}
                        isAdmin={isAdmin}
                        setCartProducts={setCartProducts}
                    />
                ))}
            </>
        )
    }
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
