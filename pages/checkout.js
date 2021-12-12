import { useEffect } from 'react';
import { Layout } from 'antd';
import Navbar from '../src/views/layouts/Navbar'
import FooterScreen from '../src/views/layouts/Footer'
import CheckoutScreen from '../src/views/pages/CheckoutScreen'


const { Header, Footer, Sider, Content } = Layout;

export default function Checkout() {

  return (
    <>
      <CheckoutScreen />
    </>
  )
}

