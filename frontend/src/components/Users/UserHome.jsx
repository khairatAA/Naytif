import React from 'react';
import api from "../api";
import { useState, useEffect } from "react";
import UserTop from "./UserTop";
import naytiv from "../../assets/naytiv.svg";
import { MapPinIcon } from "lucide-react";
import scotter from '../../assets/scotter.svg';
import Restaurant1 from '../../assets/Restaurant1.svg';
import { Link } from "react-router-dom";

function UserHome() {

  const [users, setUsers] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const [restaurants, setRestaurants] = useState([]);
  //const restaurant_id = localStorage.getItem("restaurant_id");

  console.log(localStorage);

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await api.get(`/users/${user_id}`);
              // Assuming response.data contains the array of menu items
              const fetchedUsers = response.data.user;
              console.log(fetchedUsers);
              
              setUsers(fetchedUsers);
          } catch (error) {
              console.error('Error fetching user details:', error);
          }
      };

      fetchUsers(); // Don't forget to invoke the function
  }, []);

  useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await api.get(`/restaurants/all`);
                // Assuming response.data contains the array of menu items
                const fetchedRestaurants = response.data.restaurants;
                console.log(fetchedRestaurants);
                
                setRestaurants(fetchedRestaurants);
                // window.location.reload();
            } catch (error) {
                console.error('Error fetching restaurants details:', error);
            }
        };

        fetchRestaurants(); // Don't forget to invoke the function
    }, []);

    // Sort menu items based on createdAt timestamp in descending order
  const sortedRestaurants = restaurants.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Function to check if URL is valid
  const isValidUrl = (url) => {
    if (!url) return false; // If URL is empty, return false
    const pattern = /^((http|https):\/\/)/; // Regular expression to check if URL starts with http:// or https://
    return pattern.test(url);
  };

  // Function to save restaurant ID to localStorage
  const handleRestaurantClick = (restaurantId) => {
    localStorage.setItem("restaurant_id", restaurantId);
  };

  return (
    <div className="flex flex-col bg-yellow w-full gap-14 py-2  px-10 pb-10 justify-start h-full min-h-screen">
        <UserTop />
        <div className='w-full flex flex-col justify-between items-center gap-20'>
            <div className="max-w-5xl h-80 bg-light-yellow flex flex-row max-md:flex-col max-md:h-fit p-5 rounded-2xl border border-green items-center justify-between">
                <div className="flex flex-col gap-3 items-start">
                    <div className="flex flex-col gap-5">
                        <h1 className='font-medium text-2xl'>Hello {users.first_name} !</h1>
                        <div className="flex flex-row">
                            <h1 className="font-extrabold text-2xl">Order with </h1>
                            <img src={naytiv} alt="" className="h-20 relative -top-12 -right-1 " />
                        </div>
                    </div>
                    <h3 className="text-base">We provide super fast delivery</h3>
                    <div className="flex flex-row">
                        <div className='flex bg-white gap-5 items-center rounded-l-lg px-3'>
                            <MapPinIcon color="grey" />
                            <input
                            type="search"
                            name="search-delivery"
                            id="search-delivery"
                            placeholder='Enter delivery address'
                            className="block flex-1 rounded w-full bg-white py-3 pl-1 placeholder:text-[grey] focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green"
                            />
                        </div>
                        <div>
                            <button className="bg-green rounded-r-lg py-3 px-6 hover:bg-black text-white font-medium">
                                Find
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={scotter} alt="Delivery man" className="min-h-60 max-h-72"/>
                </div>
            </div>

            <div className="self-start flex flex-col gap-10">
                <h2 className="text-start font-extrabold text-3xl">Popular Restaurants</h2>
                <div className="flex flex-row gap-10 flex-wrap max-md:justify-center">
                    {
                        sortedRestaurants.map((restaurant, index) => (
                            <div key={restaurant.id} className="flex flex-col gap-5 cursor-pointer">
                                <Link to={`/users/${restaurant.id}/available_menu`} onClick={() => handleRestaurantClick(restaurant.id)}>
                                    <div className="rounded-xl">
                                        {restaurant.image_url && isValidUrl(restaurant.image_url) ? (
                                            <img
                                                src={restaurant.image_url}
                                                alt="Restaurant image"
                                                className="w-56 h-44 rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-110"
                                            />
                                        ) : (
                                            <img
                                                src={Restaurant1}
                                                alt="Default restaurant image"
                                                className="w-56 h-44 rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-110"
                                            />
                                        )}
                                    </div>
                                </Link>
                                <p className="text-lg font-bold">{restaurant.brand_name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default UserHome;
