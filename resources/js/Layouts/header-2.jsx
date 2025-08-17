import useSticky from '@/hooks/use-sticky';
import { Link } from '@inertiajs/react';
import React,{useState} from 'react';
const Image = (props) => <img {...props} />;
import NavMenu from './nav-menu';

const white_logo = "/images/placeholder.svg"
const black_logo = "/images/placeholder.svg" 

const hero_content = {
    login_btn: "Login",
    sign_up_btn: "Sign Up",
}
const {login_btn, sign_up_btn}  = hero_content

const HeaderTwo = () => {

  const  {sticky} =  useSticky()
 const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <header className="tp-header-height">
               <div id="header-sticky" className={`tp-header-2__area tp-header-2__plr z-index-3 ${sticky ? 'header-sticky' : ''}`} style={{backgroundColor:'#0b1020'}}>
                  <div className="container-fluid g-0">
                     <div className="row g-0 align-items-center">
                        <div className="col-xl-2 col-lg-2 col-md-6 col-6">
                           <div className="tp-header-2__logo">
                              <Link className="white-logo" href="/"><Image src={white_logo} alt="theme-pure" /></Link>
                              <Link className="black-logo" href="/"><Image src={black_logo} alt="theme-pure" /></Link>
                           </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 d-none d-lg-block">
                           <div className="tp-header-2__main-menu text-center">
                              <nav id="mobile-menu">
                                 <NavMenu /> 
                              </nav>
                           </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-6">
                           <div className="tp-header-2__right d-flex align-items-center justify-content-end">
                              <Link className="tp-header-2__login d-none d-md-block" href="/register">{login_btn}</Link>
                              <Link className="tp-btn-green-sm d-none d-md-block" href="/sign-in">{sign_up_btn}</Link>
                              <button className="header-bottom__bar tp-menu-bar d-lg-none" 
                              onClick={() => setSidebarOpen(true)}
                              ><i className="fal fa-bars"></i></button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </header>
            {/* Offcanvas removed in this integration */}
        </>
    );
};

export default HeaderTwo;