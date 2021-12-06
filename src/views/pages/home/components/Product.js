import {Fragment, useEffect, useState} from 'react';
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
import {APIgetProduct} from '../../../../../services/api'


export default function Product() {
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

  return (
    <Fragment>
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
    </Fragment>
  );
}

