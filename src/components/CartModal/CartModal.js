import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/actions/modals'

const FullPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`

const Wrapper = styled.div`
    width: 250px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p {
        font-size: 16px;
        font-weight: 700;
    }
`

class CartModal extends React.Component {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node
    }

    handleClickOutside = (event) => {
        const { closeModal } = this.props
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            closeModal()
        }
    }

    render() {
        return (
            <FullPageWrapper>
                <div ref={this.setWrapperRef}>
                    <Wrapper>
                        <p>Item added to cart</p>
                        <a href="/cart">See cart</a>
                    </Wrapper>
                </div>
            </FullPageWrapper>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
})

export default connect(null, mapDispatchToProps)(CartModal)
