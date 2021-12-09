import { Fragment, useEffect, useState } from 'react';
import { Layout } from 'antd';
import Navbar from '../../src/views/layouts/Navbar'
import FooterScreen from '../../src/views/layouts/Footer'
import  SearchScreen  from '../../src/views/pages/SearchScreen';
import { useRouter } from 'next/router'

const { Header, Footer, Sider, Content } = Layout;

export default function Search() {
    const router = useRouter()
    const { slug } = router.query

     return(
        <Layout>
            <Header>
                <Navbar search={slug}/>
            </Header>
            <Content>
            <SearchScreen />
            <hr style={{color:"rgb(238,77,45)"}}/>
            </Content>
            <Footer>
                <FooterScreen />
            </Footer>
        </Layout>   
    );
}