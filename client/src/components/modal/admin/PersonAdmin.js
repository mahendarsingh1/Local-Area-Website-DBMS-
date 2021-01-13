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

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:4000/persons')
            .then(res => {
                if (res.data === 'ERROR') {
                    // alert('error thrown');
                    enqueueSnackbar('Error thrown', { variant: 'error' });
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
                enqueueSnackbar('Error occured', { variant: 'error' });
            })
    }, [])

    const handleSubmit = () => {
        
        if (selectedPerson === '') {
            // alert('select a person to change the admin rights')
            enqueueSnackbar('Select a Person', { variant: 'warning' });
            
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/updateadmin', {
                Pid: selectedPerson,

            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('error thrown')
                        enqueueSnackbar('Error occured', { variant: 'error' });

                    }
                    else {
                        // alert('Updated Succesfully')
                        enqueueSnackbar('Updated Succesfully', { variant: 'success' });
                    }
                })
                .catch(err => {
                    console.log(err);
                    // alert('error occured')
                    enqueueSnackbar('Error occured', { variant: 'error' });
                })
        }
    }
    // function isAdmin() {
    //     persons.forEach(person => {
    //         if (person.PERSON_ID === selectedPerson) {
    //             return person.ISADMIN;
    //         }
    //     });
    // return false;
    // }

    // const handleChange = (e) => {
    //     setSelectedPerson(e.target.value);
    // console.log(admin+"before setting");
    // if (isAdmin()) {
    //     console.log('true returned');
    //     setAdmin(true);
    // }
    // else {
    //     console.log('false returned');
    //     setAdmin(true);
    // }
    // console.log('after seting'+admin);
    // if (selectedPerson !== '') {

    //     Axios.post('http://localhost:4000/getadmin', {
    //         Pid: selectedPerson,
    //     })
    //         .then(res => {
    //             if (res.data === '1' || res.data === 1) {
    //                 setAdmin(true);
    //             }
    //             else {
    //                 setAdmin(false)
    //             }
    //         })
    // }
    // }

    return (
        <Modal show={true} onHide={props.close}>
            <Modal.Header>
                <Modal.Title>Select The Person To Add / Remove a Admin of the Area</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select Person</Form.Label>
                        <Form.Control as='select' name="person_id" value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)} >
                            <option value=''>Select</option>
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
                <Button color="secondary" onClick={() => props.close()}>Cancel</Button>
                <Button color='primary' onClick={handleSubmit}>Add Admin</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default PersonRemove;