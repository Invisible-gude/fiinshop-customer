import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import 'bootstrap/dist/css/bootstrap.min.css';

function Promotion() {

  return (
    <div className="mt-1">
     <Grid container sx={{ display: { xs: 'none', sm: 'none',md:'flex' }}}>
       <Grid  md={4} xs={4} sm={4} >
          <Card sx={{ maxWidth: '100%' }} style={{ border: "none", boxShadow: "none", display: 'flex', justifyContent: 'center' }}>
              <img src='../../images/promotions/j1.jpg' style={{width: '100%'}}/>
          </Card>
       </Grid>
       <Grid   md={4} xs={4} sm={4}>
          <Card sx={{ maxWidth: '100%' }} style={{ border: "none", boxShadow: "none", display: 'flex', justifyContent: 'center' }}>
            <img src='../../images/promotions/j2.jpg' style={{width: '100%'}}/>
          </Card>
       </Grid>
       <Grid  md={4} xs={4} sm={4}>
          <Card sx={{ maxWidth: '100%' }} style={{ border: "none", boxShadow: "none", display: 'flex', justifyContent: 'center' }}>
            <img src='../../images/promotions/j3.jpg' style={{width: '100%'}}/>
          </Card>
       </Grid>
     </Grid>
    </div>
  );
}

export default Promotion;
