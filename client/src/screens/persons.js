import React, { useEffect, useState } from 'react';
import Card from '../components/card/Card'
import Sidenav from '../components/navbar/SideNav';
import axios from 'axios';
import queryString from 'query-string'


function Persons({ location }) {


    const [persons, setPersons] = useState([]);
    const { id, admin } = queryString.parse(location.search);


    useEffect(() => {
        axios.get('http://localhost:4000/persons')
            .then(res => {
                setPersons(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div className="person-page">
            <Sidenav Pid={id} admin={admin} showUserIcon={true} />
            <div style={{ marginLeft: '75px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }} >
                {persons.map((person) => {

                    return (
                        <Card
                            img={person.SEX ? person.SEX : null}
                            one={"Name: " + person.NAME}
                            two={person.EMAIL.toLowerCase()}
                            three={person.SEX ? "Sex: " + person.SEX : null}
                            four={person.BDATE ? "Born on: " + person.BDATE.toString().substring(0, 10) : null}
                            five={person.SALARY ? "Salary: $" + person.SALARY : null}
                        />)
                })
                }


            </div>
        </div>
    )
}

export default Persons;