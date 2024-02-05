// Pop-up Modal
import { X } from 'lucide-react';
import { useRef } from 'react';
import { BigGreenButtons, BigYellowButtons } from './Buttons';

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
                <h1 className='text-3xl font-extrabold font-logo'>Naytiv</h1>
                <div className=' flex flex-col gap-2'>
                    <BigGreenButtons text="Log In" />
                    <BigYellowButtons text="Sign Up" />
                </div>
                <div className=' flex flex-col items-center justify-center gap-1 text-base'>
                    <a className=' hover:text-green font-semibold' href="">Explore as guest</a>
                    <a className=' hover:text-green font-semibold' href="/auth/restuarant/sign_up">Add your Restaurant</a>
                    <a className=' hover:text-green font-semibold' href="/auth/restuarant/login">Login to your restaurant</a>
                    <a className=' hover:text-green font-semibold' href="/auth/rider/sign_up">Become a Rider</a>
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default MenuBar;