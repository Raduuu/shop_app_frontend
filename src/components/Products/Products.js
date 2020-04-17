import React from 'react'
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'
import Pagination from '../Pagination/Pagination'
import Cookie from 'js-cookie'
import axios from 'axios'
import styled from 'styled-components'

const StyledList = styled(ProductsList)`
    margin-bottom: 60px;
`

const StyledPagination = styled(Pagination)`
    margin: 30px 0;
`

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            count: 0,
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
        }).then((res) => {
            this.setState({ products: res.data.data, count: res.data.count })
        })
    }

    editProduct = (product) => {
        this.setState((prevState) => {
            const products = [...prevState.products]
            const index = products.findIndex((prod) => prod._id === product.data._id)
            products[index] = product.data
            return { products }
        })
    }
    updateProducts = (product, type = 'update') => {
        if (type === 'update') {
            this.setState({ products: [...this.state.products, product.data] })
        } else if (type === 'delete') {
            this.setState({ products: this.state.products.filter((item) => item._id !== product.data._id) })
        }
    }

    onChangePage = (page) => {
        const token = Cookie.get('token') ? Cookie.get('token') : null
        const BearerToken = `Bearer ${token}`
        const headers = {
            'Content-Type': 'application/json',
            Authorization: BearerToken,
        }

        axios({
            url: `http://localhost:9000/api/product?page=${page}`,
            method: 'GET',
            headers: headers,
        }).then((res) => {
            this.setState({ products: res.data.data })
        })
    }

    render() {
        const isAdmin = Cookie.get('isAdmin')
        return (
            <>
                {isAdmin && <CreateProduct updateProducts={this.updateProducts} />}
                <StyledList
                    products={this.state.products}
                    editProduct={this.editProduct}
                    isAdmin={isAdmin}
                    setCartProducts={this.props.setCartProducts}
                />
                <StyledPagination numberOfProducts={this.state.count} onChangePage={this.onChangePage} />
            </>
        )
    }
}

export default Products
