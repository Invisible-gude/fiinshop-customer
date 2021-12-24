import {useState, useEffect} from 'react';
import { Input, Badge, Dropdown, Menu } from 'antd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { DownOutlined, SearchOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from '@mui/material';
import Router, { useRouter } from "next/router"
import { useSelector } from 'react-redux';
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



export default function NavCart() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null)
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const { count } = useSelector(state => state.count)
  const profile_menu = (
    <Menu>
      <Menu.Item>
        <Link href="/profile"  underline='none' >
        <p rel="noopener noreferrer" href="https://www.antgroup.com">
          บัญชีของฉัน
        </p>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={e => {goLogout()}} underline='none'>
        <p href="/logout" rel="noopener noreferrer" href="https://www.antgroup.com">
          ออกจากระบบ
        </p>
        </Link>
      </Menu.Item>
    </Menu>
  );
  const login_menu = (
    <Menu>
      <Menu.Item>
        <Link href="/login" underline='none' >
        <p rel="noopener noreferrer" href="https://www.antgroup.com">
          เข้าสู่ระบบ
        </p>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/register" underline='none'>
        <p  rel="noopener noreferrer" href="https://www.antgroup.com">
          สมัครสมาชิก
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
      <div className='nav-cart mobile-none'>&nbsp;</div>
      <div className="col-12 d-grid" style={{height:'84px'}}>
        <div className="row d-flex align-items-center" style={{zIndex:1}}>
          <div className="col-1 col-xs-1 col-sm-1 col-md-3 mobile-none">
            <Link href="/home" underline="none" className='mobile-none'>
              <div className='d-flex align-items-center justify-content-between'>
                <h1 className=''>ShopFiin</h1>
                <div className='border-start' >
                  <h4 style={{color:'#196bfd', marginLeft:'20px'}}>{router.pathname === '/cart' ? `รถเข็น` : `ชำระเงิน`}</h4>
                </div>
              </div>
              {/* <img src='/images/logo/fiinshopLoGo.png' className="nav-logo logo-none"/> */}
            </Link>
          </div>
          <div className="col-1 col-xs-1 col-sm-1 col-md-2 mobile-none">

          </div>

          <div className="col-12 col-xs-12 col-sm-8 col-md-7">
            <div className="input-group mb-3 d-flex align-items-center">
              <input type="text" className="form-control" placeholder="ค้นหาสินค้า" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
              <span className="input-group-text" id="basic-addon2" style={{backgroundColor:'#196bfd', color:'white'}} onChange={e => {onSearch(e)}}><SearchIcon fontSize="medium"/></span>
              <span className="nav-menu mobile-show" style={{marginLeft:'10px'}}><NotificationsIcon fontSize="medium"/></span>
              {user ? 
              <Dropdown overlay={profile_menu}>
                <span onClick={e => e.preventDefault()} className="nav-menu mobile-show" style={{marginLeft:'10px'}}><PersonIcon fontSize="medium"/></span>
              </Dropdown>
              :
              <div>
              <Dropdown overlay={login_menu}>
                <span onClick={e => e.preventDefault()} className="nav-menu mobile-show" style={{marginLeft:'10px'}}><PersonIcon fontSize="medium"/></span>
              </Dropdown>
              </div>
              }
            </div>
       

          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
