import { Fragment, useEffect, useState } from 'react';
import { APIgetProductDetail, APIgetCategory, APIgetShopDetail, APIgetProduct, APIaddToCart, APIgetCart } from '../../../../services/api'
import { Router, useRouter } from 'next/router'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Chat from '@mui/icons-material/Chat';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { useForm, Controller } from 'react-hook-form';
import { Radio , Modal, Pagination, message} from 'antd';
import { FixedSizeList as List } from 'react-window';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useDispatch } from 'react-redux';
import { countCart } from '../../../../store/actions/countAction';

const products_review  = [
    {
      key: 1,
      username:'Dedee K',
      review_gall: [
          {
            url:'../../images/products/brownie.jpg'
          },
          {
            url:'../../images/products/brownie.jpg'
          }
      ] ,
      details: 'อร่อยค่ะหวานน้อย ชิ้นพอดีคำชอบมาก กินคนเดียวเกือบหมดดีนะแบ่งใส่กระปุกให้ญาติไว้แล้ว แต่ต้องเว้นบ้างสั่งอีกเดี๋ยวหมดอีก555 ราคาดีด้วยค่ะแต่ต้องรอนิดหน่อย',
      rating: 5,
      product_options: {name:'มะยม', value:'ดอง'},
      review_date:'2021-06-26 06:47'
    },
    {
      key: 2,
      username:'Kaponk pank',
      review_gall: [
          {
            url:'../../images/products/brownie.jpg'
          },
          {
            url:'../../images/products/brownie.jpg'
          }
      ] ,
      details: 'เนื้อสัมผัส นุ่ม อร่อย ไม่หวานมากจนเกินไป เนื้อสัมผัส นุ่ม อร่อย ไม่หวานมากจนเกินไป เนื้อสัมผัส นุ่ม อร่อย ไม่หวานมากจนเกินไป',
      rating: 4,
      product_options: {name:'มะยม', value:'เชื่อม'},
      review_date:'2021-06-24 12:53'
    },
    {
      key: 3,
      username:'Pupe Chukchak',
      review_gall: [
          {
            url:'../../images/products/brownie.jpg'
          },
          {
            url:'../../images/products/brownie.jpg'
          }
      ] ,
      details: 'ได้รับสินค้าเรียบร้อยแล้วคะ ครบตามจำนวนที่สั่ง ได้ของไวมากคะ มะยมอร่อย กินเพลินๆๆ แปปเดียวหมด คราวหน้าต้องสั่งมากกว่านี้',
      rating: 5,
      product_options: {name:'มะยม', value:'เชื่อม'},
      review_date:'2021-08-24 12:53'
    },
    {
        key: 4,
        username:'sutima2515',
        review_gall: [
            {
                url:'../../images/products/brownie.jpg'
            }
        ] ,
        details: 'ส่งไม่เร็วใช้เวลา 4วันจึงได้ของ แต่ไม่รีบทานเลยไม่หักเรื่องเวลาส่ง แต่หักนิดตรงที่มะยมเม็ดเล็กกว่าที่คิด เคยซื้อได้เม็ดใหญ่กว่านี้ ชั่งได้ถุงละ1ขีด ซึ่งแพงกว่าที่เคยซื้อเป็นกิโลละ120บาท',
        rating: 3,
        product_options: {name:'มะยม', value:'เชื่อม'},
        review_date:'2021-09-09 20:31'
    },
    {
        key: 5,
        username:'wilawankongka',
        review_gall: [
            {
                url:'../../images/products/brownie.jpg'
            }
        ] ,
        details: 'บริการร้านค้าจัดส่งรวดเร็ว แต่สินค้าถึงตั้งหลายวันแล้ว ขนส่งไม่จัดส่งสินค้า ขึ้นสถานะนำส่ง แต่ผ่านมา 4 วัน กว่าจะส่ง มดขึ้นสินค้า',
        rating: 2,
        product_options: {name:'มะยม', value:'ดอง'},
        review_date:'2021-09-31 15:48'
    },
    {
        key: 6,
        username:'papatpaii',
        review_gall: [
            {
                url:'../../images/products/brownie.jpg'
            }
        ] ,
        details: 'สินค้าดูดี มีคุณภาพ ส่วนใหญ่เป็นเม็ดใหญ่ มีเล็กปนบ้าง รสชาติหวานอมเปรี้ยวเล็กน้อย กินเพลินดี แต่กินได้ครั้งละไม่มากเพราะเนื้อเยอะ',
        rating: 5,
        product_options: {name:'มะยม', value:'ดอง'},
        review_date:'2021-11-20 08:48'
    },
  ];

