import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';




const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
    },
}))

function NavbarHome({ showUserIcon, Pid }) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Local Area Database
                    </Typography>

                    <Link to='/' style={{ textDecoration: "none" }}>
                        <ListItem button key='login'>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>

                        </ListItem>
                    </Link>


                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavbarHome;