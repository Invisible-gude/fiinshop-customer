import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { APIgetShopDetail, APIgetProduct}  from '../../../../services/api'

import  Container  from '@material-ui/core/Container';
import { Grid, Box, Avatar, Card } from '@material-ui/core';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
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
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

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
  
export default function ShopDetail() {
    const router = useRouter()
    const { slug } = router.query
    const [shop, setShop] = useState([])
    const [products, setProducts] = useState([])
    const [value, setValue] = useState(0);

    useEffect( () => {
         getShopDetail(slug)
         getProduct(10)
    },[])

    const getShopDetail = (shop_id) => {
        APIgetShopDetail(shop_id).then(res => {
            if (res.success) {
                console.log('res',res);
                setShop(res.data)
            } 
        }).catch(err => {
            console.log('res',err);
    
        })
    }
    const getProduct = (limit) => {
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
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      function RenderProduct() {
        return (
            products.map((step, index) => (
              <Grid md={2} xs={6} sm={4} style={{ display: 'flex',justifyContent: 'center', marginTop:'10px', padding:'5px'}}>
                  <Link href={`/product_detail/${encodeURIComponent(step.slug)}`} underline="none">
                    <Card  sx={{maxWidth: 190, height:{ xs: 200, sm: 250,md:300 }, marginTop: '10px'}}>
                      <CardMedia
                        component="img"
                        sx={{height:{ xs: 100, sm: 150,md:200 }}}
                        // height={200}
                        image={step.thumbnail}
                        alt={step.label}
                      />
                      <CardContent sx={{padding: '10px', height: '60px'}}>
                        <Typography  variant="body2" component="block" >
                          {step.name}
                        </Typography>
                      </CardContent>
                      <CardActions >
                        <Grid container>
                          <Grid md={6} xs={6} sm={6}>
                            <Typography  variant="body2" component="block" color="rgb(238,77,45)">
                              ฿ {step.sell_price}
                            </Typography>
                          </Grid>
                          <Grid md={6} xs={6} sm={6}>
                            <Typography  variant="body2" color="text.secondary" align="end" >
                            {step.qty} ชิ้น
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                     </Link>
                  </Grid>
            ))
          )
      }
     return(
        <Container backgroundColor="#fff">
            {/* header */}
            <Box sx={{marginTop:{ xs: '4rem', sm: '3rem',md:'4rem' }}}>
                <Card style={{padding:'1rem'}}>
                    <Grid container>
                        <Grid xs={12} sm={12} md={4} item={true}>
                        <ImageListItem >
                            <img
                                src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format`}
                                srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={shop.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={
                                    <Box>
                                        <Avatar
                                            alt={shop && shop.name ? shop.name : ''}
                                            src={shop && shop.logo === null ? shop.logo : shop.name}
                                            sx={{ width: 70, height: 70 }}
                                        />      
                                        <label>{shop && shop.name ? shop.name : ''}</label>
                                    </Box>
                                }
                                subtitle='Active 1 ชั่วโมงที่ผ่านมา'
                                actionIcon={
                                <Box>
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about Breakfast`}
                                    >
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about Breakfast`}
                                    >
                                        <ChatIcon />
                                    </IconButton>
                                    
                                </Box>
                                }
                            />
                        </ImageListItem>
                        </Grid>
                        <Grid xs={12} sm={12} md={4}  item={true}>
                            <p style={{fontSize:'14px'}}><StorefrontIcon fontSize='small'/> รายการสินค้า: <label style={{color:'#3076D2'}}>2</label></p>
                            <p style={{fontSize:'14px'}}><PersonAddAlt1Icon fontSize='small'/> กำลังติดตาม: <label style={{color:'#3076D2'}}>5</label></p>
                            <p style={{fontSize:'14px'}}><ChatBubbleOutlineIcon fontSize='small' /> ประสิทธิภาพการแชท: <label style={{color:'#3076D2'}}>97% (ภายในไม่กี่ชั่วโมง)</label></p>
                        </Grid>
                        <Grid xs={12} sm={12} md={4}  item={true}>
                            <p style={{fontSize:'14px'}}><PeopleIcon fontSize='small'/> ผู้ติดตาม: <label style={{color:'#3076D2'}}>17.1พัน</label></p>
                            <p style={{fontSize:'14px'}}><StarBorderIcon fontSize='small'/> คะแนน: <label style={{color:'#3076D2'}}>5 (การให้คะแนนทั้งหมด 1)</label></p>
                            <p style={{fontSize:'14px'}}><CalendarTodayIcon fontSize='small' /> เข้าร่วมเมื่อ:<label style={{color:'#3076D2'}}>1 วัน ที่ผ่านมา</label></p>
                        </Grid>
                    </Grid> 
                </Card>
            </Box>
            <Box sx={{ width: '100%' , marginTop:'10px'}}>
                <Card>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="หน้าแรก" {...a11yProps(0)} />
                        <Tab label="สินค้าทั้งหมด" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <div style={{width:'100%'}}>
                      <img src='../../images/news/g1.jpg' />
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                        <RenderProduct />
                    </Grid>
                    </TabPanel>
                </Card>
            </Box>
        </Container >    
    );
}