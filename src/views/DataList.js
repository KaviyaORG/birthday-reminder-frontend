import React, { useState} from 'react';
import MaterialTable from 'material-table'
import axios from "axios";
import jwt from 'jwt-decode'
import {toast} from "react-toastify";
import configData from "../config.json";

function StickyHeadTable({data}) {


    const emailDecode =()=>{
        const  token =localStorage.getItem('user');
        const array = jwt(token);
        return array.user.email;
    }
    const styles ={
        profileImage:{
            width:"50px",
            height:"50px",
            borderRadius:"50%",
            border:"solid white"
        }
    }

    const [state, setState] = useState({


        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Birth Year', field: 'birthYear' },
            // { title: 'Image', field: 'image' },
        ],
        data: [ ],
    });
    {data.map((row)=>{
       state.data.push({
           name: row.name,
           birthYear: row.birthday,
           id:row._id,
           imageName:row.imageName,
           // image: <img style={styles.profileImage} src={row.image} alt=""  />
       })

    })}

    /////////////////////////////////////////////////////////////////////

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={state.columns}
                // data={data}
                data={state.data}
                title="Birthdays"
                options={{
                    pageSize:5,
                    pageSizeOptions:[5],    // rows selection options
                }}
                editable={
                    {
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...state.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    setState({ ...state, data });
                                }, 600);

                                axios.delete(configData.SERVER_URL+`/addUserData/delete/${oldData.id}?path=${oldData.imageName}&user=${emailDecode()}`)
                                    .then(response=>{
                                        toast.success("Delete successfully")
                                        setTimeout(() => window.location.reload(), 500);
                                    })
                                    .catch(err=>{
                                        toast.error("try again...")
                                        setTimeout(() => window.location.reload(), 500);
                                    })


                            }),
                    }
                }
            />
        </div>
        )


}
export default StickyHeadTable;

