import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Cart.css';

const Cart = ({cart, setCart, isLoggedIn, token, total, setTotal, subTotal, setSubTotal}) => {
    const navigate = useNavigate()

    const fetchCart = async () => {
        try {
            if (!isLoggedIn) {
            const response = await fetch('/api/cart_items');
            const data = await response.json();
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
            } else {
                const response = await fetch('/api/cart_items', {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`   
                    }
                }
            );
                const data = await response.json();
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
                await fetch(`/api/cart_items/${e.target.value}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                fetchCart()
            } else {
                await fetch(`/api/cart_items/${e.target.value}`, {
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
                await fetch(`/api/cart_items/${e.target.getAttribute("data-itemId")}`, {
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
                await fetch(`/api/cart_items/${e.target.getAttribute("data-itemId")}`, {
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
        <div className='cart'>
            <div className='cartContainer'>
                <h1>Shopping Cart</h1>
                {
                cart.length ? cart.map((currentItem, idx) => {
                return (
                    <div className='indivItemContainer'>
                        <div className='imageContainer'>
                            <img className="imageStyle" src={currentItem.product.image} alt={currentItem.product.description} ></img>
                        </div>
                        <div className='textContainer'>
                            <div className='textContainerSub'>
                            <h1 className='nameContainer'>{currentItem.product.name}</h1>
                            <p className='descContainer'>{currentItem.product.description}</p>
                        
                        <div className='priceContainer'>
                            <h1 className='priceStyle'>${currentItem.product.price}</h1>
                        </div>
                        <div className='dropContainer'>    
                            <select className='selectStyle' value={currentItem.quantity} onChange={changeHandler} data-orderId={currentItem.orderId} data-itemId={currentItem.itemId} data-productId={currentItem.product.id}>
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
                            <button className='buttonStyle' value={currentItem.itemId} onClick={deleteHandler}>DELETE</button>
                        </div>
                        </div>
                        </div>
                    </div>
                    )}) : <h1>Cart Is Empty</h1>
                }
            </div>
            <div className='subtotalContainer'>
                <h1>Subtotal ({subTotal}): ${total}</h1>
                <button className='button2Style' onClick={order}>Proceed To Checkout</button>
            </div>
        </div>
    )
};


export default Cart; 