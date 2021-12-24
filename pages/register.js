import { useEffect, useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Input } from 'antd';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import { APIRegister } from '../services/api'
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Register() {
    const { reset, control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            name: '',
            username: '',
            password: '',
            confirm_password: '',
            email: '',
            phone: '',
            agree:false
        }
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const onSubmit = (data) => {
        console.log('data',data);
        if(data.password !== data.confirm_password) {
            setError('confirm_password', { type: 'manual', message: 'ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่าน' })
        }else if (data.agree === false) {
            setError('agree', { type: 'manual', message: 'กรุณายอมรับเงื่อนไขและข้อตกลงการใช้งาน' })
        }else {
            APIRegister(data).then(res => {
                console.log('res',res);
                if (res.success) {
                    reset()
                    return MySwal.fire({
                        title: res.message,
                        text:  'สมัครสมาชิกสำเร็จ',
                        icon: 'success'
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
            // console.log(`REGISTER DATA`, data)
        }
    }



    return (
        <Box display="flex" flexDirection="column" >
            <div className="register-content" style={{backgroundColor:'#1976D2'}}>
                <div className='row register-padding'>
                <div className="col-6 col-xs-12 col-sm-12 col-md-6 " style={{display:'flex', alignItems:'center'}}>
                    <img src='../../images/logo/login.png' style={{width: '100%'}} className='mobile-none'/>
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-6">
                    <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
                        <div className="register-container">
                            <Card style={{padding:'10px'}}>
                                <Typography style={{ fontSize:'20px', }}>สมัครสมาชิก</Typography>
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
                                    name="phone"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input  
                                        value={value}
                                        onChange={onChange}
                                        placeholder="หมายเลขโทรศัพท์" 
                                        error={!!error}
                                        size="large" />
                                        
                                        )}
                                    rules={{ required: true, pattern: /[0-9]{10}/, maxLength: 10 }}
                                />
                                {errors.phone && <FormHelperText id="error-text">หมายเลขโทรศัพท์ไม่ถูกต้อง</FormHelperText>}
                                <div className="mt-1"></div>
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input  
                                        value={value}
                                        onChange={onChange}
                                        placeholder="ชื่อ" 
                                        error={!!error}
                                        size="large" />
                                    )}
                                    rules={{ required: true }}
                                />
                                <div className="mt-1"></div>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input  
                                        value={value}
                                        onChange={onChange}
                                        placeholder="Email" 
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
                                        <FormControl className='d-block password'>
                                            <Input.Password 
                                            value={value}
                                            onChange={onChange}
                                            size="large" 
                                            error={!!error}
                                            id="password-input"
                                            placeholder="Password"  />
                                        </FormControl>
                                    )}
                                    rules={{ required: true , minLength: 8 }}
                                />       
                                <div className="mt-1 password"></div>
                                <Controller
                                    name="confirm_password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <FormControl className='d-block password'>
                                            <Input.Password 
                                            value={value}
                                            onChange={onChange}
                                            size="large" 
                                            error={!!error}
                                            id="password-input"
                                            placeholder="Confirm Password"  />
                                        </FormControl>
                                    )}
                                    rules={{ required: true, minLength: 8 }}
                                />
                                {errors.confirm_password && errors.confirm_password.message && <FormHelperText id="error-text">{errors.confirm_password.message}</FormHelperText>}
                                <div className="mt-1"></div>
                                <Controller
                                    name="agree"
                                    control={control}
                                    // rules={{ required: true }}
                                    // defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <FormGroup>
                                            <FormControlLabel control={
                                            <Checkbox 
                                                value={value}
                                                onChange={onChange}
                                                color="success"
                                            />
                                            } label={<span style={{color:'gray', fontSize:'14px'}}>ยอมรับเงื่อนไขและข้อตกลงในการใช้งาน</span>} />
                                        </FormGroup>
                                    )}
                                    
                                />
                                {errors.agree && errors.agree.message && <FormHelperText id="error-text">{errors.agree.message}</FormHelperText>}

                                <Box className="mt-3 mb-3">
                                    <Link href="/" underline="none">
                                        <Button type="submit" variant="outlined" style={{width: '100%',backgroundColor: '#1976D2',color:'#fff'}}>สมัครสมาชิก</Button>
                                    </Link>
                                </Box>
                                <hr />
                                <p style={{textAlign:'center',color:'gray', fontSize:'14px'}}>หรือ</p>
                                <div className="row">
                                    <div className="col-4 col-xs-12 col-sm-12 col-md-4">
      
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mb-2'>
                                    <button className='btn btn-outline-primary'><i className="fab fa-facebook" style={{fontSize:'15px'}}></i> Facebook</button>
                                    <button className='btn btn-outline-danger' style={{ marginLeft:'5px'}}><i className="fab fa-google" style={{fontSize:'15px'}}></i> Google</button>
                                </div>
                                <Box style={{textAlign:'center'}}>
                                    <span style={{color:'gray', fontSize:'14px'}}>หากมีบัญชีผู้ใช้แล้ว คุณสามารถ</span>
                                    <Link href="/login" underline="none" >
                                        {' เข้าสู่ระบบ'}
                                    </Link>
                                </Box>
                            </Card>
                        </div>
                    </form>
                </div>
            </div>
            </div>
            <div className='blank-div-register'>k</div>
        </Box>

    );
}