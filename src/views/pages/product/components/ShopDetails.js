import { Fragment, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chat from '@mui/icons-material/Chat';
import {APIgetShopDetail, APIgetProductDetail} from '../../../../../services/api'
import { useRouter } from 'next/router'


export default function ShopDetails() {
    const [products, setProducts] = useState([])
    const router = useRouter()
    const { slug } = router.query
    const [shop, setShop] = useState([])

    useEffect(async () => {
        await getProductDetail()
      }, [])
      const getProductDetail = () => {
        APIgetProductDetail(slug).then(res => {
           if (res.success) {
               setProducts(res.data)
               if(res && res.data){
                getShopDetail(res.data.shop_id)
                }
           } 
       }).catch(err => {
           console.log('res',err);
   
       })
   }
    const getShopDetail = (shop_id) => {
        APIgetShopDetail(shop_id).then(res => {
            if (res.success) {
                setShop(res.data)
            } 
        }).catch(err => {
            console.log('res',err);
    
        })
    }
    
    function RenderContent() {
        return(
            <Card>
                 <Grid container className="p-3">
                     <Box sx={{alignItems:'center', display:'flex', paddingRight:'20px'}}>
                        <Grid xs={12} sm={12} md={1} >
                            <Avatar
                                alt={shop && shop.name ? shop.name : ''}
                                src=""
                                sx={{ width: 70, height: 70 }}
                            />
                        </Grid>
                     </Box>
                     <Grid xs={12} sm={12} md={4} >
                        <span>{shop && shop.name ? shop.name : ''}</span> <br/>
                        <span style={{color:'#ABB2B9'}}>Active 1 ชั่วโมง ที่ผ่านมา</span>
                        <Box sx={{marginBottom:'10px'}}>
                            <Grid container>
                                <Grid xs={10} sm={4} md={4}>
                                    <Button sx={{backgroundColor:'#3076D2',color:'white',width:'90%'}} variant="outlined" startIcon={<Chat />}>แชทเลย</Button>
                                </Grid>
                                <Grid xs={10} sm={4} md={4}>
                                    <Button sx={{width:'90%'}} href={`/shop/${encodeURIComponent(products.shop_id)}`} variant="outlined" >ดูร้านค้า</Button>
                                </Grid>
                            </Grid>
                        </Box>
                     </Grid>
                     <Grid xs={12} sm={12} md={2} >
                        <Box sx={{alignItems:'center'}}>
                            <p style={{color:'#ABB2B9'}}>คะแนน <label style={{color:'#3076D2'}}>99.7พัน</label></p>
                            <p style={{color:'#ABB2B9'}}>รายการสินค้า <label style={{color:'#3076D2'}}>149</label></p>
                        </Box>
                     </Grid>
                     <Grid xs={12} sm={12} md={3} >
                        <Box sx={{alignItems:'center'}}>
                            <p style={{color:'#ABB2B9'}}>อัตราการตอบกลับ <label style={{color:'#3076D2'}}>97%</label></p>
                            <p style={{color:'#ABB2B9'}}>เวลาในการตอบกลับ <label style={{color:'#3076D2'}}>ภายในไม่กี่ชั่วโมง</label></p>
                        </Box>
                     </Grid>
                     <Grid xs={12} sm={12} md={2} >
                        <Box sx={{alignItems:'center'}}>
                            <p style={{color:'#ABB2B9'}}>เข้าร่วมเมื่อ <label style={{color:'#3076D2'}}>28 เดือน ที่ผ่านมา</label></p>
                            <p style={{color:'#ABB2B9'}}>ผู้ติดตาม <label style={{color:'#3076D2'}}>136.8พัน</label></p>
                        </Box>
                     </Grid>
                 </Grid>
            </Card>
        )
    }
    return (
        <Box sx={{marginTop:'10px'}}>
            <RenderContent />
        </Box>
    );
}