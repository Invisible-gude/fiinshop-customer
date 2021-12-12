import { Fragment } from 'react'
import Navbar from './Navbar'
import NavLogin from './NavLogin'
import FooterScreen from './Footer'
import Head from 'next/head'
import Router, { useRouter } from "next/router"

function MainLayout({ children, title }) {
    const router = useRouter()

    return (
        <div className="main-layout">
                {router.pathname !== '/login' && router.pathname !== '/register' ?
                    <Navbar />
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
        // <div className="main-layout" >
        //     <div style={{backgroundColor:'#3076D2'}}>
        //         <div className="main-container">
        //         <Navbar />
        //         </div>
        //     </div>
        //     <div className="main-container">
        //         <div className="content">
        //             {children}
        //         </div>
        //     </div>
        // </div>
    )
}

export default MainLayout
