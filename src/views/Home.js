import React,{useEffect ,useState} from 'react';
import HomeBackgroundImage from '../Photo/HBDbackground.jpg'
import HomeContent from './HomeContent'
import App from "../App";
import axios from "axios";
import configData from "../config.json";
const Home=()=>{
    const w = window.innerWidth;
    const h = window.innerHeight;

    const sectionStyle = {
        // backgroundRepeat:"no-repeat",
        // backgroundPosition:"center",
        backgroundSize:"cover",
        width: w,
        height:h,
        backgroundImage: `url(${HomeBackgroundImage})`
    };

/////////////////////////////////////////////////////////////////////////////
    const [data,setData] =useState(null);

    // useEffect(()=>{
    //     fetch('http://localhost:8000/home')
    //         .then(res=>
    //         {return res.json()
    //         })
    //         .then(d=>
    //             {setData(d)}
    //         );
    //
    // },[]);
    const Url =`${configData.SERVER_URL}/home`;

    useEffect(() => {
        const AuthStr = 'Bearer '.concat(localStorage.getItem('user'));
        axios.get(Url, { headers: { Authorization: AuthStr } })
            .then(res=>{setData(res.data)})
            .catch((error) => {
                console.log('error ' + error);
            });
    },[])

    const remove = (id) => {
        let newPerson = data.filter((cv) => cv.id !== id);
        console.log(data)
        setData(newPerson)
    }
    ///////////////////////////////////////////////
    return(
        <div  style={ sectionStyle } >
            <App />
            <div >
                { data && < HomeContent people={data} remove={remove} /> }
            </div>
        </div>
    )
}
export default Home