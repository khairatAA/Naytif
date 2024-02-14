// This file displays the home page of the restuarant route
import api from "../api";
import { useState, useEffect } from "react";
import UserTop from "./UserTop";
import naytiv from "../../assets/naytiv.svg"
import { MapPinIcon } from "lucide-react";
import scotter from '../../assets/scotter.svg'

function UserHome() {

  const [users, setUsers] = useState([]);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await api.get(`/users/${user_id}`);
              // Assuming response.data contains the array of menu items
              const fetchedUsers = response.data.usear;
              console.log(fetchedUsers);
              
              setUsers(fetchedUsers);
          } catch (error) {
              console.error('Error fetching user details:', error);
          }
      };

      fetchUsers(); // Don't forget to invoke the function
  }, []);

  return (
    <div className="flex flex-col bg-yellow w-full h-full gap-14 py-2  px-5 pb-10">
        <UserTop />
        <div className=' w-full flex justify-center'>
            <div className=" max-w-5xl h-80 bg-light-yellow flex flex-row max-md:flex-col max-md:h-fit p-5 rounded-2xl border border-green items-center justify-between">
                <div className=" flex flex-col gap-3 items-start">
                    <div className=" flex flex-col gap-5">
                        <h1 className=' font-medium text-2xl'>Hello {users.first_name} !</h1>
                        <div className=" flex flex-row">
                            <h1 className=" font-extrabold text-2xl">Order with </h1>
                            <img src={naytiv} alt="" className=" h-20 relative -top-12 -right-1 " />
                        </div>
                    </div>
                    <h3 className=" text-base">We provide super fast delivery</h3>
                    <div className=" flex flex-row">
                        <div className='flex bg-white gap-5 items-center rounded-l-lg px-3'>
                            <MapPinIcon color="grey" />
                            <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder='Enter delivery address'
                            className="block flex-1 rounded w-full bg-white py-3 pl-1 placeholder:text-[grey] focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green"
                            />
                        </div>
                        <div>
                            <button className=" bg-green rounded-r-lg py-3 px-6 hover:bg-black text-white font-medium">
                                Find
                            </button>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img src={scotter} alt="Delivery man" className=" min-h-60 max-h-72"/>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default UserHome;
