import { Fragment } from 'react';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import brownie from '../../../../../public/images/products/brownie.jpg';
const products  = {
      label: 'P1',
      key: 1,
      product_type:'อาหาร',
      product_sub_type:'ขนมหวาน',
      product_name:'บราวนี่หน้าฟิล์ม กรอบนอกนุ่มใน หวานน้อย',
      count_rating:76,
      count_sell:109,
      src: '../../images/products/brownie.jpg',
      product_detail: 'บราวนี่แสนอร่อย หน้าฟิล์ม หวานน้อย',
      price: 89,
      product_qty: 500,
        option:[
            {
                name:'flavour',
                value:[ 
                    {
                        name:'choco'
                    },
                    {
                        name:'vanilla'
                    },
                ]
            },
            {
                name:'size',
                value:[
                    {
                        name:'500 g.'
                    },
                    {
                        name:'1000 g.'
                    },
                ]

            }
        ]
    }
export default function ProductDetails() {
    function RenderOption() {
        return (
            <Fragment>
                {products.option.map(item => 
                    <div>
                        <Grid container>
                            <Grid xs={12} sm={12} md={2}>
                                <span>{item.name}</span>
                            </Grid>
                            <Grid xs={12} sm={12} md={10}>
                                {item.value.map(val =><Button variant="outlined" sx={{marginRight:'5px', marginBottom:'5px'}}>{val.name}</Button>)}
                            </Grid>
                        </Grid>
                    </div>
                )}
            </Fragment>
          )
      }
    
    
    return (
        <div style={{marginTop: '11rem', alignItems:'center', justifyItems:'center'}} >
        <Fragment>
            <p>หน้าแรก > {products.product_type} > {products.product_sub_type} > {products.product_name} </p>
            <Card>
                <Grid container className="p-3">
                    <Grid  md={4} xs={12} sm={12}>
                    <Image
                        src={brownie}
                        alt="brownie"
                        sx={{width: '100%',height: '100%'}}
                    />
                    </Grid>
                    <Grid  md={7} xs={12} sm={12} sx={{marginLeft:{ xs: '0px', sm: '0px',md:'10px' }}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <span style={{backgroundColor:'#1976D2',padding:'5px', color:'#fff', marginRight:'5px'}}>ร้านแนะนำ</span>
                            <span style={{fontSize:'20px'}}>{products.product_name}</span>
                        </div>
                        <div>
                            <Rating name="read-only" value={5} readOnly size="small"/>
                            <span style={{fontSize:'16px'}}>{products.count_rating} Ratings</span>
                            <span style={{fontSize:'16px'}}>{products.count_sell} ขายแล้ว</span>
                        </div>
                        <div style={{backgroundColor:'#FAFAFA', padding: '10px'}}>
                            <span style={{fontSize:'1.875rem'}}>฿ {products.price}</span>
                        </div>
                        <div>
                            <Grid container>
                                <Grid xs={12} sm={2} md={2} sx={{display:'flex', alignItems:'center'}}>
                                    <span style={{fontSize:'16px'}}>การจัดส่ง</span>
                                </Grid>
                                <Grid xs={12} sm={10} md={10}>
                                    <LocalShippingIcon fontSize="medium" sx={{color:'#00BFA5'}}/>
                                    
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid container>
                                <Grid xs={12} sm={2} md={2}>
                                    <span style={{fontSize:'16px'}}>ตัวเลือกสินค้า</span>
                                </Grid>
                                <Grid xs={12} sm={10} md={10}>
                                    <RenderOption />

                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid container>
                                <Grid xs={12} sm={2} md={2}>
                                    <span style={{fontSize:'16px'}}>จำนวน</span>
                                </Grid>
                                <Grid xs={12} sm={10} md={10}>
                                <div class="form-row justify-content-center">
                                    <div class="form-group mb-0">
                                    <div class="input-group mx-auto mb-0">
                                        <div class="number-input">
                                            <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" >-</button>
                                                <input class="quantity bg-light" min="0" placeholder="0" name="quantity"type="number" />
                                            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus">+</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </Grid>
                            </Grid>
                        </div>
                        
                    </Grid>
                </Grid>
            </Card>
          
        </Fragment>
        </div>
    );
}