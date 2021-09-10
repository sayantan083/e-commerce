import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classes from './OrderSummary.module.css'
import { useHistory } from 'react-router-dom'
import * as actions from '../../store/actions/index'

export default function OrderSummary() {

    const history = useHistory()
    const dispatch = useDispatch()
    const orders = useSelector(state => state.cart.orders)
    const products = useSelector(state => state.cart.products)
    let total = 0

    const inCart = products.map(product => {
        if (!orders[product.id])
            return null

        total = total + product.price * orders[product.id]

        return <span
            className={classes.name}
            key={product.id}
        >{product.name}({orders[product.id]} * Rs. {product.price}),</span>
    }).filter(product => product != null)

    const handleSubmit = (event) => {

        event.preventDefault()
        if (total > 0) {

            if (event.target.number.value.length !== 10)
                alert('Please enter a valid phone number')
            else if (event.target.card.value.length !== 16)
                alert('Please enter a valid card number')
            else {
                dispatch(actions.placeOrder())
                alert("Congractulations! " + event.target.name.value + " your order is successfully placed");
                history.push('/')
            }
        }
        else
            alert("Add something to cart!")

    }

    return (<>
        <h2 className={classes.heading}>Order Summary</h2>
        <div className={classes.root}>
            <div className={classes.inner}>
                <div className={classes.orders}>
                    {inCart}
                </div>
                <p>Total: Rs.{total}</p>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <input placeholder='name' name="name" type="text" className={classes.input} autoComplete='off' />
                    <input placeholder='address' name="address" type="text" className={classes.input} />
                    <input placeholder="Phone number" name="number" type="number" className={classes.input} />
                    <input placeholder="Card number" name="card" type="number" className={classes.input} />
                    <input type="submit" className={classes.submit} />
                </form>
            </div>
        </div>
    </>)
}
