import { data } from '../../Assets/data'
import { updateObject } from '../utility'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    products: [...data],
    orders: {},
    cart: 0
}

const addProduct = (state, actions) => {

    const findProduct = state.products.filter(product => product.id === actions.id)

    if (!findProduct.length) {
        alert('Not in stock')
        return updateObject(state, {})
    }

    const newOrders = { ...state.orders }, product = findProduct[0]

    if (state.orders.hasOwnProperty(actions.id)) {

        if (product.restrict === newOrders[actions.id]) {
            alert('Sorry! No more than ' + product.restrict + ' units per user')
            return updateObject(state, {})
        }

        newOrders[actions.id]++
    }
    else
        newOrders[actions.id] = 1

    return updateObject(state, { orders: newOrders, cart: state.cart + 1 })
}

const removeProduct = (state, actions) => {

    const findProduct = state.products.filter(product => product.id === actions.id)

    if (!findProduct.length) {
        alert('Not in stock')
        return updateObject(state, {})
    }

    const newOrders = { ...state.orders }

    if (state.orders.hasOwnProperty(actions.id)) {

        if (state.orders[actions.id] === 0)
            return updateObject(state, {})

        newOrders[actions.id]--
    }
    else
        return updateObject(state, {})

    return updateObject(state, { orders: newOrders, cart: state.cart - 1 })
}

const deleteProduct = (state, actions) => {

    const inCart = state.orders[actions.id]
    const newOrders = { ...state.orders }

    delete newOrders[actions.id]

    return updateObject(state, { orders: newOrders, cart: state.cart - inCart })
}


const placeOrder = (state, actions) => {

    const updatedProducts = [...state.products]

    for (const key in state.orders) {
        const index = state.products.findIndex(product => product.id.toString() === key)

        updatedProducts[index].stock = updatedProducts[index].stock - state.orders[key]
    }

    return updateObject(state, { orders: {}, cart: 0 })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT: return addProduct(state, action);
        case actionTypes.REMOVE_PRODUCT: return removeProduct(state, action);
        case actionTypes.DELETE_PRODUCT: return deleteProduct(state, action);
        case actionTypes.PLACE_ORDER: return placeOrder(state, action);
        default:
            return state;
    }
}

export default reducer;