import { Fragment } from 'react';
import ProductDetails from './components/ProductDetails'
import ProductDescriptions from './components/ProductDescriptions'
import ShopDetails from './components/ShopDetails'
import Reviews from './components/Reviews'


export default function ProductDetailScreen() {
    
    return (
        <Fragment>
            <ProductDetails />
            <ShopDetails />
            <ProductDescriptions />
            <Reviews />
        </Fragment>
    );
}