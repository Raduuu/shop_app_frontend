import React from 'react'
import styled from 'styled-components'

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
export default class FilterBar extends React.Component {
    render() {
        const { handleSearch, handleSelect, categories } = this.props
        return (
            <FlexWrapper>
                <select onChange={(ev) => handleSelect(ev.target.value)}>
                    <option>all</option>
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
