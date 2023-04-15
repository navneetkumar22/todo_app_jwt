import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const serverDomain = "https://todo-app-dc70.onrender.com";

function Login() {
    const navigate = useNavigate('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const submitData = async () => {
        const data = { email: userEmail, password: userPassword }

        await axios.post(`${serverDomain}/login`, data)
            .then(resp => { return resp.data })
            .then((result) => {
                console.log("result ", result);
                if (result.success) {
                    localStorage.setItem("token", result.token)
                    window.alert(result.message);
                    navigate('/dashboard');
                }
            })
            .catch((err)=> console.log(err))
    }
    const loginUser = async (e) => {
        e.preventDefault()
        submitData();

        setUserEmail('');
        setUserPassword('');
    }



    return (
        <>
            <div className="todo-app">
                <h1>Todo Application</h1>
            </div>
            <div className="topbar">
                <h2>Welcome Guest</h2>
                <p>Please login to add todo</p>
            </div>

            <div className='login-div'>
                <div className="form-div">
                    <h1>Login</h1>
                    <form className='login-form' action="">
                        <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => { setUserEmail(e.target.value) }} />
                        <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => { setUserPassword(e.target.value) }} />
                        <button type="submit" onClick={loginUser}>Submit</button>
                    </form>
                    <h4>Don't have an account?</h4>
                    <div className="social">
                        <Link to="/signup"><button className='register'>Create an account</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;