export default function ProductDetailScreen() {
    const [topProducts, setTopProducts] = useState([])
    const [products, setProducts] = useState([])
    const [sameProducts, setSameProducts] = useState([])
    const [count, setCount] = useState(1)
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [visible, setVisible] = useState(false);
    const [selectPrice, setPrice] = useState(0);
    const [selectOption, setSelectOption] = useState(0);
    const [shop, setShop] = useState([])
    const [limit, setLimit] = useState(30)
    const [user, setUser] = useState(null)
    const [thumbnail, setThumbnail] = useState('')
    const router = useRouter()
    const { slug } = router.query
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            count: count,
        }
    })

    useEffect(() => {
        console.log(selectOption);
        getUserData()
        getProductDetail()
        getSameProduct()
        
      }, [selectOption])
    const handleOk = () => {
    setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };
    
    const getProduct = () => {
        APIgetProduct(limit).then(res => {
            if (res.success) {
                setTopProducts(res.data.products)
            } else {
                console.log('res',res);

            }
        }).catch(err => {
            console.log('res',err);

        })
    }
    
    const getSameProduct = () => {
        APIgetProduct(limit).then(res => {
            if (res.success) {
                setSameProducts(res.data.products)
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
               onChangePrice(selectOption === 0 ? res.data.product_options[0].id : selectOption)
               setThumbnail(res.data.thumbnail)
                // console.log('product detail', res.data);
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
                const cat = res.data.find(item => item.id == category_id )
                const sub = cat && cat.sub_categories.find(item => item.id == sub_category_id)
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
    const onChangePrice = (e) => {
        setSelectOption(e)
        let product_opt = products && products.product_options ? products.product_options : '';
        let price = product_opt ? product_opt.find(item => item.id == e ) : 0;
        setPrice(price ? price.sell_price : 0)
        // setThumbnail(price && price.thumbnail ? price.thumbnail : '')
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
        console.log('data', data);
        const storage = JSON.parse(localStorage.getItem('_user'))
        if(!storage){
          setIsModalVisible(true);
        }else{
        APIaddToCart(data).then(res => {
            console.log('--',res);
            if(res.success){
                APIgetCart().then(resp => {
                    console.log('resp',resp.data.carts);
                    if(resp && resp.data && resp.data.carts){
                      let list = []
                      let p_qty = resp.data.carts.map(item => item.products.map(dt=> list.push(dt.id)))
                      dispatch(countCart(list.length))
                    }
                })
            }else{
                message.error('ไม่สามารเพิ่มสินค้าได้')
            }
            
        }).catch(err => {
            console.log(err);
        })
        }
    }
    function RenderTopProduct() {
        return (
        topProducts.map((step, index) => (
              <Grid md={12} xs={6} sm={12}  key={step.id}>
                <Grid>
                  <Box display='grid' justifyItems='center'>
                    <img src={step.thumbnail} className="product-image" />
                  </Box>
                  <div style={{fontSize:'14px', paddingLeft:'5px', height:'fit-content',paddingRight:'5px',}}>
                    <span className="text-left">
                        {step.name}
                    </span>
                    <p className="text-main">
                        ฿  <label style={{fontSize:'14px'}}>{step.sell_price}</label>
                    </p>
                  </div>
                </Grid>
                <hr/>
              </Grid>
            ))
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
                                    <Button sx={{backgroundColor:'#196bfd',color:'white',width:'90%'}} variant="outlined" startIcon={<Chat />}>แชทเลย</Button>
                                </Grid>
                                <Grid xs={10} sm={4} md={4}>
                                    <Button sx={{width:'90%'}} href={`/shop/${encodeURIComponent(products.shop_id)}`} variant="outlined" >ดูร้านค้า</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={2} >
                        <Box sx={{alignItems:'center'}}>
                            <p style={{color:'#ABB2B9'}}>คะแนน <label style={{color:'#196bfd'}}>99.7พัน</label></p>
                            <p style={{color:'#ABB2B9'}}>รายการสินค้า <label style={{color:'#196bfd'}}>149</label></p>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={3} >
                        <Box sx={{alignItems:'center'}}>
                            <p style={{color:'#ABB2B9'}}>อัตราการตอบกลับ <label style={{color:'#196bfd'}}>97%</label></p>
                            <p style={{color:'#ABB2B9'}}>เวลาในการตอบกลับ <label style={{color:'#196bfd'}}>ภายในไม่กี่ชั่วโมง</label></p>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={2} >
                        <Box sx={{alignItems:'center'}}>
                            <p style={{color:'#ABB2B9'}}>เข้าร่วมเมื่อ <label style={{color:'#196bfd'}}>28 เดือน ที่ผ่านมา</label></p>
                            <p style={{color:'#ABB2B9'}}>ผู้ติดตาม <label style={{color:'#196bfd'}}>136.8พัน</label></p>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        )
    }
    function RenderReview(){
        return(
            products_review.map(items =>
            <Box sx={{paddingLeft:'10px',paddingRight:'10px'}}>
                <Grid container className='p-3'>
                    <Grid item xs={12} sm={1} md={1} >
                        <Avatar
                            alt="Deee"
                            src=""
                            sx={{ width: 40, height: 40 }}
                        />
                    </Grid>
                    <Grid item xs={11} sm={11} md={11} >
                        <span style={{fontSize:'14px'}}>{items.username}</span><br/>
                        <Rating name="read-only" value={items.rating} readOnly size="small"/><br/>
                        <span style={{color:'#ABB2B9',fontSize:'12px'}}>ตัวเลือกสินค้า: {items.product_options.name} {items.product_options.value}</span><br/>
                        <span style={{fontSize:'12px'}}>{items.details}</span>
                        <div style={{marginRight:'5px'}}>
                        {items.review_gall.map(pic => 
                            <img
                                src={pic.url}
                                alt="brownie"
                                className='review-picture'
                            />
                            )}
                        </div>
                        <p style={{color:'#ABB2B9',fontSize:'12px'}}>{items.review_date}</p>
                    </Grid>
                </Grid>
                <hr/>
            </Box>
            )
        )
    }
    function RenderSameProduct(){
        return (
            sameProducts.map((step, index) => (
                <Grid md={2} xs={6} sm={4} 
                    style={{ display: 'grid',justifyContent: 'center'}} 
                    border={1} borderColor='#F5F5F5' 
                    backgroundColor="white" 
                    marginBottom={1}
                    height='288px'
                    width="190px"
                    >
                    <Link href={`/product_detail/${encodeURIComponent(step.slug)}`} underline="none">
                    <img src={step.thumbnail} className="product-image-recomend" />
                        <div style={{height:'70px', padding:'5px'}}>
                        <p style={{fontSize:'13px'}}>{step.name}</p>
                        </div>
                    <div>
                    <Grid container display="flex" alignItems="center">
                        <Grid md={5} xs={4} sm={5} >
                        <Typography  variant="body2" component="block" color="rgb(238,77,45)">
                            ฿ {step.sell_price}
                        </Typography>
                        </Grid>
                        <Grid md={7} xs={8} sm={7}>
                        <Typography  variant="body2" color="text.secondary" align="end" fontSize={12}>
                        ขายแล้ว {step.qty} ชิ้น
                        </Typography>
                        </Grid>
                    </Grid>
                    </div>
                    </Link>
                </Grid>
            ))
          )

    }
    function RenderLikeProduct(){
        return (
            sameProducts.map((step, index) => (
                <Grid md={2} xs={6} sm={4} 
                    style={{ display: 'grid',justifyContent: 'center'}} 
                    border={1} borderColor='#F5F5F5' 
                    backgroundColor="white" 
                    marginBottom={1}
                    height='288px'
                    width="190px"
                    >
                    <Link href={`/product_detail/${encodeURIComponent(step.slug)}`} underline="none">
                    <img src={step.thumbnail} className="product-image-recomend" />
                        <div style={{height:'70px', padding:'5px'}}>
                        <p style={{fontSize:'13px'}}>{step.name}</p>
                        </div>
                    <div>
                    <Grid container display="flex" alignItems="center">
                        <Grid md={5} xs={4} sm={5} >
                        <Typography  variant="body2" component="block" color="rgb(238,77,45)">
                            ฿ {step.sell_price}
                        </Typography>
                        </Grid>
                        <Grid md={7} xs={8} sm={7}>
                        <Typography  variant="body2" color="text.secondary" align="end" fontSize={12}>
                        ขายแล้ว {step.qty} ชิ้น
                        </Typography>
                        </Grid>
                    </Grid>
                    </div>
                    </Link>
                </Grid>
            ))
          )

    }
    const Column = ({  data, index, style }) => {
        const item = data[index];
        return (
            <div
                key={index}
                onClick={() => setThumbnail(item.url)}
                style={style}
            >
                <img src={item.url} className='preview-product'/>
            </div>
        );
    }
       

    return (
        <div >
            <Box sx={{marginTop: { xs: '1rem', sm: '1rem',md:'1rem' }, alignItems:'center', justifyItems:'center'}} >
               <Grid marginLeft={{ xs: '1rem', sm: '1rem',md:0 , lg:0}}> <p style={{fontSize:'14px'}}>หน้าแรก > {category} > {subCategory} > {products && products.name}</p></Grid>
                <div style={{width:'100%', backgroundColor:'white'}}>
                    <Grid container className="p-3">
                        <Grid lg={5} md={5} xs={12} sm={12} item>
                            <div className='product-detail-photo mb-1'>
                                <img
                                    src={thumbnail}
                                    alt="picture"
                                    style={{width: '100%',height: '100%', objectFit: 'cover'}}
                                />
                            </div>
                            <List
                                height={82}
                                itemCount={products && products.product_galleries ?  products.product_galleries.length : 0}
                                itemData={products && products.product_galleries ?  products.product_galleries : []}
                                itemSize={100}
                                layout="horizontal"
                                width={450}
                            >
                                {Column}
                            </List>
                        </Grid>
                        <Grid item lg={7} md={7} xs={12} sm={12}>
                            <Box paddingLeft={2}>
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
                                    <span style={{fontSize:'1.875rem',color:'#196bfd'}}>฿ {selectPrice.toFixed(2)}</span>
                                </Box>
                                <Box sx={{marginBottom:'10px'}}>
                                    <Grid container>
                                            <Grid item xs={12} sm={2} md={2} sx={{display:'flex', alignItems:'center'}}>
                                                <span style={{color:'#ABB2B9',fontSize:'14px'}}>การจัดส่ง</span>
                                            </Grid>
                                            <Grid item xs={12} sm={10} md={10}>
                                                <Box sx={{alignItems:'center', display:'flex'}}>
                                                    <LocalShippingIcon fontSize="medium" sx={{color:'#00BFA5'}}/>
                                                    <span style={{color:'#ABB2B9',fontSize:'14px'}}>ฟรีค่าจัดส่ง</span>
                                                </Box>
                                            </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{marginBottom:'10px'}}>
                                    <Grid container>
                                        <Grid item xs={12} sm={2} md={2}>
                                        {products && products.product_options !== [] ? <span style={{color:'#ABB2B9',fontSize:'14px'}}>ตัวเลือกสินค้า</span> : ''}
                                        </Grid>
                                        <Grid item xs={12} sm={10} md={10}>
                                            {products && products.product_options ? products.product_options.map(item => 
                                            <Radio.Group buttonStyle="solid" key={item.id} value={selectOption===0 ? products.product_options[0].id : selectOption}>
                                                <Radio.Button style={{marginRight:'5px', marginBottom:'5px'}} value={item.id} onChange={e => onChangePrice(e.target.value)}>{item.name} {item.value}</Radio.Button>
                                            </Radio.Group>
                                            ): null}
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{marginBottom:'10px'}}>
                                    <Grid container>
                                        <Grid item xs={12} sm={2} md={2}>
                                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>จำนวน</span>
                                        </Grid>
                                        <Grid item xs={12} sm={10} md={10}>
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
                                        <Grid item xs={12} sm={2} md={2}>
                                        </Grid>
                                        <Grid item xs={12} sm={10} md={10}>
                                        <span style={{color:'#ABB2B9',fontSize:'12px'}}>มีสินค้าจำนวน {products && products.qty ? products.qty : 0 } ชิ้น</span>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{marginBottom:'10px'}}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <Button type="submit" sx={{backgroundColor:'#196bfd',color:'white',width:'90%'}} variant="outlined" startIcon={<ShoppingCartIcon />} onClick={e => {addToCart()}}>เพิ่มไปยังรถเข็น</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={4}>
                                            <Button sx={{width:'90%'}} type="submit" variant="outlined" onClick={e => {toCheckout()}}>ซื้อสินค้า</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                
            </Box>

            <Box sx={{marginTop:'10px'}}>
                <div style={{width:'100%', backgroundColor:'white'}}>
                    <Grid container className="p-3">
                        <Box sx={{alignItems:'center', display:'flex', paddingRight:'20px'}}>
                            <Grid item xs={12} sm={12} md={1} >
                                <Avatar
                                    alt={shop && shop.name ? shop.name : ''}
                                    src={shop && shop.cover ? shop.cover : ''}
                                    sx={{ width: 70, height: 70 }}
                                />
                            </Grid>
                        </Box>
                        <Grid item xs={12} sm={12} md={4} >
                            <span>{shop && shop.name ? shop.name : ''}</span> <br/>
                            <span style={{color:'#ABB2B9',fontSize:'12px'}}>Active 1 ชั่วโมง ที่ผ่านมา</span>
                            <Box sx={{marginBottom:'10px'}}>
                                <Grid container>
                                    <Grid xs={10} sm={4} md={4}>
                                        <Button sx={{backgroundColor:'#196bfd',color:'white',width:'90%'}} variant="outlined" startIcon={<Chat />}>แชทเลย</Button>
                                    </Grid>
                                    <Grid xs={10} sm={4} md={4}>
                                        <Button sx={{width:'90%'}} href={`/shop/${encodeURIComponent(products.shop_id)}`} variant="outlined"  startIcon={<StorefrontIcon />}>ดูร้านค้า</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} display='grid' alignItems='center'>
                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>คะแนน <label style={{color:'#196bfd'}}>99.7พัน</label></span>
                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>รายการสินค้า <label style={{color:'#196bfd'}}>149</label></span>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} display='grid' alignItems='center'>
                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>อัตราการตอบกลับ <label style={{color:'#196bfd'}}>97%</label></span>
                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>เวลาในการตอบกลับ <label style={{color:'#196bfd'}}>ภายในไม่กี่ชั่วโมง</label></span>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} display='grid' alignItems='center'>
                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>เข้าร่วมเมื่อ <label style={{color:'#196bfd'}}>28 เดือน ที่ผ่านมา</label></span>
                            <span style={{color:'#ABB2B9',fontSize:'14px'}}>ผู้ติดตาม <label style={{color:'#196bfd'}}>136.8พัน</label></span>
                        </Grid>
                    </Grid>
                </div>
            </Box>
            
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{marginTop:'10px'}}>
                        <div style={{width:'100%', backgroundColor:'white'}}>
                            <Box sx={{padding:'1rem'}}>
                                <h5>ข้อมูลจำเพาะของสินค้า</h5>
                                <Grid container>
                                    <Grid item xs={12} sm={1} md={1}>
                                        <p style={{color:'#ABB2B9',fontSize:'14px'}}> หมวดหมู่</p>
                                    </Grid>
                                    <Grid item xs={12} sm={11} md={11}>
                                        <p style={{fontSize:'14px'}}>{category} > {subCategory} </p>
                                    </Grid>
                                    <Grid item xs={12} sm={1} md={1}>
                                        <p style={{color:'#ABB2B9',fontSize:'14px'}}> จำนวนสินค้า</p>
                                    </Grid>
                                    <Grid item xs={12} sm={11} md={11}>
                                        <p style={{fontSize:'14px'}}>{products && products.qty} </p>
                                    </Grid>
                                </Grid>
                                <h5>รายละเอียดสินค้า</h5>
                                <p style={{fontSize:'14px'}}>{products && products.description}</p>
                                </Box>
                        </div>
                    </Box>

                    <Box sx={{marginTop:'10px'}}>
                        <div style={{width:'100%', backgroundColor:'white'}}>
                            <Box sx={{padding:'1rem'}}>
                                <h5>คะแนนของสินค้า</h5>
                                <Box sx={{backgroundColor:'#F5F5F5',padding:'1rem'}}>
                                    <Grid container>
                                        <Grid item xs={12} sm={3} md={2} >
                                            <span style={{fontSize:'25px',color:'#196bfd'}}>0 <label style={{fontSize:'18px'}}>เต็ม 5</label></span><br/>
                                            <Rating name="read-only" value={0} readOnly size="medium"/>
                                        </Grid>
                                        <Grid item xs={12} sm={11} md={10} >
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>ทั้งหมด</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>5 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>4 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>3 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>2 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>1 ดาว</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>ความคิดเห็น</Button>
                                            <Button variant="outlined" sx={{marginRight:'10px'}}>มีรูปภาพ/วีดีโอ</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <RenderReview />
                            </Box>
                            <Box className='pagination-position'>
                                <Pagination defaultCurrent={1} total={50} />
                            </Box>
                        </div>
                    </Box>
                    <div className="mt-4" style={{backgroundColor:'white'}}>
                        <div className="d-flex justify-content-between p-1">
                        <label style={{color:'#707070'}}>จากร้านเดียวกัน</label>
                        <label className="text-main" style={{fontSize:'14px'}}>ดูทั้งหมด ></label>
                        </div>
                        <Grid container spacing={0} item>
                            <RenderSameProduct />
                        </Grid>
                    </div>
                    <div className="mt-4" style={{backgroundColor:'white'}}>
                        <div className="d-flex justify-content-between p-1">
                        <label style={{color:'#707070'}}>สินค้าที่คล้ายกัน</label>
                        <label className="text-main" style={{fontSize:'14px'}}>ดูทั้งหมด ></label>
                        </div>
                        <Grid container spacing={0} item>
                            <RenderSameProduct />
                        </Grid>
                    </div>
                    <div className="mt-4" style={{backgroundColor:'white'}}>
                        <div className="d-flex justify-content-between p-1">
                        <label style={{color:'#707070'}}>สินค้าที่คุณอาจจะชอบ</label>
                        <label className="text-main" style={{fontSize:'14px'}}>ดูทั้งหมด ></label>
                        </div>
                        <Grid container spacing={0} item>
                            <RenderLikeProduct />
                        </Grid>
                    </div>
                </Grid>
                {/* <Grid item xs={12} sm={11} md={2} className="mobile-none">
                    <Box sx={{marginTop:'10px'}} marginLeft={{xs:'10px', sm:'10px', md:'10px'}}>
                        <div style={{width:'100%', backgroundColor:'white', padding:'5px'}}>
                            <p style={{fontSize:'14px'}}>สินค้าขายดีประจำร้าน</p>
                            <Grid  container>
                                <RenderTopProduct />
                            </Grid>
                        </div>
                    </Box>
                </Grid> */}
            </Grid>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>เข้าสู่ระบบ</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}