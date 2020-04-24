import React from 'react'
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
        } = this.props

        return (
            <>
                <select onChange={(ev) => handleSelect(ev.target.value)}>
                    <option>all</option>
                    {this.state.categories &&
                        this.state.categories.map((category, index) => <option key={index}>{category.name}</option>)}
                </select>
                <input
                    placeholder="Search..."
                    type="text"
                    name="search"
                    onChange={(ev) => handleSearch(ev.target.value)}
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
