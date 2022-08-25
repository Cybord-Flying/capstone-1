import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = ({setIsLoggedIn, setToken, setIsAdmin}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                        username: username,
                        password: password
                })
            })
            const data = await response.json();
            if (data.user.roleId === 2) {
                setIsAdmin(true)
                localStorage.setItem("isAdmin", true)
            }
            if (data.token) {
                navigate('/');
                setIsLoggedIn(true)
                setToken(data.token)
                localStorage.setItem("token", data.token)
            }
            
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='login-body'>
            <div className="userLoginText">
                <h1>Login</h1>
            </div>

            <form className='login-form' onSubmit={handleSubmit}>
                <input className='usernameInput' type="text" placeholder="username" value={username} onChange=
                {(e) => setUsername(e.target.value)}></input> 
                <input className='passwordInput' type="text" placeholder="password" value={password} onChange=
                {(e) => setPassword(e.target.value)}></input>
                <button className="submitButton" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;