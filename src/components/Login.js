import React, {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("username:", username)
        console.log("password:", password)
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
            console.log(response)
            const data = await response.json();
            console.log('data:', data)
            console.log('token:', data.token)
            // if (data.token) {
            //     setIsLoggedIn(true)
            // }
            // setToken(data.token)
            // history.push('/')
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='login-body'>
            <div>
                <h1>User Login</h1>
            </div>
            <form className='login-form' onSubmit={handleSubmit}>
                <input type="text" placeholder="username" value={username} onChange=
                {(e) => setUsername(e.target.value)}></input> 
                <input type="text" placeholder="password" value={password} onChange=
                {(e) => setPassword(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;