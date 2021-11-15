import { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Image from 'next/image'
import News from './components/News'
import Promotion from './components/Promotion'
import FlashSale from './components/FlashSale'
import Product from './components/Product'

export default function HomeScreen() {
    return (
        <Fragment>
            <News />
            <Promotion />
            <FlashSale />
            <Product />
        </Fragment>
    );
}