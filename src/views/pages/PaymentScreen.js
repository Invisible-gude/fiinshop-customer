import { Fragment, useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router'
import { Upload, InputNumber, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { APIuploadImage, APInotifyPayment } from '../../../services/api'

export default function PaymentScreen() {
    const [paymentData, setPaymentData] = useState([])
    const [orderData, setOrderData] = useState([])
    const [imageUrl, setImageUrl] = useState('')
    const [imageUrlUpload, setImageUrlUpload] = useState('')
    const router = useRouter()
    const { slug } = router.query

    useEffect(()=>{
     getPaymentData()
    },[])

    const getPaymentData = () => {
        let res = sessionStorage.getItem('_paymentData')
        let payment = JSON.parse(res)
        // sessionStorage.removeItem('_paymentData')
        setPaymentData(payment)
        setOrderData(payment.orders)
        console.log('------',paymentData);
    }
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
      const  handleChange = info => {
          getBase64(info.file.originFileObj, imageUrl =>{
            setImageUrl(imageUrl)
          }
        );
      };

      const uploadSlip = (img) =>{
         let  data = {
            type : 'payments',
            image_data: img
        }
        APIuploadImage(data).then(res => {
            if (res.success) {
                console.log('res upload',res);
                setImageUrlUpload(res.data.url)
                onSubmit(res.data.url)
            }
        }).catch(err => {
            console.log('res',err);

        })
      }

      const onSubmit = async (url) => {
       let data = {
            payment_id:slug,
            slip: url
        }
         APInotifyPayment(data).then(res => {
            if (res.success) {
                console.log('res',res);
                message.success('อัปโหลดสำเร็จ')
                .then(()=>{
                    sessionStorage.setItem('_afterDo',4)
                    router.push('/profile')
                })
                }
            }).catch(err => {
                console.log('res',err);
             })
       
      }

    return (
        <div >
            <div  style={{ marginTop: '1rem' }} >
                <div className='row'>
                    <div className='col-12' >
                        <div className='p-3' style={{backgroundColor: 'white' }}>
                            <span>ชำระเงิน #{paymentData.payment_txn}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '1rem' }} >
                <div className='row d-flex justify-content-between'>
                    <div className='col-12 col-xs-12 col-md-3' >
                        <div className='p-3' style={{backgroundColor: 'white' }}>
                        <p className='d-flex align-items-center'><label style={{color:'#196bfd'}}><AssignmentOutlinedIcon /></label> สรุปคำสั่งซื้อ</p>
                        <hr/>
                        {orderData.map(item =>
                            <div className='d-flex justify-content-between'>
                                <p>ยอดชำระเงินทั้งหมด</p>
                                <p>฿ {item.total_amount.toFixed(2)}</p>
                            </div>
                        )}
                        </div>
                       
                    </div>
                    <div className='col-12 col-xs-12 col-md-3' >
                        <div className='p-3' style={{backgroundColor: 'white' }}>
                            <p className='d-flex align-items-center'><label style={{color:'coral'}}><InfoOutlinedIcon /></label> ข้อมูลบัญชี</p>
                            <hr/>
                            <div className='row'>
                                <div className='col-12 col-xs-12 col-md-12'>
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-4 d-flex justify-content-end'>
                                            <span style={{fontSize:'14px', color:'gray'}}>ธนาคาร</span>
                                        </div>
                                        <div className='col-8'>
                                            <span>กสิกร(K Bank)</span>
                                        </div>
                                    </div>
                                    <div className='row d-flex align-items-center mt-3'>
                                        <div className='col-4 d-flex justify-content-end'>
                                            <span style={{fontSize:'14px', color:'gray'}}>เลขที่บัญชี</span>
                                        </div>
                                        <div className='col-8'>
                                            <span>7322 459 552</span>
                                        </div>
                                    </div>
                                    <div className='row d-flex align-items-center mt-3'>
                                        <div className='col-4 d-flex justify-content-end'>
                                            <span style={{fontSize:'14px', color:'gray'}}>ชื่อบัญชี</span>
                                        </div>
                                        <div className='col-8'>
                                            <span>พี่เดี่ยว</span>
                                        </div>
                                    </div>
                                </div>
                        
                            </div>
                            
                            
                        </div>
                    </div>
                    <div className='col-12 col-xs-12 col-md-6' >
                        <div className='p-3' style={{backgroundColor: 'white' }}>
                            <p className='d-flex align-items-center'><label style={{color:'green'}}><DriveFolderUploadOutlinedIcon /></label> อัปโหลดหลักฐานการโอน</p>
                            <hr/>
                            <div className='row'>
                                <div className='col-12 col-xs-12 col-md-2'>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        onChange={e=>handleChange(e)}
                                    >
                                        {imageUrl === ''? 
                                        <div>
                                            { <PlusOutlined />}
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                        : 
                                            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> 
                                        }
                                    </Upload>
                                </div>
                                <div className='col-12 col-xs-12 col-md-9'>
                                    <div className='row d-flex align-items-center'>
                                            <div className='col-4 d-flex justify-content-end'>
                                                <span style={{fontSize:'14px', color:'gray'}}>จำนวนเงิน</span>
                                            </div>
                                            <div className='col-8'>
                                                <InputNumber  style={{width:'100%'}}/>
                                            </div>
                                    </div>
                                    
                                    <div className='row d-flex align-items-center mt-2'>
                                        <div className='col-4 d-flex justify-content-end'>
                                            <span style={{fontSize:'14px', color:'gray'}}>วัน/เวลาที่โอน</span>
                                        </div>
                                        <div className='col-8'>
                                            <DatePicker showTime style={{width:'100%'}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <div className='btn btn-primary' onClick={e=> uploadSlip(imageUrl)}> อัปโหลด</div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}