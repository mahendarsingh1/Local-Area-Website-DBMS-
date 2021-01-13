import React, { useEffect, useState } from 'react';
import SideNav from '../components/navbar/SideNav'
// import queryString from 'query-string'
import axios from 'axios';
import Card from '../components/card/Card'
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import PersonalInfoUpdateForm from '../components/modal/PersonalInfoUpdate'
import SchoolInfoAdd from '../components/modal/SchoolInfoAdd'
import BankInfoAdd from '../components/modal/BankInfoAdd'
import HouseUpdate from '../components/modal/houseUpdateForm'
import HospitalAddForm from '../components/modal/HospitalAddForm'
import OwnHouseAddForm from '../components/modal/OwnHouseAddForm'

// import Navbar from '../components/navbar/NavbarHome'
import { useSnackbar } from 'notistack';




function UserHome({ id, admin, location }) {
    const { enqueueSnackbar } = useSnackbar();

    const [Pid, setId] = useState([]);
    const [personalInfos, setPersonalInfo] = useState([]);
    const [HouseInfo, setHouseInfo] = useState([]);
    const [HospitalInfos, setHospitalInfos] = useState([]);
    const [BankInfos, setBankInfos] = useState([]);
    const [SchoolInfos, setSchoolInfos] = useState([]);
    const [OwningInfos, setOwningInfos] = useState([]);

    //MODALS
    const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);
    const [showSchoolAddForm, setShowSchoolAddForm] = useState(false);
    const [showBankAddForm, setShowBankAddForm] = useState(false);
    const [showHouseUpdateForm, setShowHouseUpdateForm] = useState(false);
    const [showHospitalAddForm, setShowHospitalAddForm] = useState(false);
    const [showOwnHouseAddForm, setShowOwnHouseAddForm] = useState(false);

    //PASSING AS PROPS
    const handleClosePersonalUpdateForm = () => setShowPersonalInfoForm(false);
    const handleCloseSchoolAddForm = () => setShowSchoolAddForm(false);
    const handleCloseBankAddForm = () => setShowBankAddForm(false);
    const handleCloseHouseUpdateForm = () => setShowHouseUpdateForm(false);
    const handleCloseHospitalAddForm = () => setShowHospitalAddForm(false);
    const handleCloseOwnHouseAddForm = () => setShowOwnHouseAddForm(false);


    const updatePersonalInfo = (arr) => setPersonalInfo(arr);
    const updateSchoolInfo = (arr) => setSchoolInfos(arr);
    const updateHospitalInfo = (arr) => setHospitalInfos(arr);
    const updateHouseInfo = (arr) => setHouseInfo(arr);
    const updateBankInfo = (arr) => setBankInfos(arr);
    const updateOwnHouseInfo = (arr) => setOwningInfos(arr);




    // const { id,admin } = queryString.parse(location.search);
    useEffect(() => {
        setId(id);

        axios.post('http://localhost:4000/home', {
            Pid: Pid
        })
            .then(res => {
                console.log(res)
                if(res.data!=='ERROR'){

                    const { personalInfo, schoolInfo, houseInfo, hospitalInfo, bankInfo, houseOwnInfo } = res.data;
                    setPersonalInfo(personalInfo);
                    setSchoolInfos(schoolInfo);
                    setHouseInfo(houseInfo);
                    setHospitalInfos(hospitalInfo);
                    setBankInfos(bankInfo);
                    setOwningInfos(houseOwnInfo);
                }
            })
            .catch(err => {
                enqueueSnackbar("Error occured", { variant: 'error' });
            })

    }, [Pid, location]);


    // const name = "mahendar"



    return (
        <div className="home-page">
            <SideNav Pid={Pid} admin={admin} showUserIcon={false} />
            <div style={{ marginLeft: '75px' }}>
                <h1 style={{ textAlign: "center", marginRight: "5%" ,color:'white'}}>Dashboard</h1>
                <div style={{ backgroundColor: ' rgb(238, 236, 236)', marginRight: '30px' }}>
                    <h3 style={{ textAlign: "center" }}>Personal Details
                        <Button onClick={() => setShowPersonalInfoForm(true)}><EditIcon /></Button>
                    </h3>
                </div>
                <div>
                    {personalInfos.length > 0 ? personalInfos.map(person => {
                        return (
                            <Card
                                img={person.SEX ? person.SEX : null}
                                one={person.NAME ? person.NAME : null}
                                two={person.PERSON_ID ? "ID: " + person.PERSON_ID : null}
                                three={person.EMAIL ? person.EMAIL : null}
                                four={person.SEX ? "Gender: " + person.SEX : null}
                                five={person.BDATE ? "Born on: " + person.BDATE.toString().substring(0, 10) : null}
                                six={person.SALARY ? "Salary: $" + person.SALARY : null}
                            />
                        )
                    }) :
                        <div className='no-content'>
                            <h5>No Details to Show</h5>
                            <h5>Please Update your Info</h5>
                        </div>
                    }

                </div>

                <div style={{ backgroundColor: ' rgb(238, 236, 236)', marginRight: '30px' }}>
                    <h3 style={{ textAlign: "center" }}>Schooling / Education Details
                        <Button onClick={() => setShowSchoolAddForm(true)}><AddIcon /></Button>
                    </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                    {SchoolInfos.length > 0 ? SchoolInfos.map(school => {
                        return (
                            <Card
                                img={school.SCHOOL_ID}
                                one={school.NAME}
                                two={"ID: " + school.SCHOOL_ID}
                                three={school.ADDRESS}
                                four={"Phone: " + school.PHONE}
                                five={school.FROM_STD + "-" + school.TO_STD + " std"}
                                six={school.FROM_YEAR + "-" + school.TO_YEAR}
                            />
                        )
                    }) :
                        <div className='no-content'>
                            <h5>No Schooling Details Present Here</h5>
                            <h5>Please Update Your Info</h5>
                        </div>
                    }
                </div>

                <div style={{ backgroundColor: ' rgb(238, 236, 236)', marginRight: '30px' }}>
                    <h3 style={{ textAlign: "center" }}>Housing Details
                        <Button onClick={() => setShowHouseUpdateForm(true)}><AddIcon /></Button>
                    </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                    {HouseInfo.length > 0 ? HouseInfo.map(House => {
                        return (
                            <Card
                                img={House.HOUSE_ID}
                                one={House.NAME}
                                two={"ID: " + House.HOUSE_ID}
                                three={House.ADDRESS}
                                four={"$" + House.RENT}
                                five={House.BHK + " BHK"}
                            />
                        )
                    }) :
                        <div className='no-content'>
                            <h5>Dont You have A home to stay</h5>
                            <h5>If yes, Then update the Info</h5>
                        </div>
                    }
                </div>

                <div style={{ backgroundColor: ' rgb(238, 236, 236)', marginRight: '30px' }}>
                    <h3 style={{ textAlign: "center" }}>Bank Details
                        <Button onClick={() => setShowBankAddForm(true)}><AddIcon /></Button>
                    </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                    {BankInfos.length > 0 ? BankInfos.map(bank => {
                        return (
                            <Card
                                img={bank.BANK_ID}
                                one={bank.NAME}
                                two={"Account no: " + bank.ACCOUNT_NO}
                                three={"ID: " + bank.BANK_ID}
                                four={bank.ADDRESS}
                                five={"IFSC: " + bank.IFSC}
                            />
                        )
                    }) :
                        <div className='no-content'>
                            <h5>Dont You have a Bank Account</h5>
                            <h5>Then open one, It Doesnt Cost you anything</h5>
                        </div>
                    }
                </div>

                <div style={{ backgroundColor: ' rgb(238, 236, 236)', marginRight: '30px' }}>
                    <h3 style={{ textAlign: "center" }}>Hospital Details
                        <Button onClick={() => setShowHospitalAddForm(true)}><AddIcon /></Button>
                    </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                    {HospitalInfos.length > 0 ? HospitalInfos.map(hospital => {
                        return (
                            <Card
                                img={hospital.HOSPITAL_ID}
                                one={hospital.NAME}
                                two={"ID: " + hospital.HOSPITAL_ID}
                                three={hospital.ADDRESS}
                                four={"Phone: " + hospital.PHONE}
                                five={"Date:" + hospital.DATE_OF_CONSULTING.toString().substring(0, 10)}
                                six={"Cause: " + hospital.FOR_PROBLEM}
                            />
                        )
                    }) :
                        <div className='no-content'>
                            <h5>Seems like you are a healthy person</h5>
                            <h5>if you have ever went to any hospital, do update your info </h5>
                        </div>
                    }
                </div>

                <div style={{ backgroundColor: ' rgb(238, 236, 236)', marginRight: '30px' }}>
                    <h3 style={{ textAlign: "center" }}>Owned Houses Details
                        <Button onClick={() => setShowOwnHouseAddForm(true)}><AddIcon /></Button>
                    </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                    {OwningInfos.length > 0 ? OwningInfos.map(house => {
                        return (
                            <Card
                                img={house.HOUSE_ID}
                                one={house.NAME}
                                two={"ID: " + house.HOUSE_ID}
                                three={house.ADDRESS}
                                four={"$" + house.RENT}
                                five={house.BHK + "BHK"}
                            />
                        )
                    }) :
                        <div className="no-content">
                            <h5>If You have enough money to buy a house</h5>
                            <h5>Then go for it</h5>
                        </div>
                    }
                </div>


            </div>

            {showPersonalInfoForm && <PersonalInfoUpdateForm Pid={Pid} show={showPersonalInfoForm} close={handleClosePersonalUpdateForm} info={personalInfos} update={updatePersonalInfo} />}
            {showSchoolAddForm && <SchoolInfoAdd Pid={Pid} show={showSchoolAddForm} close={handleCloseSchoolAddForm} update={updateSchoolInfo} />}
            {showBankAddForm && <BankInfoAdd Pid={Pid} show={showBankAddForm} close={handleCloseBankAddForm} update={updateBankInfo} />}
            {showHouseUpdateForm && <HouseUpdate Pid={Pid} show={showHouseUpdateForm} close={handleCloseHouseUpdateForm} update={updateHouseInfo} />}
            {showHospitalAddForm && <HospitalAddForm Pid={Pid} show={showHospitalAddForm} close={handleCloseHospitalAddForm} update={updateHospitalInfo} />}
            {showOwnHouseAddForm && <OwnHouseAddForm Pid={Pid} show={showOwnHouseAddForm} close={handleCloseOwnHouseAddForm} update={updateOwnHouseInfo} />}


        </div>
    );
}



export default UserHome;