import React, { useEffect, useState } from 'react';
import { APIgetCart, APIdeleteCart, APIupdateCart, APIgetAddress } from '../../../services/api'
import { Button, Checkbox, message, Modal,Input } from 'antd';
import Box from '@mui/material/Box';
import { Router, useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StorefrontIcon from '@mui/icons-material/Storefront';
export default function CartScreen() {
  const [products, setProducts] = useState([])
  const [address, setAddress] = useState()
  const [carts, setCarts] = useState([])
  const [selectProduct, setSelectProduct] = useState([]);
  const [selectProductShop, setSelectProductShop] = useState([]);
  const [selectShop, setSelectShop] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0)
  const router = useRouter()

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
  })

  useEffect(async () => {
    await getProductData()
    await getAddress()
  }, [])
  const getAddress = () => {
      APIgetAddress().then(resp => {
          console.log('APIgetAddress',resp);
          if (resp.success) {
              if(resp.data.length > 0){
                  let primary_address = resp.data.find(item => item.is_primary == 1)
                  setAddress(primary_address)    
              }
          }
      })
  }

  const getProductData = () => {
    APIgetCart().then(resp => {
      if (resp.success) {
        const test1 = resp.data.carts.map(c => {
          return c.products
        })
        const list = []
        test1.map(pd => list.push(...pd))
        setProducts(list)
        setCarts(resp.data.carts)
        // console.log('before',resp.data);
      }
    })
    console.log('cart1',carts);
  }
  useEffect(() => {
    console.log('selectShop',selectShop)
    if(selectShop.length === carts.length){
      onSelectAll()
    }else{
      const test = products.filter(pd=>{
        pd.shop_id === [...selectShop]
      })
      console.log('test',test);
      // console.log('list',list);
      setSelectProduct([])
    }
  }, [selectShop])
  const ChengeCount = (type, qty, index, cart_index) => {
    const cloneCart = carts
    const clone = cloneCart[cart_index]
    if (type === 'p') {
      clone.products[index].product_qty = qty + 1
      cloneCart.splice(cart_index, 1, clone)
      setCarts([...cloneCart])

    } else if (type === 'm') {
      clone.products[index].product_qty = qty - 1
      cloneCart.splice(cart_index, 1, clone)
      setCarts([...cloneCart])

    }


    let data = {
      "shop_id": clone.products[index].shop_id,
      "product_id": clone.products[index].product_id,
      "product_option_id": clone.products[index].product_option_id,
      "product_qty": clone.products[index].product_qty,
    }
    console.log('shop', data);

    APIupdateCart(data, clone.products[index].id).then(res => {
      console.log('res', res);
      // if(res.success){
      //   getProductData()
      // }
    }).catch(err => {
      console.log(err);
    })

  }

  const onDeleteCart = (e, item, index, cart_index) => {
    const cloneCart = carts
    const clone = cloneCart[cart_index]
    let id = clone.products[index].id
    // console.log(id);

    APIdeleteCart(id).then(res => {
      console.log(res);
      if (res.success) {
        getProductData()
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const onSubmit = (data) => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    if (!storage) {
        message.error('กรุณาเข้าสู่ระบบ');
    } else {
      if (selectProduct.length == 0) {
        message.error('กรุณาเลือกสินค้า');
      } else {
        let lsitItem = [];
        selectProduct.map(item => lsitItem.push(findProduct(item)))
        sessionStorage.setItem('_selectCart', JSON.stringify(selectProduct))
        sessionStorage.setItem('_listItem', JSON.stringify(lsitItem))
        router.push(`/checkout`)
      }

    }

  }
  const findProduct = (id) => {
   let product_detail =  products.find(pd => pd.id === id)
   return product_detail;
  }
  const onSelectShop = (shop_id) => {
    const find = selectShop.find(shop=> shop === shop_id)
    let list = []
    if(find){
       list = selectShop.filter(s=> s !== shop_id)
    }else{
      list = [...selectShop,shop_id]
    }
    setSelectShop(list)
    // }
  }
  
  const onSelectAll = () => {
    console.log('product', products);
    if (products.length !== selectProduct.length) {
      setSelectProduct(products.map((item, index) => (item.id)))
    } else {
      setSelectProduct([])
    }
  }
  const toggle = (e) => {
    e.preventDefault()
    if (!e.target.checked) {
      setSelectProduct(selectProduct.filter(spd => spd !== e.target.value))
    } else {
      setSelectProduct([...selectProduct, e.target.value])
    }
  };

  const sumTotal = () => {
    let price = selectProduct.map(item => findPrice(item))
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    if (price.length !== 0) {
      let sum = price && price.reduce(reducer);
      setTotal(sum)
    } else {
      setTotal(0)
    }
  }

  const findPrice = (id) => {
    let res = products.find(item => item.id == id)
    return res.sell_price * res.product_qty

  }
  useEffect(() => {
    sumTotal()
    // console.log('selectProduct',selectProduct);
  }, [selectProduct])


  return (
    <div className='home-container'>
      {carts.length > 0 ? 
      <div className='row'>
        <div className='col-12 col-xs-12 col-sm-6 col-md-8'>
          <div className='p-3' style={{ marginTop: '1rem', alignItems: 'center', justifyItems: 'center', backgroundColor: 'white' }} >
            <div className='p-3'>
              <div className='row'>
                <div className='col-12'>
                  <Checkbox
                    checked={selectProduct.length === products.length}
                    onChange={e => { onSelectAll() }}>เลือกทั้งหมด
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>

          <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
            {carts.length > 0 && carts.map((cart, cart_index) =>
              <div key={cart_index} className='p-3' style={{ marginTop: '1rem', alignItems: 'center', justifyItems: 'center', backgroundColor: 'white' }} >
                <div className='row'>
                  <div className='col-1'>
                  {/* <Checkbox
                    checked={selectShop === selectProductShop.length}
                    onChange={e => { onSelectShop(cart.shop_id) }}>
                  </Checkbox> */}
                  </div>
                  <div className='col-4'>
                    
                    <span style={{ fontSize: '14px' }}><StorefrontIcon /> {cart.shop_name}</span>
                  </div>
                </div>
                <hr />
                {cart.products.map((item, index) =>
                  <div className='row p-3' key={index}>
                    <div className='col-1'>
                      <Checkbox
                        checked={selectProduct.find(pd => pd === item.id) ? true : false}
                        // disabled={this.state.disabled}
                        value={item.id}
                        onChange={e => toggle(e)}
                      >
                      </Checkbox>
                    </div>

                    <div className='col-12 col-xs-12 col-sm-8 col-md-2'>
                      <img src={item.option_thumbnail} className='cart-photo' />
                    </div>
                    <div className='col-6 col-xs-12 col-sm-5 col-md-4'>
                      <p style={{ fontSize: '14px' }}>{item.product_name}</p>
                      <span style={{ fontSize: '12px', color: 'gray' }}>ตัวเลือก: {item.option_name} {item.option_value}</span>
                    </div>
                    <div className='col-12 col-xs-12 col-sm-6 col-md-2 '>
                      <div >
                      <p style={{ fontSize: '14px' }} className='mobile-show'>ราคาต่อชิ้น {item.sell_price}</p>
                      </div>
                      <div className='text-center'>
                        <p style={{ fontSize: '16px', color:'#196bfd' }} className='mobile-none'>฿ {item.sell_price.toFixed(2)}</p>
                      </div>
                      <div className='text-center'>
                        <span className='mobile-none'>
                            <DeleteForeverIcon style={{ color: 'gray' }} onClick={e => { onDeleteCart(e, item, index, cart_index) }} />
                        </span>
                      </div>
                    </div>
                    <div className='col-12 col-xs-12 col-sm-6 col-md-3 col-lg-3'>
                      <Box className="form-row justify-content-center">
                        <Box className="form-group mb-0">
                          <Box className="input-group mx-auto mb-0">
                            <Button onClick={() => { ChengeCount('m', item.product_qty, index, cart_index); }} variant="outlined" >-</Button>
                            <Box sx={{ minWidth: '20%', alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#F5F5F5' }}>
                              {item.product_qty}
                            </Box>
                            <Button onClick={() => { ChengeCount('p', item.product_qty, index, cart_index); }} variant="outlined">+</Button>
                          </Box>
                        </Box>
                      </Box>
                    </div>
                    <span className='mobile-show'>
                      <DeleteForeverIcon style={{ color: 'gray' }} onClick={e => { onDeleteCart(e, item, index, cart_index) }} />
                    </span>

                  </div>
                )}
              </div>
            )}

          </form>
        </div>
        <div className='col-12 col-xs-12 col-sm-6 col-md-4'>
          <div style={{ backgroundColor: 'white' }} className='p-3 mt-3'>
            <div>
              <p>ตำแหน่ง</p>
              {address ? 
              <p style={{fontSize:'14px'}}><i className="fas fa-map-marker-alt"></i> {address.province} {address.amphure} {address.zipcode}</p>
              : null}
            </div>
            <hr/>
            <span>สรุปรายการสั่งซื้อ</span>
            <div className='d-flex justify-content-between mt-2'>
              <span style={{fontSize:'14px'}}>ยอดรวม (จำนวน {selectProduct.length} ชิ้น)</span>
              <span style={{fontSize:'14px'}}>฿ {total.toFixed(2)}</span>
            </div>
            <div className='d-flex justify-content-between mt-2 mb-2'>
              <span style={{fontSize:'14px'}}>ค่าจัดส่ง</span>
              <span style={{fontSize:'14px'}}>฿ {total.toFixed(2)}</span>
            </div>
            {/* <Input.Group compact>
              <Input style={{ width: '80%' }} placeholder='กรุณาระบุโค้ดส่วนลด'/>
              <Button  style={{ width: '20%' }} type="primary">ยืนยัน</Button>
            </Input.Group> */}
            <div className='d-flex justify-content-between mt-2'>
              <span style={{fontSize:'14px'}}>ยอดรวมทั้งสิ้น</span>
              <span style={{fontSize:'14px'}}>฿ {total.toFixed(2)}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span style={{fontSize:'14px'}}></span>
              <span style={{fontSize:'12px'}}>รวมภาษีมูลค่าเพิ่ม (ถ้ามี)</span>
            </div>
            <div className='mt-3'>
              <button className='btn btn-primary w-100' type="submit" onClick={e=> onSubmit()} style={{fontSize:'14px'}}>ดำเนินการชำระเงิน</button>
            </div>

          </div>
        </div>
      </div>
      :
        <div className='d-flex align-center justify-content-center mt-5'>
        <p style={{color:'gray'}}>ตะกร้าของคุณว่าง </p>
        
        </div>
          }
    </div>
  );
}