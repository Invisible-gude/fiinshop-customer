import { useEffect, useState, Fragment } from 'react'
import Router from 'next/router';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { useForm, Controller } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import { Input } from 'antd';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { APILogin } from '../services/api'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import fire from '../config/fire-config'

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
                        Router.push('/home')
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
        <Box display="flex" flexDirection="column" >
            <div className="login-content" style={{backgroundColor:'#1976D2'}}>
                <div className='row login-padding'>
                <div className="col-6 col-xs-12 col-sm-12 col-md-6 mobile-none">
                    <img src='../../images/logo/login.png' style={{width: '100%'}}/>
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-6">
                    <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
                        <div className="login-container">
                            <Card style={{padding:'10px'}}>
                                <Typography style={{ fontSize:'20px', }}>เข้าสู่ระบบ</Typography>
                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input  
                                        value={value}
                                        onChange={onChange}
                                        placeholder="Username" 
                                        error={!!error}
                                        size="large" />
                                    )}
                                    rules={{ required: true }}
                                />
                                <div className="mt-1"></div>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <FormControl className='d-block'>
                                            <Input.Password 
                                            value={value}
                                            onChange={onChange}
                                            size="large" 
                                            error={!!error}
                                            id="password-input"
                                            placeholder="Password"  />
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
                                <p style={{textAlign:'center'}}>หรือ</p>
                                <div className="row">
                                    <div className="col-4 col-xs-12 col-sm-12 col-md-4">
      
                                    </div>
                                </div>
                                <Box style={{textAlign:'center'}}>
                                    <span>เพิ่งเคยเข้ามาใน FiinSHOP ใช่หรือไม่ </span>
                                    <Link href="/register" underline="none" >
                                        {' สมัครใหม่'}
                                    </Link>
                                </Box>
                            </Card>
                        </div>
                    </form>
                </div>
            </div>
            </div>
            <div className='blank-div-login'>k</div>
        </Box>
    );
}