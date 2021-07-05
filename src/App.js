import React, {useState} from 'react';
import {Route, Switch, Link, useRouteMatch, useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Home from './views/Home'
import AddData from './views/AddData'
import About from './views/About'
import {signout} from "./helpers/auth";
import jwt from "jwt-decode";

const App=()=>{
    const [exit,setMenu]=useState("bars");
    const [btnId,setBtnId]=useState(true);
    const [hide,setHide]=useState("none");
    const [bgColor,setbgColor]=useState("");

    function clickMenu() {
        if (btnId){
            setBtnId(false)
            setMenu("times")
            setHide("block")
            setbgColor("#d0b991")

        }else {
            set()
        }

    }
    function set() {
        setBtnId(true)
        setMenu("bars")
        setHide("none")
        setbgColor("")
    }
    // const linkStyle = {
    //     margin: "1rem",
    //     textDecoration: "none",
    //     color: 'black',
    // }
    const linkStyle = {
        margin: "1rem",
        fontSize:"1em",
        textDecoration: "none",
        color: 'black',

    }
    let history=useHistory();

    const SignOut =()=>{
        signout()
        history.push("/")
        // window.location.reload(false)
    }
    const userName =()=>{
        const  token =localStorage.getItem('user');
        const array = jwt(token);
        return "Hii, "+array.user.username;
    }

    return(
        <div >
            <div className='menu_container' style={{backgroundColor:`${bgColor}`} }  onMouseLeave={ set } >
                <button className='menu_btn'  onClick={clickMenu} value={btnId}><FontAwesomeIcon  icon={`${exit}`}/></button>

                <div className='account_info' style={{display:`${hide}`}}>
                    <h1>{userName()} </h1>
                </div>

                <ul className='menu_items' style={{display:`${hide}`}}>

                        <li><Link to='/home' style={linkStyle}>Home</Link></li>
                        <li><Link to='/addData' style={linkStyle}>AddBirthday</Link></li>
                        <li><Link to='/about' style={linkStyle}>About</Link></li>
                        {/*<li><Link to='/signUp' style={linkStyle}>Sign Up</Link></li>*/}
                        {/*<li><Link to='/' style={linkStyle} onClick={SignOut()} >Log out</Link></li>*/}
                        <li><Link to='/' style={linkStyle}>Login</Link></li>
                        <button style={linkStyle} onClick={SignOut} >Log out </button>

                </ul>
            </div>
        </div>
    )
}


export default App;
