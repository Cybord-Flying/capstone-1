import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Checkout.css"

const Checkout = ({total}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [cartNum, setCardNum] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cardCvc, setCardCvc] = useState('');
    const [name, setName] = useState('');
    

    const confirmation = async () => {
       let token = localStorage.getItem('token')
       if (token) {
            await fetch('/api/cart_orders', {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`   
                },
            })
        }
    }

    return (
        <div className='payContainerMain'>
            <form className='pay-container'>
                <label>Email</label>
                <input className='emailBox' type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Card Information</label>
                <input className='cardBox' type="text" value={cartNum} onChange={(e) => setCardNum(e.target.value)}
                placeholder="1234 1234 1234 1234"></input>
                <input className='monthBox' type="text" value={cardDate} onChange={(e) => setCardDate(e.target.value)}
                placeholder="MM/YY"></input>
                <input className='cvcBox' type="text" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)}
                placeholder="CVC"></input>
                <label>Name on card</label>
                <input className='nameBox' type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                <button className='confirmButton' onClick={() => {confirmation();alert('Thank you for your purchase');navigate('/')}}>Pay ${total}</button>
            </form>
        </div>
    )
};


export default Checkout; 