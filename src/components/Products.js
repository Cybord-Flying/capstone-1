import React, { useState } from 'react';

import './Products.css';

const Products = ({isAdmin, token}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/products`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                        name,
                        price,
                        description,
                        image
                })
            })
            const data = await response.json();
            
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        
        <div className='productsContainerMain' >
            
        {
            isAdmin ? 
            <>
            
                <form className='productsContainer' onSubmit={handleSubmit}>
                    <input className='nameBox' type="text" placeholder="name" value={name} onChange=
                    {(e) => setName(e.target.value)}></input> 
                    <input className='priceBox' type="text" placeholder="price" value={price} onChange=
                    {(e) => setPrice(e.target.value)}></input>
                    <input className='descBox' type="text" placeholder="description" value={description} onChange=
                    {(e) => setDescription(e.target.value)}></input> 
                    <input className='imageBoxProducts' type="text" placeholder="image" value={image} onChange=
                    {(e) => setImage(e.target.value)}></input>
                    <button className='createProductButton' type="submit">Create Product</button>
                </form>
            </>: <h1>User must have admin privelages to access this feature</h1>
        }
        </div>
    
    )
    
};

export default Products; 
