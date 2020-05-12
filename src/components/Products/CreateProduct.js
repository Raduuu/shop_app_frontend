import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createProduct } from '../../redux/actions/products'
import { getCategories } from '../../redux/actions/categories'
import { selectCategories } from '../../redux/reducers/categories'
import { connect } from 'react-redux'

export const StyledForm = styled.form`
    display: block;
    width: 400px;
    margin-top: 100px;
    margin-left: 50%;
    transform: translateX(-50%);
    * {
        display: block;
        width: 100%;
        margin-bottom: 15px;
        box-sizing: border-box;
    }
`

class CreateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            quantity: '',
            description: '',
            categories: [],
            category: '',
        }
    }

    componentDidMount() {
        const { getCategories } = this.props
        getCategories()
    }

    componentDidUpdate(prevProps) {
        if (this.props.success !== prevProps.success) {
            this.setState({
                name: '',
                quantity: '',
                price: '',
                description: '',
                category: '',
            })
        }

        if (this.props.categories !== prevProps.categories) {
            this.setState({ categories: this.props.categories })
        }
    }

    handleSelect = (ev) => {
        this.setState({ category: ev.target.value })
    }

    handleSubmit = (ev) => {
        const { createProduct } = this.props // need to update products from redux instead of internal state
        ev.preventDefault()
        const body = {
            ...this.state,
        }

        createProduct(body)
    }

    render() {
        return (
            <StyledForm noValidate>
                <input
                    type="text"
                    name="name"
                    placeholder="Product name"
                    onChange={(ev) => this.setState({ name: ev.target.value })}
                    value={this.state.name}
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Product quantity"
                    onChange={(ev) => this.setState({ quantity: ev.target.value })}
                    value={this.state.quantity}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={(ev) => this.setState({ price: ev.target.value })}
                    value={this.state.price}
                />
                <textarea
                    name="description"
                    width="300"
                    height="100"
                    onChange={(ev) => this.setState({ description: ev.target.value })}
                    placeholder="Product description"
                    value={this.state.description}
                ></textarea>
                <select onChange={(ev) => this.handleSelect(ev)} value={this.state.category}>
                    <option>Pick a category...</option>
                    {this.state.categories &&
                        this.state.categories.map((category, index) => <option key={index}>{category.name}</option>)}
                </select>
                <button
                    type="submit"
                    disabled={
                        this.state.name === '' ||
                        this.state.quantity === '' ||
                        this.state.price === '' ||
                        this.state.description === '' ||
                        this.state.category === ''
                    }
                    onClick={(ev) => this.handleSubmit(ev)}
                >
                    Create
                </button>
            </StyledForm>
        )
    }
}

CreateProduct.propTypes = {
    updateProducts: PropTypes.func,
}

CreateProduct.defaultProps = {
    updateProducts: () => {},
}

const mapStateToProps = (state) => ({
    success: state.products.success,
    categories: selectCategories(state),
})

const mapDispatchToProps = (dispatch) => ({
    createProduct: (payload) => dispatch(createProduct(payload)),
    getCategories: () => dispatch(getCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
