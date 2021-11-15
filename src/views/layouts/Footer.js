import {Fragment} from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { makeStyles } from '@material-ui/core/styles';
import CountdownTimer from "react-component-countdown-timer";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';

const useStyles = makeStyles((theme) => ({
    seemore_btn: {
        width: '30%',

    },
    logo: {
        width: '40px',
        // height: '30px',
    },
    qrcode: {
        width: '100px',
        // height: '30px',
    }

}));

export default function Footer() {
    const classes = useStyles();

  return (
    <Fragment>
        <Grid container>
            <Grid md={2.4} xs={12} sm={2.4}>
                <p>ศูนย์ช่วยเหลือ</p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'Help Center'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'สั่งซื้อสินค้าอย่างไร'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'เริ่มขายสินค้าอย่างไร'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'ช่องทางการชำระเงินใน FiinSHOP'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'FiinSHOP Coins'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'การจัดส่งสินค้า'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'การคืนเงินและคืนสินค้า'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'การันตีโดย FiinSHOP คืออะไร?'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'ติดต่อ FiinSHOP'}
                    </Link>
                </p>
            </Grid>  
            <Grid md={2.4} xs={12} sm={2.4}>
                <p>เกี่ยวกับ FiinSHOP</p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'เกี่ยวกับเรา'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'โปรแกรม Affiliate'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'ร่วมงานกับเรา'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'นโยบายของ FiinSHOP'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'นโยบายความเป็นส่วนตัว'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'FiinSHOP Blog'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'FiinSHOP Mail'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'FiinSHOP Centre'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'Flash Deals'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        {'ผู้ติดต่อออนไลน์'}
                    </Link>
                </p>
            </Grid>  
            <Grid md={2.4} xs={12} sm={2.4}>
                <p>วิธีการชำระเงิน</p>
                <Grid container>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/payments/scb.png' class={classes.logo} />
                    </Grid>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/payments/kplus.png' class={classes.logo} />
                    </Grid>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/payments/krungthai.png' class={classes.logo} />
                    </Grid>
                </Grid>
                <Grid container className="mt-2">
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/payments/krungsri.png' class={classes.logo} />
                    </Grid>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/payments/bangkok.png' class={classes.logo} />
                    </Grid>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/payments/visa.png' class={classes.logo} />
                    </Grid>
                </Grid>
                <Grid container className="mt-2">
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/payments/mastercard.png' class={classes.logo} />
                    </Grid>
                </Grid>
                <div className="mt-3"/>
                <p>วิธีการจัดส่ง</p>
                <Grid container>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/transporation/flashexpress.png' class={classes.logo} />
                    </Grid>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/transporation/bestexpress.png' class={classes.logo} />
                    </Grid>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/transporation/jnt.png' class={classes.logo} />
                    </Grid>
                </Grid>
                <Grid container className="mt-2">
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/transporation/ninjavan.png' class={classes.logo} />
                    </Grid>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/transporation/thaipost.png' class={classes.logo} />
                    </Grid>
                    <Grid md={4} xs={4} sm={4}>
                        <img src='../../images/transporation/kerry.png' class={classes.logo} />
                    </Grid>
                </Grid>
            </Grid>  
            <Grid md={2.4} xs={12} sm={2.4}>
                <p>ติดตามเรา</p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        <FacebookIcon fontSize="small" color="#92909C"/>{'Facebook'}
                    </Link>
                </p>
                <p>
                    <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                        <InstagramIcon fontSize="small" color="#92909C"/>{'Instagram'}
                    </Link>
                </p>
            </Grid>  
            <Grid md={2.4} xs={12} sm={2.4}>
                <p>ดาวน์โหลดแอปพลิเคชั่น</p>
                <Grid container>
                    <Grid md={6} xs={6} sm={6}>
                    <img src='../../images/logo/qrcode.png' class={classes.qrcode} />
                    </Grid>
                    <Grid md={6} xs={6} sm={6}>
                        <p>
                            <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                                <AppleIcon fontSize="small" color="#92909C"/>{'App Store'}
                            </Link>
                        </p>
                        <p>
                            <Link href="#" underline="none" color='#92909C' style={{fontSize:'14px'}}>
                                <ShopIcon fontSize="small" color="#92909C"/>{'Google Play'}
                            </Link>
                        </p>
                    </Grid>
                </Grid>
            </Grid>  
        </Grid>  
    </Fragment>
  );
}

