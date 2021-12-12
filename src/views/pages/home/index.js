import { Fragment,useState,useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Link from '@material-ui/core/Link';
import Button from '@mui/material/Button';
import {APIgetProduct} from '../../../../services/api'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CountdownTimer from "react-component-countdown-timer";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Image from 'next/image';
import b1 from '../../../../public/images/news/b1.jpg';
import b2 from '../../../../public/images/news/b2.jpg';
import n1 from '../../../../public/images/promotions/n1.png';
import n2 from '../../../../public/images/promotions/n2.png';
import n3 from '../../../../public/images/promotions/n3.png';

import { Row, Col, Carousel } from 'antd';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const data_new  = [
    {
      label: 'Slide 1',
      key: 1,
      src: '../../images/news/g1.jpg'
    },
    {
      label: 'Slide 2',
      key: 2,
      src: '../../images/news/g2.jpg'
    },
    {
      label: 'Slide 3',
      key: 3,
      src: '../../images/news/g3.jpg'
    }
  ]
const data_new_mall  = [
    {
      label: 'Slide 1',
      key: 1,
      src: '../../images/casourel_brand/1.png'
    },
    {
      label: 'Slide 2',
      key: 2,
      src: '../../images/casourel_brand/2.png'
    },
    {
      label: 'Slide 3',
      key: 3,
      src: '../../images/casourel_brand/3.png'
    }
  ]

  const item_menus = [
    {
      id:1,
      details:'โค้ดส่งฟรี*',
      path:'/images/menu/free_shipping.png'
    },
    {
      id:2,
      details:'แบรนด์แื้ถูกชัวร์',
      path:'/images/menu/brand.png'
    },
    {
      id:3,
      details:'สินค้าอิเล็กทรอนิกส์',
      path:'/images/menu/electornic.png'
    },
    {
      id:4,
      details:'Game Zone',
      path:'/images/menu/games.png'
    },
    {
      id:5,
      details:'Partner',
      path:'/images/menu/partner.png'
    },
    {
      id:6,
      details:'ซุเปอร์มาร์ดเก็ตช้อป รับคะแนน*',
      path:'/images/menu/supermarket.png'
    },
    {
      id:7,
      details:'แลกรางวัล Shopee Coins',
      path:'/images/menu/coin.png'
    },
    {
      id:8,
      details:'โค้ดส่วนบดพิเศษ',
      path:'/images/menu/coupon.png'
    },
    {
      id:9,
      details:'แฟชั่น ส่งฟรี*',
      path:'/images/menu/fasion.png'
    },
    {
      id:10,
      details:'โปรโมชั่นพิเศษ',
      path:'/images/menu/ptomotion.png'
    },
  ]
  const menu_mall = [
    {
      id:1,
      details:'ลดสูงสุด 50%',
      path:'/images/mall/1.png'
    },
    {
      id:2,
      details:'ลดสูงสุด 80%',
      path:'/images/mall/2.png'
    },
    {
      id:3,
      details:'ลดสูงสุด 50%',
      path:'/images/mall/3.png'
    },
    {
      id:4,
      details:'ลดสูงสุด 50%',
      path:'/images/mall/4.png'
    },
    {
      id:5,
      details:'ลดสูงสุด 60%',
      path:'/images/mall/5.png'
    },
    {
      id:6,
      details:'ลดสูงสุด 70%',
      path:'/images/mall/6.png'
    },
    {
      id:7,
      details:'ลดสูงสุด 90%',
      path:'/images/mall/7.png'
    },
    {
      id:8,
      details:'ลดสูงสุด 50%',
      path:'/images/mall/8.png'
    },

  ]
  const menu_top_search = [
    {
      id:1,
      name:'บราวนี่',
      path:'/images/products/brownie.jpg',
      count:1000,
    },
    {
      id:2,
      name:'คุ้กกี้',
      path:'/images/products/cookie.jpg',
      count:1000,

    },
    {
      id:3,
      name:'เสื้อครอบ',
      path:'/images/products/crop.jpg',
      count:1000,

    },
    {
      id:4,
      name:'ร่ม',
      path:'/images/products/umbrella.jpg',
      count:1000,

    },
    {
      id:5,
      name:'แปรงสีฟัน',
      path:'/images/products/toothbrush.jpg',
      count:1000,
    },
    
  ]

  const products_flash_sale  = [
    {
      label: 'P1',
      key: 1,
      product_name:'บราวนี่หน้าฟิล์ม กรอบนอกนุ่มใน หวานน้อย',
      src: '../../images/products/brownie.jpg',
      product_detail: 'บราวนี่แสนอร่อย หน้าฟิล์ม หวานน้อย',
      price: 89,
      product_qty: 500,
    },
    {
      label: 'P2',
      key: 2,
      product_name:'คุ้กกี้มาร์ชเมลโล่ แพค 3ชิ้น',
      src: '../../images/products/cookie.jpg',
      product_detail: 'คุ้กกี้มาร์ชเมลโล่ กรอบนอกนุ่มใน หวานมันอร่อย สอดไส้มาร์ชเมลโล่',
      price: 129,
      product_qty: 135,
  
    },
    {
      label: 'P3',
      key: 3,
      product_name:'เสื้อครอบ สีมิ้น กระดุมหน้า',
      src: '../../images/products/crop.jpg',
      product_detail: 'เสื้อครอบ Free size สีสวย ผ้าไม่ย้วย',
      price: 200,
      product_qty: 39,
  
    },
    {
      label: 'P4',
      key: 4,
      product_name:'ชุดว่ายน้ำเซตเสื้อกางเกง สีดำ มีทุกไซต์',
      src: '../../images/products/swimming.jpg',
      product_detail: 'ชุดว่ายน้ำสตรีสีดำเป็นชุดเซ็ต เสื้อ+กางเกง มีหลายไซต์ S M L XL 2XL 3XL 4XL',
      price: 699,
      product_qty: 421,
  
    },
    {
      label: 'P5',
      key: 5,
      product_name:'ร่มกันแดด กันฝน ป้องกัน UVได้ สีแดง ขนาดใหญ่',
      src: '../../images/products/umbrella.jpg',
      product_detail: 'ร่วมกันแดดกันฝน สามารถป้องกัน UV ได้ดี สีแดงขนาดใหญ่ ผู้ใหญ่เข้าได้2-3 คน',
      price: 199,
      product_qty: 500,
  
    },
    {
      label: 'P6',
      key: 6,
      product_name:'แปรงสีฟันคอเกต แบบแพ๊ค 5 ชิ้น',
      src: '../../images/products/toothbrush.jpg',
      product_detail:'แปรงสีฟันคอเกต แบบแพ๊ค 5 ชิ้น คละสี ขนแปรงนุ่มไม่บาดเหงือก ',
      price: 65,
      product_qty: 1236,
  
    },
  ];
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
export default function HomeScreen() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(30)
    const [value, setValue] = useState(0);

    const contentStyle = {
      height: '235px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };

    useEffect(() => {
        APIgetProduct(limit).then(res => {
            if (res.success) {
                setProducts(res.data)
                console.log('res',res.data);
            } else {
                console.log('res',res);

            }
        }).catch(err => {
            console.log('res',err);

        })
        }, [item_menus])

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };
    const onChange = () => {

    }
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function RenderMenu() {
      return(
        <Fragment>
        {menu.map(item => {
          <Grid md={2} sm={4} xs={3}>
              <img src={item.path}  width='100%'/>
              <p>{item.details}</p>
          </Grid>
        }) 
        }
        </Fragment>
      )
    }
    function RenderProduct() {
        return (
          <Fragment>
            {products.map((step, index) => (
              <Grid md={1.8} xs={6} sm={4} style={{ display: 'grid',justifyContent: 'center'}} backgroundColor="white" marginBottom={1}>
                  <Link href={`/product_detail/${encodeURIComponent(step.slug)}`} underline="none">
                  <img src={step.thumbnail} className="product-image-recomend" />
                  <div style={{padding:'1px'}}><p style={{fontSize:'13px'}}>{step.name}</p></div>
                  <div>
                  <Grid container>
                    <Grid md={5} xs={6} sm={6}>
                      <Typography  variant="body2" component="block" color="rgb(238,77,45)">
                        ฿ {step.sell_price}
                      </Typography>
                    </Grid>
                    <Grid md={7} xs={6} sm={6}>
                      <Typography  variant="body2" color="text.secondary" align="end" >
                      ขายแล้ว {step.qty} ชิ้น
                      </Typography>
                    </Grid>
                  </Grid>
                  </div>
                  </Link>
              </Grid>
              // <Grid md={2} xs={6} sm={4} style={{ display: 'flex',justifyContent: 'center'}}>
              //     <Link href={`/product_detail/${encodeURIComponent(step.slug)}`} underline="none">
              //       <Card  sx={{maxWidth: 190, height:{ xs: 200, sm: 250,md:300 }, marginTop: '10px'}}>
              //         <CardMedia
              //           component="img"
              //           sx={{height:{ xs: 100, sm: 150,md:200 }}}
              //           // height={200}
              //           image={step.thumbnail}
              //           alt={step.label}
              //         />
              //         <CardContent sx={{padding: '10px', height: '60px'}}>
              //           <Typography  variant="body2" component="block" >
              //             {step.name}
              //           </Typography>
              //         </CardContent>
              //         <CardActions >
              //           <Grid container>
              //             <Grid md={6} xs={6} sm={6}>
              //               <Typography  variant="body2" component="block" color="rgb(238,77,45)">
              //                 ฿ {step.sell_price}
              //               </Typography>
              //             </Grid>
              //             <Grid md={6} xs={6} sm={6}>
              //               <Typography  variant="body2" color="text.secondary" align="end" >
              //               {step.qty} ชิ้น
              //               </Typography>
              //             </Grid>
              //           </Grid>
              //         </CardActions>
              //       </Card>
              //        </Link>
              //     </Grid>
            ))}
          </Fragment>
          )
      }
    function RenderProductFlashSale() {
        return (
          <Fragment>
            {products_flash_sale.map((step, index) => (
              <Grid md={2} xs={6} sm={4} marginBottom={2}>
                <Grid style={{width:'100%'}} display='grid' justifyItems='center'>
                  <div >
                    <img src={step.src} className="product-image" />
                  </div>
                  <div>
                    <p className="text-main text-center">
                        ฿  <label style={{fontSize:'18px'}}>{step.price}</label>
                    </p>
                  </div>
                  <div className="rounded-pill w-50" style={{height:'20px', backgroundColor:'#baecff'}}>
                  <p style={{fontSize:'12px',textAlign:'center',color:'white'}}>ขายแล้ว 100</p>
                  </div>
                </Grid>
              </Grid>
            ))}
          </Fragment>
          )
      }
    return (
      <Grid container marginTop={{md:2, sm:1 ,xs:0}}>
        <Grid container>
          <Grid item md={8} sm={12} xs={12}>
             <Carousel afterChange={onChange}>
              {data_new.map(item => 
                <div>
                  <h3 className="carousel-container">
                    <img src={item.src} className="branner"/>
                  </h3>
                </div>
              )}
            </Carousel>
          </Grid>
          <Grid item md={4} sm={0} xs={3} className="d-block align-items-center" >
            <Grid container style={{height:'130px'}} marginBottom={{md:1, sm:'none' ,xs:'none'}} display={{lg:'flex', md:'flex', sm:'none' ,xs:'none'}} marginLeft={1}>
              <Image
                  src={b1}
                  alt="Picture of the author"
                  sx={{width: '100%', height:'100%'}}
              />
            </Grid>
            <Grid container style={{height:'130px'}} display={{lg:'flex',md:'flex', sm:'none' ,xs:'none'}} marginLeft={1}>
              <Image
                  src={b2}
                  alt="Picture "
                  sx={{width: '100%', height:'100%'}}
              />
            </Grid>
          </Grid>
        </Grid>

        <div style={{ width:'100%', backgroundColor:'white'}}>
          <Grid container>
          {item_menus.map(item => 
            <Grid item md={1.2} sm={3} xs={4} display='grid' justifyItems='center'>
              <img src={item.path} width='60%' />
              <p className="text-center" style={{fontSize:'12px'}}>{item.details}</p>
            </Grid>
            )}
            </Grid>
        </div>

        <div style={{ width:'100%', backgroundColor:'white'}} className="mt-3">
          <Grid container spacing={0}>
              <Grid md={11} xs={10} sm={11} >
              <div className="d-flex align-items-center">
                      <img src='../../images/logo/fs1.png' className="logo-flash-sale" />  
                          <span> 
                          <CountdownTimer count={5432} hideDay color="#fff" backgroundColor="#000" labelSize={30} responsive/>
                  </span>
              </div>
              </Grid>  
              <Grid md={1} xs={2} sm={1} className="d-flex align-items-center">
                  <span className="text-main font-dountdown ">ดูทั้งหมด ></span>
              </Grid>
          </Grid>  
          <hr/>
          <Grid  container>
              <RenderProductFlashSale />
          </Grid>
        </div>
        
        <div style={{ width:'100%'}} className="mt-2 mobile-none">
          <div className="row row-custom">
            <div className="col-4">
              <img
                src='/images/Promotions/n1.png'
                alt="Picture "
                className="rounded"
                width="100%"
              // sx={{width: '100%',height: '100%'}}
              />
            </div>
            <div className="col-4">
              <img
                src='/images/Promotions/n2.png'
                alt="Picture "
                className="rounded"
                width="100%"

              // sx={{width: '100%',height: '100%'}}
              />
            </div>
            <div className="col-4">
              <img
                src='/images/Promotions/n3.png'
                alt="Picture "
                className="rounded"
                width="100%"
              // sx={{width: '100%',height: '100%'}}
              />
            </div>
          </div>
        </div>

        <div style={{ width:'100%', backgroundColor:'white'}} className="mt-3">
          <Grid container spacing={0}>
              <Grid md={11} xs={10} sm={11} display="flex" alignContent="center" padding={1}>
              <div className="d-flex align-items-center ">
                <span className="text-main">FIINSHOP MALL</span>
                <span className="text-main mobile-none"> &nbsp;|&nbsp; </span>
                <span className="mobile-none"> <VerifiedUserIcon fontSize="small"/>ของแท้ 100%</span>
                <span className="mobile-none">&nbsp;&nbsp;&nbsp; <ArrowCircleUpIcon fontSize="small"/>คืนเงิน/สินค้า ภายใน 15 วัน</span>
                <span className="mobile-none">&nbsp;&nbsp;&nbsp;<LocalShippingIcon fontSize="small" /> ส่งฟรีทั่วไทย</span>
              </div>
              </Grid>  
              <Grid md={1} xs={2} sm={1} className="d-flex align-items-center">
                  <span className="text-main font-dountdown ">ดูทั้งหมด ></span>
              </Grid>
          </Grid>  
          <hr/>
          <Grid container padding={1}>
            <Grid item md={4} sm={12} xs={12}>
              <Carousel afterChange={onChange}>
                {data_new_mall.map(item => 
                  <div>
                    <h3 className="carousel-container-mall">
                      <img src={item.src} className="branner"/>
                    </h3>
                  </div>
                )}
              </Carousel>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Grid container>
                {menu_mall.map(items =>
                    <Grid md={3} xs={6} sm={4} display="grid" alignItems="center" justifyItems="center">
                        <img src={items.path} className="product-image" />
                        <p className="text-center" style={{color:'red'}}>
                          <label style={{fontSize:'15px'}}>{items.details}</label>
                        </p>
                    </Grid>
                   )}
                
              </Grid>
            </Grid>
          </Grid>
        </div>


        <div style={{ width:'100%', backgroundColor:'white'}} className="mt-3">
          <Grid container spacing={0}>
              <Grid md={11} xs={10} sm={11} display="flex" alignContent="center" padding={1}>
              <div className="d-flex align-content-center">
                <span className="">ค้นหายอดฮิต</span>
              </div>
              </Grid>  
              <Grid md={1} xs={2} sm={1} className="d-flex align-items-center">
                  <span className="text-main font-dountdown ">ดูทั้งหมด ></span>
              </Grid>
          </Grid>  
          <hr/>
          <Grid container >
            {menu_top_search.map(items =>
              <Grid md={2.3} xs={6} sm={4} display="flex" alignItems="center" justifyContent="center">
                <Grid>
                  <p style={{fontSize:'12px'}}>
                    {items.name} <br/>
                    <label style={{color:'#c9c9c9'}}>{items.count} รายการ</label>
                  </p>
                  <img src={items.path} className="product-image-search" />
                </Grid>
              </Grid>
              )}
                
          </Grid>
        </div>

        <div style={{ width:'100%', backgroundColor:'white'}} className="mt-3">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="สินค้าแระรำประจำวัน" {...a11yProps(0)} />
              <Tab label="สินค้าโปรโมชั่น" {...a11yProps(1)} />
              </Tabs>
          </Box>
          <TabPanel value={value} index={0} style={{backgroundColor:'#F5F5F5'}}>
            <Grid container display="flex" justifyContent="space-between" >
                <RenderProduct />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Grid container display="flex" justifyContent="space-between">
              <RenderProduct />
          </Grid>
          </TabPanel>
        </div>
        <div style={{justifyContent: 'center', width:'100%', display:'flex'}} className="mt-3 mb-3">
            <Button variant="outlined" sx={{width: { xs: '100%', sm: '60%', md:'30%' }}}>ดูเพิ่มเติม</Button>
        </div>
      </Grid>
    );
}