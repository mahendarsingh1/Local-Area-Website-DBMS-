import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';


function HospitalAddForm(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [hospitals, setHospitls] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState('');
    const [date, setDate] = useState('');
    const [problem, setProblem] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:4000/hospitals')
            .then(res => {
                if (res.data === 'ERROR') {
                    // alert('Problem fetching details of hospitals')
                    enqueueSnackbar("Problem fetching details of hospitals", { variant: 'error' });
                }
                else {
                    setHospitls(res.data)
                }
            })
            .catch(err => {
                enqueueSnackbar("Error occured", { variant: 'error' });
            })
    }, [])


    const handleClose = () => props.close();
    const handleSubmit = () => {

        if (selectedHospital === '' || date === '' || problem === '') {
            // alert('please fill the form correctly');
            enqueueSnackbar("Please Fill Details completely", { variant: 'warning' });
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/hospitaladd', {
                Pid: props.Pid,
                hospital_id: selectedHospital,
                date: date,
                for_problem: problem
            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('problem in adding hospital info')
                        enqueueSnackbar("You May already have gone to this hospital today", { variant: 'error' });
                    }
                    else {
                        // console.log(res);
                        // alert('succesfully added hospital info')
                        enqueueSnackbar("Added Succesflly", { variant: 'success' });
                        props.update(res.data);
                    }
                })
                .catch(err => {
                    enqueueSnackbar("Error occured", { variant: 'error' });
                })
        }
    }

    return (
        <Modal show={props.show} onHide={props.close} aria-labelledby="contained-modal-title-vcenter" style={{ marginTop: "40px" }}>
            <Modal.Header>
                <Modal.Title>Add Your consulted Hospital Information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select Hospital</Form.Label>
                        <Form.Control as="select" name="hospital_id" onChange={(e) => setSelectedHospital(e.target.value)}>
                            {hospitals.map(hospital => {
                                return (
                                    <option value={hospital.HOSPITAL_ID}>{hospital.HOSPITAL_ID + "  " + hospital.NAME}</option>
                                )
                            })}
                            <option selected value={''}>Select</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Problem</Form.Label>
                        <Form.Control name="for_problem" type="text" value={problem} onChange={(e) => setProblem(e.target.value)} />
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="secondary" onClick={handleClose}>cancel</Button>
                <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default HospitalAddForm;