import { MenuIcon, Search, User } from 'lucide-react';
import React, { useState, useEffect } from "react";
import api from '../api';
import Swal from 'sweetalert2';
import UserMenuBar from './UserMenuBar';

function UserTop() {
    const [showUserMenuBar, setShowUserMenubar] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    // Fetch profile image URL from local storage on component mount
    const storedProfileImageUrl = localStorage.getItem('profileImageUrl');
    if (storedProfileImageUrl) {
      setProfileImageUrl(storedProfileImageUrl);
    }
    // else {
    //   fetchRestaurantDetails(); // Fetch from API if not available in local storage
    // }
  }, [user_id]); // Trigger useEffect whenever restaurant_id changes

  // Function to fetch restaurant details
//   const fetchRestaurantDetails = async () => {
//     try {
//       const response = await api.get(`/restaurants/${restaurant_id}`);
//       const { image_url } = response.data.restaurant;
//       setProfileImageUrl(image_url);
//     } catch (error) {
//       console.error('Error fetching restaurant details:', error);
//     }
//   };

  // Function to handle profile image update
  const handleProfileUpdate = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Update Profile',
      input: 'url',
      inputValue: profileImageUrl || '',
      inputPlaceholder: 'Enter Profile Image URL',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: (url) => {
        if (!url.trim()) {
          Swal.showValidationMessage('Please enter a valid URL');
        }
        return url;
      }
    });

    if (formValues) {
      try {
        await api.patch(`/users/${user_id}`, { image_url: formValues });
        setProfileImageUrl(formValues);
        localStorage.setItem('profileImageUrl', formValues); // Update local storage
        Swal.fire({
          title: 'Success!',
          text: 'Profile image updated successfully.',
          icon: 'success'
        });
      } catch (error) {
        console.error('Error updating profile image:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update profile image.',
          icon: 'error'
        });
      }
    }
  };

  return (
    <div className='flex flex-row bg-yellow justify-between gap-5 items-center px-5 py-2'>
        <div className=' flex gap-5'>
            <button type="button" onClick={() => setShowUserMenubar(true)}>
                <MenuIcon size={32} />
            </button>
            <div className="font-logo text-green text-4xl leading-7 font-bold">Naytif</div>
        </div>
      <div className='flex bg-white gap-5 items-center rounded-lg px-3 max-md:hidden'>
        <Search color='black' />
        <input
          type="search"
          name="search"
          id="search"
          placeholder='Search'
          className="block flex-1 rounded w-full bg-white py-2 pl-1 placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green"
        />
      </div>
      <button
        className='h-14 w-14 rounded-full bg-white cursor-pointer flex justify-center items-center'
        onClick={handleProfileUpdate}
      >
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="Profile" className="h-14 w-14 rounded-full" />
        ) : (
            <User color='black' width={14} height={14} />
        )}
      </button>
      {showUserMenuBar && <UserMenuBar onClose={() => setShowUserMenubar(false)} />}
    </div>
  );
}

export default UserTop;
