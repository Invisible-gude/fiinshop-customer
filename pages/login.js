import { useEffect, useState, Fragment } from 'react'
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { useForm, Controller } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { APILogin } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


export default function Login() {
    const dispatch = useDispatch()
    const [main, setMain] = useState(1)
    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const onSubmit = (data) => {
        console.log('data',data);
        APILogin(data).then(res => {
            console.log('res',res);
            if (res.success) {
                reset()
                localStorage.setItem('_token', res.data.api_token)
                localStorage.setItem('_user', JSON.stringify(res.data))
                return MySwal.fire({
                    title: 'Login Success',
                    text:  'เข้าสู่ระบบสำเร็จ',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Router.push('/mainlayout')
                    } 
                  })
            } else {
                return MySwal.fire({
                    title: 'ข้อความจากระบบ',
                    text: res.message,
                    icon: 'error'
                })
            }
        }).catch(err => {
            return MySwal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'เกิดความผิดพลาดของ Service',
                showConfirmButton: false,
                timer: 2000
            })
        })
    }
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Box sx={{ backgroundColor:'#fff', alignItems:'center', display:'flex',height: '15%' }} className="p-4" >
            <Link href="/mainlayout" style={{ alignItems:'center', display:'flex',}} underline="none">
                <img src='../../images/logo/icon.png' style={{ width: '50px'}}/>
                <span style={{color:"#1976D2", fontSize:'30px', fontWeight:'bold', marginRight: '3rem'}}>FiinSHOP</span>
            </Link>
            <Box display={{md:'contents' ,xs:'none', sm:'contents', lg:'contents'}}> 
                <span style={{ fontSize:'30px', }}>เข้าสู่ระบบ</span>
            </Box>
            </Box>
            <Box sx={{ height: {md:'70%' ,xs:'100%', sm:'70%', lg:'70%'},bgcolor:'#1976D2',justifyContent: 'center', display:'flex', alignItems:'center' }}>
                <Grid className="p-5" container item={true}>
                    <Grid item={true} xs={12} sm={6} style={{justifyContent: 'center', display:'flex', alignItems:'center'}} >
                    <Box display={{md:'contents' ,xs:'none', sm:'contents', lg:'contents'}}> 
                        <img src='../../images/logo/login.png' style={{width: '60%'}}/>
                    </Box>
                    </Grid>
                    <Grid item={true} md={6} xs={12} sm={6} style={{justifyContent: 'center', display:'flex'}} >
                        <Card style={{width: 'fit-content',padding: '30px'}}>
                        <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
                            <Box style={{width: {md:'500px' ,xs:'100px', sm:'300px'} }}>
                                <Typography style={{ fontSize:'25px', }}>เข้าสู่ระบบ</Typography>
                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <TextField
                                            fullWidth
                                            label="username"
                                            id="standard-basic"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            size="small"
                                        />
                                    )}
                                    rules={{ required: true }}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <FormControl className='d-block'>
                                            <InputLabel htmlFor="password-input">Password</InputLabel>
                                            <Input
                                                fullWidth
                                                size="small"
                                                label="Password"
                                                id="password-input"
                                                type={showPassword ? 'text' : 'password'}
                                                value={value}
                                                onChange={onChange}
                                                error={!!error}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    )}
                                    rules={{ required: true }}
                                />
                                <Box className="mt-3 mb-3">
                                    <Link href="/" underline="none">
                                        <Button type="submit" variant="outlined" style={{width: '100%',backgroundColor: '#1976D2',color:'#fff'}}>เข้าสู่ระบบ</Button>
                                    </Link>
                                </Box>
                                <hr />
                                <Link href="#" underline="none" >
                                    {'ลืมรหัสผ่าน'}
                                </Link>
                                <hr />
                                <p style={{textAlign:'center'}}>หรือ</p>
                                
                                <Box style={{textAlign:'center'}}>
                                    <span>เพิ่งเคยเข้ามาใน FiinSHOP ใช่หรือไม่ </span>
                                    <Link href="/register" underline="none" >
                                        {' สมัครใหม่'}
                                    </Link>
                                </Box>
                            </Box>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box display={{md:'contents' ,xs:'none', sm:'contents', lg:'contents'}} 
            sx={{ height: '15%',backgroundColor:'#fff', alignItems:'center', display:'flex' }} >
           
            </Box>
        </Box>
    );
}