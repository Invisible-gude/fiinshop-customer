import {useState, useEffect} from 'react';
import Router, { useRouter } from "next/router"
export default function NavbarLogin() {
  const router = useRouter()

  return (
  <div className="position-initial nav-head-login">
    <div className="nav-head-margin-login">
        <div className="d-flex align-items-center">
              <span style={{color:"#1976D2", fontSize:'30px', fontWeight:'bold', marginRight: '3rem'}}>FIIN SHOP {router.pathname === '/login' ?
                  <label style={{color:"#000", fontSize:'25px', fontWeight:'bold', marginRight: '3rem'}}>เข้าสู่ระบบ</label>
                    :
                  <label style={{color:"#000", fontSize:'25px', fontWeight:'bold', marginRight: '3rem'}}> สมัครสมาชิก</label>
                }</span>
        </div>
    </div>
  </div>
  );
}
