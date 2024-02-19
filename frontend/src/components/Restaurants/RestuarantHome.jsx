// This file displays the home page of the restuarant route
import RestuarantSideBar from "./RestuarantSideBar"
import api from "../api";
import RestaurantTop from './RestaurantTop';
import { useState, useEffect } from "react";

function RestuarantHome() {

  const [restaurants, setRestaurants] = useState([]);
  const restaurant_id = localStorage.getItem("restaurant_id");

  useEffect(() => {
      const fetchRestaurants = async () => {
          try {
              const response = await api.get(`/restaurants/${restaurant_id}`);
              // Assuming response.data contains the array of menu items
              const fetchedRestaurants = response.data.restaurant;
              console.log(fetchedRestaurants);
              
              setRestaurants(fetchedRestaurants);
          } catch (error) {
              console.error('Error fetching restaurant details:', error);
          }
      };

      fetchRestaurants(); // Don't forget to invoke the function
  }, []);

  return (
    <div className="flex flex-row bg-powder-blue w-full h-screen">
        <RestuarantSideBar />
        <div className=" ml-72 max-md:ml-16 px-5 bg-powder-blue w-full py-5 flex flex-col gap-14 ">
            <RestaurantTop />
            <h1 className=' font-extrabold text-3xl'>Welcome {restaurants.brand_name} !</h1>
            <div className=' '>
            
            </div>     
        </div>
    </div>
  )
}

export default RestuarantHome
