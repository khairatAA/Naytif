// Pop-up Modal
import { Edit2Icon, LogOut, Trash2Icon, X } from 'lucide-react';
import { useRef } from 'react';
import { BigGreenButtons, BigYellowButtons } from '../Buttons';
import { Link } from 'react-router-dom';

function UserMenuBar({onClose}) {
    const UserMenubarRef = useRef();

    const closeUserMenubar = (e) => {
        if(UserMenubarRef.current === e.target) {
            onClose();
        }
    }
    // bg-opacity-80

    return (
      <div ref={UserMenubarRef} onClick={closeUserMenubar} className=" fixed inset-0 bg-green backdrop-blur-2xl flex items-stretch justify-center py-6 z-10 w-72 max-md:w-72 h-screen">
        <div className=' mt-8 flex flex-col gap-5'>
            <button onClick={onClose} className=' absolute top-3 right-5'><X size={40} color='white'/></button>
            <div className=' px-8 py-8 flex flex-col gap-7 items-center'>
                <h1 className='text-5xl font-extrabold font-logo text-yellow'>Naytiv</h1>
                <div className=' flex flex-col justify-between items-center'>
                    <Link to='' className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                        <Edit2Icon color='white' />
                        <h2 className="text-white font-bold text-xl">Update profile</h2>
                    </Link>
                    <div className=' flex flex-col self-end'>
                        <Link to='' className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                            <Trash2Icon color='white' />
                            <h2 className="text-white font-bold text-xl">Delete account</h2>
                        </Link>
                        <Link to='' className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                            <LogOut color='white' />
                            <h2 className="text-white font-bold text-xl">Log out</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default UserMenuBar;