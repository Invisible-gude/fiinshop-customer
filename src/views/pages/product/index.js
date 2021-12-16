import { Fragment, useEffect, useState } from 'react';
import { APIgetProductDetail, APIgetCategory, APIgetShopDetail, APIgetProduct, APIaddToCart } from '../../../../services/api'
import { Router, useRouter } from 'next/router'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Chat from '@mui/icons-material/Chat';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card'
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { useForm, Controller } from 'react-hook-form';
import { Radio , Modal, Typography, Space} from 'antd';
const { Text, Title } = Typography;


export default function ProductDetailScreen() {
    const [topProducts, setTopProducts] = useState([])
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(1)
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [visible, setVisible] = useState(false);
    const [selectPrice, setPrice] = useState(0);
    const [selectOption, setSelectOption] = useState(0);
    const [shop, setShop] = useState([])
    const [limit, setLimit] = useState(30)
    const [user, setUser] = useState(null)
    const router = useRouter()
    const { slug } = router.query

    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
                count: count,

        }
    })

    useEffect(() => {
        console.log(selectOption);
        getUserData()
        getProductDetail()
        onChangePrice(selectOption)
      }, [selectOption])
    
    const getProduct = () => {
        APIgetProduct(limit).then(res => {
            if (res.success) {
                setTopProducts(res.data)
                console.log('res',res.data);
            } else {
                console.log('res',res);

            }
        }).catch(err => {
            console.log('res',err);

        })
    }
    const getProductDetail = () => {
        APIgetProductDetail(slug).then(res => {
           if (res.success) {
               setProducts(res.data)
               getCategory(res.data.category_id)
               getSubCategory(res.data.category_id,res.data.sub_category_id)
               getShopDetail(res.data.shop_id)
               getProduct()
           } 
       }).catch(err => {
           console.log('res',err);
   
       })
   }

   const getUserData = () => {
    const value = localStorage.getItem('_user');
    const user_data = value ? JSON.parse(value) : undefined;
    setUser(user_data)
  }
   const getCategory = (category_id) => {
        APIgetCategory().then(res => {
            if (res.success) {
                const cat = res.data.find(item => item.id == category_id )
                if(cat  && cat.name ){
                    setCategory(cat.name)
                }
            } 
        })    
   }
   const getSubCategory = (category_id,sub_category_id) => {
        APIgetCategory().then(res => {
            if (res.success) {
                const cat = res.data.find(item => item.id = category_id )
                const sub = cat && cat.sub_categories.find(item => item.id = sub_category_id)
                if(sub  && sub.name ){
                    setSubCategory(sub.name)
                }
            } 
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
    function RenderTopProduct() {
        return (
          <Fragment>
            {topProducts.map((step, index) => (
              <Grid md={12} xs={6} sm={12} marginBottom={2} key={step.id}>
                <Grid display='grid'>
                  <Box display='grid' justifyItems='center'>
                    <img src={step.thumbnail} className="product-image" />
                  </Box>
                  <div style={{fontSize:'14px', padding:'5px'}}>
                    <span className="text-left">
                        {step.name}
                    </span>
                    <p className="text-main">
                        ฿  <label style={{fontSize:'14px'}}>{step.sell_price}</label>
                    </p>
                  </div>
                </Grid>
                <hr />
              </Grid>
            ))}
          </Fragment>
          )
    }
    function RenderContent() {
        return(
            <Card>
                <Grid container className="p-3">
                    <Box sx={{alignItems:'center', display:'flex', paddingRight:'20px'}}>
                        <Grid xs={12} sm={12} md={1} >
                            <Avatar
                                alt={shop && shop.name ? shop.name : ''}
                                src={shop && shop.cover ? shop.cover : ''}
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
   const onChangePrice = (id) => {
        let price =  products && products.product_options ? products.product_options.filter(item => item.id = id) : 0 
        console.log('last_price',price);
        // setPrice(last_price == 0 ? 0 : last_price.sell_price)
    }
    const ChengeCount = (type) => {
        if(type === 'p'){
            setCount(count+1)
        }else{
            setCount(count-1)
        }
    }
    const onSubmit = (data) => {
        console.log('data',data);

    }
    const toCheckout = () => {
        localStorage.setItem('_products', products)
        router.push('/checkout')
    }

    const addToCart = () => {
       const data =[
            {
                'shop_id' : products.shop_id,
                'product_id': products.id,
                'product_option_id':selectOption,
                'product_qty':count
            }
        ]
        // APIaddToCart(data).then(res => {
        //     console.log('res',res);
            
        // }).catch(err => {
        //     console.log(err);
        // })
        
        console.log('product_', data);

        // localStorage.setItem('_products', products)
        // router.push('/cart')
    }

    return (
        <Grid >
            {/* <ProductDetails products={products}/> */}
            <Box sx={{marginTop: { xs: '1rem', sm: '1rem',md:'1rem' }, alignItems:'center', justifyItems:'center'}} >
               <Grid marginLeft={{ xs: '1rem', sm: '1rem',md:0 , lg:0}}> <p style={{fontSize:'14px'}}>หน้าแรก > {category} > {subCategory} > {products && products.name}</p></Grid>
                <Card>
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
                                <Box style={{display:'flex', alignItems:'center'}} marginTop={{ xs: '10px', sm: '0px',md:'0px' }}>
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
                                    <span style={{fontSize:'1.875rem',color:'#3076D2'}}>฿ {selectPrice.toFixed(2)}</span>
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
                                                        <Radio.Button key={items.value} style={{marginRight:'5px', marginBottom:'5px'}} value={items.id} onChange={e => setSelectOption(e.target.value)}>{items.value}</Radio.Button>
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
                                            <Button type="submit" sx={{backgroundColor:'#3076D2',color:'white',width:'90%'}} variant="outlined" startIcon={<ShoppingCartIcon />} onClick={e => {addToCart()}}>เพิ่มไปยังรถเข็น</Button>
                                        </Grid>
                                        <Grid xs={12} sm={4} md={4}>
                                            <Button sx={{width:'90%'}} type="submit" variant="outlined" onClick={e => {toCheckout()}}>ซื้อสินค้า</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
                
            </Box>

            <Box sx={{marginTop:'10px'}}>
                <Card>
                    <Grid container className="p-3">
                        <Box sx={{alignItems:'center', display:'flex', paddingRight:'20px'}}>
                            <Grid xs={12} sm={12} md={1} >
                                <Avatar
                                    alt={shop && shop.name ? shop.name : ''}
                                    src={shop && shop.cover ? shop.cover : ''}
                                    sx={{ width: 70, height: 70 }}
                                />
                            </Grid>
                        </Box>
                        <Grid xs={12} sm={12} md={4} >
                            <span>{shop && shop.name ? shop.name : ''}</span> <br/>
                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>Active 1 ชั่วโมง ที่ผ่านมา</span>
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
                                <p style={{color:'#ABB2B9',fontSize:'14px'}}>คะแนน <label style={{color:'#3076D2'}}>99.7พัน</label></p>
                                <p style={{color:'#ABB2B9',fontSize:'14px'}}>รายการสินค้า <label style={{color:'#3076D2'}}>149</label></p>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={12} md={3} >
                            <Box sx={{alignItems:'center'}}>
                                <p style={{color:'#ABB2B9',fontSize:'14px'}}>อัตราการตอบกลับ <label style={{color:'#3076D2'}}>97%</label></p>
                                <p style={{color:'#ABB2B9',fontSize:'14px'}}>เวลาในการตอบกลับ <label style={{color:'#3076D2'}}>ภายในไม่กี่ชั่วโมง</label></p>
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
            </Box>
            
            <Grid container>
                <Grid xs={12} sm={11} md={10}>
                    <Box sx={{marginTop:'10px'}}>
                        <Card>
                            <Box sx={{padding:'1rem'}}>
                                <h5>ข้อมูลจำเพาะของสินค้า</h5>
                                <Grid container>
                                    <Grid xs={12} sm={1} md={1}>
                                        <p style={{color:'#ABB2B9',fontSize:'14px'}}> หมวดหมู่</p>
                                    </Grid>
                                    <Grid xs={12} sm={11} md={11}>
                                        <p style={{fontSize:'14px'}}>{category} > {subCategory} </p>
                                    </Grid>
                                    <Grid xs={12} sm={1} md={1}>
                                        <p style={{color:'#ABB2B9',fontSize:'14px'}}> จำนวนสินค้า</p>
                                    </Grid>
                                    <Grid xs={12} sm={11} md={11}>
                                        <p style={{fontSize:'14px'}}>{products && products.qty} </p>
                                    </Grid>
                                </Grid>
                                <h5>รายละเอียดสินค้า</h5>
                                <p style={{fontSize:'14px'}}>{products && products.description}</p>
                                </Box>
                        </Card>
                    </Box>

                    <Box sx={{marginTop:'10px'}}>
                        <Card>
                            <Box sx={{padding:'1rem'}}>
                                <h5>คะแนนของสินค้า</h5>
                                <Box sx={{backgroundColor:'#F5F5F5',padding:'1rem'}}>
                                    <Grid container>
                                        <Grid xs={12} sm={3} md={2} >
                                            <span style={{fontSize:'25px',color:'#3076D2'}}>0 <label style={{fontSize:'18px'}}>เต็ม 5</label></span><br/>
                                            <Rating name="read-only" value={0} readOnly size="large"/>
                                        </Grid>
                                        <Grid xs={12} sm={11} md={10} >
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>ทั้งหมด</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>5 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>4 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>3 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>2 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>1 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>1 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>ความคิดเห็น</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>มีรูปภาพ/วีดีโอ</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{marginTop:'10px',padding:'10px'}}>
                                    <Grid container>
                                        <Grid xs={12} sm={1} md={1} >
                                            <Avatar
                                                alt="Deee"
                                                src=""
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        </Grid>
                                        <Grid xs={11} sm={11} md={11} >
                                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>Dedee</span><br/>
                                            <Rating name="read-only" value={5} readOnly size="small"/><br/>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>ตัวเลือกสินค้า: ขนาด s, สี แดง</span><br/>
                                            <span style={{fontSize:'12px'}}>ส่งสินค้าไวมาก ทันใช้เลย โอกาสหน้าจะมาอุดหนุนใหม่นะคะ</span>
                                            <Box sx={{width: '10%',height: 'auto'}}>
                                                <img
                                                    src='https://sharitybox.com/files/product_images/progimg_5056_1538204692.jpg'
                                                    alt="brownie"
                                                    style={{width: '100%',height: '100%'}}
                                                />
                                            </Box>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>2021-12-04 13:05</span>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <hr/>
                                <Box sx={{marginTop:'10px',padding:'10px'}}>
                                    <Grid container>
                                        <Grid xs={12} sm={1} md={1} >
                                            <Avatar
                                                alt="Deee"
                                                src=""
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        </Grid>
                                        <Grid xs={11} sm={11} md={11} >
                                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>Dedee</span><br/>
                                            <Rating name="read-only" value={5} readOnly size="small"/><br/>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>ตัวเลือกสินค้า: ขนาด s, สี แดง</span><br/>
                                            <span style={{fontSize:'12px'}}>ส่งสินค้าไวมาก ทันใช้เลย โอกาสหน้าจะมาอุดหนุนใหม่นะคะ</span>
                                            <Box sx={{width: '10%',height: 'auto'}}>
                                                <img
                                                    src='https://sharitybox.com/files/product_images/progimg_5056_1538204692.jpg'
                                                    alt="brownie"
                                                    style={{width: '100%',height: '100%'}}
                                                />
                                            </Box>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>2021-12-04 13:05</span>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <hr/>
                                <Box sx={{marginTop:'10px',padding:'10px'}}>
                                    <Grid container>
                                        <Grid xs={12} sm={1} md={1} >
                                            <Avatar
                                                alt="Deee"
                                                src=""
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        </Grid>
                                        <Grid xs={11} sm={11} md={11} >
                                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>Dedee</span><br/>
                                            <Rating name="read-only" value={5} readOnly size="small"/><br/>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>ตัวเลือกสินค้า: ขนาด s, สี แดง</span><br/>
                                            <span style={{fontSize:'12px'}}>ส่งสินค้าไวมาก ทันใช้เลย โอกาสหน้าจะมาอุดหนุนใหม่นะคะ</span>
                                            <Box sx={{width: '10%',height: 'auto'}}>
                                                <img
                                                    src='https://sharitybox.com/files/product_images/progimg_5056_1538204692.jpg'
                                                    alt="brownie"
                                                    style={{width: '100%',height: '100%'}}
                                                />
                                            </Box>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>2021-12-04 13:05</span>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <hr/>
                                <Box sx={{marginTop:'10px',padding:'10px'}}>
                                    <Grid container>
                                        <Grid xs={12} sm={1} md={1} >
                                            <Avatar
                                                alt="Deee"
                                                src=""
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        </Grid>
                                        <Grid xs={11} sm={11} md={11} >
                                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>Dedee</span><br/>
                                            <Rating name="read-only" value={5} readOnly size="small"/><br/>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>ตัวเลือกสินค้า: ขนาด s, สี แดง</span><br/>
                                            <span style={{fontSize:'12px'}}>ส่งสินค้าไวมาก ทันใช้เลย โอกาสหน้าจะมาอุดหนุนใหม่นะคะ</span>
                                            <Box sx={{width: '10%',height: 'auto'}}>
                                                <img
                                                    src='https://sharitybox.com/files/product_images/progimg_5056_1538204692.jpg'
                                                    alt="brownie"
                                                    style={{width: '100%',height: '100%'}}
                                                />
                                            </Box>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>2021-12-04 13:05</span>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <hr/>
                                <Box sx={{marginTop:'10px',padding:'10px'}}>
                                    <Grid container>
                                        <Grid xs={12} sm={1} md={1} >
                                            <Avatar
                                                alt="Deee"
                                                src=""
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        </Grid>
                                        <Grid xs={11} sm={11} md={11} >
                                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>Dedee</span><br/>
                                            <Rating name="read-only" value={5} readOnly size="small"/><br/>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>ตัวเลือกสินค้า: ขนาด s, สี แดง</span><br/>
                                            <span style={{fontSize:'12px'}}>ส่งสินค้าไวมาก ทันใช้เลย โอกาสหน้าจะมาอุดหนุนใหม่นะคะ</span>
                                            <Box sx={{width: '10%',height: 'auto'}}>
                                                <img
                                                    src='https://sharitybox.com/files/product_images/progimg_5056_1538204692.jpg'
                                                    alt="brownie"
                                                    style={{width: '100%',height: '100%'}}
                                                />
                                            </Box>
                                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>2021-12-04 13:05</span>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <hr/>
                            </Box>
                        </Card>
                    </Box>
                </Grid>
                <Grid xs={12} sm={11} md={2} className="mobile-none">
                    <Box sx={{marginTop:'10px'}} marginLeft={{xs:'10px', sm:'10px', md:'10px'}}>
                        <Card style={{padding:'5px'}}>
                            <p style={{fontSize:'14px'}}>สินค้าขายดีประจำร้าน</p>
                            <Grid  container>
                                <RenderTopProduct />
                            </Grid>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
            

            
           
        </Grid>
    );
}