import { Fragment, useEffect, useState } from 'react';
import { Layout } from 'antd';
import  SearchScreen  from '../../src/views/pages/SearchScreen';
import { useRouter } from 'next/router'

const { Header, Footer, Sider, Content } = Layout;

export default function Search() {
    const router = useRouter()
    const { slug } = router.query

     return(

            <SearchScreen />
 
    );
}