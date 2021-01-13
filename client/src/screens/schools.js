import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidenav from '../components/navbar/SideNav'
import Card from '../components/card/Card'
import queryString from 'query-string'
import { useSnackbar } from 'notistack';


function Schools({ location }) {

    const { enqueueSnackbar } = useSnackbar();
    const [schools, setSchools] = useState([]);

    const { id, admin } = queryString.parse(location.search);
    useEffect(() => {
        axios.get('http://localhost:4000/schools')
            .then(res => {
                setSchools(res.data)
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar("Error occured", { variant: 'error' });
            })
    }, [])
    return (
        <div className="school-page">
            <Sidenav Pid={id} admin={admin} showUserIcon={true} />
            <div style={{ marginLeft: '75px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }} >
                {schools.map((school) => {

                    return (
                        <Card
                            img={school.SCHOOL_ID}
                            one={"Name: " + school.NAME}
                            two={"ID: " + school.SCHOOL_ID}
                            three={"ADRESS: " + school.ADDRESS}
                            four={"Contact: " + school.PHONE}
                        />)
                })
                }
            </div>
        </div>
    )
}

export default Schools;