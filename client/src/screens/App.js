import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import Houses from './houses';
import Hospitals from './hospitals';
import Banks from './banks';
import Schools from './schools';
import Persons from './persons';
import Home from './Home';
import { SnackbarProvider } from 'notistack';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css'

function App() {
    return (
        <SnackbarProvider maxSnack={3}>

            <Router>
                <Route path='/' exact component={Login} />
                <Route path='/home' exact component={Home} />
                <Route path='/persons' exact component={Persons} />
                <Route path='/houses' exact component={Houses} />
                <Route path='/banks' exact component={Banks} />
                <Route path='/schools' exact component={Schools} />
                <Route path='/hospitals' exact component={Hospitals} />
                {/* <Route path='/login' exact component={Login}/> */}
            </Router>
        </SnackbarProvider>
    )
}

export default App;