import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
    margin: 30px 0;
`

const Pagination = ({ numberOfProducts, onChangePage }) => {
    const numberOfPages = Math.ceil(numberOfProducts / 10)
    let arrOfPages = []
    const [pageNumber, setPageNumber] = useState(1)
    for (let i = 1; i < numberOfPages + 1; i++) {
        arrOfPages.push(i)
    }
    return (
        <Wrapper>
            {numberOfPages > 0 && <h4>{`page ${pageNumber} of ${numberOfPages}`}</h4>}
            {arrOfPages.map((page) => (
                <React.Fragment key={page}>
                    {/* eslint-disable-next-line */}
                    <a
                        href="#"
                        onClick={(ev) => {
                            ev.preventDefault()
                            onChangePage(page)
                            setPageNumber(page)
                        }}
                    >
                        {page}
                    </a>
                    <span> </span>
                </React.Fragment>
            ))}
        </Wrapper>
    )
}

Pagination.propTypes = {
    numberOfProducts: PropTypes.number,
    onChangePage: PropTypes.func,
}

export default Pagination
