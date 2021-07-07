import React, {useState} from "react";
import Styles from "./Style/signPage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ToastContainer ,toast} from 'react-toastify';
import axios from "axios";
import { useHistory} from 'react-router-dom';
import SignIn from './signIn'
import SignUpBackground from "./Photo/signUP.jpg";
import configData from "./config.json";


const SignUp=()=>{

    const w = window.innerWidth;
    const h = window.innerHeight;

    let history =useHistory();

    const loadingLogin=()=>{
        history.push("/")
    }

    const form_Position={
        position:"absolute",
        top:"28%",
        left:"35%",
        right:"30%",
        background: "rgba(185,188,189,0.84)",
        boxShadow:"0 0 10px #ffffff,0 0 40px #ffffff,0 0 80px #ffffff,0 0 150px #fffcfc",
        borderRadius:"5px",
        width:"30%",
        height:"50%"
    }
    const signUpBackground={
        backgroundSize:"cover",
        width: w,
        height: h,
        backgroundColor:"#e2e3e2",
    }

    const Url =configData.SERVER_URL+"/signUp";

    const[formData,setFormData]=useState({
        username:'',
        email:'',
        password:'',
    })

    const Handle=(e)=>{
        console.log(e.target.value)
        const addData ={...formData}
        addData[e.target.id]=e.target.value;
        setFormData(addData)

    }
    const Submit=(e)=>{
        e.preventDefault();

        axios.post(Url,{
            username:formData.username,
            email:formData.email,
            password:formData.password,
        })
            .then(response=>{
                    setFormData({
                        username:'',
                        email:'',
                        password:'',
                    })
                    toast.success(response.data)
                setTimeout(() => loadingLogin(), 2000);

            })
            .catch(err=>{
                setFormData({
                    username:'',
                    email:'',
                    password:'',
                })
                    toast.error(err.response.data)

            })
    }

    const handleSpace=(e)=>{
        if (e.key === " "){
            e.preventDefault();
        }
    }
    return(

            <div style={signUpBackground}>
                <ToastContainer />
                <h1 className={Styles.signInMainTopic}>Create your account </h1>
                <div style={form_Position}>
                    <div className={Styles.signUpContainer}>
                        <button  onClick={loadingLogin}>Login </button>

                    </div>
                    <form className={Styles.signInContainer} onSubmit={e=>Submit(e)}>

                        <input placeholder="userName" id="username" value={formData.username} onChange={e=>{Handle(e)}} onKeyDown={e=>{handleSpace(e)}}/><br/>
                        <input placeholder="email" id="email" value={formData.email} onChange={e=>{Handle(e)}} onKeyDown={e=>{handleSpace(e)}}/><br/>
                        <input type="password" placeholder="password " id="password" value={formData.password} onChange={e=>{Handle(e)}} onKeyDown={e=>{handleSpace(e)}}/><br/>
                        <button type="submit" onSubmit={e=>{Submit(e)}}>Submitted </button>

                    </form>
                </div>
            </div>

    )

}

export default SignUp;