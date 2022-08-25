// import React from 'react';
// import ReactDOM from 'react-dom';
// import { App } from './components';

// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Users, Header, Shop, Home, Cart, About, Register, Login, SingleProduct, Checkout, Products } from './components';

const App = () => {
    const [cart, setCart] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [total, setTotal] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false)
    const [subTotal, setSubTotal] = useState(0)

    return (
        <>
            <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} setToken={setToken} subTotal={subTotal} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Routes>
                <Route path={'/'}>
                    <Route index element={<Home/>}/>
                    <Route path={'Shop'} element={<Shop/>}/>
                    <Route path={'Shop/:id'} element={<SingleProduct isAdmin={isAdmin} token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path={'Cart'} element={<Cart subTotal={subTotal} setSubTotal={setSubTotal} cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} total={total} setTotal={setTotal}/>}/>
                    <Route path={'About'} element={<About/>}/>
                    <Route path={'Register'} element={<Register setIsAdmin={setIsAdmin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken}/>}/>
                    <Route path={'Login'} element={<Login setIsAdmin={setIsAdmin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken}/>}/>
                    <Route path={'Checkout'} element={<Checkout total={total}/>}/>
                    <Route path={'Products'} element={<Products token={token} isAdmin={isAdmin}/>}/>
                    <Route path={'Users'} element={<Users token={token}/>}/>
                </Route>
            </Routes>   
        </>
       
    

    ) 
    };



let appElement = document.getElementById('app');
ReactDOM.render( <BrowserRouter><App /></BrowserRouter>, appElement);

// ReactDOM.render(<App />, document.getElementById('root'));
