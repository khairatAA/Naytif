import { Search } from 'lucide-react';
import React, { useState, useEffect } from "react";
import api from '../api';
import Swal from 'sweetalert2';

function RestaurantTop() {
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const restaurant_id = localStorage.getItem("restaurant_id");

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await api.get(`/restaurants/${restaurant_id}`);
        const { profile_image_url, phone_number } = response.data.restaurant;
        setProfileImageUrl(profile_image_url);
        setPhoneNumber(phone_number);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurantDetails();
  }, [restaurant_id]);

  const handleProfileUpdate = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Update Profile',
      html: `
        <input id="profileImageUrl" class="swal2-input" placeholder="Profile Image URL" value="${profileImageUrl || ''}" />
        <input id="phoneNumber" class="swal2-input" placeholder="Phone Number" value="${phoneNumber || ''}" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const profileImageUrl = document.getElementById('profileImageUrl').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        return { profileImageUrl, phoneNumber };
      }
    });

    if (formValues) {
      const { profileImageUrl, phoneNumber } = formValues;
      if (!profileImageUrl.trim() || !phoneNumber.trim()) {
        Swal.fire({
          title: 'Error',
          text: 'Please fill up the entire form.',
          icon: 'error'
        });
        return;
      }

      try {
        await api.patch(`/restaurants/${restaurant_id}`, formValues);
        setProfileImageUrl(profileImageUrl);
        setPhoneNumber(phoneNumber);
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully.',
          icon: 'success'
        });
      } catch (error) {
        console.error('Error updating profile:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update profile.',
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
        className='h-12 w-12 rounded-full bg-yellow cursor-pointer'
        onClick={handleProfileUpdate}
      >
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="Profile" className="h-full w-full rounded-full" />
        ) : (
          <div className="h-full w-full rounded-full bg-yellow"></div>
        )}
      </button>
    </div>
  );
}

export default RestaurantTop;
