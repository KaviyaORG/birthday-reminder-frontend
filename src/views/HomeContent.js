import React,{useState} from 'react';
// import {dataBase} from '../Data/DataSet'
import styles from '../Style/homecontent.module.css';

const Content=( {people ,remove})=>{

    return<>
        <div className={styles.notification_topic}>
            <h1>{people.length} birthdays today</h1>
        </div>
        {
            people.map((person) => {

                const {id, name ,image ,years} = person
                return (

                    <div className={styles.middle_content} key={id}>

                            <img className={styles.propic} src={image} alt="photo"/>
                            <h1 className={styles.name}>{name}</h1>
                            <h1 className={styles.years}>{years}</h1>
                            <button className={styles.btn} onClick={() => remove(id)}>Dismiss</button>

                    </div>
                )

            })
        }
    </>
}
export default  Content