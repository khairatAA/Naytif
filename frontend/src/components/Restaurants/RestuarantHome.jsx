// This file displays the home page of the restuarant route
import RestuarantSideBar from "./RestuarantSideBar"
import api from "../api";
import RestaurantTop from './RestaurantTop';
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

function RestuarantHome() {

  const [restaurants, setRestaurants] = useState([]);
  const restaurant_id = localStorage.getItem("restaurant_id");
  const [restaurantOrders, setRestaurantOrders] = useState([]);

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

  useEffect(() => {
    const fetchRestaurantOrders = async () => {
      try {
        // Fetch orders specific to the restaurant
        const response = await api.get(`/restaurants/${restaurant_id}/orders`);
        const orders = response.data.orders;
        console.log(orders);
        setRestaurantOrders(orders);
      } catch (error) {
        console.error('Error fetching restaurant orders:', error);
      }
    };

    fetchRestaurantOrders(); // Fetch orders when component mounts
    // You can also establish a real-time connection here to receive new order notifications
  }, [restaurant_id]);


  return (
    <div className="flex flex-row bg-powder-blue w-full h-screen">
        <RestuarantSideBar />
        <div className=" ml-72 max-md:ml-16 px-5 bg-powder-blue w-full py-5 flex flex-col gap-8 ">
            <RestaurantTop />
            <h1 className=' font-extrabold text-3xl'>Welcome {restaurants.brand_name} !</h1>
            <div className=" flex flex-col gap-3">
              <h2 className=" font-bold text-xl">ORDER LIST</h2>
              <div>
                {/* {restaurantOrders.map((order, index) => ( */}
                  <div className=" flex flex-row p-3 items-center justify-between rounded-lg border border-green w-28">
                    <p className=" text-green">#001</p>
                    <Check className=" text-green" />
                  </div>
                {/* ))} */}
              </div>
            </div>

            <div className=' flex flex-col flex-wrap gap-5'>
              {/* {restaurantOrders.map((order, index) => ( */}
                <div className=" bg-[#E5F4FC] rounded-xl p-5 flex flex-col gap-5 w-80">

                  <div className=" flex flex-row justify-between items-center" >
                    <div className=" flex flex-col justify-start">
                      <p className=" font-bold text-lg">Order #001</p>
                      <p className=" font-normal text-base text-[rgba(0,0,0,45%)]">01 Jan 2024, 08:78pm</p>
                    </div>

                    <div className='h-12 w-12 rounded-full self-end bg-yellow cursor-pointer flex justify-center items-center'>
                      <img src='' alt="User's profile" className="h-12 w-12 rounded-full" />
                    </div>
                  </div>

                  <div>
                    
                  </div>

                  <div className=" flex flex-row p-2 items-center justify-between self-center rounded-sm border border-green w-40">
                    <Check className=" text-green" />
                    <p>COMPLETED</p>
                  </div>

                </div>
              {/* ))} */}
            </div>     
        </div>
    </div>
  )
}

export default RestuarantHome
