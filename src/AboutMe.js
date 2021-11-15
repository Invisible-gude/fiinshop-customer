import { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
    detail: {
        marginTop: theme.spacing(4),
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    mainCon: {
        // marginTop: '70px',
        // background: url('../public/images/computer-bg.jpg')
    },
    background: {
        background: `url('/images/computer-bg.jpg')`,
        height: '100vh',
        width: '100%',
        backgroundSize: 'cover',
    }
}));

export default function Attraction(props) {
    const classes = useStyles();
    const attraction = props.attraction;

    return (
        <Fragment>
            <div id='section1' className='content'>
                <div data-aos="zoom-in" className='d-flex justify-content-center align-items-center'>
                    <h2 className='text-uppercase'>kanokkorn chompuhom</h2>
                </div>
                lorem1000
            </div>
        </Fragment>
    );
}