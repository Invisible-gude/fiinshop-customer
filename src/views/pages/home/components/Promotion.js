import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import j1 from '../../../../../public/images/promotions/j1.jpg';
import j2 from '../../../../../public/images/promotions/j2.jpg';
import j3 from '../../../../../public/images/promotions/j3.jpg';


function Promotion() {

  return (
    <div className="mt-1 mb-1">
     <Grid container sx={{ display: { xs: 'none', sm: 'none',md:'flex' }}}>
       <Grid  md={4} xs={4} sm={4} >
          <Card style={{ border: "none", boxShadow: "none", display: 'flex', justifyContent: 'center' }}>
              <Image
                  src={j1}
                  alt="Picture "
                  height={200}
                  width={700}
                  // sx={{width: '100%',height: '100%'}}
                />
          </Card>
       </Grid>
       <Grid  md={4} xs={4} sm={4}>
          <Card sx={{ border: "none", boxShadow: "none", display: 'flex', justifyContent: 'center' }}>
            <Image
                src={j2}
                alt="Picture "
                height={200}
                  width={700}
                // width={500}
              />
          </Card>
       </Grid>
       <Grid  md={4} xs={4} sm={4}>
          <Card sx={{ maxWidth: '100%' }} style={{ border: "none", boxShadow: "none", display: 'flex', justifyContent: 'center' }}>
            <Image
                src={j3}
                alt="Picture "
                height={200}
                  width={700}
                // sx={{width: '100%',height: '100%'}}
              />
          </Card>
       </Grid>
     </Grid>
    </div>
  );
}

export default Promotion;
