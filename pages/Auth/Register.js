import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


export default function Register() {

    return (
        <Fragment>
            <div style={{backgroundColor:'#fff', alignItems:'center', display:'flex',}} className="p-4 footer content" >
            <Link href="/MainLayout" style={{ alignItems:'center', display:'flex',}} underline="none">
            <img src='../../images/logo/icon.png' style={{width:'50px'}}/>
                <span style={{color:"#1976D2", fontSize:'30px', fontWeight:'bold', marginRight: '3rem'}}>FiinSHOP</span>
            </Link>
                <span style={{ fontSize:'30px', }}>สมัครใหม่</span>
            </div>
            <div style={{backgroundColor:'#1976D2'}}>
                <Grid className="p-5" container >
                    <Grid md={6} xs={6} sm={6} style={{justifyContent: 'center', display:'flex', alignItems:'center'}} >
                        <Image
                            src={logo}
                            alt="Picture "
                            sx={{width: '100%',height: '100%'}}
                            // className={classes.logo}
                        />
                    </Grid>
                    <Grid md={6} xs={6} sm={6} style={{justifyContent: 'center', display:'flex'}}>
                        <Card style={{width: 'fit-content',padding: '30px'}}>
                            <div style={{width: '500px', }}>
                                <Typography style={{ fontSize:'25px', }}>สมัครใหม่</Typography>
                                <Grid container>
                                    <Grid md={6} xs={6} sm={6} className="p-1">
                                        <TextField
                                            required
                                            fullWidth 
                                            id="outlined-required"
                                            label="Username"
                                            />
                                    </Grid>
                                    <Grid md={6} xs={6} sm={6} className="p-1">
                                        <TextField
                                        required
                                        fullWidth 
                                        id="outlined-required"
                                        label="หมายเลขโทรศัพท์"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid md={12} xs={12} sm={12} className="p-1">
                                        <TextField
                                            required
                                            fullWidth 
                                            id="outlined-required"
                                            label="Email"
                                            />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid md={6} xs={6} sm={6} className="p-1">
                                        <TextField
                                            required
                                            fullWidth 
                                            id="outlined-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                    <Grid md={6} xs={6} sm={6} className="p-1">
                                        <TextField
                                            required
                                            fullWidth 
                                            id="outlined-password-input"
                                            label="Confirm Password"
                                            type="password"
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                </Grid>
                               
                                <div className="mt-3 mb-3">
                                    <Link href="/" underline="none">
                                        <Button variant="outlined" sx={{ width: '100%',backgroundColor: '#1976D2', color:'#fff'}}>สมัครสมาชิก</Button>
                                    </Link>
                                </div>
                                <hr />
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
}