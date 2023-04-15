import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
const serverDomain = "https://todo-app-dc70.onrender.com";

function Signup() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const submitData = async () => {
        const data = { name: userName, email: userEmail, password: userPassword }
        try {
            await axios.post(`${serverDomain}/register`, data)
                .then(resp => { return resp.data })
                .then((result) => {
                    console.log("result ", result);
                    if (result.success) {
                        localStorage.setItem("token", result.token)
                        window.alert(result.message);
                        navigate('/');
                    }
                })

        } catch (error) {
            console.log(error)
        }
    }

    // sign up
    const signupUser = async (e) => {
        e.preventDefault()
        submitData();

        setUserName('');
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
                <p>Please register to add todo</p>
            </div>
            <div className='login-div'>
                <div className="form-div">
                    <h1>Sign Up</h1>
                    <form className='login-form' onSubmit={signupUser}>
                        <input type="text" id='name' name='name' placeholder='Name' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                        <input type="email" id='email' name='email' placeholder='Email' value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} />
                        <input type="password" id='password' name='password' placeholder='Password' value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} />
                        <button type='submit'>Submit</button>
                    </form>
                    <h4>Already have an account?</h4>
                    <div className="social">
                        <Link to="/"><button className='register'>Login</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;