import { Fragment, useEffect, useState } from 'react';
import  Navbar  from '../src/views/layouts/Navbar';
import  FooterScreen  from '../src/views/layouts/Footer';
import ProfileScreen from '../src/views/pages/ProfileScreen'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default function Shop() {

     return(
        <Layout>
        <Header>
            <Navbar />
        </Header>
        <Content>
          <ProfileScreen />
          <hr style={{color:"rgb(238,77,45)"}}/>
        </Content>
        <Footer>
            <FooterScreen />
        </Footer>
    </Layout>    
    );
}