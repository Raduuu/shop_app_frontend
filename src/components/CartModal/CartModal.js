import React, { useEffect, useRef } from 'react'
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

// const useWrapperRef = (node) => {
//     // this.wrapperRef = node
//     const wrapperRef = useRef(node)
//     return wrapperRef
// }

const handleClickOutside = (event, closeModal, wrapperRef) => {
    if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeModal()
    }
}

const CartModal = ({ closeModal }) => {
    useEffect(() => {
        document.addEventListener('mousedown', (ev) => handleClickOutside(ev, closeModal, wrapperRef))
        return () => {
            document.removeEventListener('mousedown', (ev) => handleClickOutside(ev, closeModal, wrapperRef))
        }
    }, [closeModal])

    const wrapperRef = useRef(null)

    return (
        <FullPageWrapper>
            <div ref={wrapperRef}>
                <Wrapper>
                    <p>Item added to cart</p>
                    <a href="/cart">See cart</a>
                </Wrapper>
            </div>
        </FullPageWrapper>
    )
}

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
})

export default connect(null, mapDispatchToProps)(CartModal)
