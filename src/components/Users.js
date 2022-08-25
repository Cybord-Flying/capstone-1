import React, { useState, useEffect } from 'react';
import './Users.css';


const Users = ({token}) => {
    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setAllUsers(data);
            } catch (error) {
                console.error(error);
            }
        
        };

        fetchUsers();
        }
    }, []);
    return (
        <div className='usersContainerMain'>
        <div className='usersContainer'>
            {
                allUsers[0] && token ? allUsers.map((user) => {
                    return(
                        <div className='usersBox'>
                            <p>Id: {user.id}</p>
                            <p>Username: {user.username}</p>
                            <p>roleId: {user.roleId}</p>
                        </div>
                    )
                }) : <h1>User must have admin privelages to access users</h1>
            }
        </div>
        </div>
    )
    
};

export default Users; 