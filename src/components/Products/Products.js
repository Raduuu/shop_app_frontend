import React, { useEffect, useState } from 'react'
import CreateProduct from './CreateProduct'
import ProductsList from './ProductsList'
import Cookie from 'js-cookie'
import axios from 'axios'

const Products = () => {
    const token = Cookie.get('token') ? Cookie.get('token') : null
    const BearerToken = `Bearer ${token}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: BearerToken,
    }

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios({
            url: 'http://localhost:9000/api/item/all',
            method: 'GET',
            headers: headers,
        }).then(res => {
            console.log('res', res)
            setProducts(res)
        })
    })
    return (
        <>
            <CreateProduct />
            <ProductsList products={products} />
        </>
    )
}

export default Products
