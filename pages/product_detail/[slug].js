import { useEffect } from 'react';
import { Layout } from 'antd';
import ProductDetailScreen from '../../src/views/pages/product/index'
import Navbar from '../../src/views/layouts/Navbar'
import FooterScreen from '../../src/views/layouts/Footer'

const { Header, Footer, Sider, Content } = Layout;

export default function MainLayout() {

  return (
    <>
      <ProductDetailScreen />
    </>
    // <Layout>
    //     <Header>
    //         <Navbar />
    //     </Header>
    //     <Content>
    //       <ProductDetailScreen />
    //       <hr style={{color:"rgb(238,77,45)"}}/>
    //     </Content>
    //     <Footer>
    //         <FooterScreen />
    //     </Footer>
    // </Layout>
  )
}
