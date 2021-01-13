import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SchoolIcon from '@material-ui/icons/School';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { FilterNone } from '@material-ui/icons';
import { Button } from '@material-ui/core';


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function SideNav({ Pid, showUserIcon, admin }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Local Area Database
          </Typography>
          {showUserIcon && (<Link to={`/home?id=${Pid}&admin=${admin}`} style={{ textDecoration: "none", color: "white" }}>
            <Button>
              <FaceRoundedIcon color="action" />
            </Button>
          </Link>)}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/* {name} */}

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to={`/persons?id=${Pid}&admin=${admin}`} style={{ textDecoration: "none" }}>
            <ListItem button key='Persons'>
              <ListItemIcon><PersonRoundedIcon /></ListItemIcon>
              <ListItemText primary="Persons" />
            </ListItem>
          </Link>

          <Link to={`/houses?id=${Pid}&admin=${admin}`} style={{ textDecoration: "none" }}>
            <ListItem button key='Houses'>
              <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
              <ListItemText primary="Houses" />
            </ListItem>
          </Link>


          <Link to={`/schools?id=${Pid}&admin=${admin}`} style={{ textDecoration: "none" }}>
            <ListItem button key='Schools'>
              <ListItemIcon><SchoolIcon /></ListItemIcon>
              <ListItemText primary="Schools" />
            </ListItem>
          </Link>


          <Link to={`/hospitals?id=${Pid}&admin=${admin}`} style={{ textDecoration: "none" }}>
            <ListItem button key='Hospitals'>
              <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
              <ListItemText primary="Hospitals" />
            </ListItem>
          </Link>


          <Link to={`/banks?id=${Pid}&admin=${admin}`} style={{ textDecoration: "none" }}>
            <ListItem button key='Banks'>
              <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
              <ListItemText primary="Banks" />
            </ListItem>
          </Link>

          <Link to='/' style={{ textDecoration: "none" }}>
            <ListItem button key='login'>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </Link>

        </List>
        
      </Drawer>
      <div className={classes.toolbar} />
     
    </div>
  );
}

export default SideNav;