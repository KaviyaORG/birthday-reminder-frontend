import React, {useState} from "react";
import configData from "./config.json";
import {Switch,Route,Link ,useHistory} from "react-router-dom";
import Styles from "./Style/signPage.module.css";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {authenticate,isAuth} from "./helpers/auth";



const SignIn=()=>{
    const w = window.innerWidth;
    const h = window.innerHeight;
    let history=useHistory();

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
    const signInBackground={
        width: w,
        height: h,
        backgroundSize:"cover",
        backgroundColor:"#e2e3e2",

    }
    const loadingSignUpPage=()=>{
        history.push("/signUp")
    }

    const Url =configData.SERVER_URL+"/signIn";


    const[formData,setFormData]=useState({
        email:'',
        password:'',
    })

    const Handle=(e)=>{

        const addData ={...formData}
        addData[e.target.id]=e.target.value;
        setFormData(addData)

    }
    const Submit=(e)=>{
        e.preventDefault();

        axios.post(Url,{
            email:formData.email,
            password:formData.password
        })
            .then(response=>{


                authenticate(response,()=>{
                    setFormData({
                        email:'',
                        password:'',
                    })
                })
                toast.success(response.data)
                isAuth() ? history.push('/home'):history.push('/signUp')
            })

            .catch(err=>{
                setFormData({
                    email:'',
                    password:'',
                })
                toast.error(err.response.data)})

    }
    const handleSpace=(e)=>{
        if (e.key === " "){
            e.preventDefault();
        }
    }

    return(
        <div style={signInBackground}>
            <ToastContainer />
            <h1 className={Styles.signInMainTopic}><span className={Styles.B_letter}>B</span>irthday reminder</h1>
           <div style={form_Position}>

               <div className={Styles.signUpContainer}>
                   <button onClick={loadingSignUpPage} >Sign-up </button>

               </div>
               <form className={Styles.signInContainer} onSubmit={e=>Submit(e)}>
                   <h5>or sign-in with e-mail</h5>
                   <input placeholder="email" id="email" value={formData.email} onChange={e=>{Handle(e)}} onKeyDown={e=>{handleSpace(e)}}/><br/>
                   <input type="password" placeholder="password" id="password" value={formData.password} onChange={e=>{Handle(e)}} onKeyDown={e=>{handleSpace(e)}}/><br/>
//                    <h6> <Link to="/findPassword">Forgot password </Link></h6>
                   <button type="submit">Sign-in </button>
               </form>
           </div>
        </div>
        )

}

export default SignIn;
