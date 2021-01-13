import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';




function BankAdd(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [IFSC, setIFSC] = useState('');



    const handleSubmit = () => {

        if (name === '' || address === '' || IFSC === '') {
            // alert('please provide complete details');
            enqueueSnackbar('Provide Complete Details', { variant: 'warning' });
        }
        else {
            props.close();

            Axios.post('http://localhost:4000/createbank', {
                name: name,
                address: address,
                IFSC: IFSC
            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('error thrown')
                        enqueueSnackbar('Cannot open two accounts in a single Bank', { variant: 'error' });

                    }
                    else {
                        // alert('Bank Created')
                        enqueueSnackbar('Bank Created', { variant: 'success' });

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
        <Modal show={true} onHide={props.close} >
            <Modal.Header>
                <Modal.Title>Happy to see a Banker here</Modal.Title>
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
                        <Form.Label>Enter IFSC code</Form.Label>
                        <Form.Control name='IFSC' type='text' value={IFSC} onChange={(e) => setIFSC(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="secondary" onClick={() => props.close()}>Cancel</Button>
                <Button color="primary" onClick={handleSubmit}>Add Bank</Button>

            </Modal.Footer>
        </Modal>
    )
}

export default BankAdd;
