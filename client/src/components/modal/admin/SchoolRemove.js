import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';


function PersonRemove(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:4000/schools')
            .then(res => {
                if (res.data === 'ERROR') {
                    // alert('error thrown');
                    enqueueSnackbar('Error Thrown', { variant: 'error' });

                }
                else {
                    setSchools(res.data);
                }
            })
            .catch(err => {
                // alert('error occured');
                enqueueSnackbar('error occured', { variant: 'error' })

            })
    }, [])

    const handleSubmit = () => {
        
        if (selectedSchool === '') {
            // alert('select a school to remove it');
            enqueueSnackbar('Please Select a School', { variant: 'warning' })
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/deleteschool', {
                Sid: selectedSchool,
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
                <Modal.Title>Select The School To remove from this Area</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select School</Form.Label>
                        <Form.Control as='select' name="school_id" onChange={(e) => setSelectedSchool(e.target.value)} >
                            <option value='' selected>Select</option>
                            {
                                schools.map(school => {
                                    return (
                                        <option value={school.SCHOOL_ID}>{school.SCHOOL_ID + " " + school.NAME}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>


                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="primary" onClick={() => props.close()}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit}>Remove School</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PersonRemove;