import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Cart.css';

const Cart = ({cart, setCart, isLoggedIn, setIsLoggedIn, token, setToken, total, setTotal, subTotal, setSubTotal}) => {
    const navigate = useNavigate()

    const fetchCart = async () => {
        try {
            if (!isLoggedIn) {
            const response = await fetch('/api/cart_items');
            const data = await response.json();
            console.log('fsfsdfsdfs', data);
            setCart(data);
            let sum = 0;
            data.forEach((item) => {
                sum += (Number(item.product.price) * item.quantity)
            })
            setTotal(sum)
            let sub = 0;
            data.forEach((item) => {
                sub = Number(sub) + Number(item.quantity)
            })
            console.log('this is the sub', sub)
            setSubTotal(sub)
            } else {
                const response = await fetch('/api/cart_items', {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`   
                    }
                }
            );
                const data = await response.json();
                console.log(data);
                setCart(data);
                let sum = 0;
                data.forEach((item) => {
                    sum += (Number(item.product.price) * item.quantity)
                })
                setTotal(sum)
                let sub = 0;
                data.forEach((item) => {
                    sub = Number(sub) + Number(item.quantity)
                })
                setSubTotal(sub)
            }
            } catch (error) {
                console.error(error);
            }
    
    };

    useEffect(() => {
        fetchCart();
    }, []);

    function order () {
        if (isLoggedIn) {
         navigate('/Checkout')
        } else {
            alert("Please login or register for an account to checkout")
        }
     }

     const deleteHandler = async (e) => {
        try {
            if (isLoggedIn) {
                const response = await fetch(`/api/cart_items/${e.target.value}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                fetchCart()
            } else {
                const response = await fetch(`/api/cart_items/${e.target.value}`, {
                    method: 'DELETE',
                })
                fetchCart()
            }
        } catch (error) {
            console.log(error)
        }
     }

     const changeHandler = async (e) => {
        try {
            if (isLoggedIn) {
                console.log(e.target)
                const response = await fetch(`/api/cart_items/${e.target.getAttribute("data-itemId")}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        productId: e.target.getAttribute("data-productId"),
                        orderId: e.target.getAttribute("data-orderId"),
                        quantity: e.target.value,
                    })
                })
                fetchCart()
            } else {
                console.log(e.target.getAttribute("data-productId"))
                const response = await fetch(`/api/cart_items/${e.target.getAttribute("data-itemId")}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        productId: e.target.getAttribute("data-productId"),
                        quantity: e.target.value,
                    })
                })
                fetchCart()
            }
        } catch (error) {
            console.log(error)
        }
     }
    return (
        <div className='cart' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{flex: 2, border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                <h1>Shopping Cart</h1>
                {
                cart.length ? cart.map((currentItem, idx) => {
                    console.log("current item:", cart);
                return (
                    <div style={{ padding: '5px', border: '1px solid black', display: 'flex', justifyContent: 'space-evenly'}}>
                        <div>
                            <img src={currentItem.product.image} alt={currentItem.product.description} ></img>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                            <h1 style={{ textAlign: 'center'}}>{currentItem.product.name}</h1>
                            <p style={{ textAlign: 'center'}}>{currentItem.product.description}</p>
                        </div>
                        <div style={{ border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                            <h1>${currentItem.product.price}</h1>
                            <select value={currentItem.quantity} onChange={changeHandler} data-orderId={currentItem.orderId} data-itemId={currentItem.itemId} data-productId={currentItem.product.id}>
                                <option value="1">Qty: 1</option>
                                <option value="2">Qty: 2</option>
                                <option value="3">Qty: 3</option>
                                <option value="4">Qty: 4</option>
                                <option value="5">Qty: 5</option>
                                <option value="6">Qty: 6</option>
                                <option value="7">Qty: 7</option>
                                <option value="8">Qty: 8</option>
                                <option value="9">Qty: 9</option>
                                <option value="10">Qty: 10</option>
                            </select>
                            <button value={currentItem.itemId} onClick={deleteHandler}>DELETE</button>
                        </div>
                    </div>
                    )}) : <h1>Cart Is Empty</h1>
                }
            </div>
            <div style={{border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                <h1>Subtotal ({subTotal}): ${total}</h1>
                <button onClick={order}>Proceed to checkout</button>
            </div>
        </div>
    )
};


export default Cart; 