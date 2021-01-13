import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';


function HouseUpdateForm(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [houses, setHouses] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState('');

    const handleClose = () => props.close();

    useEffect(() => {
        Axios.get('http://localhost:4000/houses')
            .then(res => {
                setHouses(res.data);
            })
            .catch(err => {
                enqueueSnackbar("Error occured", { variant: 'error' });
            })
    }, [])

    const handleSubmit = () => {

        if (selectedHouse === '') {
            // alert('please select a house to update')
            enqueueSnackbar("Please Select a House", { variant: 'error' });
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/updatehouse', {
                Pid: props.Pid,
                house_id: selectedHouse
            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('Update Unsuccesful');
                        enqueueSnackbar("unsuccesful", { variant: 'error' });
                    }
                    else {
                        // console.log(res);
                        // alert('Update Succesful');
                        enqueueSnackbar("update Succesflly", { variant: 'success' });
                        props.update(res.data);
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
                <Modal.Title>Update Your Home to New Place</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select the House to stay in</Form.Label>
                        <Form.Control as='select' name="house_id" onChange={(e) => setSelectedHouse(e.target.value)}>
                            {houses.map(house => {
                                return (
                                    <option value={house.HOUSE_ID}>{house.HOUSE_ID + " " + house.NAME}</option>
                                )
                            })}
                            <option selected value={''}>Select</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button color="secondary" onClick={handleClose}>Cancel</Button>
                <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default HouseUpdateForm;