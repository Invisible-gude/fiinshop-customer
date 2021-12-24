import { Fragment, useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {APIgetAddress, APIaddAddress, APIupdateAddress, APIdeleteAddress} from '../../../services/api'
import { Avatar,Dropdown, Menu, DatePicker, Input,Drawer, message,Modal } from 'antd';
import InputThaiAddress from 'thai-address-autocomplete-react'
import Slider from "react-slick";
import Link from '@material-ui/core/Link';
const { confirm } = Modal;
var dayjs = require('dayjs')


export default function ProfileScreen() {
    const [open, setOpen] = useState(true);
    const [tabSelect, setTabSelect] = useState(1)
    const [userData, setUserData] = useState([])
    const [gender, setGender] = useState('')
    const [userAddress, setUserAddress] = useState([])
    const [birthday, setBirthday] = useState('')
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [dst_address, setDstAddress] = useState('')
    const [subdistrict, setSubDistrict] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [addressEdit, setAddressEdit] = useState(0)
    const settings_slider = {
        dots: false,
        infinite: false,
        speed: false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        autoplay: false,
      };

      const profile_menu = (
        <Menu>
          <Menu.Item>
            <Link onClick={e=>setTabSelect(0)} underline='none'>
            <span rel="noopener noreferrer" href="https://www.antgroup.com">
                ข้อมูลส่วนตัว
            </span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link onClick={e => {setTabSelect(1)}} underline='none'>
            <span rel="noopener noreferrer" href="https://www.antgroup.com">
              ที่อยู่ของฉัน
            </span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link onClick={e => {setTabSelect(3)}} underline='none'>
            <span  rel="noopener noreferrer" href="https://www.antgroup.com">
              เปลี่ยนรหัสผ่าน
            </span>
            </Link>
          </Menu.Item>
        </Menu>
      );
    useEffect(() => {
        setTab()
        getUserData()
      }, [])

      const setTab = () => {
        let res = sessionStorage.getItem('_afterDo')
        let gotoTab = JSON.parse(res)
        if(gotoTab){
            sessionStorage.removeItem('_afterDo')
            setTabSelect(gotoTab)
        }else{
            setTabSelect(0)
        }
      }
    
    const getUserData = () => {
        let data = localStorage.getItem('_user')
        setUserData(JSON.parse(data))
        console.log(userData);
        getuserAddress()
    } 
    const getuserAddress = () => {
        APIgetAddress().then(resp => {
            if (resp.success) {
                setUserAddress(resp.data)
            }
        })
    }
    const onSelectDate = (day) => {
        let bd = dayjs(day).format('DD-MM-YYYY')
    }
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
            "is_primary":userAddress.length == 0 ? 1 : 0
        }
        APIaddAddress(data).then(resp => {
            console.log('add product',resp);
            if (resp.success) {
                message.success('เพิ่มที่อยู่สำเร็จ')
                getuserAddress()
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
    const onSubmitEditAddress = (id) => {
        let primary_address = userAddress.find(e=> e.id === id)
        let data = {
            "name":name,
            "phone":phone,
            "address":dst_address,
            "district":subdistrict,
            "amphure":district,
            "province":province,
            "zipcode":zipcode,
            "is_primary":primary_address.is_primary
        }

        APIupdateAddress(data,id).then(resp => {
            console.log('add product',resp);
            if (resp.success) {
                message.success('แก้ไขที่อยู่สำเร็จ')
                getuserAddress()
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
    const onEditAddress = (item) => {
        setAddressEdit(item.id)
        setName(item.name)
        setPhone(item.phone)
        setDstAddress(item.address)
        setSubDistrict(item.district)
        setDistrict(item.amphure)
        setProvince(item.province)
        setZipcode(item.zipcode)
        setVisible(true)

    }
    const onAddNewAddress = () =>{
        setName('')
        setPhone('')
        setDstAddress('')
        setSubDistrict('')
        setDistrict('')
        setProvince('')
        setZipcode('')
        setVisible(true)
        setAddressEdit(0)
    }
    const setPrimaryAddress = (data) => {
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
                message.success('ตั้งค่าที่เริ่มต้นอยู่สำเร็จ')
                getuserAddress()
            }
        })
    }
    const deleteAddress = (data) => {
        let id = data.id
        confirm({
            title: 'คุณต้องการลบที่อยู่?',
            okText: 'ตกลง',
            okType: 'danger',
            cancelText: 'ยกเลิก',
            onOk() {
                APIdeleteAddress(id).then(resp => {
                    console.log('add product',resp);
                    if (resp.success) {
                        message.success('ลบที่อยู่สำเร็จ')
                        getuserAddress()
                    }
                })
        
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    const RenderTabProfile = () =>{
        return(
            <div>
                <span>ข้อมูลของฉัน</span>
                <p style={{fontSize:'14px', color:'gray'}}>จัดการข้อมูลส่วนตัวคุณ</p>
                <hr />
                <div className='row'>
                    <div className='col-12 col-xs-12 col-md-3'>
                        <div className='d-grid justify-content-center mb-2'>
                            <Avatar size={100} src="https://joeschmoe.io/api/v1/random" />
                            <div className='btn btn-outline-secondary mt-2'>เลือกรูป</div>
                        </div>
                        <p style={{textAlign:'center',fontSize:'14px', color:'gray'}}>ไฟล์ที่รองรับ: .JPEG, .PNG</p>
                    </div>
                    <div className='col-12 col-xs-12 col-md-7'>
                        <div className='row d-flex align-items-center'>
                            <div className='col-3 d-flex justify-content-end'>
                                <span style={{fontSize:'14px', color:'gray'}}>ชื่อผู้ใช้</span>
                            </div>
                            <div className='col-9'>
                                <Input defaultValue={userData.name}/>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center mt-3'>
                            <div className='col-3 d-flex justify-content-end'>
                                <span style={{fontSize:'14px', color:'gray'}}>หมายเลขโทรศัพท์</span>
                            </div>
                            <div className='col-9'>
                                <Input defaultValue={userData.phone}/>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center mt-3'>
                            <div className='col-3 d-flex justify-content-end'>
                                <span style={{fontSize:'14px', color:'gray'}}>อีเมล์</span>
                            </div>
                            <div className='col-9'>
                                <Input defaultValue={userData.email}/>
                            </div>
                        </div>
                        {/* <div className='row d-flex align-items-center mt-3'>
                            <div className='col-3 d-flex justify-content-end'>
                                <span style={{fontSize:'14px', color:'gray'}}>เพศ</span>
                            </div>
                            <div className='col-9'>
                                <Radio.Group onChange={e=> setGender(e.target.value)} value={gender}>
                                    <Radio value='m'>ชาย</Radio>
                                    <Radio value='f'>หญิง</Radio>
                                    <Radio value='p'>อื่น ๆ</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center mt-3'>
                            <div className='col-3 d-flex justify-content-end'>
                                <span style={{fontSize:'14px', color:'gray'}}>วัน/เดือน/ปีเกิด</span>
                            </div>
                            <div className='col-9'>
                                <DatePicker onChange={e=> onSelectDate(e._d)} />
                            </div>
                        </div> */}
                        
                    </div>
                </div>
                <div className='mobile-none'>
                    <div className='d-flex justify-content-end mt-1'>
                        <div className='btn btn-primary'>บันทึก</div>
                    </div>
                </div>
                <div className='mobile-show'>
                    <div className='mt-3'>
                        <div className='btn btn-primary w-100'>บันทึก</div>
                    </div>
                </div>
            </div>
        )
    } 
    const RenderTabAddress = () =>{
        return(
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                <span>ที่อยู่ของฉัน</span>
                <div className='btn btn-outline-primary d-flex justify-content-between align-items-center' onClick={e=>onAddNewAddress()}><AddIcon />เพิ่มที่อยู่</div>
                </div>
                
                <hr />
                <div className='p-3'>
                    {userAddress.map(item=>
                    <div className='row '>
                        <div className='col-12 col-xs-12 col-sm-12 col-md-9'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-3 d-flex justify-content-end'>
                                    <span style={{fontSize:'14px', color:'gray'}}>ชื่อ-สกุล</span>
                                </div>
                                <div className='col-9'>
                                    <span style={{fontSize:'14px'}}>{item.name}</span>
                                </div>
                            </div>
                            <div className='row d-flex align-items-center'>
                                <div className='col-3 d-flex justify-content-end'>
                                    <span style={{fontSize:'14px', color:'gray'}}>หมายเลขโทรศัพท์</span>
                                </div>
                                <div className='col-9'>
                                    <span style={{fontSize:'14px'}}>{item.phone}</span>
                                </div>
                            </div>
                            <div className='row d-flex align-items-center mb-4'>
                                <div className='col-3 d-flex justify-content-end'>
                                    <span style={{fontSize:'14px', color:'gray'}}>ที่อยู่</span>
                                </div>
                                <div className='col-9'>
                                    <span style={{fontSize:'14px'}}>{item.address} {item.district} {item.amphure} {item.province} {item.zipcode} </span>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-xs-12 col-sm-12 col-md-3 mb-3'>
                            {item.is_primary === 1 ? 
                            <div>
                                <div className='mobile-none'>
                                    <div className='d-flex justify-content-end'>
                                        <a href='#' style={{fontSize:'14px'}} onClick={e=>onEditAddress(item)}>แก้ไข</a> 
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <div className='btn btn-outline-success profile-btn'>ที่อยู่เริ่มต้น</div> 
                                    </div>
                                </div>
                                <div className='mobile-show'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <a href='#' style={{fontSize:'14px'}} onClick={e=>onEditAddress(item)}>แก้ไข</a> 
                                  
                                        <div className='btn btn-outline-success profile-btn'>ที่อยู่เริ่มต้น</div> 
                                    </div>
                                </div>
                            </div>
                            : 
                            <div>
                                <div className='mobile-none'>
                                    <div className='d-flex justify-content-end'>
                                        <a href='#' style={{fontSize:'14px', marginRight:'5px'}} onClick={e=>onEditAddress(item)}>แก้ไข</a><a href='#' style={{fontSize:'14px'}} onClick={e=>deleteAddress(item)}>ลบ</a>
                                    </div> 
                                    <div className='d-flex justify-content-end'>
                                        <div className='btn btn-outline-secondary profile-btn' onClick={e=>setPrimaryAddress(item)}>ตั้งเป็นที่อยู่เริ่มต้น</div>
                                    </div>
                                </div>
                                <div className='mobile-show'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <a href='#' style={{fontSize:'14px', marginRight:'5px'}} onClick={e=>onEditAddress(item)}>แก้ไข</a><a href='#' style={{fontSize:'14px'}} onClick={e=>deleteAddress(item)}>ลบ</a>
                                        <div className='btn btn-outline-secondary profile-btn' onClick={e=>setPrimaryAddress(item)}>ตั้งเป็นที่อยู่เริ่มต้น</div>
                                    </div>
                                </div>
                            </div>
                            }
                            
                            
                        </div>
                         <hr />
                    </div>
                    )}
                </div>
            </div>
        )
    } 
    const RenderTabBanks = () =>{
        return(
            <div>
                <p>Banks</p>
            </div>
        )
    } 
    const RenderTabChangePassword = () =>{
        return(
            <div>
                <span>ตั้งค่ารหัสผ่าน</span>
                <p style={{fontSize:'14px', color:'gray'}}>กรุณาอย่าเปิดเผยรหัสผ่านแก่คนอื่นๆ เพื่อความปลอดภัยของบัญชีผู้ใช้คุณเอง</p>
                <hr />
                <div className='row'>
                    <div className='col-12 col-xs-12 col-md-7'>
                        <div className='row d-flex align-items-center'>
                            <div className='col-3 d-flex justify-content-end'>
                                <span style={{fontSize:'14px', color:'gray'}}>รหัสผ่านเก่า</span>
                            </div>
                            <div className='col-9 password'>
                                <Input.Password />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-xs-12 col-md-12'>
                     <hr/>
                    </div>
                    <div className='col-12 col-xs-12 col-md-7'>
                        <div className='row d-flex align-items-center mt-3'>
                            <div className='col-3 d-flex justify-content-end'>
                                <span style={{fontSize:'14px', color:'gray'}}>รหัสผ่านใหม่</span>
                            </div>
                            <div className='col-9 password'>
                                <Input.Password/>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center mt-3'>
                            <div className='col-3 d-flex justify-content-end'>
                                <span style={{fontSize:'14px', color:'gray'}}>ยืนยันรหัสผ่าน</span>
                            </div>
                            <div className='col-9 password'>
                                <Input.Password  />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <div className='btn btn-primary'>บันทึก</div>
                </div>
            </div>
        )
    } 
    const RenderMyOrder = () =>{
        return(
            <div>
                <p>Order</p>
            </div>
        )
    } 
    const RenderMyReview = () =>{
        return(
            <div>
                <p>Review</p>
            </div>
        )
    } 
    const RenderMyWishList = () =>{
        return(
            <div>
                <p>Wish</p>
            </div>
        )
    } 
    return (
        <div className='home-container'>
            <div className='row' >
                <div className='col-12 col-xs-12 col-md-2'>
                    <div className='mobile-none'>
                        <List
                        sx={{ width: '100%', maxWidth: 360 }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton onClick={e=> setOpen(!open)}>
                                <ListItemText onClick={()=> setTabSelect(0)} primary={<label style={{fontSize:'14px'}}><PersonIcon fontSize='medium'/> บัญชีของฉัน</label>} />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }} onClick={()=> setTabSelect(0)}>
                                        <ListItemText primary={<label style={{fontSize:'14px'}}> ข้อมูลส่วนตัว</label>} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }} onClick={()=> setTabSelect(1)}>
                                        <ListItemText primary={<label style={{fontSize:'14px'}}> ที่อยู่ของฉัน</label>} />
                                    </ListItemButton>
                                    {/* <ListItemButton sx={{ pl: 4 }} onClick={()=> setTabSelect(2)}>
                                        <ListItemText primary={<label style={{fontSize:'14px'}}> บัญชีธนาคาร</label>} />
                                    </ListItemButton> */}
                                    <ListItemButton sx={{ pl: 4 }} onClick={()=> setTabSelect(3)}>
                                        <ListItemText primary={<label style={{fontSize:'14px'}}> เปลี่ยนรหัสผ่าน</label>} />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <ListItemButton>
                                <ListItemText onClick={()=> setTabSelect(4)} primary={<label style={{fontSize:'14px'}}><AssignmentOutlinedIcon fontSize='medium'/> การซื้อของฉัน</label>} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemText onClick={()=> setTabSelect(5)} primary={<label style={{fontSize:'14px'}}><BorderColorOutlinedIcon fontSize='medium'/> รีวิวของฉัน</label>} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemText onClick={()=> setTabSelect(6)} primary={<label style={{fontSize:'14px'}}><FavoriteBorderOutlinedIcon fontSize='medium'/> รายการที่ชอบ</label>} />
                            </ListItemButton>
                        </List>
                    </div> 
                    <div className='mobile-show' style={{ paddingBottom:'1rem',marginBottom:'20px', backgroundColor:'white'}}>
                        <Slider {...settings_slider} >
                            <div c>
                                <Dropdown overlay={profile_menu} onClick={e => e.preventDefault()}>
                                    <span ><PersonIcon fontSize='small'/> บัญชีของฉัน <KeyboardArrowDownIcon fontSize='small'/></span>
                                </Dropdown>
                            </div>
                            <div>
                                <span onClick={()=> setTabSelect(4)}><AssignmentOutlinedIcon fontSize='small'/> การซื้อของฉัน</span>
                            </div>
                            <div>
                                <span onClick={()=> setTabSelect(5)}><BorderColorOutlinedIcon fontSize='small'/> รีวิวของฉัน</span>
                            </div>
                            <div>
                                <span onClick={()=> setTabSelect(6)}><FavoriteBorderOutlinedIcon fontSize='small'/> รายการที่ชอบ</span>
                            </div>
                        </Slider>
                    </div>   
                </div>
                <div className='col-12 col-xs-12 col-md-10'>
                    <div style={{backgroundColor:'white'}} className='p-3'>
                        {tabSelect == 0 ? 
                        <RenderTabProfile />
                        : tabSelect == 1 ? 
                        <RenderTabAddress /> 
                        : tabSelect == 2 ? 
                        <RenderTabBanks /> 
                        : tabSelect == 3 ? 
                        <RenderTabChangePassword /> 
                        : tabSelect == 4 ? 
                        <RenderMyOrder /> 
                        : tabSelect == 5 ? 
                        <RenderMyReview /> 
                        : tabSelect == 6 ? 
                        <RenderMyWishList /> 
                        :null}
                    </div>
                </div>
                <Drawer title={<span><i className='fa fa-home text-success'></i> {addressEdit === 0 ? 'เพิ่มที่อยู่' : 'แก้ไขที่อยู่'}</span>} placement="right"  closable={false} visible={visible}>
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
                            {addressEdit === 0 ? <button className='btn btn-primary' style={{width:'48%'}} onClick={() => onSubmitAddress()}>เพิ่ม</button>
                            : <button className='btn btn-primary' style={{width:'48%'}} onClick={() => onSubmitEditAddress(addressEdit)}>แก้ไข</button>
                            }
                        </div>
                    </div>
                </Drawer>
            </div>
        </div>
    );
}