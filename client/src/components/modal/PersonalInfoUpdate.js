import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';

// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import IconButton from '@material-ui/core/IconButton';

import { useSnackbar } from 'notistack';



function PersonalInfoUpdate(props) {
    const { enqueueSnackbar } = useSnackbar();



    // const [show, setShow] = useState(props.show);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [Bdate, setBdate] = useState('');
    const [sex, setSex] = useState('');
    const [salary, setSalary] = useState('');

    // const [showPass, setShowPass] = useState(false);

    const handleClose = () => {
        props.close();
        // setShow(false);
    }

    useEffect(() => {
        // Axios.post('http://localhost:4000/getpersonalinfo', {
        //     Pid: props.Pid
        // })
        //     .then(res => {
        //         if (res.data === 'ERROR') {
        //             //incomplete
        //             alert('some error occured during fetching ');
        //         }
        //         else {
        //             { res.data.NAME && setName(res.data.NAME) }
        //             { res.data.EMAIL && setEmail(res.data.EMAIL) }
        //             { res.data.password && setPassword(res.data.PASSWORD) }
        //             { res.data.Bdate && setBdate(res.data.BDATE) }
        //             { res.data.SEX && setSex(res.data.SEX) }
        //             { res.data.SALARY && setSalary(res.data.SALARY) }
        //         }
        //     })
        //     .catch(err => {
        //         throw (err)
        //     })

        if (props.info.length > 0) {
            const { NAME, EMAIL, SEX, SALARY, BDATE } = props.info[0];
            NAME && setName(NAME);
            EMAIL && setEmail(EMAIL)
            // PASSWORD && setPassword(PASSWORD)
            BDATE && setBdate(BDATE.toString().substring(0, 10))
            SEX && setSex(SEX)
            SALARY && setSalary(SALARY)
        }
    }, [])

    const handleSubmit = () => {

        if (name === '' || email === '' || Bdate === '' || sex === '' || salary === '') {
            // alert('please fill the information corectly');
            enqueueSnackbar("Please fill Details completely", { variant: 'error' });
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/updatepersonalinfo', {
                Pid: props.Pid,
                name: name,
                email: email,
                sex: sex,
                salary: salary,
                Bdate: Bdate,
                // password: password,
            })
                .then(res => {
                    //incomplete
                    if (res.data === 'ERROR') {
                        // alert('Update Unsuccesfull');
                        enqueueSnackbar("unsuccesful", { variant: 'error' });
                    }
                    else {
                        props.update(res.data);
                        enqueueSnackbar("update Succesflly", { variant: 'success' });
                    }
                })
                .catch(err => {
                    enqueueSnackbar("Error occured", { variant: 'error' });
                })
        }
        // could be better
        // window.location.assign(`http://localhost:3000/home?id=${props.Pid}`)
    }

    return (
        <Modal show={props.show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" style={{ marginTop: "40px" }}>
            <Modal.Header>
                <Modal.Title>Add/Update Your Information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>email id</Form.Label>
                        <Form.Control name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>



                    <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control name="sex" as="select" value={sex} onChange={(e) => setSex(e.target.value)}>
                            <option selected value=''>Select</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control name="Bdate" type="date" value={Bdate} onChange={(e) => setBdate(e.target.value)} />
                    </Form.Group>



                    <Form.Group>
                        <Form.Label>Salary</Form.Label>
                        <Form.Control name="salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Button color="secondary" onClick={handleClose}>Cancel</Button>
            <Button color="primary" onClick={handleSubmit}>Submit</Button>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}

export default PersonalInfoUpdate;