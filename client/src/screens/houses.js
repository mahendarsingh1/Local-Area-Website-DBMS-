import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidenav from '../components/navbar/SideNav'
import Card from '../components/card/Card'
import queryString from 'query-string'
import { useSnackbar } from 'notistack';



function Houses({ location }) {

    const { enqueueSnackbar } = useSnackbar();
    const [houses, setHouses] = useState([]);
    const { id, admin } = queryString.parse(location.search);


    useEffect(() => {
        axios.get('http://localhost:4000/houses')
            .then(res => {
                setHouses(res.data)
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar("Error occured", { variant: 'error' });
            })
    }, [])
    return (
        <div className="house-page">
            <Sidenav Pid={id} admin={admin} showUserIcon={true} />
            <div style={{ marginLeft: '75px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }} >
                {houses.map((house) => {

                    return (
                        <Card
                            img={house.HOUSE_ID}
                            one={house.NAME}
                            two={"ID: "+house.HOUSE_ID}
                            three={house.ADDRESS}
                            four={house.RENT + "$ Rent"}
                            five={house.BHK + " BHK"}
                        />)
                })
                }
            </div>
        </div>
    )
}

export default Houses;