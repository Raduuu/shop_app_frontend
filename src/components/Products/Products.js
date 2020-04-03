import React from 'react'
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'
import Cookie from 'js-cookie'
import axios from 'axios'

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        const token = Cookie.get('token') ? Cookie.get('token') : null
        const BearerToken = `Bearer ${token}`
        const headers = {
            'Content-Type': 'application/json',
            Authorization: BearerToken,
        }

        axios({
            url: 'http://localhost:9000/api/product/',
            method: 'GET',
            headers: headers,
        }).then(res => {
            this.setState({ products: res.data.data })
        })
    }

    editProduct = product => {
        this.setState(prevState => {
            const products = [...prevState.products]
            const index = products.findIndex(prod => prod.id === product.id)
            products[index] = product.data
            return { products }
        })
    }
    updateProducts = (product, type = 'update') => {
        if (type === 'update') {
            this.setState({ products: [...this.state.products, product.data] })
        } else if (type === 'delete') {
            this.setState({ products: this.state.products.filter(item => item._id !== product.data._id) })
        }
    }

    render() {
        const isAdmin = Cookie.get('isAdmin')
        return (
            <>
                {isAdmin && <CreateProduct updateProducts={this.updateProducts} />}
                <ProductsList products={this.state.products} editProduct={this.editProduct} isAdmin={isAdmin} />
            </>
        )
    }
}

export default Products
