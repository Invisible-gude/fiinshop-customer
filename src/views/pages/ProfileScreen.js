import { Fragment, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

export default function ProfileScreen() {
    useEffect(() => {
      }, [])
    return (
        <Grid         
        paddingLeft={{ xs: '1rem', sm:'5rem', md: '10rem' }}
        paddingRight={{ xs: '1rem',sm:'0rem', md: '10rem' }}>
           <Card className="mt-5 p-2">
                <Grid container>
                    <Grid md={11} xs={11} sm={11}>
                    <div className="footer content">
                        <span style={{color:'rgb(238,77,45)', fontSize: '20px'}}>ข้อมูลส่วนตัว</span>
                    </div>
                    </Grid>  
                </Grid>  
                <Grid container >
                </Grid>
            </Card>
        </Grid>
    );
}