import { useEffect } from 'react';
import { Layout } from 'antd';
import Navbar from '../src/views/layouts/Navbar'
import FooterScreen from '../src/views/layouts/Footer'
import HomeScreen from '../src/views/pages/home/index'
import  Grid  from '@material-ui/core/Grid';
import  Box  from '@material-ui/core/Box';
import { Container } from 'reactstrap';


const { Header, Footer, Sider, Content } = Layout;

export default function Home() {

  return (
      <>
        <HomeScreen />
      </>
  )
}


