import { Fragment,useState,useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@mui/material/Button';
import {APIgetProduct} from '../../../../services/api'

import CountdownTimer from "react-component-countdown-timer";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Image from 'next/image';
import b1 from '../../../../public/images/news/b1.jpg';
import b2 from '../../../../public/images/news/b2.jpg';
import j1 from '../../../../public/images/promotions/j1.jpg';
import j2 from '../../../../public/images/promotions/j2.jpg';
import j3 from '../../../../public/images/promotions/j3.jpg';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const datas  = [
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
  ];

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
export default function HomeScreen() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(30)

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
        }, [])

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };
    function RenderProduct() {
        return (
          <Fragment>
            {products.map((step, index) => (
              <Grid md={2} xs={6} sm={4} style={{ display: 'flex',justifyContent: 'center'}}>
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
            ))}
          </Fragment>
          )
      }
    function RenderProductFlashSale() {
        return (
          <Fragment>
            {products_flash_sale.map((step, index) => (
              <Grid md={2} xs={6} sm={4} style={{ display: 'flex',justifyContent: 'center'}}>
                <Card  sx={{maxWidth: 190, height:{ xs: 200, sm: 250,md:300 }, marginTop: '10px'}}>
                  <CardMedia
                    component="img"
                    sx={{height:{ xs: 100, sm: 150,md:200 }}}
                    // height={200}
                    image={step.src}
                    alt={step.label}
                  />
                  <CardContent sx={{padding: '10px', height: '60px'}}>
                    <Typography  variant="body2" component="block" >
                      {step.product_name}
                    </Typography>
                  </CardContent>
                  <CardActions >
                    <Grid container>
                      <Grid md={6} xs={6} sm={6}>
                        <Typography  variant="body2" component="block" color="rgb(238,77,45)">
                          ฿ {step.price}
                        </Typography>
                      </Grid>
                      <Grid md={6} xs={6} sm={6}>
                        <Typography  variant="body2" color="text.secondary" align="end" >
                        {step.product_qty} ชิ้น
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Fragment>
          )
      }
    return (
        <Grid         
            paddingLeft={{ xs: '1rem', sm:'5rem', md: '10rem' }}
            paddingRight={{ xs: '1rem',sm:'0rem', md: '10rem' }}
        >
           <Box sx={{marginTop:{ xs: '2rem', sm: '3rem',md:'3rem' }, alignItems:'center', justifyItems:'center'}}>
                <Grid container >
                    <Grid md={8} xs={12} sm={12}  sx={{ display: { xs: 'none', sm: 'none',md:'flex' }}}>
                        <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                        >
                        {datas.map((step, index) => (
                            <Box key={step.label}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                component="img"
                                sx={{
                                    height: 260,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step.src}
                                alt={step.label}
                                />
                            ) : null}
                            </Box>
                        ))}
                        </AutoPlaySwipeableViews>
                    </Grid>
                    <Grid  md={4} xs={12} sm={12} sx={{ display: { xs: 'none', sm: 'none',md:'flex' }}}>
                        <Grid>
                            <Grid md={12} xs={12} sm={12} style={{height:'131px'}}>
                            <Image
                                src={b1}
                                alt="Picture of the author"
                                sx={{width: '100%', height:'100%'}}
                            />
                            
                            </Grid>
                            <Grid md={12} xs={12} sm={12} style={{height:'130px'}}>
                            <Image
                                src={b2}
                                alt="Picture "
                                sx={{width: '100%', height:'100%'}}
                            />
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Box>
            <Grid container sx={{ display: { xs: 'none', sm: 'none',md:'flex' }}}>
                <Grid  md={4} xs={4} sm={4} >
                    <Card style={{ border: "none", boxShadow: "none", display: 'flex', justifyContent: 'center' }}>
                        <Image
                            src={j1}
                            alt="Picture "
                            height={200}
                            width={700}
                            // sx={{width: '100%',height: '100%'}}
                            />
                    </Card>
                </Grid>
                <Grid  md={4} xs={4} sm={4}>
                    <Card sx={{ border: "none", boxShadow: "none", display: 'flex', justifyContent: 'center' }}>
                        <Image
                            src={j2}
                            alt="Picture "
                            height={200}
                            width={700}
                            // width={500}
                        />
                    </Card>
                </Grid>
                <Grid  md={4} xs={4} sm={4}>
                    <Card sx={{ maxWidth: '100%' }} style={{ border: "none", boxShadow: "none", display: 'flex', justifyContent: 'center' }}>
                        <Image
                            src={j3}
                            alt="Picture "
                            height={200}
                            width={700}
                            // sx={{width: '100%',height: '100%'}}
                        />
                    </Card>
                </Grid>
            </Grid>
            <Card className="mt-3 p-2">
                <Grid container>
                    <Grid md={11} xs={11} sm={11}>
                    <div className="footer content">
                            <img src='../../images/logo/fs1.png' />  
                                <span> 
                                <CountdownTimer count={5432} hideDay color="#fff" backgroundColor="#000" labelSize={30} responsive/>
                        </span>
                    </div>
                    </Grid>  
                    <Grid md={1} xs={1} sm={1}>
                        <span style={{color:'rgb(238,77,45)'}}>ดูทั้งหมด</span>
                    </Grid>
                </Grid>  
                <Grid container >
                    <RenderProductFlashSale />
                </Grid>
            </Card>
            <Box>
                <Card className="mt-5 p-2">
                <Grid container>
                    <Grid md={11} xs={11} sm={11}>
                    <div className="footer content">
                        <span style={{color:'rgb(238,77,45)', fontSize: '20px'}}>สินค้าแนะนำประจำวัน</span>
                    </div>
                    </Grid>  
                </Grid>  
                <Grid container >
                    <RenderProduct />
                </Grid>
                </Card>
                <div style={{justifyContent: 'center', display:'flex'}} className="mt-3 mb-3">
                    <Button variant="outlined" sx={{width: { xs: '100%', sm: '60%', md:'30%' }}}>ดูเพิ่มเติม</Button>
                </div>
            </Box>
            {/* <Promotion /> */}

            {/* <FlashSale /> */}
            {/* <Product /> */}
        </Grid>
    );
}