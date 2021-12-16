import { useEffect } from 'react';
import { Layout } from 'antd';
// import Navbar from '../src/views/layouts/Navbar'
// import Footer from '../src/views/layouts/Footer'

const { Header, Footer, Sider, Content } = Layout;

export default function MainLayout({children}) {

  return (
    <Layout>
        {/* <Header>
            <Navbar />
        </Header>
        <Content>
            {children}
        </Content>
        <Footer>
            <Footer />
        </Footer> */}
    </Layout>
  )
}
