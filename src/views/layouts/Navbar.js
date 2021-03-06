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
import Container from '@mui/material/Container';
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
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '65%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUserData()
  }, [])

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
  return (
    <Box height="7vh" >
    <AppBar position="fixed" >
      <Container maxWidth="xl"> 
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link href="/mainlayout">
            <Image
                src={fiinSHOP_logo}
                alt="Picture of the author"
                width={200} 
                height={60} 
              />
              </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
                <Avatar
                    alt={user && user.name ? user.name :'user'}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 30, height: 30 }}
                />
              </IconButton>
              {user && user.name ? user.name :<span>ช่วยเหลือ</span>}
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
      </Container>
    </AppBar>
    </Box>
  );
}
