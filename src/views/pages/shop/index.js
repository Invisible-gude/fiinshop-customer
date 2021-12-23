import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { APIgetShopDetail, APIgetProduct, APIgetCategory }  from '../../../../services/api'
import { Grid, Box, Avatar, Card } from '@material-ui/core';
import * as React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleIcon from '@mui/icons-material/People';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Menu, Dropdown, Button, Pagination} from 'antd';

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


  const data_new  = [
    {
      label: 'Slide 1',
      key: 1,
      src: '../../images/code/c1.png'
    },
    {
      label: 'Slide 2',
      key: 2,
      src: '../../images/code/c2.png'
    },
    {
      label: 'Slide 3',
      key: 3,
      src: '../../images/code/c3.png'
    },
    
  ]
  const menu = (
    <Menu>
      <Menu.Item key="1">ราคา: จากน้อยไปมาก</Menu.Item>
      <Menu.Item key="2">ราคา: จากมากไปน้อย</Menu.Item>
    </Menu>
  );
  const filter_menu = (
    <Menu>
      <Menu.Item key="1">ยอดนิยม</Menu.Item>
      <Menu.Item key="2">ล่าสุด</Menu.Item>
      <Menu.Item key="3">สินค้าขายดี</Menu.Item>
    </Menu>
  );
