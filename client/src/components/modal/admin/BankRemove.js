import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';


function PersonRemove(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:4000/banks')
            .then(res => {
                if (res.data === 'ERROR') {
                    // alert('error thrown');
                    enqueueSnackbar('Error Thrown', { variant: 'error' });

                }
                else {
                    setBanks(res.data);
                }
            })
            .catch(err => {
                // alert('error occured')
                enqueueSnackbar('error occured', { variant: 'error' })
            })
    }, [])

    const handleSubmit = () => {
        
        if (selectedBank === '') {
            // alert('please select a bank to delete');
            enqueueSnackbar('Please Select a bank', { variant: 'warning' })
            
        }
        else {
            
            props.close();


            Axios.post('http://localhost:4000/deletebank', {
                Bid: selectedBank
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
                <Modal.Title>Select The Bank To remove from this Area</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select Bank</Form.Label>
                        <Form.Control as='select' name="bank_id" onChange={(e) => setSelectedBank(e.target.value)} >
                            <option value='' selected>Select</option>
                            {
                                banks.map(bank => {
                                    return (
                                        <option value={bank.BANK_ID}>{bank.BANK_ID + " " + bank.NAME}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>


                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="primary" onClick={() => props.close()}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit}>Remove Bank</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PersonRemove;