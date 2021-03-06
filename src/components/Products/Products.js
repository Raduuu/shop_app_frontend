import React from 'react'
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'
import Pagination from '../Pagination/Pagination'
import Cookie from 'js-cookie'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce'
import { getProducts, searchProducts } from '../../redux/actions/products'
import { selectProducts, selectCount } from '../../redux/reducers/products'
import { connect } from 'react-redux'

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
            category: 'Category',
        }
    }

    componentDidMount() {
        const { getProducts } = this.props
        getProducts()
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
        if (type === 'update' && this.state.products.length < 10) {
            this.setState({ products: [...this.state.products, product.data] })
        } else if (type === 'delete') {
            this.setState({ products: this.state.products.filter((item) => item._id !== product.data._id) })
        }
    }

    onChangePage = (page) => {
        const { getProducts } = this.props
        getProducts({ page })
    }

    handleSelect = (category) => {
        const { getProducts } = this.props
        getProducts({ category })
        this.setState({ category: category })
    }

    handlePriceSelect = (price) => {
        const { getProducts } = this.props
        getProducts({ price })
        this.setState({ price: price })
    }

    handleSearch = debounce(300, (text) => {
        const { searchProducts, getProducts } = this.props
        if (text) {
            searchProducts(text)
        } else {
            getProducts()
        }
    })

    render() {
        const isAdmin = Cookie.get('isAdmin')
        const { products, count } = this.props
        return (
            <>
                {isAdmin && <CreateProduct updateProducts={this.updateProducts} />}
                <StyledList
                    products={products}
                    editProduct={this.editProduct}
                    updateProducts={this.updateProducts}
                    isAdmin={isAdmin}
                    setCartProducts={this.props.setCartProducts}
                    handleSelect={this.handleSelect}
                    handleSearch={this.handleSearch}
                    handlePriceSelect={this.handlePriceSelect}
                />
                <StyledPagination numberOfProducts={count} onChangePage={this.onChangePage} />
            </>
        )
    }
}

Products.propTypes = {
    isAdmin: PropTypes.bool,
    setCartProducts: PropTypes.func,
}

Products.defaultProps = {
    isAdmin: false,
    setCartProducts: () => {},
}

const mapStateToProps = (state) => ({
    products: selectProducts(state),
    count: selectCount(state),
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: (payload) => dispatch(getProducts(payload)),
    searchProducts: (payload) => dispatch(searchProducts(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
