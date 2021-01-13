import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cardm from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'

import hospital from '../../animeFiles/hospital.json'
import houseyellow from '../../animeFiles/houseYellow.json'
import school from '../../animeFiles/school.json'
import people from '../../animeFiles/People.json'
import bankCards from '../../animeFiles/bankCards.json'


const arr = [people, school, bankCards, hospital, houseyellow];

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    margin: {
        margin: '10px 5px',
    }
});



function Card(props) {


    const classes = useStyles();

    return (
        <div className={classes.margin}>
            <Cardm className={classes.root} style={{ width: '500px', margin: '30px auto', borderRadius: "10px", backgroundColor: 'rgb(233, 240, 247)' }}>

                <Link to={`/${props.heading}?id=${props.id}&admin=${props.admin}`} style={{ textDecoration: 'none' }}>
                    <CardActionArea>

                        <Lottie
                            animationData={arr[props.ind]}
                            style={{ width: '100%', height: '240px' }}
                        />

                        <CardContent>
                            {props.heading && <Typography variant='h5'>{props.heading}</Typography>}


                        </CardContent>
                    </CardActionArea>
                </Link>

                {props.button &&
                    <CardActions>
                        <Button color="secondary" onClick={() => props.click(props.heading, 1)}>Remove</Button>
                        <Button color="primary" onClick={() => props.click(props.heading, 2)} >{props.heading === 'persons' ? 'Admin settings' : 'Add'}</Button>
                    </CardActions>
                }
            </Cardm>


        </div>
    )

}

export default Card;