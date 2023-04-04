import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const submitData = async () => {
        const data = { name: userName, email: userEmail, password: userPassword }
        try {
            await axios.post("http://localhost:4000/register", data)
                .then(resp => { return resp.data })
                .then((result) => {
                    console.log("result ", result);
                    if (result.success) {
                        localStorage.setItem("token", result.token)
                        window.alert(result.message);
                        navigate('/dashboard');
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
                    <button className='register'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;