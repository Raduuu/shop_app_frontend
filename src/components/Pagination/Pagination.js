import React, { useState } from 'react'
import styled from 'styled-components'

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
            <h4>{`page ${pageNumber} of ${numberOfPages}`}</h4>
            {arrOfPages.map((page) => (
                <>
                    <a
                        // href={`?page=${page}`}
                        href="#"
                        key={page}
                        onClick={(ev) => {
                            ev.preventDefault()
                            onChangePage(page)
                            setPageNumber(page)
                        }}
                    >
                        {page}
                    </a>
                    <span> </span>
                </>
            ))}
        </Wrapper>
    )
}

export default Pagination
