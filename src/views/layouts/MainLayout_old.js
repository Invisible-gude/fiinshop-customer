import { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import HomeScreen from '../pages/home/index'
import { useRouter } from "next/router"

export default function MainLayout() {

  return (
    <div>
      {/* <Container style={{backgroundColor:'#F5F5F5'}}>
          <Navbar />
          <HomeScreen />
          <hr style={{color:"rgb(238,77,45)"}}/>
          <Footer />
      </Container > */}
    </div>
  )
}
