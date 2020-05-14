import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import { StyledForm } from './CreateProduct'
import { remove } from '../../utils/utils'
import { editProduct } from '../../redux/actions/products'
import { selectCategories } from '../../redux/reducers/categories'
import { openModal } from '../../redux/actions/modals'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Wrapper = styled.div`
    text-align: left;
    margin: 0 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #dccece;
`

const IconsWrapper = styled.div`
    display: block;
    div {
        display: inline-block;
        margin-right: 10px;
    }
`

const StyledIcon = styled.div`
    cursor: pointer;
    display: inline-block;
`

const StyledButton = styled.button`
    padding: initial 10px;
    white-space: nowrap;
    margin-top: 10px;
    cursor: pointer;
    span {
        margin-right: 10px;
    }
`

const onEdit = ({
    ev,
    product,
    name,
    description,
    quantity,
    price,
    category,
    setName,
    setDescription,
    setEdit,
    setPrice,
    setQuantity,
    editProduct,
}) => {
    ev.preventDefault()
    const body = {
        _id: product._id,
        createdBy: product.createdBy,
        name,
        description,
        price,
        category,
        quantity,
    }

    editProduct(body)
    setName(name)
    setDescription(description)
    setQuantity(quantity)
    setPrice(price)
    setEdit(false)
}

const onDelete = (product, updateProducts) => {
    remove(`api/product/${product._id}`, (res) => {
        updateProducts(res.data, 'delete')
    })
}

const addToCart = (product, setCartProducts, openModal) => {
    let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : []
    let found = false
    let total = 1
    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].quantity
        if (cart[i]._id === product._id) {
            cart[i].quantity++
            found = true
        }
    }

    setCartProducts(total)

    !found && cart.push({ _id: product._id, name: product.name, price: product.price, quantity: 1 })

    Cookie.set('cart', cart)
    openModal()
}

const Product = ({ product, categories, updateProducts, editProduct, isAdmin, setCartProducts, openModal }) => {
    const [name, setName] = useState(product.name)
    const [quantity, setQuantity] = useState(product.quantity)
    const [price, setPrice] = useState(product.price)
    const [category, setCategory] = useState(product.category)
    const [description, setDescription] = useState(product.description)
    const [edit, setEdit] = useState(false)
    const iconColor = '#FF715B'
    return (
        <Wrapper>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price} coins</p>
            <p>{product.quantity} in stock</p>
            <p>Category: {product.category}</p>
            <IconsWrapper>
                {isAdmin && (
                    <div>
                        <StyledIcon
                            onClick={() => {
                                setEdit(!edit)
                            }}
                        >
                            <FontAwesomeIcon icon={faEdit} color={iconColor} />
                        </StyledIcon>
                        <StyledIcon onClick={() => onDelete(product, updateProducts)}>
                            <FontAwesomeIcon icon={faTrash} color={iconColor} />
                        </StyledIcon>
                    </div>
                )}
            </IconsWrapper>
            <StyledButton onClick={() => addToCart(product, setCartProducts, openModal)}>
                <span>Add to cart</span>
                <span>
                    <StyledIcon>
                        <FontAwesomeIcon icon={faCartPlus} color={iconColor} />
                    </StyledIcon>
                </span>
            </StyledButton>
            {edit && (
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
                    <select onChange={(ev) => setCategory(ev.target.value)} value={category}>
                        <option>Pick a category...</option>
                        {categories &&
                            categories.map((category, index) => <option key={index}>{category.name}</option>)}
                    </select>
                    <textarea
                        name="description"
                        width="300"
                        height="100"
                        onChange={(ev) => setDescription(ev.target.value)}
                        placeholder="Product description"
                        value={description}
                    ></textarea>
                    <button
                        type="submit"
                        disabled={name === '' || quantity === '' || description === ''}
                        onClick={(ev) =>
                            onEdit({
                                ev,
                                product,
                                name,
                                description,
                                quantity,
                                price,
                                category,
                                editProduct,
                                setName,
                                setEdit,
                                setPrice,
                                setQuantity,
                                setDescription,
                            })
                        }
                    >
                        Edit
                    </button>
                </StyledForm>
            )}
        </Wrapper>
    )
}

Product.propTypes = {
    product: PropTypes.object,
    updateProducts: PropTypes.func,
    editProduct: PropTypes.func,
    isAdmin: PropTypes.bool,
    setCartProducts: PropTypes.func,
}

Product.defaultProps = {
    product: {},
    updateProducts: () => {},
    editProduct: () => {},
    isAdmin: false,
    setCartProducts: () => {},
}

const mapStateToProps = (state) => ({
    categories: selectCategories(state),
})

const mapDispatchToProps = (dispatch) => ({
    editProduct: (body) => dispatch(editProduct(body)),
    openModal: () => dispatch(openModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
