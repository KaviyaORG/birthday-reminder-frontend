import React, {useEffect, useState} from 'react';
import axios from "axios";
import AddBirthdayBackground from "../Photo/addBirthdayBG.jpg";
import DataList from '../views/DataList';
import BirthdayForm from '../views/BirthdayForm';
import App from "../App";
import {ToastContainer} from "react-toastify";
import configData from "../config.json";


const AddData=()=>{
    const w = window.innerWidth;
    const h = window.innerHeight;
    const form_Position ={
        position:"absolute",
        top:"10%",
        left:"20%",
        width:"500px",
        height:"500px",
        background: "rgba(241,202,154,0.51)",
        borderRadius:"30px",
        border:"2px black solid",
        boxShadow:"0 0 10px #000000,0 0 40px #000000,0 0 180px #ffffff,0 0 250px #ffffff"

    }
    const table_position ={
        position:"absolute",
        top:"13%",
        right:"10%",
        left:"55%",
        width:"550px",
        height:"450px",


    }
    const sectionStyle = {
        backgroundSize:"cover",
        width: w,
        height: h,
        backgroundImage: `url(${AddBirthdayBackground})`,

    };
    const [db,setDb] =useState(null);
    const Url =configData.SERVER_URL+"/addUserData";

    useEffect(() => {
        const AuthStr = 'Bearer '.concat(localStorage.getItem('user'));
        axios.get(Url, { headers: { Authorization: AuthStr } })
            .then(res=>{setDb(res.data.results)})
            .catch((error) => {
                console.log('error ' + error);
            });
    },[])

    return(
        <div className="data_container" style={sectionStyle} >
            <ToastContainer />
            <App />
            <div className="dat_form" style={form_Position}>

                <BirthdayForm />

            </div>
            { db && <div className="data_list" style={table_position}>

                { db && <DataList data={db} /> }
            </div> }
        </div>
    )
}
export default AddData