export default function ShopDetail() {
    const router = useRouter()
    const { slug } = router.query
    const [shop, setShop] = useState([])
    const [products, setProducts] = useState([])
    const [productRecomend, setProductRecomend] = useState([])
    const [productPromotion, setProductPromotion] = useState([])
    const [topProduct, setTopProducts] = useState([])
    const [category, setCategory] = useState([])
    const [active, setActive] = useState('all')
    const [value, setValue] = useState(0);

    useEffect( async() => {
        await getShopDetail(slug)
        await getProduct(10)
        await getProductRecomend(6)
        await getProductPromotion(6)
        await getTopProduct(6)
        await getCategory()
    },[])
    const category_menu = (
      <Menu>
        {
          category.map(item => 
            <Menu.Item key={item.name}>{item.name}</Menu.Item>
            )
        }
      </Menu>
    );
    const getCategory = (shop_id) => {
      APIgetCategory().then(res => {
            if (res.success) {
                setCategory(res.data)
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
    const getProduct = (limit) => {
        APIgetProduct(limit).then(res => {
            if (res.success) {
            setProducts(res.data.products)
            } else {
                console.log('res',res);

            }
        }).catch(err => {
            console.log('res',err);

        })
    }
    const getProductPromotion = (limit) => {
        APIgetProduct(limit).then(res => {
            if (res.success) {
              setProductPromotion(res.data.products)
            } else {
                console.log('res',res);

            }
        }).catch(err => {
            console.log('res',err);

        })
    }
    const getProductRecomend = (limit) => {
        APIgetProduct(limit).then(res => {
            if (res.success) {
                setProductRecomend(res.data.products)
                console.log('res1',res.data);
            } else {
                console.log('res',res);

            }
        }).catch(err => {
            console.log('res',err);

        })
    }
    const getTopProduct = (limit) => {
        APIgetProduct(limit).then(res => {
            if (res.success) {
                setTopProducts(res.data.products)
                console.log('res',res.data.products);
            } else {
                console.log('res',res);

            }
        }).catch(err => {
            console.log('res',err);

        })
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    function RenderProduct() {
        return (
            products.map((step, index) => (
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
    function RenderProductReacomend() {
        return (
          productRecomend.map((step, index) => (
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
    function RenderProductPromotion() {
        return (
          productPromotion.map((step, index) => (
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
    function RenderTopProduct() {
        return (
          topProduct.map((step, index) => (
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
    function RenderAllProduct() {
        return (
          topProduct.map((step, index) => (
              <Grid md={2.4} xs={6} sm={4} 
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
      const _handleClick = (menuItem) =>{ 
        setActive(menuItem)
      }
      const activeStyle = { color: '#ff3333' };
      function RenderCategory() {
        return(
          <div style={{paddingLeft:'10px', paddingRight:'10px'}}>
            <div className='mobile-none'>
              <Link 
                style={active === 'all' ? activeStyle : {}} 
                onClick={e => _handleClick('all')}
                underline="none"
                color='black'
              > 
                <p style={{fontSize:'14px'}}>สินค้าทั้งหมด</p>
              </Link>
              {category.map(item => (
                <Link 
                style={active === item.name ? activeStyle : {}} 
                onClick={e => _handleClick(item.name)}
                underline="none"
                color='black'
              > 
                  <p style={{fontSize:'14px'}}>{item.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )
      }
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
     return(
       <div>
          <div className="shop-profile-container">
            <Grid container marginTop={5} className="main-content">
              <Grid xs={12} sm={12} md={4} paddingLeft={2} item className="d-grid align-content-center">
                <div className="rounded">
                  <div className="row d-flex align-items-center p-3 rounded" style={{position: 'relative',
                      backgroundImage: `url("https://images.unsplash.com/photo-1551963831-b3b1ca40c98e")` 
                    }}>
                    <div className="col-3 col-xs-12 col-sm-12 col-md-3 mb-2">
                      <Avatar
                          alt={shop && shop.name ? shop.name : ''}
                          src={shop && shop.logo === null ? shop.logo : shop.name}
                          sx={{ width: 72, height: 72 }}
                      /> 
                    </div>
                    <div className="col-9 col-xs-12 col-sm-12 col-md-9">
                      <strong style={{color:'white', fontSize:'20px'}} >{shop && shop.name ? shop.name : ''}</strong><br/>
                      <label style={{color:'white', fontSize:'14px'}} >Active 1 ชั่วโมงที่ผ่านมา</label>
                    </div>
                    <div className="col-6 col-xs-12 col-sm-12 col-md-6">
                      <div className="btn btn-outline-light w-100 d-flex justify-content-center align-items-center" style={{height:'26px'}}><span style={{color:'white', fontSize:'12px'}}><AddCircleOutlineIcon fontSize='small'/> ติดตาม</span></div>
                    </div>
                    <div className="col-6 col-xs-12 col-sm-12 col-md-6">
                      <div className="btn btn-outline-light w-100 d-flex justify-content-center align-items-center" style={{height:'26px'}}><span style={{color:'white', fontSize:'12px'}}><ChatIcon fontSize='small'/> พูดคุย</span></div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={12} md={4}  item paddingLeft={3} className="d-grid align-content-center">
                  <p style={{fontSize:'14px'}}><StorefrontIcon fontSize='small'/> รายการสินค้า: <label style={{color:'#196bfd'}}>2</label></p>
                  <p style={{fontSize:'14px'}}><PersonAddAlt1Icon fontSize='small'/> กำลังติดตาม: <label style={{color:'#196bfd'}}>5</label></p>
                  <p style={{fontSize:'14px'}}><ChatBubbleOutlineIcon fontSize='small' /> ประสิทธิภาพการแชท: <label style={{color:'#196bfd'}}>97% (ภายในไม่กี่ชั่วโมง)</label></p>
              </Grid>
              <Grid xs={12} sm={12} md={4} item paddingLeft={3} className="d-grid align-content-center">
                  <p style={{fontSize:'14px'}}><PeopleIcon fontSize='small'/> ผู้ติดตาม: <label style={{color:'#196bfd'}}>17.1พัน</label></p>
                  <p style={{fontSize:'14px'}}><StarBorderIcon fontSize='small'/> คะแนน: <label style={{color:'#196bfd'}}>5 (การให้คะแนนทั้งหมด 1)</label></p>
                  <p style={{fontSize:'14px'}}><CalendarTodayIcon fontSize='small' /> เข้าร่วมเมื่อ:<label style={{color:'#196bfd'}}>1 วัน ที่ผ่านมา</label></p>
              </Grid>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="หน้าแรก" {...a11yProps(0)} />
                    <Tab label="สินค้าทั้งหมด" {...a11yProps(1)} />
                  </Tabs>
              </Box>
            </Grid> 
         </div>
         <div className="discount-code-container">
            <Box sx={{ width: '100%' , marginTop:'10px'}}>
                <div className="rounded p-3 " style={{backgroundColor:'white',height:'200px'}}>
                    โค้ดส่วนลดจากร้านค้า
                    <div className='row p-3'>
                      {data_new.map(items => 
                      <div className='col-4 col-xs-12 col-sm-12 col-md-4 col-lg-4'><img src={items.src} width='100%'/></div>
                      )}
                    </div>

                </div>
                <div className="mt-4" style={{backgroundColor:'white'}}>
                    <TabPanel value={value} index={0}>
                      <div className="p-3">
                        <p>เกี่ยวกับร้านค้า</p>
                        <p>✅ ของแท้ คะแนน 5 ดาว 5000 รีวิว
                          ✅ ออกใบกำกับแจ้งในหมายเหตุ
                          📌 ส่ง Kerry 2-3 วัน ตัดรอบ 9 โมง
                          📌 เปิด
                        </p>
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <Grid container spacing={0} item>
                        <RenderProduct />
                    </Grid>
                    </TabPanel>
                </div>
                <div className="mt-4" style={{backgroundColor:'white'}}>
                  <div className="d-flex justify-content-between p-1">
                    <label style={{color:'#707070'}}>สินค้าแนะนำสำหรับคุณ</label>
                    <label className="text-main">ดูทั้งหมด ></label>
                  </div>
                    <Grid container spacing={0} item>
                        <RenderProductReacomend />
                    </Grid>
                </div>
                <div className="mt-4" style={{backgroundColor:'white'}}>
                  <div className="d-flex justify-content-between p-1">
                    <label style={{color:'#EE4D2D'}}><LocalFireDepartmentIcon fontSize="small"/>โปรโมชั่นแนะนำ</label>
                    <label className="text-main">ดูทั้งหมด ></label>
                  </div>
                    <Grid container spacing={0} item>
                        <RenderProductPromotion />
                    </Grid>
                </div>
                <div className="mt-4" style={{backgroundColor:'white'}}>
                  <div className="d-flex justify-content-between p-1">
                    <label style={{color:'#707070'}}>สินค้าขายดี</label>
                    <label className="text-main">ดูทั้งหมด ></label>
                  </div>
                    <Grid container spacing={0} item>
                        <RenderTopProduct />
                    </Grid>
                </div>
                <div className="mt-4" style={{backgroundColor:'white'}}>
                  <Grid container>
                    <Grid md={2} xs={12} sm={12}>
                      <p style={{paddingLeft:'10px'}}> <FormatListBulletedIcon fontSize="small"/>หมวดหมู่</p>
                      <div className='mobile-show'>
                        <Dropdown overlay={category_menu} >
                          <Button style={{ marginLeft: 8,width:'150px' }}>
                            <span style={{display:'flex', justifyContent:'space-between'}}>หมวดหมู่ <KeyboardArrowDownIcon fontSize='small'/></span>
                          </Button>
                        </Dropdown>
                      </div>
                      <hr />
                      <RenderCategory />
                    </Grid>
                    <Grid md={10} xs={12} sm={12}>
                      <div style={{padding:'10px', display:'grid', alignItems:'center'}}   className='filter-height'>
                        <div className='row '>
                          <div className='col-3 col-xs-2 col-sm-12 col-md-1 col-lg-1 mobile-none'>
                            <span style={{fontSize:'14px'}}>เรียงโดย</span>
                          </div>
                          <div className='col-9 col-xs-12 col-sm-12 col-md-9 col-lg-9'>
                            <div className='mobile-none'>
                              <Button style={{ marginLeft: 8,width:'90px' }}>
                                <span>ยอดนิยม</span>
                              </Button>
                              <Button style={{ marginLeft: 8,width:'90px' }}>
                                <span>ล่าสุด</span>
                              </Button>
                              <Button style={{ marginLeft: 8,width:'90px' }}>
                                <span>สินค้าขายดี</span>
                              </Button>
                              <Dropdown overlay={menu} >
                                <Button style={{ marginLeft: 8,width:'150px' }}>
                                  <span style={{display:'flex', justifyContent:'space-between'}}>ราคา <KeyboardArrowDownIcon fontSize='small'/></span>
                                </Button>
                              </Dropdown>
                            </div>
                            
                            <div className='row'>
                              <div className='col-6 col-xs-6 mobile-show'>
                                <Dropdown overlay={filter_menu} >
                                  <Button style={{ marginLeft: 8,width:'100px' }}>
                                    <span style={{display:'flex', justifyContent:'space-between'}}>เรียงโดย <KeyboardArrowDownIcon fontSize='small'/></span>
                                  </Button>
                                </Dropdown>
                              </div>
                              <div className='col-6 col-xs-6 mobile-show'>
                              <Dropdown overlay={menu} >
                                <Button style={{ marginLeft: 8,width:'150px' }}>
                                  <span style={{display:'flex', justifyContent:'space-between'}}>ราคา <KeyboardArrowDownIcon fontSize='small'/></span>
                                </Button>
                              </Dropdown>
                            </div>
                            </div>
                          </div>
                          <div className='col-12 col-xs-12 col-sm-12 col-md-2 col-lg-2 mobile-none'>
                            <Pagination simple defaultCurrent={1} total={50} size="small" />
                          </div>
                          <div className='col-12 col-xs-12 col-sm-12 col-md-2 col-lg-2 mobile-show mt-1'>
                            <Pagination defaultCurrent={1} total={50} />
                          </div>
                        </div>
                      </div>
                      <Grid container item>
                          <RenderAllProduct />
                      </Grid>
                    </Grid>
                  </Grid>
                    
                </div>
            </Box>
         </div>

       </div>
    );
}