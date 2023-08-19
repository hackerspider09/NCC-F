import React from 'react';
import './login.css';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import { AxiosInstance } from '../../Utils/AxiosConfig';
import { getToken } from '../../Utils/utils';
import {  toast } from 'react-toastify';
const endPoint = "/api/login/" 

export default function Login() {
    
    const navigate = useNavigate()
    const defaultCredentials ={
        username: "",
        password: "",
    }
    const [Logincred,setLogincred] = useState(defaultCredentials);

    const handleChange = (event) => {
        const Uname = event.target.name;
        const passw = event.target.value;
        setLogincred({ ...Logincred, [Uname]: passw.trim() });
    
    }
    
    const submitLoginForm = (e) => {
        e.preventDefault();
        userlogin(Logincred);
    
    }


        const userlogin = (loginPayload)=>{
            console.log("enter in login");
            const id = toast.loading("Please wait...");
            // toast.dark('This is Toast Notification for Dark');
            // toast.info('This is Toast Notification for Dark');
            // toast.success('This is Toast Notification for Dark');
            // toast.warn('This is Toast Notification for Warn');
            // toast.error('This is Toast Notification for Error');
            
            setTimeout(() => {

            AxiosInstance.post(endPoint,loginPayload)
            .then((response) => {
                console.log("enter in then ");
                if (response.status) {
                    console.log("enter in then if ");
                    localStorage.setItem("isLogin", true);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("isJunior", response.data.isJunior);
                    navigate("/instruction");
                    toast.update(id, { render: "Logged in successfully !", type: "success", isLoading: false, autoClose:3000 })
                
                }
                else {
                    toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                    console.log("login failed");
                }
            })
            .catch((error) => {
                toast.update(id, { render: "User Not Found", type: "error", isLoading: false, autoClose:3000 })
                console.log("enter in error ",error.response);
            
                setLogincred(Logincred)
            })
        }, 1000)

    }

//  const handleChange =(e) => {}
        
return (
    <>
    <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={submitLoginForm}>
            <div className="user-box">
                <input type="text" name="username" required="true" onChange={handleChange} />
                <label>Username</label>
            </div>
            <div className="user-box">
                <input type="password" name="password" required="true" onChange={handleChange} />
                <label>Password</label>
            </div>


            <div className="im-buttons">
                <label className="radio" id="a-button">
                    <input name="im-buttons" type="radio" id="a-button" checked="checked" />
                    <span>Junior</span></label><label className="radio" id="b-button"><input name="im-buttons"
                        type="radio" id="b-button" /><span>Senior</span></label></div>
            <button className="login-btn" type='submit' >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login
            </button>
        </form>
    </div>
    <div className="clear"></div>
    </>
    )
}




// const [isError, setIsError] = useState("");




// const loginEndpoint = "/api/login/";

// useEffect(() =>{
//     try{
//         axios
//         .get(loginEndpoint)
//         .then((res) =>{
//          if(res.data.success){
//            setLogincred(res.data);
//            localStorage.setItem("token", res.data.token);
//         }
//        })
//     } catch(error){
//         setIsError(error.message);
//     }


    
// },[]);