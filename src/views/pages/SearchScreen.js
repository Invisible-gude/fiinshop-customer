import { Fragment, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { APIgetProductSearch } from '../../../services/api'

export default function SearchScreen() {
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(30)
    const [offset, setOffset] = useState(0)
    const [keyword, setKeyword] = useState('')
    const router = useRouter()
    const { slug } = router.query

  
    useEffect(() => {
        APIgetProductSearch(limit,offset,slug).then(res => {
            if (res.success) {
                setProducts(res.data)
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
        <Grid         
        paddingLeft={{ xs: '1rem', sm:'5rem', md: '10rem' }}
        paddingRight={{ xs: '1rem',sm:'0rem', md: '10rem' }}>
           <Card className="mt-5 p-2">
                <Grid container>
                    <Grid md={11} xs={11} sm={11}>
                    <div className="footer content">
                        <span style={{color:'rgb(238,77,45)', fontSize: '20px'}}>ผลการค้นหา: {slug}</span>
                    </div>
                    </Grid>  
                </Grid>  
                <Grid container >
                    <RenderProduct />
                </Grid>
            </Card>
        </Grid>
    );
}