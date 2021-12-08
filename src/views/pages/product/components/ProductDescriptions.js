import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import {APIgetProductDetail, APIgetCategory} from '../../../../../services/api'


export default function ProductDescriptions({products}) {
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const router = useRouter()
    const { slug } = router.query
  
    useEffect(async () => {
        if(products){
            APIgetCategory().then(res => {
                if (res.success) {
                    const cat = res.data.find(item => item.id == products.category_id )
                    if(cat  && cat.name ){
                        setCategory(cat.name)
                    }
                } 
            })
            APIgetCategory().then(res => {
                if (res.success) {
                    const cat = res.data.find(item => item.id = products.category_id )
                    const sub = cat && cat.sub_categories.find(item => item.id = products.sub_category_id)
                    if(sub  && sub.name ){
                        setSubCategory(sub.name)
                    }
                } 
            })        
        }
      }, [products])
      
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