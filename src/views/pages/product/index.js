import { Fragment } from 'react';
import ProductDetails from './components/ProductDetails'
import ProductDescriptions from './components/ProductDescriptions'


export default function ProductDetailScreen() {
    return (
        <Fragment>
            <ProductDetails />
            <ProductDescriptions />
        </Fragment>
    );
}