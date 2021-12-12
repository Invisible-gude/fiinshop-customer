import '../styles/globals.css'
import App from 'next/app'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import store from '../store/store'
import '../scss/main.scss'
import { RouteGuard } from '../components/RouteGuard'
import MainLayout from '../components/MainLayout'
import Router, { useRouter } from "next/router"

import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  console.log(`pathname`, router.pathname)

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
