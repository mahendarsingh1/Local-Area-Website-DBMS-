import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';


function PersonRemove(props) {

    const { enqueueSnackbar } = useSnackbar();

    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:4000/hospitals')
            .then(res => {
                if (res.data === 'ERROR') {
                    // alert('error thrown');
                    enqueueSnackbar('Error Thrown', { variant: 'error' });

                }
                else {
                    setHospitals(res.data);
                }
            })
            .catch(err => {
                // alert('error occured')
                enqueueSnackbar('error occured', { variant: 'error' })

            })
    }, [])

    const handleSubmit = () => {
        
        if (selectedHospital === '') {
            // alert('please select a hospital to Remove it');
            enqueueSnackbar('Please Select a hospital', { variant: 'warning' })
            
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/deleteHospital', {
                Hid: selectedHospital
            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('error thrown')
                        enqueueSnackbar('Error Thrown', { variant: 'error' });

                    }
                    else {
                        // alert('Deleted Succesfully')
                        enqueueSnackbar('Deleted Succesfully', { variant: 'success' });

                    }
                })
                .catch(err => {
                    console.log(err);
                    // alert('error occured')
                    enqueueSnackbar('Error occured', { variant: 'error' });

                })
        }
    }

    return (
        <Modal show={true} onHide={props.close}>
            <Modal.Header>
                <Modal.Title>Select The Hospital To remove from this Area</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select Hospital</Form.Label>
                        <Form.Control as='select' name="house_id" onChange={(e) => setSelectedHospital(e.target.value)} >
                            <option value='' selected>Select</option>
                            {
                                hospitals.map(hospital => {
                                    return (
                                        <option value={hospital.HOSPITAL_ID}>{hospital.HOSPITAL_ID + " " + hospital.NAME}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>


                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="primary" onClick={() => props.close()}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit}>Remove Hospital</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PersonRemove;