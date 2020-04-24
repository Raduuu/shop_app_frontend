import React from 'react'
import styled from 'styled-components'

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
export default class FilterBar extends React.Component {
    render() {
        const { handleSearch, handleSelect, handlePriceSelect, categories } = this.props
        return (
            <FlexWrapper>
                <select onChange={(ev) => handlePriceSelect(ev.target.value)}>
                    <option>Price</option>
                    <option value="20">&#60;20</option>
                    <option value="50">&#60;50</option>
                    <option value="100">&#60;100</option>
                </select>
                <select onChange={(ev) => handleSelect(ev.target.value)}>
                    <option>Category</option>
                    {categories && categories.map((category, index) => <option key={index}>{category.name}</option>)}
                </select>
                <input
                    placeholder="Search..."
                    type="text"
                    name="search"
                    onChange={(ev) => handleSearch(ev.target.value)}
                />
            </FlexWrapper>
        )
    }
}
