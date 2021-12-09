import { Fragment, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useRouter } from 'next/router'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {APIgetProductDetail, APIgetCategory} from '../../../../../services/api'
import { useForm, Controller } from 'react-hook-form';
import { Radio , Modal, Typography} from 'antd';
import Text from 'antd/lib/typography/Text';

const { Title } = Typography;

const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
  ];

export default function ProductDetails({products}) {
    const [count, setCount] = useState(1)
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [selectOptions, setSelectOptions] = useState('')
    const [visible, setVisible] = useState(false);
    const router = useRouter()
    const { slug } = router.query
    
    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
                count: count,
        }
    })
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

      const onSubmit = (data) => {
        console.log('data',data);

    }
    function RenderContent() {
        return(
            <Fragment>
            <p style={{fontSize:'14px'}}>หน้าแรก > {category} > {subCategory} > {products && products.name}</p>
            <Card>
            <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
                <Grid container className="p-3">
                    <Grid  md={4} xs={12} sm={12}>
                        <Box sx={{width: '100%',height: '100%'}}>
                            <img
                                src={products.thumbnail}
                                alt="brownie"
                                style={{width: '100%',height: '100%'}}
                            />
                        </Box>
                    </Grid>
                    <Grid  md={7} xs={12} sm={12} sx={{marginLeft:{ xs: '0px', sm: '0px',md:'10px' }}}>
                        <Box sx={{marginLeft:'10px'}}>
                            <Box style={{display:'flex', alignItems:'center'}}>
                                {/* <span style={{backgroundColor:'#1976D2',padding:'5px', color:'#fff', marginRight:'5px'}}>ร้านแนะนำ</span> */}
                                <span style={{fontSize:'20px'}}>{products.name}</span>
                            </Box>
                            <Box>
                                <Rating name="read-only" value={0} readOnly size="small"/>
                                <span style={{fontSize:'16px'}}>| </span>
                                <span style={{fontSize:'16px',color:'#ABB2B9'}}>0 Ratings</span>
                                <span style={{fontSize:'16px'}}> | </span>
                                <span style={{fontSize:'16px',color:'#ABB2B9'}}>0 ขายแล้ว</span>
                            </Box>
                            <Box style={{backgroundColor:'#FAFAFA', padding: '10px'}}>
                                <span style={{fontSize:'1.875rem',color:'#3076D2'}}>฿ {products && products.sell_price ? products.sell_price.toFixed(2): 0.00}</span>
                            </Box>
                            <Box sx={{marginBottom:'10px'}}>
                                <Grid container>
                                        <Grid xs={12} sm={2} md={2} sx={{display:'flex', alignItems:'center'}}>
                                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>การจัดส่ง</span>
                                        </Grid>
                                        <Grid xs={12} sm={10} md={10}>
                                            <Box sx={{alignItems:'center', display:'flex'}}>
                                                <LocalShippingIcon fontSize="medium" sx={{color:'#00BFA5'}}/>
                                                <span style={{color:'#ABB2B9',fontSize:'14px'}}>ฟรีค่าจัดส่ง</span>
                                            </Box>
                                        </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{marginBottom:'10px'}}>
                                <Grid container>
                                    <Grid xs={12} sm={2} md={2}>
                                    {products && products.product_options !== [] ? <span style={{color:'#ABB2B9',fontSize:'14px'}}>ตัวเลือกสินค้า</span> : ''}
                                    </Grid>
                                    <Grid xs={12} sm={10} md={10}>
                                        <Box>
                                            {products && products.product_options ? products.product_options.map(item => 
                                            <Grid container key={item.name}>
                                                <Grid xs={12} sm={12} md={1}>
                                                    <span>{item.name}</span>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={11}>
                                                <Radio.Group buttonStyle="solid" >
                                                {item.option.map(items => 
                                                    <Radio.Button key={items.id} style={{marginRight:'5px', marginBottom:'5px'}} value={items.id} >{items.value}</Radio.Button>
                                                    // <Radio.Button key={items.id} style={{marginRight:'5px', marginBottom:'5px'}} value={items.id} onChange={e => e.target.checked ? setSelectOptions(e.target.value):setSelectOptions(0)} >{items.value}</Radio.Button>
                                                    // <Controller
                                                    //     name="selectoptions"
                                                    //     control={control}
                                                    //     defaultValue=""
                                                    //     render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                    //         <Radio.Button style={{marginRight:'5px', marginBottom:'5px'}} value={items.value} onChange={onChange}>{items.value}</Radio.Button>
                                                    //     )}
                                                    //     rules={{ required: true }}
                                                    // />
                                                )}
                                                </Radio.Group>
                                                
                                                </Grid>
                                            </Grid>
                                            ): null}
                                        </Box>
                
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{marginBottom:'10px'}}>
                                <Grid container>
                                    <Grid xs={12} sm={2} md={2}>
                                        <span style={{color:'#ABB2B9',fontSize:'14px'}}>จำนวน</span>
                                    </Grid>
                                    <Grid xs={12} sm={10} md={10}>
                                    <Box className="form-row justify-content-center">
                                        <Box className="form-group mb-0">
                                            <Box className="input-group mx-auto mb-0">
                                                <Button  onClick={() => {ChengeCount('m');}} variant="outlined" >-</Button>
                                                    <Box sx={{minWidth:'10%',alignItems:'center',display:'flex',justifyContent:'center',backgroundColor:'#F5F5F5'}}>
                                                        {count}
                                                    </Box>
                                                <Button  onClick={() => {ChengeCount('p');}} variant="outlined">+</Button>                                           
                                            </Box>
                                        </Box>
                                    </Box>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid xs={12} sm={2} md={2}>
                                    </Grid>
                                    <Grid xs={12} sm={10} md={10}>
                                    <span style={{color:'#ABB2B9',fontSize:'12px'}}>มีสินค้าจำนวน {products && products.qty ? products.qty : 0 } ชิ้น</span>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{marginBottom:'10px'}}>
                                <Grid container>
                                    <Grid xs={12} sm={4} md={4}>
                                        <Button type="submit" sx={{backgroundColor:'#3076D2',color:'white',width:'90%'}} variant="outlined" startIcon={<ShoppingCartIcon />}>เพิ่มไปยังรถเข็น</Button>
                                    </Grid>
                                    <Grid xs={12} sm={4} md={4}>
                                        <Button sx={{width:'90%'}} type="submit" variant="outlined" onClick={() => setVisible(true)}>ซื้อสินค้า</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                </form>
            </Card>
            <Modal
                title={products && products.name ? products.name : ''}
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <p>
                    <Title level={4}>ข้อมูลสินค้า</Title>
                    <Box sx={{width: '10%',height: '10%'}}>
                        <img
                            src={products.thumbnail}
                            alt="brownie"
                            style={{width: '100%',height: '100%'}}
                        />
                    </Box>
                    <p>ชื่อสินค้า: {products && products.name ? products.name : ''}</p>
                    <p>ชื่อสินค้า: {products && products.name ? products.name : ''}</p>
                
                </p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </Fragment>
        )
    }
    const ChengeCount = (type) => {
        if(type === 'p'){
            setCount(count+1)
        }else{
            setCount(count-1)
        }
    }
    return (
        <Box sx={{marginTop: { xs: '3rem', sm: '3rem',md:'4rem' }, alignItems:'center', justifyItems:'center'}} >
            {products ? <RenderContent /> : ''}
        </Box>
    );
}