import React, {useEffect, useState} from 'react';
import styles from '../Style/bithdayForm.module.css';
import axios from "axios";
import jwt from 'jwt-decode'
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import configData from "../config.json";


const BirthdayForm=()=>{

    let history=useHistory();
    const emailDecode =()=>{
        const  token =localStorage.getItem('user');
        const array = jwt(token);
        return array.user.email;
    }

    // const url ="http://localhost:8000/addUserData";
    const url =`${configData.SERVER_URL}/addUserData`;
    const [ Image , setImage] =useState(null);

    const [ Data, setData] =useState({
        name:'',
        date:'',
    });


    const Handle =(e)=>{

        const newData ={...Data}

        newData[e.target.id] = e.target.value
        setData(newData)


    }
    const HandleImage=(e)=>{
        setImage(e.target.files[0])
    }

    const loadingSignUpPage=()=>{
        history.push("/addData")

    }
    const Submit =(e)=> {
        e.preventDefault()
        const formData = new FormData();

            formData.append("email",emailDecode())
            formData.append( "name",Data.name)
            formData.append( "date",Data.date)
            formData.append( "image",Image)


        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }

        axios.post(url, formData, config)
        // axios.post(url, formData)
            .then(result => {

                // setData({
                //     name:'',
                //     date:'',
                // })
                // setImage(null)
                // // alert(" successfully"+res)
                // console.log(result)
                toast.success(result.data)
                // window.location.reload(false);
                setTimeout(() => window.location.reload(), 3000);
            })
            .catch(err=> {
                // setData({
                //     name:'',
                //     date:'',
                // })
                // console.log(err.response)
                // setImage(null)
                // alert(err.response.data)
                toast.error(err.response.data)
                // window.location.reload(false);
                setTimeout(() => window.location.reload(), 3000);
                })

    }


    return(

        <form className={styles.form}   onSubmit={e=>{Submit(e)}} >

            <h1 className={styles.form_topic}>Enter birthday</h1>

            <label className={styles.form_name_list}>Name</label>

                <input  className={styles.form_input_list} type="text" name="name" id="name" value={Data.name} onChange={(e)=>Handle(e)} /><br/>


            <label className={styles.form_name_list}>Birthday </label>
                <input min='1990-01-01' max='2040-01-01' className={styles.form_input_list} type="date" name="date" id="date" value={Data.date} onChange={(e)=>Handle(e)} /><br/>


            <label className={styles.form_name_list}>Photo </label>
                <input  className={styles.form_input_list}  type="file" name="image" id="image"  accept="image/*"  onChange={(e)=>HandleImage(e)} /><br/>


            <button className={styles.submit_btn} type="submit" >ADD </button>

        </form>
    )
}
export default BirthdayForm