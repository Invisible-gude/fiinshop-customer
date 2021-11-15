import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import {
  AppBar, Toolbar, TextareaAutosize,
   List, ListItemIcon, ListItemText
} from '@material-ui/core'
import Image from 'next/image'
import { padding } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: '#155ADE',
    height: '8rem',
  },
  logo: {
    width: 200,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginRight:'5px'
  }
}));


export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false)


  return (
    <div className={classes.root}>
      <AppBar id='app-bar' position="fixed" className='app-bar' >
        <div style={{marginTop: '15px'}}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
            </Grid>
            <Grid item xs={3}>
              <a href="/" className={classes.link}>
                <NotificationsIcon fontSize="small"/>แจ้งเตือน
              </a>
              <a href="/" className={classes.link}>
                <InfoIcon fontSize="small"/>ช่วยเหลือ
              </a>
              <a href="/" className={classes.link}>
                <PersonIcon fontSize="small"/>Log in
              </a>
            </Grid>
          </Grid>
        </div >
        <Toolbar >
        <Grid container spacing={2}>
          <Grid item xs={3} style={{marginLeft:'10px', paddingTop:'0px',display:'flex', justifyContent:'end'}}>
              <a href="/">
                <img src='../../images/logo/fiinshopLOGO.png' className={classes.logo}/>
              </a>
          </Grid>
          <Grid item xs={7}>
            <input placeholder="FiiNSHOP : ถูกและดี ที่นี่ ที่เดียว"
              style={{ width: '100%' , height: '40px', borderRadius: '5px', justifyContent:'center', display:'flex'}}/>
          </Grid>
          <Grid item xs={1}>
          <Tooltip title="ตะกร้าของคุณว่างเปล่า">
            <IconButton>
              <ShoppingBasketIcon fontSize="large"/>
            </IconButton>
          </Tooltip>
          </Grid>
        </Grid>
        
        </Toolbar>
      </AppBar>
    </div>
  );
}