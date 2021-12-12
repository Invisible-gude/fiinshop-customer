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
import fiinSHOP_logo from '../../../public/images/logo/fiinshopLoGo.png'

import { Typography } from 'antd';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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
const pages = [
  {
    key:0,
    name:'แจ้งเตือน',
    icon:<NotificationsIcon/>,
    badge:0,
    diraction:'/login'
  },
  // {
  //   key:1,
  //   name:'ช่วยเหลือ',
  //   icon:<InfoIcon/>,
  //   badge:0,
  //   diraction:'/login'
  // },
  {
    key:2,
    name:'เข้าสู่ระบบ',
    icon:'',
    badge:0,
    diraction:'/login'
  },
];
const pages_user = [
  {
    key:0,
    name:'แจ้งเตือน',
    icon:<NotificationsIcon/>,
    badge:0,
    diraction:'/login'
  },
  // {
  //   key:1,
  //   name:'ช่วยเหลือ',
  //   icon:<InfoIcon/>,
  //   badge:0,
  //   diraction:'/login'
  // },
  {
    key:2,
    name:'ข้อมูลส่วนตัว',
    icon:<PersonIcon/>,
    badge:0,
    diraction:'/login'
  },
];
const settings = ['ข้อมูลส่วนตัว', 'ออกจากระบบ'];


export default function PrimarySearchAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null)
  const [keyword, setKeyword] = useState('')
 
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
  return (
  <>
  <Row style={{height:'120px'}}>
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
            <img src='/images/logo/fiinshopLoGo.png' width="100%" className="mobile-none"/>
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
          <Col md={3} style={{justifyContent:'start', display:'flex'}}>
            <span className="nav-menu"><ShoppingCartOutlinedIcon fontSize="medium" /></span>
          </Col>
        </Row>
    </Col>
  </Row>

  </>
  );
}
