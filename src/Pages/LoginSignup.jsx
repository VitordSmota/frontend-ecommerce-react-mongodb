import React, { useState } from "react";
import './CSS/LoginSignup.css'
const LoginSignup = () => {

    const [state, setState] = useState("Login");
    
    let isAdmin;

    const login = async () => {
        console.log("Login Function Executed", formData)
        let responseData;
        await fetch('https://api-ecommerce-react-mongodb.onrender.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json())
            .then((data) => responseData = data)
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
            isAdmin = (responseData.id === "664b84edaf0be7bb55592d9c" || responseData.id === "66654bc6347a110f4d132c85a")
            localStorage.setItem('id', isAdmin);

        }
        else {
            alert(responseData.errors)
        }
    }
    
    const signup = async () => {
        console.log("Sign up Function Executed", formData)

        let responseData;
        await fetch('https://api-ecommerce-react-mongodb.onrender.com/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json())
            .then((data) => responseData = data)
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
            isAdmin = (responseData.id === "664b84edaf0be7bb55592d9c")
            localStorage.setItem('id', isAdmin);
        }
        else {
            alert(responseData.errors)
        }
    }

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email:""
    })

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />:<></>}  
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <button onClick={()=>{state ==="Login"? login(): signup()}}>Continue</button>
 
                {state === "Sign Up" ?
                    <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span> </p>
                    : <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up")}}>Click here</span> </p>}  
 
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}
export default LoginSignup