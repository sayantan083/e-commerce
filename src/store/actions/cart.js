import * as actionTypes from './actionTypes'

export const addProduct = (id) => {

    return {
        type: actionTypes.ADD_PRODUCT,
        id: id
    }
}

export const removeProduct = (id) => {

    return {
        type: actionTypes.REMOVE_PRODUCT,
        id: id
    }
}

export const deleteProduct = (id) => {

    return {
        type: actionTypes.DELETE_PRODUCT,
        id: id
    }
}

export const placeOrder = () => {

    return {
        type: actionTypes.PLACE_ORDER
    }
}