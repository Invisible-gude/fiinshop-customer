import { useEffect, useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
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


const useStyles = makeStyles((theme) => ({
    logo_header: {
        width: '50px',
    },
    logo: {
        height: '60%',
        // position: 'absolute',

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
        if (data.agree === false) {
            setError('agree', { type: 'manual', message: '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????' })
        }else if (data.password !== data.confirm_password) {
            setError('confirm_password', { type: 'manual', message: '?????????????????????????????????????????????????????????????????????????????????????????????' })
        } else {
            APIRegister(data).then(res => {
                console.log('res',res);
                if (res.success) {
                    reset()
                    return MySwal.fire({
                        title: res.message,
                        text:  '???????????????????????????????????????????????????',
                        icon: 'success'
                    })
                } else {
                    return MySwal.fire({
                        title: '??????????????????????????????????????????',
                        text: res.message,
                        icon: 'error'
                    })
                }
            }).catch(err => {
                return MySwal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: '?????????????????????????????????????????????????????? Service',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
            // console.log(`REGISTER DATA`, data)
        }
    }



    return (
        <Fragment>
            <Box sx={{ backgroundColor:'#fff', alignItems:'center', display:'flex',height: '15%' }} className="p-4" >
            <Link href="/MainLayout" style={{ alignItems:'center', display:'flex',}} underline="none">
                <img src='../../images/logo/icon.png' className={classes.logo_header}/>
                <span style={{color:"#1976D2", fontSize:'30px', fontWeight:'bold', marginRight: '3rem'}}>FiinSHOP</span>
            </Link>
            <Box display={{md:'contents' ,xs:'none', sm:'contents', lg:'contents'}}> 
                <span style={{ fontSize:'30px', }}>?????????????????????????????????</span>
            </Box>
            </Box>
            <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
                <div style={{backgroundColor:'#1976D2'}}>
                    <Grid className="p-5" container item={true}>
                        <Grid md={6} xs={12} sm={6} style={{justifyContent: 'center', display:'flex' , alignItems:'center'}} >
                        <Box display={{md:'contents' ,xs:'none', sm:'contents', lg:'contents'}}>                          
                            <img src='../../images/logo/login.png' className={classes.logo}/>
                        </Box>
                        </Grid>
                        <Grid md={6} xs={12} sm={6} style={{justifyContent: 'center', display:'flex'}}>
                            <Card style={{width: 'fit-content',padding: '30px'}}>
                                <div style={{width: {md:'500px' ,xs:'100px', sm:'300px'} }}>
                                    <Typography style={{ fontSize:'25px', }}>???????????????????????????</Typography>
                                    <Grid container>
                                        <Grid md={12} xs={12} sm={12} className="p-1">
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
                                        </Grid>
                                        <Grid md={12} xs={12} sm={12} className="p-1">
                                            <Controller
                                                name="phone"
                                                control={control}
                                                defaultValue=""
                                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="?????????????????????????????????????????????"
                                                        id="standard-basic"
                                                        value={value}
                                                        onChange={onChange}
                                                        error={!!error}
                                                        size="small"
                                                    />
                                                )}
                                                rules={{ required: true, pattern: /[0-9]{10}/, maxLength: 10 }}
                                            />
                                            {errors.phone && <FormHelperText id="error-text">???????????????????????????????????????????????????????????????????????????</FormHelperText>}
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid md={12} xs={12} sm={12} className="p-1">
                                            <Controller
                                                name="name"
                                                control={control}
                                                defaultValue=""
                                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="????????????"
                                                        id="standard-basic"
                                                        value={value}
                                                        onChange={onChange}
                                                        error={!!error}
                                                        size="small"
                                                    />
                                                )}
                                                rules={{ required: true }}
                                            />
                                        </Grid>
                                        <Grid md={12} xs={12} sm={12} className="p-1">
                                            <Controller
                                                name="email"
                                                control={control}
                                                defaultValue=""
                                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Email"
                                                        id="standard-basic"
                                                        value={value}
                                                        onChange={onChange}
                                                        error={!!error}
                                                        size="small"
                                                    />
                                                )}
                                                rules={{ required: true }}
                                            />
                                        </Grid>
                                    </Grid>
                                
                                    <Grid container>
                                        <Grid md={12} xs={12} sm={12} className="p-1">
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
                                        </Grid>
                                        <Grid md={12} xs={12} sm={12} className="p-1">
                                            <Controller
                                                name="confirm_password"
                                                control={control}
                                                defaultValue=""
                                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                    <FormControl className='d-block'>
                                                        <InputLabel htmlFor="confirm-password-input">Confirm password</InputLabel>
                                                        <Input
                                                            fullWidth
                                                            id="confirm-password-input"
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            value={value}
                                                            onChange={onChange}
                                                            error={!!error}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                        onMouseDown={handleMouseDownPassword}
                                                                    >
                                                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </FormControl>
                                                )}
                                                rules={{ required: true, minLength: 8 }}
                                            />
                                            {errors.confirm_password && errors.confirm_password.message && <FormHelperText id="error-text">{errors.confirm_password.message}</FormHelperText>}
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid md={12} xs={12} sm={12} className="p-1 mt-3">
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
                                                        } label="?????????????????????????????????????????????????????????????????????????????????????????????????????????" />
                                                    </FormGroup>
                                                )}
                                                
                                            />
                                            {errors.agree && errors.agree.message && <FormHelperText id="error-text">{errors.agree.message}</FormHelperText>}
                                        </Grid>
                                    </Grid>

                                    <div className="mt-3 mb-3">
                                        <Link href="/" underline="none">
                                            <Button variant="outlined" className={classes.seemore_btn} type='submit'>?????????????????????????????????</Button>
                                        </Link>
                                    </div>
                                    <hr />
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Fragment>
    );
}