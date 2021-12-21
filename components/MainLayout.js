import { Fragment } from 'react'
import Navbar from './Navbar'
import NavLogin from './NavLogin'
import NavCart from './NavCart'
import FooterScreen from './Footer'
import Head from 'next/head'
import Router, { useRouter } from "next/router"

function MainLayout({ children, title }) {
    const router = useRouter()

    return (
        <div className="main-layout">
            {   router.pathname !== '/login' && router.pathname !== '/register' && router.pathname !== '/cart' && router.pathname !== '/checkout' ?
                    <Navbar />
                : router.pathname === '/cart' ?
                <NavCart />
                : router.pathname === '/checkout' ?
                <NavCart />
                : 
                <NavLogin />
            }
            <div className="main-content" >
                {children}
                
                <div className="mobile-none">
                <hr/>
                    <FooterScreen />

                </div>
            </div>
        </div>
    )
}

export default MainLayout
