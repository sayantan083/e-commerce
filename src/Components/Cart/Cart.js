import React from 'react'
import classes from './Cart.module.css'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export default function Main() {

    const history = useHistory()
    const dispatch = useDispatch()
    const data = useSelector(state => state.cart.products)
    const orders = useSelector(state => state.cart.orders)

    let products = data.map(product => {

        if (!orders[product.id])
            return null

        return <div
            key={product.id}
            className={classes.product}
        >
            <h3
                className={classes.name}
                onClick={() => {
                    history.push('/product/' + product.id)
                }}
            >{product.name}</h3>
            <p>Rs.{product.price}</p>
            <div className={classes.bottom}>
                <div className={classes.modify}>
                    <button className={classes.btn}
                        onClick={() => {
                            dispatch(actions.removeProduct(product.id))
                        }}
                    >-</button>
                    <span className={classes.units}>{orders[product.id] ? orders[product.id] : 0}</span>
                    <button className={classes.btn}
                        onClick={() => {
                            dispatch(actions.addProduct(product.id))
                        }}
                    >+</button>
                </div>
                <FontAwesomeIcon
                    className={classes.icon}
                    onClick={() => {
                        dispatch(actions.deleteProduct(product.id))
                    }}
                    icon={faTrash} />
            </div>
        </div>
    }).filter(product => product != null)

    return (
        <>
            <h2 className={classes.heading}>Cart</h2>
            <div className={classes.lower}>
                <div className={classes.root}>
                    {products}
                </div>
                {!products.length ? null : <button
                    onClick={() => {
                        history.push('/orderSummary')
                    }}
                    className={classes.buy}>Buy Now</button>}
            </div>
            {!products.length ? <p className={classes.noProducts}>No Products in the cart</p> : null}
        </>
    )
}