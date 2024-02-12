import React from 'react'
import RestuarantSideBar from "./RestuarantSideBar"
import api from "../api";
import RestaurantTop from './RestaurantTop';
import { FormNotes, FormContentCustomBg } from '../Reusables';
import { BigGreenButtons } from '../Buttons';
import { useState } from 'react';
function AddNewMenuItem() {

    const [selectedOption, setSelectedOption] = useState('Food');
    const [formValue, setFormValue] = useState({menu_item_name: '', price: '', menu_item_description:'', image_url: ''})
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const restaurant_id = localStorage.getItem("restaurant_id")

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleInput = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("name", formValue.menu_item_name);
        formData.append("price", formValue.price);
        formData.append("category", selectedOption);
        formData.append("description", formValue.menu_item_description);
        formData.append("image", formValue.image_url);
        formData.append("restaurant_id", restaurant_id)
    
        try {
            const response = await api.post(`/restaurants/${restaurant_id}/menu`, formData);
            console.log(response);
            // localStorage.setItem("menu_item_id", response.data.menu.id)
            console.log(localStorage);
            setSuccessMessage('You have been successfully added a menu item');
            setErrorMessage('');
            setFormValue({ menu_item_name: '', price: '', menu_item_description:'', image_url: '' });
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        } catch (error) {
            console.log(error);
            if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Invalid input. Please try again."); // set error message
            }
            setSuccessMessage('');
            setIsSubmitting(false);
            window.scrollTo(0, 0); //scroll to the top of the page
        }
    };

  return (
    <div className="flex flex-row bg-powder-blue w-full">
        <RestuarantSideBar />
        <div className=" ml-72 max-md:ml-16 px-5 bg-powder-blue w-full py-5 flex flex-col gap-14 ">
            <RestaurantTop />
            <h1 className=' font-extrabold text-3xl'>Add a New Menu Item 🍽</h1>
            <div className=' self-center p-8 rounded-xl bg-light-green flex flex-col gap-8 w-3/4 max-md:w-11/12'>
                <h3 className=' self-start font-bold text-base '>When adding products do not forget to fill all required fields completely and follow the menu adding rules</h3>
                <form action="" onSubmit={handleSubmit} className=' flex flex-col gap-5' >
                    {successMessage && <p className=" text-green font-semibold">{successMessage}</p>}
                    {errorMessage && <p className=" text-[#ff0000] font-semibold">{errorMessage}</p>}

                    <FormContentCustomBg title='Menu Item Name' id='menu_item_name' type='text' instruction='Do not exceed 20 characters when entering the menu  name' value={formValue.menu_item_name} onChange={handleInput} maxLength={20} />

                    <div className='flex flex-col justify-center items-start gap-1'>
                        <p className="block text-sm font-medium leading-6 text-black">Choose Menu Category</p>
                        <div className="flex rounded w-full bg-light-green border py-2 px-1 hover:border-green">
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

                    <FormContentCustomBg title='Price' id='price' type='number' instruction='All prices will be regarded as Naira currency. Do not enter currency sign or comma' placeholder='Example: 5000' value={formValue.price} onChange={handleInput} />
                    <div className=' w-full'>
                        <FormNotes title='Description' id='menu_item_description' instruction='Do not exceed 50 characters when entering menu description.' value={formValue.menu_item_description} onChange={handleInput} />
                    </div>
                    <FormContentCustomBg title="Menu Item's image URL" type="text" id="image_url" autoComplete="text" placeholder="Example: https://imgur/myImage.png" instruction="You can use hosting platforms like imgur to host your images then copy the link here" value={formValue.image_url} onChange={handleInput} />
                    <BigGreenButtons type='submit' disabled={isSubmitting} text='Add a New Menu Item' />
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddNewMenuItem