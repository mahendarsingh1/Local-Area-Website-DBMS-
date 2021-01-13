import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
// import { SnackbarProvider} from 'notistack';
// import Snack from '../Snack'

import { useSnackbar } from 'notistack';




function BankInfoAdd(props) {

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => props.close();

    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState('');
    // const [notify,setNotify]=useState({
    //     open:false,
    //     variant:''
    // })

    useEffect(() => {
        Axios.get('http://localhost:4000/banks')
            .then(res => {
                setBanks(res.data);

            })
            .catch(err => {
                enqueueSnackbar("Error thrown", { variant: 'error' });
            })
    }, [])

    const handleSubmit = () => {

        if (selectedBank === '') {
            // alert('please select a Bank');
            enqueueSnackbar("Please Select a bank", { variant: 'error' });
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/bankadd', {
                Pid: props.Pid,
                bank_id: selectedBank,
            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('Opening of bank account unsuccesfull');
                        enqueueSnackbar("You May Already have a account in this bank", { variant: 'error' });

                    }
                    else {
                        // alert('Your Bank Account opened succesfully');
                        enqueueSnackbar("Opened Succesflly", { variant: 'success' });

                        props.update(res.data)
                    }
                })
                .catch(err => {
                    enqueueSnackbar("Error occured", { variant: 'error' });
                })
        }
    }

    return (
        // <>
        // <SnackbarProvider maxSnack={3}>
        //     {/* {notify.open && <Snack variant={notify.variant}/>} */}
        // </SnackbarProvider>
        <Modal show={props.show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" style={{ marginTop: "40px" }}>
            <Modal.Header>
                <Modal.Title>Add your Bank Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select the bank to open an account</Form.Label>
                        <Form.Control name="Bank_Id" as='select' onChange={(e) => setSelectedBank(e.target.value)}>
                            {banks.map(bank => {
                                return (
                                    <option value={bank.BANK_ID}>{bank.BANK_ID + "  " + bank.NAME}</option>
                                )
                            })}
                            <option selected value={''}>Select</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Button color="secondary" onClick={handleClose}>Cancel</Button>
            <Button color="primary" onClick={handleSubmit}>Submit</Button>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
        // </>
    )
}

export default BankInfoAdd;