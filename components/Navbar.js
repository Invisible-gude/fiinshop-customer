import {useState, useEffect} from 'react';
import  Box  from '@material-ui/core/Box';
import { Input, Row, Col, Dropdown, Menu } from 'antd';
import Image from 'next/image';

import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';

import Router from 'next/router';
import { DownOutlined, SearchOutlined} from '@ant-design/icons';

import { Typography } from 'antd';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from '@mui/material';
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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
    <div className="col-12 mobile-none" style={{height:'35px'}}>
      <div className="row">
        <div className="col-5">
          <span className="nav-menu">Seller Centre</span>
          <span className="nav-menu"> | </span>
          <span className="nav-menu">ขายสินค้ากับFiin Shop</span>
          <span className="nav-menu"> | </span>
          <span className="nav-menu">ดาวน์โหลด</span>
          <span className="nav-menu"> | </span>
          <span className="nav-menu">ติดตามเราบน <FacebookRoundedIcon fontSize="small"/></span>
        </div>
        <div className="col-3 col-xs-3 col-sm-2 col-md-2">

        </div>
        <div className="d-flex justify-content-end col-4 col-xs-4 col-sm-4 col-md-5">
          <span className="nav-menu"><NotificationsIcon fontSize="small"/>แจ้งเตือน &nbsp;</span>
          <span className="nav-menu"> <InfoOutlinedIcon fontSize="small"/>ช่วยเหลือ&nbsp;</span>
          <span className="nav-menu" ><LanguageIcon fontSize="small"/>ไทย <DownOutlined />&nbsp;</span>
          {user ? 
          <Dropdown overlay={profile_menu}>
            <span className="nav-menu" onClick={e => e.preventDefault()}>&nbsp;{user.name}&nbsp;</span>
          </Dropdown>
          :
          <div>
            <span className="nav-menu" href="/register">&nbsp;สมัครใหม่&nbsp;</span>
            <span className="nav-menu"> |&nbsp; </span>
            <a className="nav-menu" href="/login">เข้าสู่ระบบ</a>
          </div>
          }
        </div>
      </div>
    </div>
    <div className="col-12">
      <div className="row d-flex align-items-center">
        <div className="col-1 col-xs-1 col-sm-1 col-md-2">
          <img src='/images/logo/fiinshopLoGo.png' className="nav-logo logo-none"/>
        </div>
        <div className="col-8 col-xs-10 col-sm-8 col-md-9">
          <Search
            className="search-bar"
            placeholder="12.12 | เก็บโค้ดส่วนลด 2,000 บาท"
            allowClear
            enterButton={<p><SearchOutlined /></p>}
            size="large"
            onSearch={e => {onSearch(e)}}
          />
        </div>
        <div className="col-2 col-xs-1 col-sm-8 col-md-1">
          <span className="nav-menu"><ShoppingCartOutlinedIcon fontSize="medium" /></span>
        </div>
      </div>
    </div>
  </div>
  {/* <Row >
    <Col span={24} className="mobile-none" style={{height:'35px'}}>
      <Row>
        <Col md={8} style={{display:'block', top:'0px'}}>
            <span className="nav-menu">Seller Centre</span>
            <span className="nav-menu"> | </span>
            <span className="nav-menu">ขายสินค้ากับFiin Shop</span>
            <span className="nav-menu"> | </span>
            <span className="nav-menu">ดาวน์โหลด</span>
            <span className="nav-menu"> | </span>
            <span className="nav-menu">ติดตามเราบน <FacebookRoundedIcon fontSize="small"/></span>

        </Col>
        <Col md={8}>

        </Col>
        <Col md={8} style={{justifyContent:'end', display:'flex',top:'0px'}}>
          <Box alignItems='center'>
            <span className="nav-menu"><NotificationsIcon fontSize="small"/>แจ้งเตือน &nbsp;</span>
            <span className="nav-menu"> <InfoOutlinedIcon fontSize="small"/>ช่วยเหลือ&nbsp;</span>
            <span className="nav-menu" ><LanguageIcon fontSize="small"/>ไทย <DownOutlined />&nbsp;</span>
            <span className="nav-menu">&nbsp;สมัครใหม่&nbsp;</span>
            <span className="nav-menu"> |&nbsp; </span>
            <span className="nav-menu">เข้าสู่ระบบ</span>
          </Box>
        </Col>
      </Row>
    </Col>
    <Col span={24} style={{height:'85px',alignItems: 'center',display: 'grid'}}>
      <Row >
          <Col md={3} style={{ display:'flex', alignItems:'center'}} >
            <img src='/images/logo/fiinshopLoGo.png' width="100%" className="hide-logo"/>
          </Col>
          <Col md={18} style={{justifyContent:'center', display:'flex', alignItems:'center'}}>
            <Search
              className="search-bar"
              placeholder="12.12 | เก็บโค้ดส่วนลด 2,000 บาท"
              allowClear
              enterButton={<p><SearchOutlined /></p>}
              size="large"
              onSearch={e => {onSearch(e)}}
            />
          </Col>
          <Col md={3} style={{justifyContent:'start', display:'flex'}} >
            <span className="nav-menu"><ShoppingCartOutlinedIcon fontSize="medium" /></span>
          </Col>
        </Row>
    </Col>
  </Row> */}
  </div>
  );
}
