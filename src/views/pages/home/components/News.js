import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'Goč, Serbia',
    imgPath:'https://picsum.photos/id/456/1200/450',
  },
];
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

const useStyles = makeStyles((theme) => ({

  logo: {
    width: '100%',
    height: '100%'
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },

  
}));
function News() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

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
    <div style={{marginTop: '11rem', alignItems:'center', justifyItems:'center'}}>
     <Grid container >
       <Grid md={8} xs={12} sm={12}  sx={{ display: { xs: 'none', sm: 'none',md:'flex' }}}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {datas.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.src}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
       </Grid>
       <Grid  md={4} xs={12} sm={12} sx={{ display: { xs: 'none', sm: 'none',md:'flex' }}}>
          <Grid>
            <Grid md={12} xs={12} sm={12} style={{height:'125px'}}>
            <img src='../../images/news/b1.jpg' className={classes.logo}/>
            </Grid>
            <Grid md={12} xs={12} sm={12} style={{height:'125px'}}>
            <img src='../../images/news/b2.jpg' className={classes.logo}/>
            </Grid>
          </Grid>
        
       </Grid>
     </Grid>
    </div>
  );
}

export default News;
