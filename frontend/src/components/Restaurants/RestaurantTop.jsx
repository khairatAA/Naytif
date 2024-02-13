import { Search } from 'lucide-react';
import React, { useState, useEffect } from "react";
import api from '../api';
import Swal from 'sweetalert2';

function RestaurantTop() {
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const restaurant_id = localStorage.getItem("restaurant_id");

  useEffect(() => {
    // Fetch profile image URL from local storage on component mount
    const storedProfileImageUrl = localStorage.getItem('profileImageUrl');
    if (storedProfileImageUrl) {
      setProfileImageUrl(storedProfileImageUrl);
    } else {
      fetchRestaurantDetails(); // Fetch from API if not available in local storage
    }
  }, [restaurant_id]); // Trigger useEffect whenever restaurant_id changes

  // Function to fetch restaurant details
  const fetchRestaurantDetails = async () => {
    try {
      const response = await api.get(`/restaurants/${restaurant_id}`);
      const { image_url } = response.data.restaurant;
      setProfileImageUrl(image_url);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

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
        await api.patch(`/restaurants/${restaurant_id}`, { image_url: formValues });
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
    <div className='flex flex-row w-full justify-between gap-5 items-center'>
      <div className='flex bg-light-green gap-5 items-center rounded-lg px-3'>
        <Search color='black' />
        <input
          type="search"
          name="search"
          id="search"
          placeholder='Search'
          className="block flex-1 rounded w-full bg-light-green py-2 pl-1 placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green"
        />
      </div>
      <button
        className='h-16 w-16 rounded-full bg-white cursor-pointer flex justify-center items-center'
        onClick={handleProfileUpdate}
      >
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="Profile" className="h-16 w-16 rounded-full" />
        ) : (
          <div className="h-16 w-16 rounded-full bg-white"></div>
        )}
      </button>
    </div>
  );
}

export default RestaurantTop;
