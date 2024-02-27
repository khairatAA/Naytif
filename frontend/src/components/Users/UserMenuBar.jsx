// Pop-up Modal
import React from 'react';
import { AccessibilityIcon, Edit2Icon, HomeIcon, LogOut, MapPinIcon, Trash2Icon, X } from 'lucide-react';
import { useRef } from 'react';
import { BigGreenButtons, BigYellowButtons } from '../Buttons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SwalDelete from '../SwalDelete';
import Swal from 'sweetalert2';
import api from "../api";
import { useState } from 'react';
import naytifDefault from '../../assets/naytifDefault.png';

function UserMenuBar({onClose}) {
    const UserMenubarRef = useRef();
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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

    // Delete User
    const handleDelete = async (userId) => {
        try {
            // Call your API to delete the item
            await api.delete(`/users/${user_id}`);
            console.log('deleted user');
            Swal.fire({
                title: 'Deleted!',
                text: 'Your account has been deleted.',
                icon: 'success',
            });
            navigate("/")
            // window.location.reload();
        } catch (error) {
            console.error('Error deleting user account:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete the account.',
                icon: 'error',
            });
        }
    };

    const handleUpdate = () => {
        api.patch(`/users/${user_id}/delivery_details`, { address, phoneNumber })
            .then(response => {
                Swal.fire('Success', 'Delivery updated successfully', 'success');
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'Failed to update delivery', 'error');
            });
    };

    const handleLinkClick = () => {
        Swal.fire({
            title: 'Update Delivery',
            html:
                `<input id="swal-input1" class="swal2-input" value="${address || ''}" placeholder="Address" required>` +
                `<input id="swal-input2" class="swal2-input" value="${phoneNumber || ''}" placeholder="Phone Number" required>`,
            focusConfirm: false,
            preConfirm: () => {
                setAddress(document.getElementById('swal-input1').value);
                setPhoneNumber(document.getElementById('swal-input2').value);
                handleUpdate();
            }
        });
    };

    return (
      <div ref={UserMenubarRef} onClick={closeUserMenubar} className=" fixed inset-0 bg-white backdrop-blur-xl bg-opacity-80 flex items-stretch justify-center py-6 z-10 w-72 max-md:w-72 h-screen">
        <div className=' mt-8 flex flex-col gap-5'>
            <button onClick={onClose} className=' absolute top-3 right-5'><X size={40} color='black'/></button>
            <div className=' px-8 flex flex-col gap-16 items-center'>
                <Link to='/users/home' className='text-5xl font-extrabold font-logo text-black'>
                <img src={naytifDefault} className="h-12 w-15 fill-slate-300" alt="Naytif" />
                </Link>
                <div className=' flex flex-col gap-5 justify-between'>
                    <Link to='/users/home' className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                        <HomeIcon color='black' />
                        <h2 className="text-black font-bold text-xl">Home</h2>
                    </Link>
                    <Link to='/users/update_profile' className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                        <Edit2Icon color='black' />
                        <h2 className="text-black font-bold text-xl">Update Profile</h2>
                    </Link>
                    <button onClick={handleLinkClick} className={`flex p-3 justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
                        <MapPinIcon color='black' />
                        <h2 className="text-black font-bold text-xl">Update Delivery</h2>
                    </button>
                    <div className=' flex flex-col gap-5 self-end'>
                        <div
                        onClick={SwalDelete({
                            title: `Are you sure you want to delete your account?`,
                            warningText: "This action cannot be undone.",
                            onConfirmDelete: () => handleDelete(user_id),
                            cancel_text: "Account is not deleted",
                          })
                        }
                        className={`flex p-3 justify-start gap-5 items-center rounded-md cursor-pointer hover:bg-yellow`}>
                            <Trash2Icon color='black' />
                            <h2 className="text-black font-bold text-xl">Delete Account</h2>
                        </div>
                        <div onClick={handleLogout} className={`flex p-3 cursor-pointer justify-start gap-5 items-center rounded-md hover:bg-yellow`}>
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