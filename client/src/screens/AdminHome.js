import React, { useState } from 'react'
import Navbar from '../components/navbar/NavbarHome'
import PersonRemove from '../components/modal/admin/PersonRemove'
import PersonAdmin from '../components/modal/admin/PersonAdmin'
import BankAdd from '../components/modal/admin/BankAdd'
import BankRemove from '../components/modal/admin/BankRemove'
import HospitalAdd from '../components/modal/admin/HospitalAdd'
import HospitalRemove from '../components/modal/admin/HospitalRemove'
import HouseAdd from '../components/modal/admin/HouseAdd'
import HouseRemove from '../components/modal/admin/HouseRemove'
import SchoolAdd from '../components/modal/admin/SchoolAdd'
import SchoolRemove from '../components/modal/admin/SchoolRemove'
import Card from '../components/card/CardAdmin'


// import queryString from 'query-string'

function AdminHome({ id, admin }) {

    const [show, setShow] = useState({
        persons: 0,
        banks: 0,
        schools: 0,
        hospitals: 0,
        houses: 0,
    })

    // const {id,admin} = queryString.parse(location);

    const handle = (key, number) => {
        setShow((prev) => ({ ...prev, [key]: number }))
    }

    const handleClose = () => {
        setShow({
            persons: 0,
            banks: 0,
            schools: 0,
            hospitals: 0,
            houses: 0,
        });
    }

    return (
        <div className="admin-home">
            <Navbar />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {['persons', 'schools', 'banks', 'hospitals', 'houses'].map((key,index) => {
                    return (
                        <Card
                            ind={index}
                            img={key}
                            heading={key}
                            button={true}
                            click={handle}
                            close={handleClose}
                            id={id}
                            admin={admin}
                        />
                    )
                })}
            </div>


            {show.persons === 1 && <PersonRemove close={handleClose} />}
            {show.persons === 2 && <PersonAdmin Pid={id} close={handleClose} />}
            {show.banks === 1 && <BankRemove close={handleClose} />}
            {show.banks === 2 && <BankAdd close={handleClose} />}
            {show.schools === 1 && <SchoolRemove close={handleClose} />}
            {show.schools === 2 && <SchoolAdd close={handleClose} />}
            {show.hospitals === 1 && <HospitalRemove close={handleClose} />}
            {show.hospitals === 2 && <HospitalAdd close={handleClose} />}
            {show.houses === 1 && <HouseRemove close={handleClose} />}
            {show.houses === 2 && <HouseAdd close={handleClose} />}

        </div>
    )

}

export default AdminHome;