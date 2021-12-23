import { Fragment, useEffect, useState } from 'react';
import { APIgetAddress, APIaddAddress, APIupdateAddress, APIcheckoutDetail, APIcheckout,APIgetCart } from '../../../services/api'
import { Router, useRouter } from 'next/router'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Input , Modal, Checkbox, Drawer, message, Radio, Button} from 'antd';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import InputThaiAddress from 'thai-address-autocomplete-react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { route } from 'next/dist/server/router';
import { useDispatch } from 'react-redux';
import { countCart } from '../../../store/actions/countAction';

const payment_gateway_menu = [
    {
        id:1,
        icon:'fas fa-money-bill',
        name:'ชำระเงินปลายทาง',
        detail:'ชำระเงินเมื่อได้รับสินค้า'
    },
    {
        id:2,
        icon:'fas fa-university',
        name:'โอนเงินผ่านธนาคาร',
        detail:'จ่ายผ่านเลขอ้างอิง'
    },
]
export default function CheckOutScreen() {
    const [visible, setVisible] = useState(false);
    const [modalAddress, setModalAddress] = useState(false);
    const [address, setAddress] = useState([])
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [dst_address, setDstAddress] = useState('')
    const [subdistrict, setSubDistrict] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [primaryAddress, setPrimaryAddress] = useState()
    const [selectNewAddress, setSelectNewAddress] = useState(0)
    const [selectPayment, setSelectPayment] = useState(1)
    const [products, setProducts] = useState([])
    const [drawerTax, setDrawerTax] = useState(false)
    const [taxId, setTaxId] = useState('')
    const [branch, setBranch] = useState('')
    const [coupon, setCoupon] = useState('')
    const [userData, setUserData] = useState([])
    const [total, setTotal] = useState(0)
    const [countProduct, setCountProduct] = useState(0)
    const [hasInvoice, setHasInvoice] = useState(false)
    const [checkInvoice, setCheckInvoice] = useState(false)
    const [selectNewInvoiceAddress, setSelectNewInvoiceAddress] = useState(0)
    const [modalInvoiceAddress, setModalInvoiceAddress] = useState(false)
    const [invoiceAddress, setInvoiceAddress] = useState()
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(async () => {
        await getAddress()
        await getProductSelect()
        await getUserData()
    }, [])

    const getAddress = () => {
        APIgetAddress().then(resp => {
            if (resp.success) {
                setAddress(resp.data)
                let primary_address = resp.data.find(item => item.is_primary == 1)
                setPrimaryAddress(primary_address)    
                setInvoiceAddress(primary_address)
            }
        })
    }
    const getProductSelect = () => {
        let pd = sessionStorage.getItem('_selectCart')
        let pds = JSON.parse(pd)
        let data = {
            "cart_id" : pds ,
        }
        APIcheckoutDetail(data).then(resp => {
            if (resp.success) {
                console.log('resp.data.',resp.data);
                setProducts(resp.data)
              
            }
        })
    }
    useEffect(()=>{
        sumTotal()
    },[products])

    const getUserData = () =>{
        let user = localStorage.getItem('_user')
        if(user){
            setUserData(JSON.parse(user))
        }
    }
    const onClose = () => {
        setVisible(false);
    };
    const onTaxClose = () => {
        setDrawerTax(false);
    };
    const handleCancel = () => {
        setModalAddress(false);
    };
    const onChange = (targetName) => (targetValue) => {
        if(targetName === 'subdistrict'){
            setSubDistrict(targetValue)
        }
        if(targetName === 'district'){
            setDistrict(targetValue)
        }
        if(targetName === 'province'){
            setProvince(targetValue)
        }
        if(targetName === 'zipcode'){
            setZipcode(targetValue)
        }
        
    }
    const onSelect = (addresses) => {
        const { subdistrict, district, province, zipcode } = addresses
        setSubDistrict(subdistrict)
        setDistrict(district)
        setProvince(province)
        setZipcode(zipcode)
    }
    const onSubmitAddress = () => {
        let data = {
            "name":name,
            "phone":phone,
            "address":dst_address,
            "district":subdistrict,
            "amphure":district,
            "province":province,
            "zipcode":zipcode,
            "is_primary":address.length == 0 ? 1 : 0
        }
        APIaddAddress(data).then(resp => {
            console.log('add product',resp);
            if (resp.success) {
                message.success('เพิ่มที่อยู่สำเร็จ')
                getAddress()
                setName('')
                setPhone('')
                setDstAddress('')
                setSubDistrict('')
                setDistrict('')
                setProvince('')
                setZipcode('')
                setVisible(false)
            }
        })
    }
    const onSubmitInvoiceAddress = () => {
        let data = {
            "name":name,
            "phone":phone,
            "address":dst_address,
            "district":subdistrict,
            "amphure":district,
            "province":province,
            "zipcode":zipcode,
            "is_primary":address.length == 0 ? 1 : 0
        }
        APIaddAddress(data).then(resp => {
            console.log('add product',resp);
            if (resp.success) {
                message.success('เพิ่มที่อยู่สำเร็จ')
                getAddress()
                setName('')
                setPhone('')
                setDstAddress('')
                setSubDistrict('')
                setDistrict('')
                setProvince('')
                setZipcode('')
                setVisible(false)
            }
        })
    }
    const onSetPrimaryAddress = (data) => {
        let id = data.id
        let editData = {
            "name":data.name,
            "phone":data.phone,
            "address":data.address,
            "district":data.district,
            "amphure":data.amphure,
            "province":data.province,
            "zipcode":data.zipcode,
            "is_primary":1
        }
        APIupdateAddress(editData,id).then(resp => {
            console.log('add product',resp);
            if (resp.success) {
                message.success('ตั้งค่าที่อยู่สำเร็จ')
                getAddress()
                setModalAddress(false)
            }
        })
    }
    const onSelectPayment = (value) => {
        setSelectPayment(value)
    }
    const onSelectNewAddress = (value,data) => {
        setPrimaryAddress(data)    
        setSelectNewAddress(value)
    }
    const onSelectNewInvoiceAddress = (value,data) => {
        setInvoiceAddress(data)    
        setSelectNewInvoiceAddress(value)
    }
    const onAddNewAddress = () => {
        setModalAddress(false)    
        setVisible(true)    

    }
    const onDeleteCart = (e, id, idx,index) => {
        let pd = sessionStorage.getItem('_selectCart')
        let pds = JSON.parse(pd)
        let dt = pds.filter(e=> e !== id)
        if(dt.length > 0){
            sessionStorage.setItem('_selectCart', JSON.stringify(dt))
            getProductSelect()
            sumTotal()
        }
        
        //  console.log('dt',pd);
        // const cloneCart = products
        // const clone = cloneCart[index]
        // let dt = clone.details.filter(e=> e.product_option_id === id)
        // clone.details.splice(idx, 1)
        // if(clone.details.length === 0){
        //     cloneCart.splice(index,1)
        // }
        // setProducts([...cloneCart])
        // sumTotal()
      }
    const sumTotal = () => {
    let list = []
    let qty = []
    products && products.map(item => item.details.map(dt=> list.push(dt.product_sell_price*dt.product_qty)))
    products && products.map(item => item.details.map(dt=> qty.push(dt.product_qty)))
    let invoice = products && products.map(item => item.is_invoice_available);
    let reducer = (previousValue, currentValue) => previousValue + currentValue;



        let sum = list.length  && list.reduce(reducer);
        let sum_qty = qty.length  && qty.reduce(reducer);
        let sum_check_invoice = invoice.length && invoice.reduce(reducer);
        setCheckInvoice(sum_check_invoice)    
        setTotal(sum)
        setCountProduct(sum_qty) 
    
    }
    const onSubmit = (e) => {
        let pd_id = []
        let price = products.map(item => item.details.map(dt=> pd_id.push(dt.cart_id)))
        let invoice_required = hasInvoice === false ? 0 : 1;
        let branch_no = branch === '' ? '0000' : branch;
        let data = {}
        let coupons = coupon === ''? '' : coupon;
        console.log(pd_id);
        if(invoice_required === 0){
            data = {
                "cart_id" : pd_id,
                "address_id": primaryAddress.id,
                "invoice_required":invoice_required,
                // "coupon":coupons,
                "gateway_id":selectPayment
            }
        }else{
            data = {
                "cart_id" : pd_id,
                "address_id": primaryAddress.id,
                "invoice_required":invoice_required,
                // "coupon":coupons,
                "gateway_id":selectPayment,
                "invoice_address":{
                    "name":invoiceAddress.name,
                    "phone":invoiceAddress.phone,
                    "address":invoiceAddress.address,
                    "district":invoiceAddress.district,
                    "amphure":invoiceAddress.amphure,
                    "province":invoiceAddress.province,
                    "zipcode":invoiceAddress.zipcode,
                    "tax_id":taxId,
                    "branch_no":branch_no
                }
            }
        }
        if(data){
            APIcheckout(data).then(resp => {
                console.log('resp', resp);
                if (resp.success) {
                    APIgetCart().then(resp => {
                        console.log('resp',resp.data.carts);
                        if(resp && resp.data && resp.data.carts){
                          let list = []
                          let p_qty = resp.data.carts.map(item => item.products.map(dt=> list.push(dt.id)))
                          dispatch(countCart(list.length))
                        }
                    })
                    if(selectPayment ===1){
                        message.success('สร้างออเดอร์สำเร็จ')
                        sessionStorage.setItem('_afterDo',4)
                        router.push('/profile')
                    }else{
                        sessionStorage.setItem('_paymentData',JSON.stringify(resp.data))
                        router.push(`/payment/${encodeURIComponent(resp.data.payment_id)}`)
                    }
                }
            })
            console.log('data',data);    
        }
    }

     return(
         <div>
             <div className='row'>
                 <div className='col-12 col-xs-12 col-sm-6 col-md-8'>
                    <div className='p-3' style={{ marginTop: '1rem' , backgroundColor: 'white' }} >
                        <div>
                            <div className='d-flex justify-content-between'>
                                <p style={{color:'#196bfd'}}><LocationOnIcon fontSize='small'/>ที่อยู่ในการจัดส่ง</p>  
                                <Link onClick={()=> setModalAddress(true)}>เปลี่ยน</Link>
                            </div>
                             
                            <div>
                            {address.length == 0 ? <button className='btn btn-outline-primary' onClick={()=> setVisible(true)} >เพิ่มที่อยู่</button>     
                            :
                            <div >
                                {primaryAddress ? 
                                <p style={{fontSize:'14px'}}>{primaryAddress.name} ({primaryAddress.phone}) {primaryAddress.address} 
                                {primaryAddress.district} {primaryAddress.amphure} {primaryAddress.province} 
                                {primaryAddress.zipcode}</p>
                                : null }
                            </div>
                            }
                            </div>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                            {products.map((item,index) =>
                                <div className='p-3' style={{ marginTop: '1rem' , backgroundColor: 'white' }} >
                                    <div className='row p-3' key={index}>
                                        <p>{item.shop_name}</p>
                                        {item.details.map((items,idx) =>
                                            <div className='row p-3' key={idx}>

                                                <div className='col-12 col-xs-12 col-sm-8 col-md-2'>
                                                    <img src={items.product_thumbnail} className='cart-photo' />
                                                </div>

                                                <div className='col-6 col-xs-12 col-sm-5 col-md-5'>
                                                    <p style={{ fontSize: '14px' }}>{items.product_name}</p>
                                                    <span style={{ fontSize: '12px', color: 'gray' }}>ตัวเลือก: {items.product_option_name} {items.product_option_value}</span>
                                                </div>
                                                
                                                <div className='col-12 col-xs-12 col-sm-6 col-md-3 '>
                                                    <div >
                                                        <p style={{ fontSize: '14px' }} className='mobile-show'>ราคารวม {(items.product_sell_price * items.product_qty).toFixed(2)}</p>
                                                    </div>
                                                    <div className='text-center'>
                                                        <p style={{ fontSize: '16px', color:'#196bfd' }} className='mobile-none'>฿ {(items.product_sell_price * items.product_qty).toFixed(2)}</p>
                                                    </div>
                                                    <div className='text-center'>
                                                        <span className='mobile-none'>
                                                            <DeleteForeverIcon style={{ color: 'gray' }} onClick={e => { onDeleteCart(e, items.cart_id, idx, index) }} />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='col-12 col-xs-12 col-sm-6 col-md-2'>
                                                    <span style={{ fontSize: '14px' }}>จำนวน: {items.product_qty}</span>
                                                </div>
                                                <span className='mobile-show'>
                                                <DeleteForeverIcon style={{ color: 'gray' }} onClick={e => { onDeleteCart(e, items.cart_id, idx, index) }} />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                    
                       
                 </div>
                 <div className='col-12 col-xs-12 col-sm-6 col-md-4'>
                     <div className='p-3' style={{ marginTop: '1rem' , backgroundColor: 'white' }}>
                         <div>
                         <p>เลือกวิธีการชำระเงิน</p>
                         {payment_gateway_menu.map(payment =>
                            <div className='border rounded p-2 mb-2'>
                                <div className='d-flex justify-content-between'>
                                    <span style={{fontSize:'14px'}}><i className={payment.icon}  style={{color:'#196bfd'}}></i> {payment.name}</span>
                                    <span>
                                        <Radio.Group onChange={e => onSelectPayment(e.target.value)} value={selectPayment=== 0 ? payment_gateway_menu[0].id : selectPayment}>
                                            <Radio value={payment.id}></Radio>
                                        </Radio.Group>
                                    </span>
                                </div>
                                <hr/>
                                <span style={{fontSize:'12px', color:'gray'}}>{payment.detail}</span>
                            </div>
                            )}
                        </div>
                        <div className='mt-3'>
                            <p>คูปองส่วนลด</p>
                            <Input.Group compact>
                                <Input style={{ width: '80%' }} placeholder='กรุณาระบุโค้ดส่วนลด' onChange={e=> setCoupon(e.target.value)}/>
                                <Button  style={{ width: '20%' }} type="primary">ยืนยัน</Button>
                            </Input.Group>
                        </div>
                        <div className='mt-3 d-flex justify-content-between'>
                            {checkInvoice === 0 ? 
                            null :
                            <>
                                <p><Checkbox onChange={e=>setHasInvoice(!hasInvoice)}></Checkbox> ใบกำกับภาษีและข้อมูลติดต่อ</p>
                                <Link onClick={()=> setDrawerTax(true)}>Edit</Link>
                            </>}
                        </div>
                        <span>สรุปรายการสั่งซื้อ</span>
                        <div className='d-flex justify-content-between mt-2'>
                        <span style={{fontSize:'14px'}}>ยอดรวม (จำนวน {countProduct} ชิ้น)</span>
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
                        <button className='btn btn-primary w-100' type="submit" onClick={e=> onSubmit(e)} style={{fontSize:'14px'}}>ดำเนินการชำระเงิน</button>
                        </div>
                       
                     </div>                     

                 </div>
             </div>
            
            <Drawer title={<span><i className='fa fa-home text-success'></i> เพิ่มที่อยู่</span>} placement="right" onClose={onClose} closable={false} visible={visible}>
                <div className='drawer-container' style={{fontSize:'14px'}}>
                    <span>ชื่อผู้รับ</span>
                    <Input placeholder="ชื่อผู้รับ" onChange={e=> setName(e.target.value)} value={name}/>
                    <div className='mt-2'>
                    <span>หมายเลขโทรศัพท์</span>
                    <Input placeholder="หมายเลขโทรศัพท์" onChange={e=> setPhone(e.target.value)} value={phone}/>
                    </div>
                    <div className='mt-2'>
                    <span>ที่อยู่</span>
                    <Input placeholder="ตัวอย่าง: 91/83 ถ.สายไหม" onChange={e=> setDstAddress(e.target.value)} value={dst_address}/>
                    </div>
                    <div className='mt-2'>
                    <span>แขวง/ตำบล</span>
                    <InputThaiAddress
                        field={"subdistrict"}
                        value={subdistrict}
                        onChange={onChange("subdistrict")}
                        onSelect={onSelect}
                    />
                    </div>
                    <div className='mt-2'>
                    <span>เขต/อำเภอ</span>
                    <InputThaiAddress
                        field={"district"}
                        value={district}
                        onChange={onChange("district")}
                        onSelect={onSelect}
                        />
                    </div>
                    <div className='mt-2'>
                    <span>จังหวัด</span>
                    <InputThaiAddress
                        field={"province"}
                        value={province}
                        onChange={onChange("province")}
                        onSelect={onSelect}
                        />
                    </div>
                    <div className='mt-2'>
                        <span>รหัสไปรษณีย์</span>
                        <InputThaiAddress
                            field={"zipcode"}
                            value={zipcode}
                            onChange={onChange("zipcode")}
                            onSelect={onSelect}
                            />
                    </div>
                    
                    <div className='mt-2 d-flex justify-content-between'>
                        <button className='btn btn-outline-secondary' style={{width:'48%'}} onClick={() => setVisible(false)}>ยกเลิก</button>
                        <button className='btn btn-primary' style={{width:'48%'}} onClick={() => onSubmitAddress()}>เพิ่ม</button>
                    </div>
                </div>
            </Drawer>
            <Modal title="เลือกที่อยู่" visible={modalAddress} onCancel={handleCancel} onOk={handleCancel} placement="right" okText='ตกลง' cancelText='ยกเลิก'>
                {
                    address.map(items=>
                        <div className='row border p-2' style={{fontSize:'14px'}} key={items.id}>
                            <div className='col-1 col-xs-1 col-sm-1 col-md-1'>
                            <Radio.Group onChange={e => onSelectNewAddress(e.target.value,items)} value={selectNewAddress === 0 ? address[0].id : selectNewAddress}>
                                <Radio value={items.id}></Radio>
                            </Radio.Group>
                            </div>
                            <div className='col-11 col-xs-11 col-sm-11 col-md-11'>
                                <p>  {items.is_primary == 1 ? <span style={{color:'gray', fontSize:'14px'}}><i className='fa fa-home text-success'></i> (ที่อยู่เริ่มต้น)</span> :null} {items.name} ({items.phone}) {items.address} 
                                    {items.district} {items.amphure} {items.province} {items.zipcode} 
                                </p>
                            </div>
                        </div>
                        )
                }
                <div className='d-flex justify-content-end mt-3'>
                    <button className='btn btn-outline-primary' onClick={()=> onAddNewAddress()} style={{fontSize:'14px'}}>เพิ่มที่อยู่ใหม่</button>
                </div>
            </Modal>
            <Modal title="เลือกที่อยู่ใบกำกับภาษี" visible={modalInvoiceAddress} onCancel={e=> setModalInvoiceAddress(false)} onOk={e=> setModalInvoiceAddress(false)} placement="right" okText='ตกลง' cancelText='ยกเลิก'>
                {
                    address.map(items=>
                        <div className='row border p-2' style={{fontSize:'14px'}} key={items.id}>
                            <div className='col-1 col-xs-1 col-sm-1 col-md-1'>
                            <Radio.Group onChange={e => onSelectNewInvoiceAddress(e.target.value,items)} value={selectNewInvoiceAddress === 0 ? address[0].id : selectNewInvoiceAddress}>
                                <Radio value={items.id}></Radio>
                            </Radio.Group>
                            </div>
                            <div className='col-11 col-xs-11 col-sm-11 col-md-11'>
                                <p>  {items.is_primary == 1 ? <span style={{color:'gray', fontSize:'14px'}}><i className='fa fa-home text-success'></i> (ที่อยู่เริ่มต้น)</span> :null} {items.name} ({items.phone}) {items.address} 
                                    {items.district} {items.amphure} {items.province} {items.zipcode} 
                                </p>
                            </div>
                        </div>
                        )
                }
                <div className='d-flex justify-content-end mt-3'>
                    <button className='btn btn-outline-primary' onClick={()=> onAddNewAddress()} style={{fontSize:'14px'}}>เพิ่มที่อยู่ใหม่</button>
                </div>
            </Modal>

            <Drawer title='ใบกำกับภาษีและข้อมูลติดต่อ' placement="right" onClose={onTaxClose} closable={false} visible={drawerTax}>
                <div className='drawer-container' style={{fontSize:'14px'}}>
                    <span>อีเมล์</span>
                    <Input placeholder="กรุณาระบุอีเมลเพื่อรับข้อมูลสถานะการจัดส่งสินค้า" onChange={e=> setName(e.target.value)} value={userData.email}/>
                    
                    <div className='mt-2'>
                        <div className='d-flex justify-content-between'>
                            <span> ที่อยู่ในการออกใบกำกับภาษี</span>
                            <span><Link onClick={()=>setModalInvoiceAddress(true)}>แก้ไข</Link></span>
                        </div>
                        <Input.TextArea placeholder="ตัวอย่าง: 91/83 ถ.สายไหม" onChange={e=> setDstAddress(e.target.value)} 
                            value={invoiceAddress ? `${invoiceAddress.name} (${invoiceAddress.phone}) ${invoiceAddress.address} ${invoiceAddress.district} ${invoiceAddress.amphure} ${invoiceAddress.province} ${invoiceAddress.zipcode}` : null}/>
                    </div>
                    
                    <div className='mt-2'>
                        <span>เลขประจำตัวผู้เสียภาษี</span>
                        <Input placeholder="เลขประจำตัวผู้เสียภาษี" onChange={e=> setTaxId(e.target.value)} value=""/>
                    </div>

                    <div className='mt-2'>
                        <span>สำนักงานใหญ่/รหัสสาขา (สำหรับบริษัท)</span>
                        <Input placeholder="สำนักงานใหญ่/รหัสสาขา (สำหรับบริษัท)" onChange={e=> setBranch(e.target.value)} value=""/>
                    </div>
                    
                    <div className='mt-2 d-flex justify-content-between'>
                        <button className='btn btn-outline-secondary' style={{width:'48%'}} onClick={() => setDrawerTax(false)}>ยกเลิก</button>
                        <button className='btn btn-primary' style={{width:'48%'}} onClick={() => onSubmitInvoiceAddress()}>บันทึก</button>
                    </div>
                </div>
            </Drawer>
         </div>
          
    );
}