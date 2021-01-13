import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';


function PersonRemove(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [houses, sethouses] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:4000/houses')
            .then(res => {
                if (res.data === 'ERROR') {
                    // alert('error thrown');
                    enqueueSnackbar('Error Thrown', { variant: 'error' });

                }
                else {
                    sethouses(res.data);
                }
            })
            .catch(err => {
                // alert('error occured')
                enqueueSnackbar('error occured', { variant: 'error' })

            })
    }, [])

    const handleSubmit = () => {
        
        if (selectedHouse === '') {
            // alert('please select a house to demolish it')
            enqueueSnackbar('Please Select a house', { variant: 'warning' })
            
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/deleteHouse', {
                Hid: selectedHouse
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
                <Modal.Title>Select The House To remove from this Area</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select House</Form.Label>
                        <Form.Control as='select' name="house_id" onChange={(e) => setSelectedHouse(e.target.value)} >
                            <option value='' selected>Select</option>
                            {
                                houses.map(house => {
                                    return (
                                        <option value={house.HOUSE_ID}>{house.HOUSE_ID + " " + house.NAME}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>


                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="primary" onClick={() => props.close()}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit}>Remove House</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PersonRemove;