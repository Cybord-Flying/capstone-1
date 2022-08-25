import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "./SingleProduct.css";

const SingleProduct = ({token, isLoggedIn, isAdmin}) => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [singleProduct, setSingleProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [name, setName] = useState(singleProduct.name)
    const [price, setPrice] = useState(singleProduct.price)
    const [description, setDescription] = useState(singleProduct.description)
    const [image, setImage] = useState(singleProduct.image)

    const fetchSingleProduct = async () => {
        try {
            const response = await fetch(`/api/products/${id}`)
            const data = await response.json();
          
            setSingleProduct(data)
        } catch (error) {
            console.log(error)
        }
    };
    
    useEffect(() => {
        fetchSingleProduct();
    }, []);

    const handleSubmit = async () => {
        try {
            if (isLoggedIn) {
            const response = await fetch(`/api/cart_items`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                
                },
                body: JSON.stringify({
                        productId: singleProduct.id,
                        quantity: quantity
                })
            })
            const data = await response.json();
        } else {
            const response = await fetch(`/api/cart_items`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                        productId: singleProduct.id,
                        quantity: quantity
                })
            })
            const data = await response.json();
        }
            
        } catch (error) {
            console.log(error)
        }
    } 
    
    const handleChange = (e) => {
        setQuantity(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/products/${singleProduct.id}`, {
                method: 'PATCH',
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
            fetchSingleProduct()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/products/${singleProduct.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate('/shop')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            {
                isAdmin ? <>
                <div className='editProductForm'>
                <form onSubmit={handleForm}>
                <input type="text" placeholder="name" value={name} onChange=
                {(e) => setName(e.target.value)}></input> 
                <input type="text" placeholder="price" value={price} onChange=
                {(e) => setPrice(e.target.value)}></input>
                <input type="text" placeholder="description" value={description} onChange=
                {(e) => setDescription(e.target.value)}></input> 
                <input type="text" placeholder="image" value={image} onChange=
                {(e) => setImage(e.target.value)}></input>
                <button type="submit">Edit Product</button>
            </form>
            <button onClick={handleDelete}>Delete Product</button>
            </div>
            </> : null
            }
            <div className='singleProductContainer'>
                <div className='elementsContainer'>
                <div className="imageContainer">
                    <div className='imageBox'>
                        <img src={singleProduct.image} alt={singleProduct.description}></img>
                    </div>
                </div>    
                <div className='textContainer'>
                    <div className="nameContainer">
                        <h1>{singleProduct.name}</h1>
                    </div>
                    <div className="descContainer">
                        <p>{singleProduct.description}</p>
                    </div> 
                    <div className="priceContainer">
                        <h1>${singleProduct.price}</h1>
                    </div>

                    <div className='dropContainer'>  
                    <select className="selectStyle" value={quantity} onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <button className="buttonStyle" onClick={handleSubmit}>Add to Cart</button>
                </div>    
                </div>
                
                </div>
                  
                </div>
            </div>
        
    )
};

export default SingleProduct; 

