import { useEffect } from 'react';
import { Layout } from 'antd';
import Navbar from '../src/views/layouts/Navbar'
import FooterScreen from '../src/views/layouts/Footer'
import HomeScreen from '../src/views/pages/home/index'


const { Header, Footer, Sider, Content } = Layout;

export default function Home() {

  return (
    <Layout>
        <Header>
            <Navbar />
        </Header>
        <Content>
          <HomeScreen />
          <hr style={{color:"rgb(238,77,45)"}}/>
        </Content>
        <Footer>
            <FooterScreen />
        </Footer>
    </Layout>
  )
}

