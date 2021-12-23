import { Fragment, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router'
import { APIgetProductSearch } from '../../../services/api'
import Link from '@mui/material/Link';

export default function SearchScreen() {
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(30)
    const [offset, setOffset] = useState(0)
    const [keyword, setKeyword] = useState('')
    const router = useRouter()
    const { slug } = router.query

  
    useEffect(() => {
      getProduct()
      }, [])

      const getProduct = () => {
        let data = {
          limit:limit,
          offset:0,
          keyword:slug
        }
        APIgetProductSearch(data).then(res => {
            if (res.success) {
              console.log(res);
                setProducts(res.data.products)
            } else {
                console.log('res',res);

            }
        }).catch(err => {
            console.log('res',err);

        })
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
    return (
        <div>
         <div className='p-3' style={{ marginTop: '1rem' , backgroundColor: 'white' }} >
            <p>ผลการค้นหา : {slug}</p>
            {products && products.length === 0 ? <p>ไม่พบสินค้า</p> :
            <Grid container>
              {products.length > 0 ? <RenderProduct /> : <p>ไม่พบสินค้า</p>}
            </Grid>
              }
          </div>
        </div>
    );
}