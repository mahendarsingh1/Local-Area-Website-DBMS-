import React from 'react'
import UserHome from './UserHome'
import AdminHome from './AdminHome'
import queryString from 'query-string'

function Home({ location }) {

    const { id, admin } = queryString.parse(location.search);
    console.log(admin);

    return (
        <div>

            {(admin === '1' || admin === 1) ? <AdminHome id={id} admin={admin} /> : <UserHome id={id} admin={admin} location={location} />}

                {/* {admin &&    <AdminHome id={id} admin={admin}/>}
                    
                {!admin &&    <UserHome id={id} admin={admin}/>} */}

        </div>
    )
}

export default Home;