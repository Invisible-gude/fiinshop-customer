import { Fragment } from 'react';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function Reviews() {
    function RenderContent() {
        return(
            <Card>
                <Box sx={{padding:'1rem'}}>
                    <h5>คะแนนของสินค้า</h5>
                    <Box sx={{backgroundColor:'#F5F5F5',padding:'1rem'}}>
                        <Grid container>
                            <Grid xs={12} sm={3} md={2} >
                                <span style={{fontSize:'25px',color:'#3076D2'}}>0 <label style={{fontSize:'18px'}}>เต็ม 5</label></span><br/>
                                <Rating name="read-only" value={0} readOnly size="large"/>
                            </Grid>
                            <Grid xs={12} sm={11} md={10} >
                                <Button variant="outlined" sx={{marginRight:'10px'}}>ทั้งหมด</Button>
                                <Button variant="outlined" sx={{marginRight:'10px'}}>5 ดาว</Button>
                                <Button variant="outlined" sx={{marginRight:'10px'}}>4 ดาว</Button>
                                <Button variant="outlined" sx={{marginRight:'10px'}}>3 ดาว</Button>
                                <Button variant="outlined" sx={{marginRight:'10px'}}>2 ดาว</Button>
                                <Button variant="outlined" sx={{marginRight:'10px'}}>1 ดาว</Button>
                                <Button variant="outlined" sx={{marginRight:'10px'}}>1 ดาว</Button>
                                <Button variant="outlined" sx={{marginRight:'10px'}}>ความคิดเห็น</Button>
                                <Button variant="outlined" sx={{marginRight:'10px'}}>มีรูปภาพ/วีดีโอ</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{marginTop:'10px',padding:'10px'}}>
                        <Grid container>
                            <Grid xs={1} sm={1} md={1} >
                                <Avatar
                                    alt="Deee"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 40, height: 40 }}
                                />
                            </Grid>
                            <Grid xs={11} sm={11} md={11} >
                                <span style={{color:'#ABB2B9',fontSize:'14px'}}>Dedee</span><br/>
                                <Rating name="read-only" value={5} readOnly size="small"/><br/>
                                <span style={{color:'#ABB2B9',fontSize:'12px'}}>ตัวเลือกสินค้า: ขนาด s, สี แดง</span><br/>
                                <span style={{fontSize:'12px'}}>ส่งสินค้าไวมาก ทันใช้เลย โอกาสหน้าจะมาอุดหนุนใหม่นะคะ</span>
                                <Box sx={{width: '10%',height: 'auto'}}>
                                    <img
                                        src='https://sharitybox.com/files/product_images/progimg_5056_1538204692.jpg'
                                        alt="brownie"
                                        style={{width: '100%',height: '100%'}}
                                    />
                                </Box>
                                <span style={{color:'#ABB2B9',fontSize:'12px'}}>2021-12-04 13:05</span>
                            </Grid>
                        </Grid>
                    </Box>
                    <hr/>
                </Box>
            </Card>
        )
    }
    return (
        <Box sx={{marginTop:'10px'}}>
            <RenderContent />
        </Box>
    );

}