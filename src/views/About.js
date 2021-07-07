import React from 'react';
import App from "../App";
import Propic from "../Photo/aboutPageProPic.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin} from '@fortawesome/free-brands-svg-icons'
import Styles from "../Style/about.module.css";


const About=()=> {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const mainContainerPosition={
        position:"absolute",
        top:"25%",
        left:"23%",
        right:"30%",
        boxShadow:"0 0 10px #ffffff,0 0 40px #ffffff,0 0 100px #ffffff,0 0 250px #fffcfc",
        width:"50%",
        height:"60%",

    }
    const mainBg={
        width: w,
        height:h,
        backgroundColor:"#c9c7c9",
    }
    const pro_pic={
        position:"absolute",
        top:"-10%",
        left:"-10%",
        background: "rgba(231,170,238,0.51)",
        backgroundImage: `url(${Propic})`,
        backgroundSize:"cover",
        width:"40%",
        height:"75%",

    }

    const my_details={
        position:"absolute",
        left:"40%",
        borderRadius:"5px",
        width:"50%",
        height:"60%"
    }

    const socialMediaLink={
        position:"absolute",
        top:"65%",
        left:"0%",
        borderRadius:"5px",
        width:"100%",
        height:"30%"
    }
    return (
        <div  style={ mainBg }>
            <App />
            <div className={Styles.main_container} style={mainContainerPosition}>
                    <div className={Styles.proPic} style={pro_pic}>

                    </div>

                    <div className="my_details" style={my_details}>
                        <h1 className={Styles.mainTopic} >Hi   I'm <br/><span className={Styles.firstName}>kavishka</span> Ganewattha</h1>
                        <hr className={Styles.hrLine}/>
                        <h2 className={Styles.secondTopic}>I'm freelance web developer</h2>

                        <p className={Styles.paragraph}>
                            This website you can reminder your friends birthdays<br/>
                            you can see the notification before your friends birthdays
                        </p>
                    </div>

                    <div className="my_social_media_link" style={socialMediaLink}>

                        <a className={Styles.link} href="https://github.com/KaViShKa99"><FontAwesomeIcon className={Styles.github_logo} icon={faGithub} /></a>
                        <a className={Styles.link} href="https://www.linkedin.com/in/kavishka-ganewattha-1813661a6/"> <FontAwesomeIcon className={Styles.linkendin_logo} icon={faLinkedin} /></a>


                    </div>
            </div>
        </div>
    )

}
export default About