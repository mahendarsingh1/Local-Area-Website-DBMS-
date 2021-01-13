import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';


function PersonRemove(props) {
    const { enqueueSnackbar } = useSnackbar();


    const { Pid } = props;
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:4000/persons')
            .then(res => {
                if (res.data === 'ERROR') {
                    // alert('error thrown');
                    enqueueSnackbar('Error Thrown', { variant: 'error' });

                }
                else {
                    var arr = res.data.filter(person => {
                        return person.PERSON_ID !== Pid;
                    })

                    setPersons(arr);
                }
            })
            .catch(err => {
                // alert('error occured')
                enqueueSnackbar('error occured', { variant: 'error' })

            })
    }, [])

    const handleSubmit = () => {
        
        if (selectedPerson === '') {
            // alert('please select a person to remove')
            enqueueSnackbar('Please Select a Person', { variant: 'warning' })
            
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/deleteperson', {
                Pid: selectedPerson
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
                <Modal.Title>Select The Person To remove from this Area</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select Person</Form.Label>
                        <Form.Control as='select' name="person_id" onChange={(e) => setSelectedPerson(e.target.value)} >
                            <option value='' selected>Select</option>
                            {
                                persons.map(person => {
                                    return (
                                        <option value={person.PERSON_ID}>{person.PERSON_ID + " " + person.NAME}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="primary" onClick={() => props.close()}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit}>Remove</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PersonRemove;