import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = ({isLoggedIn, setIsLoggedIn, subTotal, setToken, setIsAdmin, isAdmin}) => {
    const navigate = useNavigate();

    useEffect (() => {
        if (localStorage.getItem('token')) {
                setIsLoggedIn(true)
                setToken(localStorage.getItem('token'))
        }
        if (localStorage.getItem('isAdmin')) {
                setIsAdmin(true)
        }
    }, [])

    function logoutHandle () {
        setIsLoggedIn(false);
        setToken('')
        setIsAdmin(false)
        localStorage.clear()
        navigate('/')
    }
    return (
        
            <div className='headerMain'>
                <div className="homeFlexContainer">
                        <div className='navToolsTopLeft'>
                                {
                                        isAdmin && isLoggedIn ? <><a className='logoutLink' onClick={logoutHandle}>LOGOUT</a>
                                        <a className='userLink' onClick={() => navigate('/Users')}>USERS</a>
                                         <a onClick={() => navigate('/Products')}>PRODUCTS</a></> :
                                        isLoggedIn ? <a onClick={logoutHandle}>LOGOUT</a> : 
                                        <>
                                <a className='registerLink' onClick={()=> navigate('/Register')} >REGISTER</a>

                                <a className='loginLink' onClick={()=> navigate('/Login')} >LOGIN</a>
                                </>
                                }
                        </div>

                        <div className='navToolsTopRight'>  

                                <a onClick={()=> navigate('/Cart')} >CART ({subTotal})</a>

                        </div>
                </div>

                <div className='navToolsTitle'>
                        <h1>CYBORG FLYING WATCHES</h1>

                </div>     

                <div className='navToolsSub'>
                        <a onClick={()=> navigate('/')} >HOME</a>

                        <a onClick={()=> navigate('/Shop')} >SHOP</a>

                        <a onClick={()=> navigate('/About')} >ABOUT</a>

                        
                </div>    
            </div>
            
            
       
    )
};

export default Header; 