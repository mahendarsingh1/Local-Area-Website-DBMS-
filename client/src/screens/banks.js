import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidenav from '../components/navbar/SideNav'
import Card from '../components/card/Card'
import queryString from 'query-string'






function Banks({ location }) {


    const [banks, setBanks] = useState([]);
    const { id, admin } = queryString.parse(location.search);


    useEffect(() => {
        Axios.get('http://localhost:4000/banks')
            .then(res => {
                setBanks(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])



    return (
        <div className='bank-page'>


            <Sidenav Pid={id} admin={admin} showUserIcon={true} />

            {/* <button onClick={() => enqueueSnackbar('This is a success message!', 'success')} >click</button> */}

            <div style={{ marginLeft: '75px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }} className="bank-page">
                {banks.map((bank) => {

                    return (
                        <Card
                            img={bank.BANK_ID}
                            one={bank.NAME}
                            two={"ID: " + bank.BANK_ID}
                            three={"IFSC: " + bank.IFSC}
                            four={"Branch: " + bank.BRANCH}
                        />)
                })
                }



            </div>
        </div>
    )
}


export default Banks;