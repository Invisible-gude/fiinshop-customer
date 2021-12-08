import { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Navbar from '../src/views/layouts/Navbar'
import Footer from '../src/views/layouts/Footer'
import HomeScreen from '../src/views/pages/home/index'

export default function MainLayout() {

  return (
    <div style={{backgroundColor:'#F5F5F5'}}>
      <Container >
          <Navbar />
          <HomeScreen />
          <hr style={{color:"rgb(238,77,45)"}}/>
          <Footer />
      </Container >
    </div>
  )
}
