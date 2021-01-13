import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';


function HospitalAddForm(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [houses, setHouses] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState('');


    useEffect(() => {
        Axios.get('http://localhost:4000/houses')
            .then(res => {
                if (res.data === 'ERROR') {
                    // alert('Problem fetching details of houses')
                    enqueueSnackbar("Problem fetching details of houses", { variant: 'error' });
                }
                else {
                    setHouses(res.data)
                }
            })
            .catch(err => {
                enqueueSnackbar("Error occured", { variant: 'error' });
            })
    }, [])


    const handleClose = () => props.close();
    const handleSubmit = () => {

        if (selectedHouse === '') {
            // alert('please select a house to own it');
            enqueueSnackbar("Please Select a House", { variant: 'error' });
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/ownhouseadd', {
                Pid: props.Pid,
                house_id: selectedHouse,
            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('problem in updating house owner');
                        enqueueSnackbar("You May already have owned this house", { variant: 'error' });
                    }
                    else {
                        // console.log(res);
                        // alert('succesfully upated house owner')
                        props.update(res.data);
                        enqueueSnackbar("updated Succesflly", { variant: 'success' });

                    }
                })
                .catch(err => {
                    enqueueSnackbar("Error occured", { variant: 'error' });
                })
        }
    }

    return (
        <Modal show={props.show} onHide={props.close} aria-labelledby="contained-modal-title-vcenter" style={{ marginTop: "40px" }}>
            <Modal.Header>
                <Modal.Title>Add Your Owned House Information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select House</Form.Label>
                        <Form.Control as="select" name="house_id" onChange={(e) => setSelectedHouse(e.target.value)}>
                            {houses.map(house => {
                                return (
                                    <option value={house.HOUSE_ID}>{house.HOUSE_ID + "  " + house.NAME}</option>
                                )
                            })}
                            <option selected value={''}>Select</option>
                        </Form.Control>
                    </Form.Group>


                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="secondary" onClick={handleClose}>cancel</Button>
                <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default HospitalAddForm;