// This file displays the home page of the restuarant route
import api from "../api";
import { useState, useEffect } from "react";
import UserTop from "./UserTop";
import naytiv from "../../assets/naytiv.svg"
import { MapPinIcon } from "lucide-react";
import scotter from '../../assets/scotter.svg'
import Restaurant1 from '../../assets/Restaurant1.svg'

function UserMenuPage() {

  const [users, setUsers] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const [restaurants, setRestaurants] = useState([]);
  const restaurant_id = localStorage.getItem("restaurant_id");

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

  return (
    <div className="flex flex-col bg-yellow w-full gap-14 py-2  px-10 pb-10 justify-center">
        <UserTop />
        <div className=' w-full flex flex-col justify-between items-center gap-20'>
            
            
        </div>
    </div>
  )
}

export default UserMenuPage;
