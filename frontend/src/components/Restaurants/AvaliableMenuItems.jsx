import React, { useState, useEffect } from 'react';
import RestuarantSideBar from "./RestuarantSideBar";
import api from "../api";
import RestaurantTop from './RestaurantTop';
import {  Trash2Icon } from 'lucide-react';
import SwalDelete from '../SwalDelete';
import Swal from 'sweetalert2';

function AvaliableMenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const restaurant_id = localStorage.getItem("restaurant_id");

  useEffect(() => {
      const fetchMenuItems = async () => {
          try {
              const response = await api.get(`/restaurants/${restaurant_id}/menu`);
              // Assuming response.data contains the array of menu items
              const fetchedMenuItems = response.data.menu;
              console.log(fetchedMenuItems);
              
              setMenuItems(fetchedMenuItems);
          } catch (error) {
              console.error('Error fetching menu items:', error);
          }
      };

      fetchMenuItems(); // Don't forget to invoke the function
  }, []);

  // if (menuItems.length === 0) {
  //     return <div>Loading</div>;
  // }

  // Sort menu items based on createdAt timestamp in descending order
  const sortedMenuItems = menuItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Delete
  const handleDelete = async (itemId) => {
    try {
      // Call your API to delete the item
      await api.delete(`/restaurants/${restaurant_id}/menu/${itemId}`);
      Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success',
      });
      // After successful deletion, update the menu items state to reflect the changes
      setMenuItems(menuItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete the item.',
        icon: 'error',
      });
      window.location.reload();
    }
  };

  
  return (
    <div className="flex flex-row w-full h-screen" style={{ backgroundColor: '#E5F4FC' }}>
        <RestuarantSideBar />
        <div className=" ml-72 max-md:ml-16 px-5 bg-powder-blue w-full py-5 flex flex-col gap-14 ">
            <RestaurantTop />
            <h1 className=' font-extrabold text-3xl'>Available Products</h1>
            <table className=' w-full'>
              <thead className=' bg-[#E5F4FC] rounded-t-lg'>
                <tr className=' rounded-lg'>
                  <th className='p-3 text-center'>Menu Item</th>
                  <th className="p-3 text-center">Menu Category</th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center"></th>
                  {/* <th className="p-3 text-center">Created at</th> */}
                </tr>
              </thead>
              <tbody >
                {sortedMenuItems.map((menuItem, index) => (
                  <tr key={index} className='bg-[rgba(229, 244, 252, 100%)] rounded-b-lg'>
                    <td className='p-3 text-center'>{menuItem.name}</td>
                    <td className='p-3 text-center'>{menuItem.category}</td>
                    <td className='p-3 text-center'>#{menuItem.price}</td>
                    {/* <td className='p-3 text-center'>{menuItem.created_at}</td> */}
                    <td className='p-3 text-center'>
                    <Trash2Icon
                      color='red'
                      className=' cursor-pointer'
                      onClick={SwalDelete({
                        title: `Are you sure you want to delete ${menuItem.name}`,
                        warningText: "This action cannot be undone.",
                        onConfirmDelete: () => handleDelete(menuItem.id),
                        cancel_text: "Menu Item is not deleted",
                      })}
                    />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    </div>
  );
}

export default AvaliableMenuItems;
