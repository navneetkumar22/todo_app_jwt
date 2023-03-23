import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const loginUser = async (e) => {
        e.preventDefault()

       
    }



    return (
        <div className='login-div'>
            <div className="form-div">
                <h1>Login</h1>
                <form className='login-form' action="">
                    <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                    <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                    <button type="submit" onClick={loginUser}>Submit</button>
                </form>
                <h4>Don't have an account?</h4>
                <div className="social">
                    <button className='register'>Create an account</button>
                </div>
            </div>
        </div>
    )
}

export default Login;