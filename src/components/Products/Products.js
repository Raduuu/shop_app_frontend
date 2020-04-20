import React from 'react'
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'
import Pagination from '../Pagination/Pagination'
import Cookie from 'js-cookie'
import styled from 'styled-components'
import { get } from '../../utils/utils'

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
        get('api/product/', (res) => {
            res && this.setState({ products: res.data.data, count: res.data.count })
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
        get(`api/product?page=${page}`, (res) => {
            res && this.setState({ products: res.data.data })
        })
    }

    handleSelect = (category) => {
        get(`api/product?category=${category}`, (res) => {
            res && this.setState({ products: res.data.data })
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
                    updateProducts={this.updateProducts}
                    isAdmin={isAdmin}
                    setCartProducts={this.props.setCartProducts}
                    handleSelect={this.handleSelect}
                />
                <StyledPagination numberOfProducts={this.state.count} onChangePage={this.onChangePage} />
            </>
        )
    }
}

export default Products
