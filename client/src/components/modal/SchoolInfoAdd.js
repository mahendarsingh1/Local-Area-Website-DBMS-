import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import { useSnackbar } from 'notistack';


function SchoolInfoAdd(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [schools, setSchools] = useState([]);
    const [selectedSchoolId, setSchoolId] = useState('');
    const [from_std, setFrom_std] = useState('');
    const [to_std, setTo_std] = useState('');
    const [from_year, setFrom_year] = useState('');
    const [to_year, setTo_year] = useState('');

    const handleClose = () => {
        props.close();
    }

    useEffect(() => {
        Axios.get('http://localhost:4000/schools')
            .then(res => {
                setSchools(res.data);
            })
            .catch(err => {
                enqueueSnackbar("Error occured", { variant: 'error' });
            })
    }, [])

    const handleSubmit = () => {

        if (selectedSchoolId === '' || from_std === '' || to_std === '' || from_year === '' || to_year === '') {
            // alert('please fill the complete details');
            enqueueSnackbar("Please fill details completely", { variant: 'warning' });
        }
        else if(parseInt(from_std)>=parseInt(to_std)){
            enqueueSnackbar("Please fill std details correctly", { variant: 'warning' });
        }
        else if(parseInt(from_year)>=parseInt(to_year)){
            enqueueSnackbar("Please fill year details correctly", { variant: 'warning' });
        }
        else {
            props.close();
            Axios.post('http://localhost:4000/schooladd', {
                Pid: props.Pid,
                school_id: selectedSchoolId,
                from_std: parseInt(from_std),
                to_std: parseInt(to_std),
                from_year: parseInt(from_year),
                to_year: parseInt(to_year)
            })
                .then(res => {
                    if (res.data === 'ERROR') {
                        // alert('Adding of School Unsuccesfull');
                        enqueueSnackbar("Duplicate Information not Allowed", { variant: 'error' });
                    }
                    else {
                        // console.log(res);
                        // alert('school added succesfully');
                        props.update(res.data);
                        enqueueSnackbar("Added Succesflly", { variant: 'success' });
                    }
                })
                .catch(err => {
                    enqueueSnackbar("Error occured", { variant: 'error' });
                })
        }
    }

    return (
        <Modal show={props.show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" style={{ marginTop: "40px" }}>
            <Modal.Header>
                <Modal.Title>Add your school details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select your School</Form.Label>
                        <Form.Control name="school" as='select' onChange={(e) => setSchoolId(e.target.value)}>
                            {schools.map(school => {
                                return (
                                    <option value={school.SCHOOL_ID}>{school.SCHOOL_ID + "  " + school.NAME}</option>
                                )
                            })}
                            <option selected value={''}>Select</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mention your std</Form.Label>
                        <Form.Control name="from_std" placeholder="From" value={from_std} type="text" onChange={(e) => setFrom_std(e.target.value)} />
                        <Form.Control name="to_std" placeholder="To" value={to_std} type="text" onChange={(e) => setTo_std(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mention the year of study</Form.Label>
                        <Form.Control name="from_year" placeholder="From" value={from_year} type="text" onChange={(e) => setFrom_year(e.target.value)} />
                        <Form.Control name="to_year" placeholder="To" value={to_year} type="text" onChange={(e) => setTo_year(e.target.value)} />
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

export default SchoolInfoAdd;