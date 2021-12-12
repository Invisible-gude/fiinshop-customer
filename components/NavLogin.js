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



export default function NavbarLogin() {
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
  <div className="position-initial nav-head-login">
    <div className="nav-head-margin-login">
        <div className="d-flex align-items-center">
              <span style={{color:"#1976D2", fontSize:'30px', fontWeight:'bold', marginRight: '3rem'}}>FIIN SHOP <label style={{color:"#000", fontSize:'25px', fontWeight:'bold', marginRight: '3rem'}}>เข้าสู่ระบบ</label></span>
        </div>
    </div>
  </div>
  );
}
