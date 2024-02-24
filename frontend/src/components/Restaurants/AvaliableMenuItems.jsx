import React, { useState, useEffect } from 'react';
import RestuarantSideBar from "./RestuarantSideBar";
import api from "../api";
import RestaurantTop from './RestaurantTop';
import {  Trash2Icon, UploadIcon } from 'lucide-react';
import SwalDelete from '../SwalDelete';
import Swal from 'sweetalert2';

function AvaliableMenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const restaurant_id = localStorage.getItem("restaurant_id");

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
      // After successful deletion, fetch the latest menu items from the server
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete the item.',
        icon: 'error',
      });
    }
  };

  const handleUpdateMenuItem = async (menuItem) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Update Menu Item',
        html: `
          <form id="updateMenuItemForm">
            <label for="menuItemName">Menu Item Name:</label><br>
            <input type="text" id="menuItemName" name="menuItemName" value="${menuItem.name}"><br>
            <label for="menuItemCategory">Menu Category:</label><br>
            <input type="text" id="menuItemCategory" name="menuItemCategory" value="${menuItem.category}"><br>
            <label for="menuItemPrice">Price:</label><br>
            <input type="number" id="menuItemPrice" name="menuItemPrice" value="${menuItem.price}"><br>
            <label for="menuItemImage_url">Menu Item Image URL:</label><br>
            <input type="text" id="menuItemImage_url" name="menuItemImage_url" value="${menuItem.image_url}"><br>
          </form>
        `,
        focusConfirm: false,
        preConfirm: async () => {
          const updatedMenuItem = {
            name: document.getElementById('menuItemName').value,
            category: document.getElementById('menuItemCategory').value,
            price: document.getElementById('menuItemPrice').value,
            image_url: document.getElementById('menuItemImage_url').value,
          };
          // Make a PATCH request to update the menu item
          await api.patch(`/restaurants/${restaurant_id}/menu/${menuItem.id}`, updatedMenuItem);
          return updatedMenuItem;
        }
      });
  
      if (formValues) {
        // Fetch the updated menu items from the server
        const response = await api.get(`/restaurants/${restaurant_id}/menu`);
        const fetchedMenuItems = response.data.menu;
        // Update the local state with the fetched menu items
        setMenuItems(fetchedMenuItems);
        Swal.fire({
          title: 'Success!',
          text: 'Menu item updated successfully.',
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update menu item.',
        icon: 'error',
      });
    }
  };  

  return (
    <div className="flex flex-row w-full min-h-screen" style={{ backgroundColor: '#E5F4FC' }}>
      <RestuarantSideBar />
      <div className=" ml-72 max-md:ml-16 px-5 bg-powder-blue w-full py-5 pb-10 flex flex-col gap-14 ">
        <RestaurantTop />
        <h1 className=' font-extrabold text-3xl'>Available Products</h1>
        <table className=' w-full'>
          <thead className=' bg-[#E5F4FC] rounded-t-lg'>
            <tr className=' rounded-lg'>
              <th className='p-3 text-center'>Menu Item</th>
              <th className="p-3 text-center">Menu Category</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center"></th>
              <th className="p-3 text-center"></th>
            </tr>
          </thead>
          <tbody >
            {sortedMenuItems.map((menuItem, index) => (
              <tr key={index} className='bg-[rgba(229, 244, 252, 100%)] rounded-b-lg'>
                <td className='p-3 text-center'>{menuItem.name}</td>
                <td className='p-3 text-center'>{menuItem.category}</td>
                <td className='p-3 text-center'>#{menuItem.price}</td>
                <td><UploadIcon color='green' className=' cursor-pointer' onClick={() => handleUpdateMenuItem(menuItem)} /></td>
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
