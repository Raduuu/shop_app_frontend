import React, { useState, useEffect } from 'react'
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

const handleSelect = (ev, setCategory) => {
    setCategory(ev.target.value)
}

const handleSubmit = (ev, createProduct, body) => {
    ev.preventDefault()
    createProduct(body)
}

const CreateProduct = ({ getCategories, categories, success, createProduct }) => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [categoriesState, setCategories] = useState([])
    const [category, setCategory] = useState('')

    useEffect(() => {
        !categoriesState && getCategories()
        setName('')
        setQuantity('')
        setDescription('')
        setCategory('')
        setCategories(categories)
    }, [success, categories, getCategories, categoriesState])

    return (
        <StyledForm noValidate>
            <input
                type="text"
                name="name"
                placeholder="Product name"
                onChange={(ev) => setName(ev.target.value)}
                value={name}
            />
            <input
                type="number"
                name="quantity"
                placeholder="Product quantity"
                onChange={(ev) => setQuantity(ev.target.value)}
                value={quantity}
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                onChange={(ev) => setPrice(ev.target.value)}
                value={price}
            />
            <textarea
                name="description"
                width="300"
                height="100"
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder="Product description"
                value={description}
            ></textarea>
            <select onChange={(ev) => handleSelect(ev, setCategory)} value={category}>
                <option>Pick a category...</option>
                {categoriesState &&
                    categoriesState.map((category, index) => <option key={index}>{category.name}</option>)}
            </select>
            <button
                type="submit"
                disabled={name === '' || quantity === '' || price === '' || description === '' || category === ''}
                onClick={(ev) => handleSubmit(ev, createProduct, { name, quantity, price, description, category })}
            >
                Create
            </button>
        </StyledForm>
    )
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
