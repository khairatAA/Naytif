// Pop-up Modal
import React from 'react';
import { X } from 'lucide-react';
import { useRef } from 'react';
import { BigGreenButtons, BigYellowButtons } from '../Buttons';
import { Link } from 'react-router-dom';
import naytifDefault from '../../assets/naytifDefault.png';

function MenuBar({onClose}) {
    const menubarRef = useRef();

    const closeMenubar = (e) => {
        if(menubarRef.current === e.target) {
            onClose();
        }
    }
    // bg-opacity-80

    return (
      <div ref={menubarRef} onClick={closeMenubar} className=" fixed inset-0 bg-white backdrop-blur-2xl flex items-stretch justify-center py-6 z-10 w-80 max-md:w-72 h-screen">
        <div className=' mt-8 flex flex-col gap-5'>
            <button onClick={onClose} className=' absolute top-3 right-5'><X size={40}/></button>
            <div className=' px-8 py-8 flex flex-col gap-7 items-center'>
                <h1 className='text-3xl font-extrabold font-logo'>
                <img src={naytifDefault} className="h-10 w-15 fill-slate-300" alt="Naytif" />
                </h1>
                <div className=' flex flex-col gap-2'>
                    <Link to='/auth/login'>
                        <BigGreenButtons text="Log In" />
                    </Link>
                    <Link to='/auth/sign_up_1'>
                        <BigYellowButtons text="Sign Up" />
                    </Link>
                </div>
                <div className=' flex flex-col items-center justify-center gap-1 text-base'>
                    <Link to='/users/home' className=' hover:text-green font-semibold' >Explore as guest</Link>
                    <Link to='/auth/restuarants/sign_up' className=' hover:text-green font-semibold'>Add your Restaurant</Link>
                    <Link to='/auth/restuarants/login' className=' hover:text-green font-semibold'>Login to your restaurant</Link>
                    <Link to='/auth/rider/sign_up' className=' hover:text-green font-semibold'>Become a Rider</Link>
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default MenuBar;