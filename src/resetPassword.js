import React, {useEffect, useState} from "react";
import {Switch,Route,Link ,useHistory} from "react-router-dom";
import Styles from "./Style/signPage.module.css";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import { isAuth, signout} from "./helpers/auth";
import configData from "./config.json";


const ResetPassword=({match})=>{
    const w = window.innerWidth;
    const h = window.innerHeight;
    let history=useHistory();

    const form_Position={
        position:"absolute",
        top:"28%",
        left:"35%",
        right:"30%",
        // background: "rgba(145,179,229,0.51)",
        background: "rgb(143,229,147)",
        // backgroundColor:"#6495ED",
        boxShadow:"0 0 10px #ffffff,0 0 40px #ffffff,0 0 80px #ffffff,0 0 150px #fffcfc",
        borderRadius:"5px",
        width:"30%",
        height:"50%"
    }
    const signUpBackground={
        width: w,
        height: h,
        backgroundSize:"cover",
        // backgroundImage: `url(${loginBckground})`
        backgroundColor:"#e2e3e2",

    }

    const loadingSignUpPage=()=>{
        history.push("/signUp")
        // window.location.reload(false)
    }

    const loadingHomePage=()=>{
        history.push("/home")
    }

    const Url =configData.SERVER_URL+"/updatePassword";

    const[formData,setFormData]=useState({
        email:'',
        password:'',
        token:''
    })
    const SignOut =()=>{
        signout()
        history.push("/")
    }

    const Handle=(e)=>{

        const addData ={...formData}
        addData[e.target.id]=e.target.value;
        setFormData(addData)

    }

    const handleSpace=(e)=>{
        if (e.key === " "){
            e.preventDefault();
        }
    }
    useEffect(()=>{

        let token =match.params.token
        if (token){
            setFormData({...formData,token})
        }
    },[])
    const Submit=(e)=>{
        e.preventDefault();

        axios.put(Url,{
            email:formData.email,
            password:formData.password,
            token:formData.token
        })
            .then(response=>{
                    setFormData({
                        email:'',
                        password:'',
                    })
                toast.success(response.data)
                setTimeout(() => isAuth() ? SignOut():history.push('/signUp'), 3000);
            })
            .catch(err=>{
                setFormData({
                    email:'',
                    password:'',
                })
                toast.error(err.response.data)});
    }

    return(
        <div style={signUpBackground}>
            <ToastContainer />
            <h1 className={Styles.signInMainTopic}><span className={Styles.B_letter}>R</span>eset password</h1>
            <div style={form_Position}>
                <div className={Styles.signUpContainer}>
                    <h2 className={Styles.resetPasswordFormTopic}>Enter your new password</h2>
                </div>
                <form className={Styles.signInContainer} onSubmit={e=>Submit(e)}>
                    <input placeholder="email" id="email" value={formData.email} onChange={e=>{Handle(e)}} onKeyDown={e=>{handleSpace(e)}}/><br/>
                    <input type="password" placeholder="password" id="password" value={formData.password} onChange={e=>{Handle(e)}} onKeyDown={e=>{handleSpace(e)}}/><br/>
                    <button type="submit">Update password </button>
                </form>
            </div>
        </div>
    )

}

export default ResetPassword;