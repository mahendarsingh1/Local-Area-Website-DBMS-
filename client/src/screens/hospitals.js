import React from 'react';
import Sidenav from '../components/navbar/SideNav'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Card from '../components/card/Card'
import queryString from 'query-string'
import { useSnackbar } from 'notistack';



function Hospitals({ location }) {

    const { enqueueSnackbar } = useSnackbar();
    const [hospitals, setHospitals] = useState([]);
    const { id, admin } = queryString.parse(location.search);


    useEffect(() => {
        axios.get('http://localhost:4000/hospitals')
            .then(res => {
                setHospitals(res.data)
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar("Error occured", { variant: 'error' });
            })
    }, [])

    return (
        <div className="hospital-page">
            <Sidenav Pid={id} admin={admin} showUserIcon={true} />
            <div style={{ marginLeft: '75px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }} >
                {hospitals.map((hospital) => {

                    return (
                        <Card
                            img={hospital.HOSPITAL_ID}
                            one={hospital.NAME}
                            two={"ID: "+hospital.HOSPITAL_ID}
                            three={hospital.ADDRESS}
                            four={"Phone: " + hospital.PHONE}
                        />)
                })
                }
            </div>
        </div>
    )
}

export default Hospitals;