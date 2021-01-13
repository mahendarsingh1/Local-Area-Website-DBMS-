import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';




function HospitalAdd(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');


    const handleSubmit = () => {
        
        if (name === '' || address === '' || phone === '') {
            // alert('please provide complete details')
            enqueueSnackbar('Provide Complete Details', { variant: 'warning' });
        }
        else {
            
            props.close();


            Axios.post('http://localhost:4000/createhospital', {
                name: name,
                address: address,
                phone: phone
            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('error thrown')
                        enqueueSnackbar('Error Thrown', { variant: 'error' });
                    }
                    else {
                        // alert('hospital Created')
                        enqueueSnackbar('Hospital Created', { variant: 'success' });
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
                <Modal.Title>Build a Hospital</Modal.Title>
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
                        <Form.Label>Enter Phone</Form.Label>
                        <Form.Control name='phone' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="secondary" onClick={() => props.close()}>Cancel</Button>

                <Button color="primary" onClick={handleSubmit}>Add Hospital</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default HospitalAdd;
