import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import {APIgetProductDetail, APIgetCategory} from '../../../../../services/api'


export default function ProductDescriptions() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const router = useRouter()
    const { slug } = router.query
  
    useEffect(async () => {
        await getProductDetail(slug)
      }, [])

    const getProductDetail = () => {
         APIgetProductDetail(slug).then(res => {
            if (res.success) {
                setProducts(res.data)
                getCategory(res.data.category_id,res.data.sub_category_id)
            } 
        }).catch(err => {
            console.log('res',err);
    
        })
    }
    const getCategory = (category_id,sub_category_id) => {
        APIgetCategory(slug).then(res => {
            if (res.success) {
                const cat = res.data.find(item => item.id = category_id )
                const sub = cat && cat.sub_categories.find(item => item.id = sub_category_id)
                if(cat && sub){
                    setCategory(cat.name)
                    setSubCategory(sub.name)    
                }
            } 
        })

    }
    function RenderContent() {
        return(
            <Card>
                <Box sx={{padding:'1rem'}}>
                    <h5>ข้อมูลจำเพาะของสินค้า</h5>
                    <Grid container>
                        <Grid xs={12} sm={1} md={1}>
                            <p style={{color:'#ABB2B9'}}> หมวดหมู่</p>
                        </Grid>
                        <Grid xs={12} sm={11} md={11}>
                            <p>{category} > {subCategory} </p>
                        </Grid>
                        <Grid xs={12} sm={1} md={1}>
                            <p style={{color:'#ABB2B9'}}> จำนวนสินค้า</p>
                        </Grid>
                        <Grid xs={12} sm={11} md={11}>
                            <p>{products && products.qty} </p>
                        </Grid>
                    </Grid>
                    <h5>รายละเอียดสินค้า</h5>
                    <p>{products && products.description}</p>
                    </Box>
            </Card>
        )
    }
    return (
        <Box sx={{marginTop:'10px'}}>
             {products ? <RenderContent /> : ''}
        </Box>
    );
}