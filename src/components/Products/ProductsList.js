import React from 'react'
import FilterBar from './FilterBar'
import Product from './Product'
import { get } from '../../utils/utils'

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
