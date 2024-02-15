// This file displays the home page of the restuarant route
import api from "../api";
import { useState, useEffect } from "react";
import UserTop from "./UserTop";
import { useParams } from "react-router-dom";
import MenuItemImg from "../../assets/MenuItemImg.svg"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";

function UserMenuPage() {

  const [users, setUsers] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const [menuItems, setMenuItems] = useState([]);
  const { restaurant_id } = useParams();
  const [selectedOption, setSelectedOption] = useState('All');
  const [cart, setCart] = useState({});

  console.log(localStorage);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

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
    fetchMenuItems(); // Fetch menu items when component mounts
  }, [restaurant_id]);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get(`/restaurants/${restaurant_id}/menu`);
      const fetchedMenuItems = response.data.menu;
      setMenuItems(fetchedMenuItems);
      // Store menu items in localStorage
      localStorage.setItem('menuItems', JSON.stringify(fetchedMenuItems));
      console.log(localStorage);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  // Sort menu items based on createdAt timestamp in descending order
  const sortedMenuItems = menuItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Function to check if URL is valid
  const isValidUrl = (url) => {
    if (!url) return false; // If URL is empty, return false
    const pattern = /^((http|https):\/\/)/; // Regular expression to check if URL starts with http:// or https://
    return pattern.test(url);
  };

  const addToCart = (menuItem) => {
    const updatedCart = { ...cart };
    updatedCart[menuItem.id] = (updatedCart[menuItem.id] || 0) + 1;
    setCart(updatedCart);
  };

  const removeFromCart = (menuItem) => {
    const updatedCart = { ...cart };
    if (updatedCart[menuItem.id] && updatedCart[menuItem.id] > 0) {
      updatedCart[menuItem.id]--;
      if (updatedCart[menuItem.id] === 0) {
        delete updatedCart[menuItem.id];
      }
      setCart(updatedCart);
    }
  };

  const getTotalPrice = (menuItem) => {
    if (!menuItem || typeof menuItem !== 'object' || !menuItem.id) {
        return 0; // Return 0 if menuItem is undefined or does not have an id property
    }
    return (cart[menuItem.id] || 0) * menuItem.price;
    };


  return (
    <div className="flex flex-col bg-yellow w-full gap-14 py-2  px-10 pb-10 justify-center min-h-screen">
        <UserTop />

        <div className=' self-center w-full max-w-lg flex flex-col gap-20 justify-center'>
            <div className="flex rounded bg-white hover:border py-2 px-1 hover:border-green">
                <div
                className={`cursor-pointer ${selectedOption === 'All' ? ' bg-green text-white  p-1 rounded w-full text-center' : 'p-1 rounded w-full text-center'}`}
                onClick={() => handleOptionClick('All')}
                >
                    All
                </div>

                <div
                    className={`cursor-pointer ${selectedOption === 'Food' ? ' bg-green text-white  p-1 rounded w-full text-center' : 'p-1 rounded w-full text-center'}`}
                    onClick={() => handleOptionClick('Food')}
                    >
                        Food
                </div>

                <div
                className={`cursor-pointer ${selectedOption === 'Drinks' ? ' bg-green text-white p-1 rounded w-full text-center' : 'p-1 rounded w-full text-center'}`}
                onClick={() => handleOptionClick('Drinks')}
                >
                    Drinks
                </div>
            </div>
        </div>

        <div className=" self-start flex flex-row max-md:flex-col justify-between items-start w-full gap-8 ">
            <div className=" flex flex-col gap-5 w-9/12">
                {sortedMenuItems.map((menuItem, index) => (
                    <div key={index} className=" p-5 bg-[rgba(255,255,255,15%)] border border-green rounded-xl w-full cursor-pointer">
                        <div className=" flex flex-row gap-5">
                            <div className="rounded-xl">
                                {menuItem.image_url && isValidUrl(menuItem.image_url) ? (
                                    <img
                                        src={menuItem.image_url}
                                        alt="Menu Item image"
                                        className=" w-28 h-20 rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                ) : (
                                    <img
                                        src={MenuItemImg}
                                        alt="Default restaurant image"
                                        className=" rounded-xl w-28 h-auto transform transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                )}
                            </div>
                            <div className=" flex flex-col gap-3">
                                <h2 className=" font-bold text-xl">{menuItem.name}</h2>
                                <p className=" text-base">{menuItem.description}</p>
                            </div>
                        </div>
                        <div className=" flex flex-row justify-between items-center">
                            <div>
                                {/* <p>Price: #{getTotalPrice(menuItem)}</p> */}
                                <p className=" text-base">Price: #{menuItem.price}</p>
                            </div>
                            <div className=" flex flex-row items-center">
                                <button
                                className=" rounded-full text-green bg-light-green h-8 w-8 font-extrabold active:border-2 active:border-green text-center"
                                onClick={() => addToCart(menuItem)}
                                >
                                    {/* <PlusCircleIcon size={32} /> */}
                                    +
                                </button>
                                <span className="mx-3">{cart[menuItem.id] || 0}</span>
                                <button
                                className="bg-[rgba(255,0,0,30%)] text-red rounded-full h-8 w-8 font-extrabold active:border-2 active:border-red text-center"
                                onClick={() => removeFromCart(menuItem)}
                                >
                                    {/* <MinusCircleIcon size={32} /> */}
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className=" bg-white w-2/5 rounded-t-2xl flex flex-col gap-3">
                <div className=" p-10 text-green font-bold text-2xl text-center rounded-t-2xl filter blur-25 drop-shadow-y-4 drop-shadow-black-opacity-25">
                    <p>{users.first_name}'s Order</p>
                </div>
                <div>
                {Object.keys(cart).map((itemId) => (
                <div key={itemId} className="flex justify-between items-center px-5 py-3">
                    {/* <span>{menuItems.find((item) => item.id === parseInt(itemId)).name}</span> */}
                    {menuItems.find((item) => item.id === parseInt(itemId)) && (
                        <span>{menuItems.find((item) => item.id === parseInt(itemId)).name}</span>
                    )}
                    <span>Qty: {cart[itemId]}</span>
                    <span>Price: #{getTotalPrice(menuItems.find((item) => item.id === parseInt(itemId)))}</span>
                </div>
                ))}
            </div>
            </div>
        </div>
    </div>
  )
}

export default UserMenuPage;
