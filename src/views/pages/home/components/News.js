import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Image from 'next/image';
import b1 from '../../../../../public/images/news/b1.jpg';
import b2 from '../../../../../public/images/news/b2.jpg';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const datas  = [
  {
    label: 'Slide 1',
    key: 1,
    src: '../../images/news/g1.jpg'
  },
  {
    label: 'Slide 2',
    key: 2,
    src: '../../images/news/g2.jpg'
  },
  {
    label: 'Slide 3',
    key: 3,
    src: '../../images/news/g3.jpg'
  }
];


function News() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{marginTop:{ xs: '3rem', sm: '3rem',md:'4rem' }, alignItems:'center', justifyItems:'center'}}>
     <Grid container >
       <Grid md={8} xs={12} sm={12}  sx={{ display: { xs: 'none', sm: 'none',md:'flex' }}}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {datas.map((step, index) => (
            <Box key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 260,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.src}
                  alt={step.label}
                />
              ) : null}
            </Box>
          ))}
        </AutoPlaySwipeableViews>
       </Grid>
       <Grid  md={4} xs={12} sm={12} sx={{ display: { xs: 'none', sm: 'none',md:'flex' }}}>
          <Grid>
            <Grid md={12} xs={12} sm={12} style={{height:'136px'}}>
            <Image
                src={b1}
                alt="Picture of the author"
                sx={{width: '100%', height:'100%'}}
              />
              
            </Grid>
            <Grid md={12} xs={12} sm={12} style={{height:'130px'}}>
            <Image
                src={b2}
                alt="Picture "
                sx={{width: '100%', height:'100%'}}
              />
            </Grid>
          </Grid>
        
       </Grid>
     </Grid>
    </Box>
  );
}

export default News;
