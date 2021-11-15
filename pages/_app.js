import '../styles/globals.css'
import App from 'next/app'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import store from '../store/store'
import '../scss/main.scss'
import { RouteGuard } from '../components/RouteGuard'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return <Provider store={store} >
    <RouteGuard>
      <Component {...pageProps} />
    </RouteGuard >
  </Provider>
}

const makestore = () => store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)
