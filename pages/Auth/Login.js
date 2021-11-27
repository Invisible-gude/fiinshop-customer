import { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import Image from 'next/image';
import logo from '../../public/images/logo/fiinshopLOGO.png'


export default function Login() {

    return (
        <Fragment>
            <div style={{backgroundColor:'#fff', alignItems:'center', display:'flex',}} className="p-4 footer content" >
            <Link href="/MainLayout" style={{ alignItems:'center', display:'flex',}} underline="none">
                <img src='../../images/logo/icon.png' style={{width:'50px'}}/>
                <span style={{color:"#1976D2", fontSize:'30px', fontWeight:'bold', marginRight: '3rem'}}>FiinSHOP</span>
            </Link>
                <span style={{ fontSize:'30px', }}>เข้าสู่ระบบ</span>
            </div>
            <div style={{backgroundColor:'#1976D2'}}>
                <Grid className="p-5" container >
                    <Grid md={6} xs={12} sm={6} style={{justifyContent: 'center', display:'flex', alignItems:'center'}} >
                            <Image
                                src={logo}
                                alt="Picture "
                                sx={{width: '100%',height: '100%'}}
                            />
                    </Grid>
                    <Grid md={6} xs={12} sm={6} style={{justifyContent: 'center', display:'flex'}}>
                        <Card style={{width: 'fit-content',padding: '30px'}}>
                            <div style={{width: '500px', }}>
                                <Typography style={{ fontSize:'25px', }}>เข้าสู่ระบบ</Typography>
                                <p>
                                <TextField
                                    required
                                    fullWidth 
                                    id="outlined-required"
                                    label="Username"
                                    />
                                </p>
                                <p>
                                <TextField
                                    required
                                    fullWidth 
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    />
                                </p>
                                <div className="mt-3 mb-3">
                                    <Link href="/MainLayout" underline="none">
                                        <Button variant="outlined" sx={{ width: '100%',backgroundColor: '#1976D2', color:'#fff'}}>เข้าสู่ระบบ</Button>
                                    </Link>
                                </div>
                                <hr />
                                <Link href="#" underline="none" >
                                    {'ลืมรหัสผ่าน'}
                                </Link>
                                <hr />
                                <p style={{textAlign:'center'}}>หรือ</p>
                                <Grid container className="mt-3 mb-3" >
                                    <Grid md={4} xs={12} sm={4} className="p-1" style={{justifyContent: 'center', display:'flex'}}>
                                        <Button style={{backgroundColor:"#2F84F3", color:'white', display:'flex', alignItems:'center', justifyContent:'center',height:'40px'}}>
                                            <FacebookRoundedIcon fontSize="medium"/>
                                            Facebook
                                        </Button>
                                    </Grid>
                                    <Grid md={4} xs={12} sm={4} className="p-1" style={{justifyContent: 'center', display:'flex'}}>
                                        <Button style={{backgroundColor:"#4285F4", color:'white', display:'flex', alignItems:'center', justifyContent:'center',height:'40px'}}>
                                            <GoogleIcon fontSize="medium"/>
                                            Google
                                        </Button>
                                    </Grid>
                                    <Grid md={4} xs={12} sm={4} className="p-1" style={{justifyContent: 'center', display:'flex'}}>
                                        <Button style={{backgroundColor:"#000", color:'white', display:'flex', alignItems:'center', justifyContent:'center',height:'40px'}}>
                                            <AppleIcon fontSize="medium"/>
                                            Apple
                                        </Button>
                                    </Grid>
                                    
                                </Grid>
                                <div style={{textAlign:'center'}}>
                                    <span>เพิ่งเคยเข้ามาใน FiinSHOP ใช่หรือไม่ </span>
                                    <Link href="/Auth/Register" underline="none" >
                                        {' สมัครใหม่'}
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
}