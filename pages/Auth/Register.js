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

const useStyles = makeStyles((theme) => ({
    logo_header: {
        width: '50px',
    },
    logo: {
        width: '60%',
    },
    input: {
        width:'300px'
    },
    seemore_btn: {
        width: '100%',
        backgroundColor: '#1976D2',
        color:'#fff'
    },

}));

export default function Register() {
    const classes = useStyles();

    return (
        <Fragment>
            <div style={{backgroundColor:'#fff', alignItems:'center', display:'flex',}} className="p-4 footer content" >
            <Link href="/MainLayout" style={{ alignItems:'center', display:'flex',}} underline="none">
                <img src='../../images/logo/icon.png' className={classes.logo_header}/>
                <span style={{color:"#1976D2", fontSize:'30px', fontWeight:'bold', marginRight: '3rem'}}>FiinSHOP</span>
            </Link>
                <span style={{ fontSize:'30px', }}>สมัครใหม่</span>
            </div>
            <div style={{backgroundColor:'#1976D2'}}>
                <Grid className="p-5" container >
                    <Grid md={6} xs={6} sm={6} style={{justifyContent: 'center', display:'flex', alignItems:'center'}} >
                            <img src='../../images/logo/fiinshopLOGO.png' className={classes.logo}/>
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
                                <TextField
                                    required
                                    fullWidth 
                                    id="outlined-required"
                                    label="Email"
                                    />
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
                                        <Button variant="outlined" className={classes.seemore_btn}>สมัครสมาชิก</Button>
                                    </Link>
                                </div>
                                <hr />
                                <p style={{textAlign:'center'}}>หรือ</p>
                                <Grid container className="mt-3 mb-3" >
                                    <Grid md={4} xs={4} sm={4} className="p-1" style={{justifyContent: 'center', display:'flex'}}>
                                        <Button style={{backgroundColor:"#2F84F3", color:'white', display:'flex', alignItems:'center', justifyContent:'center',height:'40px'}}>
                                            <FacebookRoundedIcon fontSize="medium"/>
                                            Facebook
                                        </Button>
                                    </Grid>
                                    <Grid md={4} xs={4} sm={4} className="p-1" style={{justifyContent: 'center', display:'flex'}}>
                                        <Button style={{backgroundColor:"#4285F4", color:'white', display:'flex', alignItems:'center', justifyContent:'center',height:'40px'}}>
                                            <GoogleIcon fontSize="medium"/>
                                            Google
                                        </Button>
                                    </Grid>
                                    <Grid md={4} xs={4} sm={4} className="p-1" style={{justifyContent: 'center', display:'flex'}}>
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