import { Fragment, useEffect, useState } from 'react';
import { APIgetProductDetail } from '../../../services/api'
import { useRouter } from 'next/router'
import  Grid  from '@material-ui/core/Grid';
import  Container  from '@material-ui/core/Container';
import  Box  from '@material-ui/core/Box';
import  Button  from '@material-ui/core/Button';
import { Radio , Modal, Typography, Space} from 'antd';
const { Text, Title } = Typography;



export default function CheckOutScreen() {
    const [products, setProducts] = useState([])
    const [selectPrice, setPrice] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(async () => {
        await getProductData()
        console.log('products',products);
      }, [products])
    const getProductData = () => {
        const value = localStorage.getItem('_products');
        const product_data = value ? JSON.parse(value) : undefined;
        console.log('product_data',product_data);
        setProducts(product_data)
    }


     return(
        <Container backgroundColor="#fff">
            <p>
                <Title level={4}>ข้อมูลสินค้า</Title>
                <Grid container>
                    <Grid md={3} xs={12} sm={12}>
                        <Box sx={{width: '90%',height: '90%'}}>
                            <img
                                src={products.thumbnail}
                                alt="brownie"
                                style={{width: '100%',height: '100%'}}
                            />
                        </Box>
                    </Grid>
                    <Grid md={6} xs={12} sm={12}>
                            <p>{products.name}</p>
                            <p>ราคาสินค้า: {selectPrice.toFixed(2)} ฿</p>
                            <hr />
                            <p>ตัวเลือกสินค้า</p>
                                {products && products.product_options ? products.product_options.map(item => 
                                <Grid container key={item.name}>
                                    <Grid xs={12} sm={12} md={12}>
                                        <span>{item.name}</span>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={12}>
                                    <Radio.Group buttonStyle="solid" >
                                    {item.option.map(items => 
                                        <Radio.Button key={items.id} style={{marginRight:'5px'}} value={items.id} onChange={e => {onChangePrice(e)}}>{items.value}</Radio.Button>
                                    
                                    )}
                                    </Radio.Group>
                                    
                                    </Grid>
                                </Grid>
                                ): null}
                    </Grid>
                    <Grid md={2} xs={12} sm={12} 
                        container
                        alignItems="center"
                        justifyContent="center" >
                        <div className="input-group">
                            <Button  onClick={() => setCount(count-1)} variant="outlined" >-</Button>
                                <Box sx={{minWidth:'10%',alignItems:'center',display:'flex',justifyContent:'center',backgroundColor:'#F5F5F5'}}>
                                    {count}
                                </Box>
                            <Button  onClick={() => setCount(count+1)} variant="outlined">+</Button>                                           
                        </div>
                    </Grid>
                </Grid>
            
            </p>
            <hr />
            <p>
                <Title level={4}>ข้อมูลการจัดส่ง</Title>
                
            </p>
        </Container >    
    );
}