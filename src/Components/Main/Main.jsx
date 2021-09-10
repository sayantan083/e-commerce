import React from 'react'
import classes from './Main.module.css'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/index'

export default function Main() {

    const history = useHistory()
    const dispatch = useDispatch()
    const data = useSelector(state => state.cart.products)
    const orders = useSelector(state => state.cart.orders)

    const products = data.map(product => {
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
            {product.stock < 6 ? (product.stock === 0 ? <p>Out of stock</p> : <p>Hurry! Only {product.stock} units left</p>) : null}
            <div className={classes.modify}>
                <button className={classes.btn}
                    onClick={() => {
                        if (product.stock)
                            dispatch(actions.removeProduct(product.id))
                    }}
                >-</button>
                <span className={classes.units}>{orders[product.id] ? orders[product.id] : 0}</span>
                <button className={classes.btn}
                    onClick={() => {
                        if (product.stock)
                            dispatch(actions.addProduct(product.id))
                    }}
                >+</button>
            </div>
        </div>
    })

    return (
        <>
            <h2 className={classes.heading}>Products</h2>
            <div className={classes.root}>
                {products}
            </div>
        </>
    )
}
