import {Fragment} from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CountdownTimer from "react-component-countdown-timer";
import Link from '@material-ui/core/Link';


const products  = [
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



export default function Product() {

  function RenderProduct() {
    return (
      <Fragment>
        {products.map((step, index) => (
          <Grid md={2} xs={6} sm={4} style={{ display: 'flex',justifyContent: 'center'}}>
              <Link href="/product_detail" underline="none">
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
                 </Link>
              </Grid>
        ))}
      </Fragment>
      )
  }

  return (
    <Fragment>
        <Card className="mt-5 p-2">
        <Grid container>
            <Grid md={11} xs={11} sm={11}>
            <div class="footer content">
                <span style={{color:'rgb(238,77,45)', fontSize: '20px'}}>สินค้าแนะนำประจำวัน</span>
            </div>
            </Grid>  
        </Grid>  
        <Grid container >
            <RenderProduct />
            <RenderProduct />
            <RenderProduct />
            <RenderProduct />
            <RenderProduct />
        </Grid>
        </Card>
        <div style={{justifyContent: 'center', display:'flex'}} className="mt-3 mb-3">
            <Button variant="outlined" sx={{width: { xs: '100%', sm: '60%', md:'30%' }}}>ดูเพิ่มเติม</Button>
        </div>
    </Fragment>
  );
}

