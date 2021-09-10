import React from 'react'
import classes from './Product.module.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../store/actions/index'

export default function Product() {

    const params = useParams()
    const dispatch = useDispatch()
    const data = useSelector(state => state.cart.products)
    const orders = useSelector(state => state.cart.orders)
    const findProduct = data.filter(product => product.id.toString() === params.id)

    if (!findProduct.length)
        return (<h2 className={classes.center}>
            No product Found
        </h2>)

    const product = findProduct[0];

    return (
        <div className={classes.root}>
            <div className={[classes.box, classes.image].join(" ")}>Product image</div>
            <div className={classes.box}>
                <h3>{product.name}</h3>
                <p className={classes.price}>Deal of the day: Price Rs.{product.price}</p>
                {product.stock === 0 ? <p>Out of stock</p> : null}
                <p>{product.description}</p>
            </div>
            <div className={classes.box}>
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
                Add to cart
            </div>
        </div>
    )
}
