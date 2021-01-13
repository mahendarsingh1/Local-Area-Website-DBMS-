import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const classes = useStyles();

  const login = () => {
    props.open();
    props.login(true);
  }

  const Register = () => {
    props.open();
    props.login(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Local Area Database
          </Typography>
          <Button color="inherit" onClick={login}>Login</Button>
          <Button color="inherit" onClick={Register}>Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;