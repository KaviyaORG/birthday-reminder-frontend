import React, {useState} from "react";
import {Switch,Route,Link ,useHistory} from "react-router-dom";
import Styles from "./Style/findPassword.module.css";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {authenticate,isAuth} from "./helpers/auth";
import configData from "./config.json";


const Find_password=()=>{
    const w = window.innerWidth;
    const h = window.innerHeight;
    const form_Position={
        position:"absolute",
        top:"28%",
        left:"35%",
        right:"30%",
        background: "rgba(185,188,189,0.84)",
        boxShadow:"0 0 10px #ffffff,0 0 40px #ffffff,0 0 80px #ffffff,0 0 150px #fffcfc",
        width:"30%",
        height:"40%"
    }
    const signUpBackground={
        width: w,
        height: h,
        backgroundSize:"cover",
        backgroundColor:"#e2e3e2",

    }
    let history=useHistory();
    const loadingSignUpPage=()=>{
        history.push("/")
        window.location.reload(false)
    }

    const Url =configData.SERVER_URL+"/getPassword";

    const[formData,setFormData]=useState({
        email:''
    })

    const Handle=(e)=>{

        const addData ={...formData}
        addData[e.target.id]=e.target.value;
        setFormData(addData)


    }
    const Submit=(e)=>{
        e.preventDefault();

        const email ={email:formData.email}

        axios.post(Url,email)
            .then(response=>{
                authenticate(response,()=>{
                    setFormData({
                        email:'',

                    })
                })
                toast.success(response.data.message)
            })

            .catch(err=>{
                setFormData({email:''})
                toast.error(err.response.data.err)

            })

    }

    return(
         <div style={signUpBackground}>
            <ToastContainer />
             <h1 className={Styles.forgotPassword}>Getting a forgot password</h1>
            <div style={form_Position}>
                <div className={Styles.findPasswordContainer}>
                    <button onClick={loadingSignUpPage} >Login </button>


                </div>
                <form className={Styles.signInContainer} onSubmit={e=>Submit(e)}>

                    <input placeholder="email" id="email" value={formData.email} onChange={e=>{Handle(e)}}/><br/>

                    <button type="submit" >Send email </button>
                </form>
            </div>
        </div>

    )

}

export default Find_password;