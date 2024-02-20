// Pop-up Modal
import { AccessibilityIcon, Edit2Icon, LogOut, MapPinIcon, Trash2Icon, X } from 'lucide-react';
import { useRef } from 'react';
import { BigGreenButtons, BigYellowButtons } from '../Buttons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UserMenuBar({onClose}) {
    const UserMenubarRef = useRef();
    const navigate = useNavigate();

    const closeUserMenubar = (e) => {
        if(UserMenubarRef.current === e.target) {
            onClose();
        }
    }
    // bg-opacity-80

    const handleLogout = async () => {
        try {
            // Call your API to delete the item
            await api.delete(`/users/logout`);
            console.log("revoked jwt")
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        // Clear session data
        localStorage.clear(); // Example: Clear token from local storage

        // Redirect the user to the login page or any other page
        navigate("/")

        console.log('User logged out');
    };

    return (
      <div ref={UserMenubarRef} onClick={closeUserMenubar} className=" fixed inset-0 bg-white backdrop-blur-xl bg-opacity-80 flex items-stretch justify-center py-6 z-10 w-72 max-md:w-72 h-screen">
        <div className=' mt-8 flex flex-col gap-5'>
            <button onClick={onClose} className=' absolute top-3 right-5'><X size={40} color='black'/></button>
            <div className=' px-8 py-8 flex flex-col gap-16 items-center'>
                <h1 className='text-5xl font-extrabold font-logo text-black'>Naytiv</h1>
                <div className=' flex flex-col gap-5 justify-between items-center'>
                    <Link to='' className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                        <Edit2Icon color='black' />
                        <h2 className="text-black font-bold text-xl">Update Profile</h2>
                    </Link>
                    <Link to='' className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                        <MapPinIcon color='black' />
                        <h2 className="text-black font-bold text-xl">Update Delivery</h2>
                    </Link>
                    <div className=' flex flex-col gap-5 self-end'>
                        <Link to='' className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                            <Trash2Icon color='black' />
                            <h2 className="text-black font-bold text-xl">Delete Account</h2>
                        </Link>
                        <div onClick={handleLogout} className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                            <LogOut color='black' />
                            <h2 className="text-black font-bold text-xl">Log Out</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default UserMenuBar;