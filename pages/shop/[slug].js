import { Fragment, useEffect, useState } from 'react';
import  Container  from '@material-ui/core/Container';
import  Navbar  from '../../src/views/layouts/Navbar';
import  Footer  from '../../src/views/layouts/Footer';
import  ShopDetail  from '../../src/views/pages/shop/index';

export default function Shop() {

     return(
        <Container >
            <Navbar />
            <ShopDetail />
            <hr style={{color:"rgb(238,77,45)"}}/>
            <Footer />
        </Container >    
    );
}