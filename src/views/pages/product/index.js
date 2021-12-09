import { Fragment, useEffect, useState } from 'react';
import ProductDetails from './components/ProductDetails'
import ProductDescriptions from './components/ProductDescriptions'
import ShopDetails from './components/ShopDetails'
import Reviews from './components/Reviews'
import { APIgetProductDetail } from '../../../../services/api'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid';


export default function ProductDetailScreen() {
    const [products, setProducts] = useState([])
    const router = useRouter()
    const { slug } = router.query

    useEffect(async () => {
        await getProductDetail()
      }, [])
      const getProductDetail = () => {
        APIgetProductDetail(slug).then(res => {
           if (res.success) {
               setProducts(res.data)
           } 
       }).catch(err => {
           console.log('res',err);
   
       })
   }

    return (
        <Grid         
        paddingLeft={{ xs: '1rem', sm:'5rem', md: '10rem' }}
        paddingRight={{ xs: '1rem',sm:'0rem', md: '10rem' }}>
            <ProductDetails products={products}/>
            <ShopDetails products={products}/>
            <ProductDescriptions products={products}/>
            <Reviews products={products}/>
        </Grid>
    );
}