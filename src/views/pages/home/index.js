import { Fragment,useState,useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
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
import Slider from "react-slick";

import { Row, Col, Carousel as AntCarousel, Progress } from 'antd';
import { ProgressBar} from 'react-bootstrap';
import { isHostComponent } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const data_new  = [
    {
      label: 'Slide 1',
      key: 1,
      src: '../../images/news/FiinShop1.jpg'
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
      path:'/images/menu/m1.png'
    },
    {
      id:2,
      details:'แบรนด์นี้ถูกชัวร์',
      path:'/images/menu/m2.png'
    },
    {
      id:3,
      details:'สินค้าอิเล็กทรอนิกส์',
      path:'/images/menu/m3.png'
    },
    {
      id:4,
      details:'Game Zone',
      path:'/images/menu/m4.png'
    },
    {
      id:5,
      details:'Partner',
      path:'/images/menu/m5.png'
    },
    {
      id:6,
      details:'ซุเปอร์มาร์ดเก็ต',
      path:'/images/menu/m6.png'
    },
    {
      id:7,
      details:'Shopee Coins',
      path:'/images/menu/m7.png'
    },
    {
      id:8,
      details:'โค้ดส่วนลดพิเศษ',
      path:'/images/menu/m8.png'
    },
    {
      id:9,
      details:'แฟชั่น ส่งฟรี*',
      path:'/images/menu/m9.png'
    },
    {
      id:10,
      details:'โปรโมชั่นพิเศษ',
      path:'/images/menu/m10.png'
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
      count_sell:12
    },
    {
      label: 'P2',
      key: 2,
      product_name:'คุ้กกี้มาร์ชเมลโล่ แพค 3ชิ้น',
      src: '../../images/products/cookie.jpg',
      product_detail: 'คุ้กกี้มาร์ชเมลโล่ กรอบนอกนุ่มใน หวานมันอร่อย สอดไส้มาร์ชเมลโล่',
      price: 129,
      product_qty: 135,
      count_sell:30
    },
    {
      label: 'P3',
      key: 3,
      product_name:'เสื้อครอบ สีมิ้น กระดุมหน้า',
      src: '../../images/products/crop.jpg',
      product_detail: 'เสื้อครอบ Free size สีสวย ผ้าไม่ย้วย',
      price: 200,
      product_qty: 39,
      count_sell:89
    },
    {
      label: 'P4',
      key: 4,
      product_name:'ชุดว่ายน้ำเซตเสื้อกางเกง สีดำ มีทุกไซต์',
      src: '../../images/products/swimming.jpg',
      product_detail: 'ชุดว่ายน้ำสตรีสีดำเป็นชุดเซ็ต เสื้อ+กางเกง มีหลายไซต์ S M L XL 2XL 3XL 4XL',
      price: 699,
      product_qty: 421,
      count_sell:45
    },
    {
      label: 'P5',
      key: 5,
      product_name:'ร่มกันแดด กันฝน ป้องกัน UVได้ สีแดง ขนาดใหญ่',
      src: '../../images/products/umbrella.jpg',
      product_detail: 'ร่วมกันแดดกันฝน สามารถป้องกัน UV ได้ดี สีแดงขนาดใหญ่ ผู้ใหญ่เข้าได้2-3 คน',
      price: 199,
      product_qty: 500,
      count_sell:20
    },
    {
      label: 'P6',
      key: 6,
      product_name:'แปรงสีฟันคอเกต แบบแพ๊ค 5 ชิ้น',
      src: '../../images/products/toothbrush.jpg',
      product_detail:'แปรงสีฟันคอเกต แบบแพ๊ค 5 ชิ้น คละสี ขนแปรงนุ่มไม่บาดเหงือก ',
      price: 65,
      product_qty: 1236,
      count_sell:10
    },
    {
      label: 'P2',
      key: 2,
      product_name:'คุ้กกี้มาร์ชเมลโล่ แพค 3ชิ้น',
      src: '../../images/products/cookie.jpg',
      product_detail: 'คุ้กกี้มาร์ชเมลโล่ กรอบนอกนุ่มใน หวานมันอร่อย สอดไส้มาร์ชเมลโล่',
      price: 129,
      product_qty: 135,
      count_sell:30
    },
    {
      label: 'P3',
      key: 3,
      product_name:'เสื้อครอบ สีมิ้น กระดุมหน้า',
      src: '../../images/products/crop.jpg',
      product_detail: 'เสื้อครอบ Free size สีสวย ผ้าไม่ย้วย',
      price: 200,
      product_qty: 39,
      count_sell:89
    },
    {
      label: 'P4',
      key: 4,
      product_name:'ชุดว่ายน้ำเซตเสื้อกางเกง สีดำ มีทุกไซต์',
      src: '../../images/products/swimming.jpg',
      product_detail: 'ชุดว่ายน้ำสตรีสีดำเป็นชุดเซ็ต เสื้อ+กางเกง มีหลายไซต์ S M L XL 2XL 3XL 4XL',
      price: 699,
      product_qty: 421,
      count_sell:45
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
    const [limit, setLimit] = useState(12)
    const [value, setValue] = useState(0);

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block" ,color:'red'}}
          onClick={onClick}
        />
      );
    }
    
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block" }}
          onClick={onClick}
        />
      );
    }
    const settings_slider = {
      dots: false,
      infinite: false,
      speed: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: false,
    };
    const settings_slider_mobile = {
      dots: false,
      infinite: false,
      speed: false,
      slidesToShow: 2.5,
      slidesToScroll: 2,
      autoplay: false,
    };
    const settings_slider_menu_mall = {
      dots: false,
      infinite: false,
      speed: false,
      slidesToShow: 3.5,
      slidesToScroll: 3,
      autoplay: false,
    };
    const settings_menu = {
      dots: false,
      infinite: false,
      speed: false,
      slidesToShow: 4.5,
      slidesToScroll: 3,
      autoplay: false,
    };

    useEffect(() => {
      const data = {
        'limit' : limit,
        'offset': 0,
        'keyword':'',
    }
      const formData = JSON.stringify(data)
      getProduct(formData)
     
       
        }, [item_menus])

    const getProduct = (data) => {
      APIgetProduct(data).then(res => {
        if (res.success) {
            setProducts(res.data.products)
            console.log('res',res.data);
        } else {
            console.log('res',res);

        }
    }).catch(err => {
        console.log('res',err);

    })
    }
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
            {products.length && products.map((step, index) => (
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
            ))}
          </Fragment>
          )
      }
    function RenderProduct2() {
        return (
          <Fragment>
            {products.length && products.map((step, index) => (
               <div className='col-6 col-xs-6 col-sm-4 col-md-2 mb-2 product-responsive'>
                 <div className='card-product border'>
                  <Link href={`/product_detail/${encodeURIComponent(step.slug)}`} underline="none">
                    <img src={step.thumbnail} className="product-image-recomend" />
                    <div className='product-name'>
                      <p style={{fontSize:'13px'}}>{step.name}</p>
                    </div>
                    <div className='d-flex justify-content-between align-content-center p-1'>
                      <span style={{fontSize:'14px', color:'rgb(238,77,45)'}}>฿ {step.sell_price}</span>
                      <span style={{fontSize:'12px',color:'gray'}}>ขายแล้ว {step.qty} ชิ้น</span>
                    </div>

                  </Link>
                 </div>
               </div> 
            ))}
          </Fragment>
          )
      }
    function RenderProductFlashSale() {
        return (
          <Fragment >
            <Slider {...settings_slider} data-slick='{"slidesToShow": 4, "slidesToScroll": 4}' >
              {products_flash_sale.map((step, index) => (
                 <div className='slider-contailner mb-3 '>
                  <div >
                    <img src={step.src} className="product-image" />
                  </div>
                  <div>
                    <p className="text-center" style={{color:"#EE4D2D"}}>
                        ฿  <label style={{fontSize:'18px'}}>{step.price}</label>
                    </p>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <div className="w-50 text-center progess-text" style={{backgroundColor:'#7bccf2', borderRadius:'5px', height:'15px'}}>
                      <span className='nav-menu'>ขายแล้ว {step.count_sell}</span>
                      <div className='rounded w-100' style={{height:'15px'}}> 
                        <div className='rounded-start text-nowrap bar' style={{backgroundColor:'#196bfd', width:`${step.count_sell}%` ,height:'15px'}}>
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
      
            ))}
            </Slider>
          </Fragment>
          )
      }
  
    return (
      <div className='home-container'>
      {/* start news */}
      <div className='row'>
        <div className='col-12 col-xs-12 col-sm-12 col-md-8'>
          <AntCarousel afterChange={onChange} autoplay={true}>
            {data_new.map(item => 
              <div>
                <h3 className="carousel-container">
                  <img src={item.src} className="branner rounded"/>
                </h3>
              </div>
            )}
          </AntCarousel>
        </div>
        <div className='col-12 col-xs-12 col-md-4'>
          <div className='promotion-side'>
            <img
                src='/images/news/FiinShop2.jpg'
                alt="Picture of the author"
                style={{width: '100%', height:'100%'}}
                className="rounded"
            />
          </div>
          <div className='promotion-side'>
            <img
                src='/images/news/FiinShop3.jpg'
                alt="Picture of the author"
                style={{width: '100%', height:'100%'}}
                className="rounded"
            />
          </div>
          <div className='promotion-side'>
            <img
                src='/images/news/FiinShop4.jpg'
                alt="Picture of the author"
                style={{width: '100%', height:'100%'}}
                className="rounded"
            />
          </div>
        </div>
    </div>
    {/* end news */}

    {/* start menu */}
    <div style={{ width:'100%', backgroundColor:'white'}}>
      <div className='d-flex justify-content-between mobile-none'>
      {item_menus.map(item => 
        <div className='mobile-none'>
          <img src={item.path} width='80px' height='80px' />
          <p className="text-center" style={{fontSize:'12px'}}>{item.details}</p>
        </div>
      )}
      </div>
      <div>
        <Slider {...settings_menu} className='mobile-show'>
          {item_menus.map(item => 
            <div className='d-grid justify-content-center'>
              <div className='center'>
                <img src={item.path} width='40px' height='40px'/>
                <p className="text-center" style={{fontSize:'10px'}}>{item.details}</p>
              </div>
            </div>
          )}
        </Slider>
      </div>
    </div>
    {/* end menu */}

    {/* start flashsale */}
    <div style={{ width:'100%', backgroundColor:'white'}} className="mt-3 ">
      <div className='d-flex justify-content-between p-2'>
        <div className="d-flex align-items-center">
            <img src='../../images/logo/fs1.png' className="logo-flash-sale" />  
            <span> 
              <CountdownTimer count={5432} hideDay color="#fff" backgroundColor="#000" labelSize={30} responsive/>
            </span>
        </div>
        <div>
          <span className="text-main font-dountdown ">ดูทั้งหมด ></span>
        </div>
      </div>
      <div className='mobile-none'>
        <Slider {...settings_slider}>
            {products_flash_sale.map((step, index) => (
                <div className='slider-contailner mb-3 '>
                <div >
                  <img src={step.src} className="product-image-flashsale" />
                </div>
                <div>
                  <p className="text-center" style={{color:"#EE4D2D"}}>
                      ฿  <label style={{fontSize:'18px'}}>{step.price}</label>
                  </p>
                </div>
                <div className='d-flex justify-content-center'>
                  <div className="w-50 text-center progess-text" style={{backgroundColor:'#7bccf2', borderRadius:'5px', height:'15px'}}>
                    <span className='nav-menu'>ขายแล้ว {step.count_sell}</span>
                    <div className='rounded w-100' style={{height:'15px'}}> 
                      <div className='rounded-start text-nowrap bar' style={{backgroundColor:'#196bfd', width:`${step.count_sell}%` ,height:'15px'}}>
                        &nbsp;
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
    
          ))}
        </Slider>
      </div>
        <div className='mobile-show'>
          <Slider {...settings_slider_mobile} >
              {products_flash_sale.map((step, index) => (
                 <div className='slider-contailner mb-3'>
                  <div >
                    <img src={step.src} className="product-image-flashsale" />
                  </div>
                  <div>
                    <p className="text-center" style={{color:"#EE4D2D"}}>
                        ฿  <label style={{fontSize:'14px'}}>{step.price}</label>
                    </p>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <div className="w-50 text-center progess-text" style={{backgroundColor:'#7bccf2', borderRadius:'5px', height:'15px'}}>
                      <span className='' style={{fontSize:'9px', color:'white'}}>ขายแล้ว {step.count_sell}</span>
                      <div className='rounded w-100' style={{height:'15px'}}> 
                        <div className='rounded-start text-nowrap bar' style={{backgroundColor:'#196bfd', width:`${step.count_sell}%` ,height:'15px'}}>
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
            ))}
          </Slider>
        </div>
    </div>
    {/* end flashsale */}

    {/* start card promotion */}
    <div style={{ width:'100%'}} className=" mobile-none">
      <div className="row row-custom mt-3">
        <div className="col-4">
          <img
            src='/images/Promotions/n1.png'
            alt="Picture "
            className="rounded"
            width="100%"
          />
        </div>
        <div className="col-4">
          <img
            src='/images/Promotions/n2.png'
            alt="Picture "
            className="rounded"
            width="100%"
          />
        </div>
        <div className="col-4">
          <img
            src='/images/Promotions/n3.png'
            alt="Picture "
            className="rounded"
            width="100%"
          />
        </div>
      </div>
    </div>
    {/* end card promotion */}

    {/* start mall promotion */}
    <div style={{ width:'100%', backgroundColor:'white'}} className="mt-3">
      <div className='d-flex justify-content-between p-2'>
        <div className="d-flex align-items-center ">
          <span className="text-main">FIINSHOP MALL</span>
          <span className="text-main mobile-none"> &nbsp;|&nbsp; </span>
          <span className="mobile-none"> <VerifiedUserIcon fontSize="small"/>ของแท้ 100%</span>
          <span className="mobile-none">&nbsp;&nbsp;&nbsp; <ArrowCircleUpIcon fontSize="small"/>คืนเงิน/สินค้า ภายใน 15 วัน</span>
          <span className="mobile-none">&nbsp;&nbsp;&nbsp;<LocalShippingIcon fontSize="small" /> ส่งฟรีทั่วไทย</span>
        </div>
        <div>
          <span className="text-main font-dountdown ">ดูทั้งหมด ></span>
        </div>
      </div>
      <hr/>
      <div className='row p-2'>
        <div className='col-12 col-xs-12 col-sm-12 col-md-4'>
          <AntCarousel afterChange={onChange} autoplay={true}>
            {data_new_mall.map(item => 
              <div>
                <h3 className="carousel-container-mall">
                  <img src={item.src} className="branner"/>
                </h3>
              </div>
            )}
          </AntCarousel>
        </div>
        <div className='col-12 col-xs-12 col-sm-12 col-md-8'>
          <div className='mobile-none'>
            <div className='row'>
              {menu_mall.map(items =>
                <div className='col-6 colxs-6 col-sm-4 col-md-3'>
                  <img src={items.path} className="product-image" />
                    <p className="text-center" style={{color:'red'}}>
                      <label style={{fontSize:'15px'}}>{items.details}</label>
                    </p>
                </div>
              )}
            </div>
          </div>
          <div className='mobile-show'>
            <Slider {...settings_slider_menu_mall} >
            {menu_mall.map(items =>
                <div className='col-6 col-xs-6 col-sm-4 col-md-3'>
                  <img src={items.path} className="product-image-mall" />
                    <p className="text-center" style={{color:'red'}}>
                      <label style={{fontSize:'12px'}}>{items.details}</label>
                    </p>
                </div>
              )}
            </Slider>
          </div>
        </div>
      </div>
    </div>
    {/* end mall promotion */}

    {/* start top search */}
    <div style={{ width:'100%', backgroundColor:'white'}} className="mt-3">
      <div className='d-flex justify-content-between p-2'>
        <div className="d-flex align-items-center ">
          <span className="text-main">ค้นหายอดฮิต</span>
        </div>
        <div>
          <span className="text-main font-dountdown ">ดูทั้งหมด ></span>
        </div>
      </div>
      <hr/>
      <div className='mobile-none'>
        <Grid container >
          {menu_top_search.map(items =>
            <Grid md={2.3} xs={6} sm={4} display="flex" alignItems="center" justifyContent="center">
              <Grid display={{ xs: 'grid', sm: 'flex', md:'flex' }} alignItems="center" justifyContent="center" padding={{ xs: '5px', sm: '10px', md:'10px' }}>
                <p style={{fontSize:'12px'}}>
                  {items.name} <br/>
                  <label style={{color:'#c9c9c9'}}>{items.count} รายการ </label>
                </p>
                <img src={items.path} className="product-image-search" />
              </Grid>
            </Grid>
            )}
              
        </Grid>
      </div>
      <div className='mobile-show p-2'> 
        <Slider {...settings_slider_mobile} >
          {menu_top_search.map(items =>
              <div className='col-6 col-xs-6 col-sm-4 col-md-3'>
                  <img src={items.path} className="product-image-top-search" />
                  <p className="text-center" style={{color:'#c9c9c9'}}>
                    <label style={{fontSize:'12px', color:'black'}}>{items.name}</label>
                    <p style={{fontSize:'12px'}}>{items.count} รายการ</p>
                  </p>
              </div>
            )}
        </Slider>
      </div>
    </div>
    {/* end top search */}

    {/* start product */}
    <div style={{ width:'100%', backgroundColor:'white'}} className="mt-3">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="สินค้าประจำประจำวัน" {...a11yProps(0)} />
          <Tab label="สินค้าโปรโมชั่น" {...a11yProps(1)} />
          </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
        <div className='row'>
          <RenderProduct2 />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='row'>
          <RenderProduct2 />
        </div>
      </TabPanel>
    </div>
    {/* end product */}

    {/* see more button */}
    {products.length >= 12 ? 
      <div style={{justifyContent: 'center', width:'100%', display:'flex'}} className="mt-3 mb-3">
          <Button variant="outlined" sx={{width: { xs: '100%', sm: '60%', md:'30%' }}}>ดูเพิ่มเติม</Button>
      </div>
    : null
    }
    {/* see more button */}

  </div>
    );
}