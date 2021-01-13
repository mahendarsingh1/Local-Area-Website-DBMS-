import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';




function HouseAdd(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rent, setRent] = useState('');
    const [BHK, setBHK] = useState('');


    const handleSubmit = () => {
        
        if (name === '' || address === '' || rent === '' || BHK === '') {
            // alert('please provide complete details')
            enqueueSnackbar('Provide Complete Details', { variant: 'warning' });
        }
        else {
            
            
            props.close();

            Axios.post('http://localhost:4000/createhouse', {
                name: name,
                address: address,
                rent: rent,
                BHK: BHK
            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('error thrown')
                        enqueueSnackbar('Error Thrown', { variant: 'error' });
                    }
                    else {
                        // alert('house Created')
                        enqueueSnackbar('House Created', { variant: 'success' });
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
                <Modal.Title>Happy to see a  Builder here</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Enter Name</Form.Label>
                        <Form.Control name='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter Address</Form.Label>
                        <Form.Control name='adress' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter rent</Form.Label>
                        <Form.Control name='rent' type='text' value={rent} onChange={(e) => setRent(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter BHK</Form.Label>
                        <Form.Control name='BHK' type='text' value={BHK} onChange={(e) => setBHK(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="secondary" onClick={() => props.close()}>Cancel</Button>

                <Button color="primary" onClick={handleSubmit}>Add House</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default HouseAdd;
