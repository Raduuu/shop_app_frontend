import React, { useEffect, useState } from 'react'
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
        const { products, updateProducts, editProduct, isAdmin, setCartProducts, handleSelect } = this.props

        return (
            <>
                <select onChange={(ev) => handleSelect(ev.target.value)}>
                    <option>all</option>
                    {this.state.categories &&
                        this.state.categories.map((category, index) => <option key={index}>{category.name}</option>)}
                </select>
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
