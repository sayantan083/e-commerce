import React from 'react'
import classes from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

export default function Navigation() {

    const history = useHistory()
    const cart = useSelector(state => state.cart.cart)

    return (
        <div className={classes.root}>
            <div
                className={classes.logo}
                onClick={() => {
                    history.push('/')
                }}>logo</div>
            <div>
                {cart}
                <FontAwesomeIcon
                    className={classes.icon}
                    onClick={() => {
                        history.push('/cart')
                    }}
                    icon={faCartPlus} />
            </div>
        </div>
    )
}
