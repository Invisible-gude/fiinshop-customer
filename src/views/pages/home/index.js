import { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image'
import News from './components/News'
import Promotion from './components/Promotion'
import FlashSale from './components/FlashSale'
import Product from './components/Product'

export default function HomeScreen() {
    return (
        <Grid         
        paddingLeft={{ xs: '1rem', sm:'5rem', md: '10rem' }}
        paddingRight={{ xs: '1rem',sm:'0rem', md: '10rem' }}>
            <News />
            <Promotion />
            <FlashSale />
            <Product />
        </Grid>
    );
}