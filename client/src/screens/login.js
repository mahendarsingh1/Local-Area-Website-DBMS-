import React, { useState } from 'react';
import Navbar from '../components/navbar/NavbarLogin'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import '../style/style.css'
import { useSnackbar } from 'notistack'

import Visibility from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOff from '@material-ui/icons/VisibilityOffTwoTone';
import IconButton from '@material-ui/core/IconButton';

import Lottie from 'lottie-react'
import welcomeBlue from '../animeFiles/welcomeBlue.json'


const useStyles = makeStyles(() => ({
    margin: {
        marginTop: '100px',
    },
    bottom: {
        position: "absolute",
        bottom: '5%',
        width: '100vw'
    }
}))


function Login() {
    const { enqueueSnackbar } = useSnackbar();

    const [show, setShow] = useState(false);
    const [login, setlogin] = useState(null);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPass, setShowPass] = useState(false);

    const handleOpen = () => setShow(true);

    const handleClose = () => setShow(false);

    const handleLogin = (cond) => setlogin(cond);


    const handleSubmit = () => {

        if (login) {

            if (id === '' || email === '' || password === '') {
                // alert('Please fill every field');
                enqueueSnackbar('Please Fill Completely', { variant: 'warning' })
            }
            else {

                handleClose();

                axios.post('http://localhost:4000/login', {
                    id, email, password
                })
                    .then(res => {
                        if (res.data === 'ERROR') {
                            //incomplete
                            // alert('incorrect details')
                            enqueueSnackbar('Error Thrown', { variant: 'error' })

                        }
                        else if (res.data === 'zero') enqueueSnackbar('Please Register first', { variant: 'error' })
                        else if (res.data === 'incorrect') enqueueSnackbar('Incorrect Details', { variant: 'error' })
                        else {
                            // console.log(res.data);
                            // const pass = res.data[0].PASSWORD;
                            // const emai = res.data[0].EMAIL;

                            console.log(res.data[0].ISADMIN);

                            if (res.data[0].ISADMIN === '1' || res.data[0].ISADMIN === 1) {
                                window.location.assign(`http://localhost:3000/home?id=${id}&admin=${1}`)
                            }
                            else {
                                console.log('fired here');
                                window.location.assign(`http://localhost:3000/home?id=${id}&admin=${0}`)
                            }
                            // if (pass === password && emai === email) {
                            // }
                            // else {
                            //     alert('incorrect Detais')
                            // }
                            console.log(res.data);
                        }
                    })
                    .catch(err => {
                        // setName('');
                        // setId('');
                        // setEmail('');
                        // setPassword('');
                        // alert('we are facing problem, make sure you are registered');
                        enqueueSnackbar('Problem, Are You registered', { variant: 'warning' })

                        console.log(err);
                    })
            }
        }
        else {
            //register
            if (name === '' || email === '' || password === '') {
                // alert('Please fill every field');
                enqueueSnackbar('Please Fill Completely', { variant: 'warning' })

            }
            else {
                handleClose();
                axios.post('http://localhost:4000/register', {
                    name: name, email: email, password: password
                })
                    .then(res => {
                        if (res.data === 'ERROR') {
                            // alert('we are facing some problem');
                            enqueueSnackbar('Some Error Occured', { variant: 'error' })

                        }
                        else {
                            // const pass = res.data[0].password;
                            const Pid = res.data;

                            // if (pass === password) {
                            window.location.assign(`http://localhost:3000/home?id=${Pid}&admin=${0}`)
                            // }
                            // else {
                            //     alert('incorrect Detais')
                            // }
                        }
                    })
                    .catch(err => {
                        // setName('');
                        // setId('');
                        // setEmail('');
                        // setPassword('');
                        // alert('we are facing problem, make sure');
                        enqueueSnackbar('Error thrown', { variant: 'error' })

                    })
            }
        }
        setId("");
        setName("");
        setEmail("");
        setPassword('');
    }

    const classes = useStyles();


    return (

        <div className='login-page' style={{ boxSizing: "border-box" }}>
            <Navbar open={handleOpen} login={handleLogin} />
            <Typography variant='h2' align='center' className={classes.margin} style={{color:':rgba(245, 241, 241, 0.959)'}} >
                Welcome to the Local Area Database
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '2%', marginRight: '4%' }}>
                <Lottie
                    animationData={welcomeBlue}
                    style={{ width: '40%' }}
                />

                



            </div>

            {/* <div className={classes.bottom}>
                <Typography variant='h4' align='center' color="inherit">
                    Project by Mahendar Singh and Malappa Siddappa Koulapure
            </Typography>

                <Typography variant='h4' align="right" style={{ marginRight: '5%' }}>
                    -Guided by Samyama Maam
            </Typography>
            </div> */}

            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" className="login-modal" >

                <Modal.Header closeButton>
                    <Modal.Title>{login ? 'Welcome Back' : 'Welcome, Happy to see you in this area'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {login ?
                            <Form.Group>
                                <Form.Label>Person ID</Form.Label>
                                <Form.Control name='id' type="text" onChange={(e) => setId(e.target.value)} value={id} />
                                <Form.Text>Required</Form.Text>
                            </Form.Group>
                            :
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="text" onChange={(e) => setName(e.target.value)} />
                                <Form.Text>Required</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control name='email' type='email' onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text>Required</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '90%' }} />
                            <IconButton
                                style={{ position: 'absolute', top: '80%', right: '5%' }}
                                size='small'
                                aria-label="toggle password visibility"
                                onClick={() => setShowPass(!showPass)}
                                color='inherit'
                            >
                                {showPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color='primary'>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}


export default Login;