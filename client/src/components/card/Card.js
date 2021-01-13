import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cardm from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    margin: {
        margin: '10px 50px',
    }
});



function Card(props) {


    const classes = useStyles();

    return (
        <div className={classes.margin}>
            <Cardm className={classes.root} style={{ width: '500px', margin: '30px auto', borderRadius: "10px",backgroundColor:'rgb(233, 240, 247)' }}>
                <CardActionArea>
                   
                    {props.img && <div className={`height ${props.img}`} />}
                    
                    <CardContent>
                        {props.one && <Typography variant='h5'>{props.one}</Typography>}
                        {props.two && <Typography variant='h6'>{props.two}</Typography>}
                        {props.three && <Typography variant='h6'>{props.three}</Typography>}
                        {props.four && <Typography variant='h6'>{props.four}</Typography>}
                        {props.five && <Typography variant='subtitle1'>{props.five}</Typography>}
                        {props.six && <Typography variant='subtitle1'>{props.six}</Typography>}

                    </CardContent>
                </CardActionArea>


            </Cardm>
        </div>
    )

}

export default Card;