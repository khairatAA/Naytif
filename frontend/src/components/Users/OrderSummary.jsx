import React from 'react';
import UserTop from './UserTop';
import { AlignLeftIcon, MoveLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../api';
import { GreenButtons } from '../Buttons';
import Footer from '../Footer';
import Swal from 'sweetalert2';

function OrderSummary() {
  const location = useLocation();
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const restaurant_id = localStorage.getItem("restaurant_id");
  const [users, setUsers] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState([]);
  const [ridersDetails, setRidersDetails] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const [selectedRider, setSelectedRider] = useState(null);
  const deliveryCharge = 2000;
  const confirmationDelay = 10000; // Define the delay in milliseconds

  // Get carts
  useEffect(() => {
    // Retrieve the cart from local storage when the component mounts
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }

    // Fetch menu items once when the component mounts
    fetchMenuItems();
  }, []);

  // Get menu items
  const fetchMenuItems = async () => {
    try {
      const response = await api.get(`/restaurants/${restaurant_id}/menu`);
      const fetchedMenuItems = response.data.menu;
      setMenuItems(fetchedMenuItems);
      setLoading(false); // Set loading to false once menu items are fetched
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  const getMenuData = (itemId) => {
    // Find the menu item with the specified itemId
    return menuItems.find(item => item.id === itemId);
  };

  // Get restaurant
  useEffect(() => {
    const fetchRestaurants = async () => {
        try {
            const response = await api.get(`/restaurants/${restaurant_id}`);
            // Assuming response.data contains the array of menu items
            const fetchedRestaurants = response.data.restaurant;
            console.log(fetchedRestaurants);
            
            setRestaurants(fetchedRestaurants);
            // window.location.reload();
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        }
    };

    fetchRestaurants(); // Don't forget to invoke the function
  }, []);

  // Get delivery details
  useEffect(() => {
    const fetchDeliveryDetails = async () => {
        try {
            const response = await api.get(`/users/${user_id}/delivery_details`);
            // Assuming response.data contains the array of menu items
            const fetchedDeliveryDetails = response.data.delivery_details;
            console.log(fetchedDeliveryDetails);
            const mostRecentDeliveryDetail = fetchedDeliveryDetails.length > 0 ? fetchedDeliveryDetails[0] : {};
            setDeliveryDetails(mostRecentDeliveryDetail);
            // window.location.reload();
        } catch (error) {
            console.error('Error fetching delivery details:', error);
        }
    };

    fetchDeliveryDetails(); // Don't forget to invoke the function
  }, [user_id]);

  // Get Rider's details
  useEffect(() => {
    const fetchRidersDetails = async () => {
        try {
            const response = await api.get(`/drivers`);
            // Assuming response.data contains the array of menu items
            const fetchedRidersDetails = response.data.drivers;
            console.log(fetchedRidersDetails);
            
            setRidersDetails(fetchedRidersDetails);
            // window.location.reload();
        } catch (error) {
            console.error('Error fetching delivery details:', error);
        }
    };

    fetchRidersDetails(); // Don't forget to invoke the function
  }, []);

  useEffect(() => {
    // Select a random rider if there are any available
    if (ridersDetails.length > 0) {
      const randomIndex = Math.floor(Math.random() * ridersDetails.length);
      setSelectedRider(ridersDetails[randomIndex]);
    } else {
      // If no riders available, display a message
      setSelectedRider(null);
    }
  }, [ridersDetails]);

  // To update delivery details
  const handleUpdate = () => {
    api.patch(`/users/${user_id}/delivery_details`, { address, phoneNumber })
        .then(response => {
            Swal.fire('Success', 'Delivery updated successfully', 'success');
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Failed to update delivery', 'error');
        });
  };

  const handleLinkClick = () => {
    Swal.fire({
        title: 'Update Delivery',
        html:
            `<input id="swal-input1" class="swal2-input" value="${address || ''}" placeholder="Address" required>` +
            `<input id="swal-input2" class="swal2-input" value="${phoneNumber || ''}" placeholder="Phone Number" required>`,
        focusConfirm: false,
        preConfirm: () => {
            setAddress(document.getElementById('swal-input1').value);
            setPhoneNumber(document.getElementById('swal-input2').value);
            handleUpdate();
        }
    });
  };

  if (loading) {
    return <div className=' bg-yellow'>Loading...</div>; // Render a loading indicator while fetching menu items
  }

  const totalMenuPrice = Object.entries(cart).reduce((total, [itemId, quantity]) => {
    const menuItem = getMenuData(itemId);
    return total + (quantity * menuItem.price);
  }, 0);

  const totalOrderPrice = totalMenuPrice + deliveryCharge;

  const handleConfirmOrder = async () => {
    try {
      // Add your code to confirm the order here

      navigate('/users/order_confirmation');

        // Simulate delay before navigating to home page
      setTimeout(() => {
        navigate('/users/home');
      }, confirmationDelay);
    } catch (error) {
      console.error('Error confirming order:', error);
      // Handle error, maybe show an error message to the user
    }
  };

  return (
    <div className="flex flex-col bg-yellow w-full gap-14  min-h-screen">
      <div className=' py-2 px-10'>
        <UserTop />
      </div>

      <div className=' flex flex-col gap-20 py-2 px-10'>
        <div className=' flex gap-5 items-center'>
          <button onClick={() => navigate(-1)}>
            <MoveLeftIcon color='black' size={36} />
          </button>
          <h1 className=' font-bold text-2xl'>Order Summary</h1>
        </div>

        <div className=' flex flex-col gap-10'>
          <div className="self-start flex flex-row max-sm:flex-col-reverse justify-between items-start w-full gap-8">
            <div className="p-5 bg-[rgba(255,255,255,15%)] border border-green rounded-xl w-1/2 max-sm:w-full max-sm:self-center flex flex-col gap-3">
              <div>
                <h2 className=' font-bold text-center'>Your choice from {restaurants.brand_name} </h2>
              </div>
              <div className="flex flex-col gap-3">
                {/* Iterate over the cart items and display them */}
                {Object.entries(cart).map(([itemId, quantity]) => {
                  // Find the menu item with the specified itemId
                  const menuItem = getMenuData(itemId);

                  // Calculate the total price for the menu item
                  const totalPrice = quantity * menuItem.price;

                  return (
                    <div key={itemId} className="flex justify-between items-center px-5 py-3">
                      <span className="font-semibold">{quantity}x {menuItem.name}</span>
                      <span>#{totalPrice}</span> {/* Display the total price */}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white w-1/3 max-md:w-1/2 max-sm:w-4/5 max-sm:self-center rounded-t-2xl flex flex-col gap-3 pb-8" style={{boxShadow: '8px 8px 8px rgba(255, 222, 153, 100%)'}}>
              <div className="p-6 text-green font-bold text-2xl text-center rounded-t-2xl " style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'}}>
                <p>Summary</p>
              </div>
              <div className=" flex flex-col gap-3 items-center justify-between">
                  <div className=" self-start flex justify-between items-center px-5 py-3 w-full">
                      <span className="" style={{fontWeight:600}}>Menu Items</span>
                      <span className="" style={{fontWeight:600}}>#{totalMenuPrice}</span>
                  </div>
                  <div className=" self-start flex justify-between items-center px-5 py-3 w-full">
                      <span className="" style={{fontWeight:600}}>Delivery</span>
                      <span className="" style={{fontWeight:600}}>#{deliveryCharge}</span>
                  </div>
                  <div className=" self-start flex justify-between items-center px-5 py-3 w-full">
                      <span className="font-extrabold">Total</span>
                      <span className=" font-extrabold">#{totalOrderPrice}</span>
                  </div>
                  <div onClick={handleConfirmOrder}>
                      <GreenButtons text='Confirm Order' />
                  </div>
              </div>
            </div>
          </div>

          <div className=' flex flex-col gap-10'>
            <div className=' flex flex-col gap-5 '>
              <h2 className=' font-bold text-xl'>Delivery Details</h2>
              <div className=" ml-10 p-5 bg-[rgba(255,255,255,15%)] border border-green rounded-xl w-1/2 max-sm:w-full max-sm:self-center flex flex-col gap-3">
                <div className=' border-b border-b-green pb-2'>
                  <p> <span className=' font-semibold'>Location:</span> <span>{deliveryDetails.address}</span></p>
                </div>
                <div className=' border-b border-b-green pb-2'>
                <p> <span className=' font-semibold'>Phone No:</span> <span>{deliveryDetails.phone}</span></p>
                </div>
                <p className=' text-sm text-center'>Easily update your delivery details by clicking 'Update Delivery Details' in the navbar or simply click <span onClick={handleLinkClick}  className=' text-green'><u>here</u></span>.</p>
              </div>
            </div>

            <div className=' flex flex-col gap-5 '>
              <h2 className=' font-bold text-xl'>Payment Option</h2>
              <div className=" ml-10 p-5 bg-[rgba(255,255,255,15%)] border border-green rounded-xl w-1/2 max-sm:w-full max-sm:self-center flex flex-col gap-3">
                <div className=''>
                  <p className=' font-semibold border-b border-b-green pb-2'>Payment on delivery</p>
                </div>
                <p className=' text-sm text-center'>Only payment on delivery is accepted at the moment</p>
              </div>
            </div>

            <div className='flex flex-col gap-5'>
              <h2 className='font-bold text-xl'>Riders Details</h2>
              <div className="ml-10 p-5 bg-[rgba(255,255,255,15%)] border border-green rounded-xl w-1/2 max-sm:w-full max-sm:self-center flex flex-col gap-3">
                {selectedRider ? (
                  <>
                    <div className='border-b border-b-green pb-2'>
                      <p><span className='font-semibold'>Name:</span> {selectedRider.first_name} {selectedRider.last_name}</p>
                    </div>
                    <div className='border-b border-b-green pb-2'>
                      <p><span className='font-semibold'>Phone No:</span> {selectedRider.phone}</p>
                    </div>
                    <div className='border-b border-b-green pb-2'>
                      <p><span className='font-semibold'>Delivery period:</span> 30 - 45 minutes </p>
                    </div>
                    <p className='text-sm text-center'>Information of the rider delivering your ordered item(s)</p>
                  </>
                ) : (
                  <p className="text-center">No rider available at the moment</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        <Footer />
      </div>
    </div>
  );
}

export default OrderSummary;
