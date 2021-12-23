import { Fragment, useEffect, useState } from 'react';
import '../styles/globals.css'
import App from 'next/app'
import { Provider, useDispatch } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import store from '../store/store'
import '../scss/main.scss'
import '../scss/product.scss'
import '../scss/profile.scss'
import '../scss/home.scss'
import { RouteGuard } from '../components/RouteGuard'
import MainLayout from '../components/MainLayout'
import Router, { useRouter } from "next/router"
import { APIgetCart } from '../services/api'
import { countCart } from '../store/actions/countAction';


import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  console.log(`pathname`, router.pathname)
  const crypto = require("crypto");
  const key_token = crypto.randomBytes(60).toString('hex');
  const dispatch = useDispatch()
  const _ = require('lodash');
  useEffect(() => {
    const key = localStorage.getItem('_key');
    if(!key){
      localStorage.setItem('_key',key_token)
    }
    APIgetCart().then(resp => {
        // console.log('resp',resp.data.carts);
        if(resp && resp.data && resp.data.carts){
          let list = []
          let p_qty = resp.data.carts.map(item => item.products.map(dt=> list.push(dt.id)))
          dispatch(countCart(list.length))
        }
    })
    
  }, [])


  return <Provider store={store} >
    <RouteGuard>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout> 
    </RouteGuard >
  </Provider>
}

const makestore = () => store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)
