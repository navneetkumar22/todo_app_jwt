import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    // sign up
    const signupUser = async (e) => {
        e.preventDefault()



    }


    return (
        <div className='login-div'>
            <div className="form-div">
                <h1>Sign Up</h1>
                <form className='login-form' action="">
                    <input type="text" id='name' name='name' placeholder='Name' onChange={(e) => { setUser({ ...user, name: e.target.value }) }} />
                    <input type="email" id='email' name='email' placeholder='Email' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                    <input type="password" id='password' name='password' placeholder='Password' onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                    <button type='submit' onClick={signupUser}>Submit</button>
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