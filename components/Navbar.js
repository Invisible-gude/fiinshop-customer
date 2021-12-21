import {useState, useEffect} from 'react';
import { Input, Badge, Dropdown, Menu,Modal, message } from 'antd';
import Link from '@material-ui/core/Link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import Router from 'next/router';
import { DownOutlined, SearchOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
import FormControl from '@material-ui/core/FormControl';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import store from '../store/store';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { APILogin } from '../services/api'

const { Paragraph } = Typography;

const { Search } = Input;

const menu = (
  <Menu>
    <Menu.Item>
      <p target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
       ไทย
      </p>
    </Menu.Item>
    <Menu.Item>
      <p target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        ENG
      </p>
    </Menu.Item>
    
  </Menu>
);



export default function PrimarySearchAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null)
  const [keyword, setKeyword] = useState('')
  const { count } = useSelector(state => state.count)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: {
        username: '',
        password: '',
    }
})

  const profile_menu = (
    <Menu>
      <Menu.Item>
        <Link href="/profile" >
        <p rel="noopener noreferrer" href="https://www.antgroup.com">
          บัญชีของฉัน
        </p>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={e => {goLogout()}} >
        <p href="/logout" rel="noopener noreferrer" href="https://www.antgroup.com">
          ออกจากระบบ
        </p>
        </Link>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    getUserData()
    console.log('keyword',keyword);
  }, [keyword])

  const getUserData = () => {
    const value = localStorage.getItem('_user');
    const user_data = value ? JSON.parse(value) : undefined;
    setUser(user_data)
  }

  const onSearch = (e) => {
    Router.push(`/search/${encodeURIComponent(e)}`)
  }
  const goLogout = () => {
    localStorage.removeItem('_user');
    localStorage.removeItem('_token');
    window.location.assign('/home')

  }
  const gotoCart = () => {
    const storage = JSON.parse(localStorage.getItem('_user'))
    if(!storage){
      setIsModalVisible(true);
    }else{
      Router.push(`/cart`)  
    }

  }
  const onSubmit = (data) => {
    console.log('data',data);

    APILogin(data).then(res => {
        console.log('res',res);
        if (res.success) {
            reset()
            localStorage.setItem('_token', res.data.api_token)
            localStorage.setItem('_user', JSON.stringify(res.data))
            getUserData()
            return message.success('เข้าสู่ระบบสำเร็จ',1).then(()=> setIsModalVisible(false))

        } else {
            return message.error('เข้าสู่ระบบไม่สำเร็จ')
        }
    }).catch(err => {
        return message.error('เข้าสู่ระบบไม่สำเร็จ')
        })
    }

  function LoginModal(){
    return(
      <div>
      <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
        <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input  
                value={value}
                onChange={onChange}
                placeholder="Username" 
                error={!!error}
                size="large" />
            )}
            rules={{ required: true }}
        />
        <div className="mt-1"></div>
        <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl className='d-block'>
                    <Input.Password 
                    value={value}
                    onChange={onChange}
                    size="large" 
                    error={!!error}
                    id="password-input"
                    placeholder="Password"  />
                </FormControl>
            )}
            rules={{ required: true }}
        />
        <div className="mt-3 mb-3">
            <Link href="/" underline="none">
                <button type="submit" className='btn btn-primary' style={{width: '100%',backgroundColor: '#1976D2',color:'#fff'}}>เข้าสู่ระบบ</button>
            </Link>
        </div>
        </form>
        <hr/>
        <div className='d-grid  justify-items-center'>
            <p style={{textAlign:'center'}}>หรือ</p>
            <div className='d-flex justify-content-center'>
              <button className='btn btn-outline-primary'><i className="fab fa-facebook" style={{fontSize:'15px'}}></i> Facebook</button>
              <button className='btn btn-outline-danger' style={{ marginLeft:'5px'}}><i className="fab fa-google" style={{fontSize:'15px'}}></i> Google</button>
            </div>
            <div style={{textAlign:'center'}}>
                <span>เพิ่งเคยเข้ามาใน FiinSHOP ใช่หรือไม่ </span>
                <Link href="/register" underline="none" >
                    {' สมัครใหม่'}
                </Link>
            </div>
        </div>
      </div>
    )
  }

  return (
  <div className="position-initial nav-head">
    <div className="row nav-head-margin">
      <div className="col-12 mobile-none" style={{height:'34px',marginTop:'5px'}}>
        <div className="row">
          <div className="col-5">
            <span className="nav-menu">Seller Centre</span>
            <span className="nav-menu"> | </span>
            <span className="nav-menu">ขายสินค้ากับFiin Shop</span>
            <span className="nav-menu"> | </span>
            <span className="nav-menu">ดาวน์โหลด</span>
            <span className="nav-menu"> | </span>
            <span className="nav-menu">ติดตามเราบน </span>
            <span className="nav-menu"><i className="fab fa-facebook" style={{fontSize:'15px'}}>&nbsp;</i></span>
            <span className="nav-menu"><i className="fab fa-instagram" style={{fontSize:'16px'}}>&nbsp;</i></span>
            <span className="nav-menu"><i className="fab fa-tiktok" style={{fontSize:'14px'}}></i></span>
          </div>
          <div className="col-3 col-xs-3 col-sm-2 col-md-2">

          </div>
          <div className="d-flex justify-content-end col-4 col-xs-4 col-sm-4 col-md-5">
            {/* <span className="nav-menu"><NotificationsIcon fontSize="small"/>แจ้งเตือน &nbsp;</span> */}
            <span className="nav-menu"> <InfoOutlinedIcon fontSize="small"/>ช่วยเหลือ&nbsp;</span>
            <span className="nav-menu" ><LanguageIcon fontSize="small"/>ไทย <DownOutlined />&nbsp;</span>
            {user ? 
            <Dropdown overlay={profile_menu}>
              <span className="nav-menu" onClick={e => e.preventDefault()}>&nbsp;{user.name}&nbsp;</span>
            </Dropdown>
            :
            <div>
              <Link href="/register" underline="none">
                <label className="nav-menu">&nbsp;สมัครใหม่&nbsp;</label>
              </Link>
              <span className="nav-menu"> |&nbsp; </span>
              <Link href="/login" underline="none">
                <label className="nav-menu">เข้าสู่ระบบ</label>
              </Link>
            </div>
            }
          </div>
        </div>
      </div>
      <div className="col-12 d-grid" style={{height:'84px'}}>
        <div className="row d-flex align-items-center">
          <div className="col-1 col-xs-1 col-sm-1 col-md-2">
            <img src='/images/logo/fiinshopLoGo.png' className="nav-logo logo-none"/>
          </div>
          <div className="col-8 col-xs-10 col-sm-8 col-md-9">
            <Search
              className="search-bar"
              placeholder="12.12 | เก็บโค้ดส่วนลด 2,000 บาท"
              allowClear
              enterButton={<span><SearchIcon fontSize="medium"/></span>}
              size="medium"
              onSearch={e => {onSearch(e)}}
              style={{borderRadius: '10px'}}
            />
            <div className="mobile-none">
              <label className="nav-menu">ข้าวสาร&nbsp;&nbsp;</label>
              <label className="nav-menu">มาม่า&nbsp;&nbsp;</label>
              <label className="nav-menu">กล้อง</label>
            </div>
          </div>
          <div className="col-2 col-xs-1 col-sm-8 col-md-1 d-flex" style={{marginTop:'-10px'}}>
          <Badge count={count} size="small">
            <Link href="#" underline="none" onClick={e=> gotoCart()}>
              <span className="nav-menu"><ShoppingCartOutlinedIcon fontSize="medium" /></span>
            </Link>
          </Badge>
            <span className="nav-menu" style={{marginLeft:'10px'}}><NotificationsIcon fontSize="medium"/></span>
          </div>
        </div>
      </div>
    </div>
      <Modal footer={false} title='เข้าสู่ระบบ' visible={isModalVisible} onCancel={() => setIsModalVisible(false)}>
       <LoginModal />
      </Modal>
  </div>
  );
}
