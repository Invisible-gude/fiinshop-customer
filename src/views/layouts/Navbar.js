import {useState, useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Image from 'next/image';
import fiinSHOP_logo from '../../../public/images/logo/fiinshopLOGO.png'
import Router from 'next/router';
import { Input } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
const { Search } = Input;

const pages = [
  {
    key:0,
    name:'แจ้งเตือน',
    icon:<NotificationsIcon/>,
    badge:0,
    diraction:'/login'
  },
  {
    key:1,
    name:'ช่วยเหลือ',
    icon:<InfoIcon/>,
    badge:0,
    diraction:'/login'
  },
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
  {
    key:1,
    name:'ช่วยเหลือ',
    icon:<InfoIcon/>,
    badge:0,
    diraction:'/login'
  },
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
    <Box height="7vh" >
    <AppBar position="fixed" >
    <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          paddingLeft={{ xs: '1rem', sm:'5rem', md: '10rem' }}
          paddingRight={{ xs: '1rem',sm:'0rem', md: '10rem' }}
          style={{ minHeight: '100px'}}
        >
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link href="/home">
            <Image
                src={fiinSHOP_logo}
                alt="Picture of the author"
                width={300} 
                height={100} 
              />
              </Link>
          </Typography>
            <Search
              placeholder="ค้นหา"
              allowClear
              enterButton={<p><SearchOutlined /></p>}
              size="large"
              onSearch={e => {onSearch(e)}}
            />
          {/* <Input.Search  
              onKeyPress={e=> { setKeyword(e.target.value)}}
              placeholder="ค้นหา" 
              size="large" /> */}
        
          <MenuItem>
              <Link href='/login' underline="none" sx={{color:'white'}}>
            <IconButton
              size="medium"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <ShoppingBasketIcon/>
              </Badge>
            </IconButton>
            </Link>
          </MenuItem>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {user ? pages_user.map((page) => (
                 <MenuItem key={page.key}>
                  <IconButton
                    size="medium"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={page.badge} color="error">
                      {page.icon}
                    </Badge>
                  </IconButton>
                  <span>{page.name}</span>
                </MenuItem>
              )):
              pages.map((page) => (
                <MenuItem key={page.key}>
                 <IconButton
                   size="medium"
                   aria-label="show 17 new notifications"
                   color="inherit"
                 >
                   <Badge badgeContent={page.badge} color="error">
                     {page.icon}
                   </Badge>
                 </IconButton>
                 <span>{page.name}</span>
               </MenuItem>
             ))
              }
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'none' } }}
          >
             <Image
                src={fiinSHOP_logo}
                alt="Picture of the author"
                width={200} 
                height={60} 
              />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem>
                <Link href='/login' underline="none" sx={{color:'white'}}>
              <IconButton
                size="medium"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <span>แจ้งเตือน</span>
              </Link>
            </MenuItem>
            <MenuItem>
                <Link href='/login' underline="none" sx={{color:'white'}}>
              <IconButton
                size="medium"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <InfoIcon />
                </Badge>
              </IconButton>
              <span>ช่วยเหลือ</span>
              </Link>
            </MenuItem>
            <MenuItem>
                <Link href={user && user.name ? '/profile' :'/login'} underline="none" sx={{color:'white'}}>
              <IconButton
                size="medium"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                {user && user.name ? 
                <Avatar
                    alt={user && user.name ? user.name :'user'}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 30, height: 30 }}
                />
                :null}
              </IconButton>
              {user && user.name ? user.name :<span>เข้าสู่ระบบ</span>}
              </Link>
            </MenuItem>
           
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <span>Login</span> */}
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Grid>
    </AppBar>
    </Box>
  );
}
