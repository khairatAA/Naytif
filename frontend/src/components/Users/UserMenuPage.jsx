import api from "../api";
import { useState, useEffect } from "react";
import UserTop from "./UserTop";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import MenuItemImg from "../../assets/MenuItemImg.svg";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { GreenButtons } from "../Buttons";

function UserMenuPage() {
  const [users, setUsers] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const [menuItems, setMenuItems] = useState([]);
  const { restaurant_id } = useParams();
  const [selectedOption, setSelectedOption] = useState('All');
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/users/${user_id}`);
        const fetchedUsers = response.data.user;
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (user_id) {
      fetchMenuItems();
    }
  }, [user_id]);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get(`/restaurants/${restaurant_id}/menu`);
      const fetchedMenuItems = response.data.menu;
      console.log('Fetched Menu Items:', fetchedMenuItems);
      setMenuItems(fetchedMenuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };
  

  const addToCart = (menuItem) => {
    if (menuItem && menuItem.id) {
      const updatedCart = { ...cart };
      updatedCart[menuItem.id] = (updatedCart[menuItem.id] || 0) + 1;
      setCart(updatedCart);
    }
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
    if (!menuItem || !menuItem.id) {
      return 0;
    }
    return (cart[menuItem.id] || 0) * menuItem.price;
  };

  const handleProceedToOrderSummary = async () => {
    try {
      // Check if the user has delivery details in the database
      const delivery_details_id = localStorage.getItem("delivery_details_id");
      const response = await api.get(`/users/${user_id}/delivery_details`);
      const deliveryDetails = response.data.delivery_details;
      localStorage.setItem("cart", JSON.stringify(cart));
  
      if (deliveryDetails && deliveryDetails.length > 0) {
        // Store the cart state in local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        // Navigate to the order summary page
        navigate('/users/order_summary');
      } else {
        // Navigate to the delivery details page
        navigate('/users/delivery_details');
      }
    } catch (error) {
      console.error('Error checking delivery details:', error);
      // Handle error, maybe show an error message to the user
    }
  };  

  return (
    <div className="flex flex-col bg-yellow w-full gap-14 py-2 px-10 pb-10 justify-center min-h-screen">
      <UserTop />
      <div className='self-center w-full max-w-lg flex flex-col gap-20 justify-center'>
        <div className="flex rounded bg-white hover:border py-2 px-1 hover:border-green">
          <div
            className={`cursor-pointer ${selectedOption === 'All' ? 'bg-green text-white p-1 rounded w-full text-center' : 'p-1 rounded w-full text-center'}`}
            onClick={() => handleOptionClick('All')}
          >
            All
          </div>
          <div
            className={`cursor-pointer ${selectedOption === 'Food' ? 'bg-green text-white p-1 rounded w-full text-center' : 'p-1 rounded w-full text-center'}`}
            onClick={() => handleOptionClick('Food')}
          >
            Food
          </div>
          <div
            className={`cursor-pointer ${selectedOption === 'Drinks' ? 'bg-green text-white p-1 rounded w-full text-center' : 'p-1 rounded w-full text-center'}`}
            onClick={() => handleOptionClick('Drinks')}
          >
            Drinks
          </div>
        </div>
      </div>
      <div className="self-start flex flex-row max-sm:flex-col-reverse justify-between items-start w-full gap-8">
        <div className="flex flex-col gap-5 w-9/12 max-lg:w-6/12 max-sm:w-full ">
          {menuItems.length > 0 && menuItems.map((menuItem, index) => (
            <div key={index} className="p-5 bg-[rgba(255,255,255,15%)] border border-green rounded-xl w-full cursor-pointer flex flex-col gap-3">
              <div className="flex flex-row max-lg:flex-col gap-5">
                <div className="rounded-xl">
                  <img
                    src={menuItem.image_url && menuItem.image_url !== "" ? menuItem.image_url : MenuItemImg}
                    alt="Menu Item image"
                    className="w-28 h-20 rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="font-bold text-xl">{menuItem.name}</h2>
                  <p className="text-base">{menuItem.description}</p>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="text-base">Price: #{menuItem.price}</p>
                </div>
                <div className="flex flex-row items-center">
                  <button
                    className="rounded-full text-green bg-light-green h-8 w-8 font-extrabold active:border-2 active:border-green text-center"
                    onClick={() => addToCart(menuItem)}
                  >
                    +
                  </button>
                  <span className="mx-3">{cart[menuItem.id] || 0}</span>
                  <button
                    className="bg-[rgba(255,0,0,30%)] text-red rounded-full h-8 w-8 font-extrabold active:border-2 active:border-red text-center"
                    onClick={() => removeFromCart(menuItem)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white w-2/5 max-sm:w-full rounded-t-2xl flex flex-col gap-3 pb-8" style={{boxShadow: '8px 8px 8px rgba(255, 222, 153, 100%)'}}>
          <div className="p-6 text-green font-bold text-2xl text-center rounded-t-2xl " style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'}}>
            <p>{users.first_name}'s Order</p>
          </div>
          {Object.keys(cart).length > 0 ? (
            <div className=" flex flex-col gap-3 items-center justify-between">
                {Object.entries(cart).map(([itemId, quantity]) => {
                    console.log('Item ID:', itemId);
                    console.log('Quantity:', quantity);
                    console.log('Menu Items:', menuItems); // Log all menu items for debugging
                    const menuItem = menuItems.find(item => item.id === itemId);
                    console.log('Menu Item:', menuItem);
                    if (menuItem) {
                        return (
                            <div key={itemId} className=" self-start flex justify-between items-center px-5 py-3 w-full">
                                <span className=" font-extrabold">{quantity}x</span>
                                <span className="" style={{fontWeight:600}}>{menuItem.name}</span>
                                <span className="" style={{fontWeight:600}}>#{getTotalPrice(menuItem)}</span>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
                <div onClick={handleProceedToOrderSummary}>
                    <GreenButtons text='Place Order' />
                </div>
            </div>
            ) : (
            <div className="text-center text-[#979494]">No items in your cart</div>
            )}
        </div>
      </div>
    </div>
  )
}

export default UserMenuPage;
