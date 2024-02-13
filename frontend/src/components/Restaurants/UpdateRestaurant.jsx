import RestuarantSideBar from "./RestuarantSideBar"
import api from "../api";
import RestaurantTop from './RestaurantTop';
import { FormNotes, FormContentCustomBg } from '../Reusables';
import { FormContent } from "../Reusables";
import { BigGreenButtons } from '../Buttons';
import { useState } from 'react';

function UpdateRestaurant() {
    const [formValue, setFormValue] = useState({address:'', store_name:'', brand_name:'', first_name:'', last_name:'', phone:''})
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const restaurant_id = localStorage.getItem("restaurant_id")

    const handleInput = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const payload = {
                address: formValue.address,
                store_name: formValue.store_name,
                brand_name: formValue.brand_name,
                first_name: formValue.first_name,
                last_name: formValue.last_name,
                phone: formValue.phone,
              };

            const response = await api.patch(`/restaurants/${restaurant_id}`, payload);
            console.log(response);
            console.log(localStorage);
            setSuccessMessage('You have been successfully added a menu item');
            setErrorMessage('');
            setFormValue({ address:'', store_name:'', brand_name:'', first_name:'', last_name:'', password:'', phone:'' });
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        } catch (error) {
            console.log(error);
            if (error.response) {
                setErrorMessage(error.response);
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
            <h1 className=' font-extrabold text-3xl'>Update Your Restaurant</h1>
            <div className=' self-center p-8 rounded-xl bg-light-green flex flex-col gap-8 w-3/4 max-md:w-11/12'>
                <h3 className=' self-start font-bold text-base '>When updating products do not forget to fill all required fields completely and follow the menu adding rules</h3>
                <form action="" onSubmit={handleSubmit} className=' flex flex-col gap-5' >
                    {successMessage && <p className=" text-green font-semibold">{successMessage}</p>}
                    {errorMessage && <p className=" text-[#ff0000] font-semibold">{errorMessage}</p>}

                    <FormContent title="Restaurant Address*" type="text" id="address" autoComplete="text" placeholder="" instruction="" value={formValue.address} onChange={handleInput} />
                    <FormContent title="Store Name*" type="text" id="store_name" autoComplete="text" placeholder="Example: Sam's Pizza - 123 Main Street" instruction="This is how your store will appear in the app." value={formValue.store_name} onChange={handleInput} />
                    <FormContent title="Brand Name*" type="text" id="brand_name" autoComplete="text" placeholder="Example: Sam's Pizza" instruction="We’ll use this to help organize information that is shared across stores, such as menus." value={formValue.brand_name} onChange={handleInput} />
                    <div className=" flex flex-row max-md:flex-col gap-5">
                        <FormContent title="First Name*" type="First Name" id="first_name" autoComplete="text" placeholder="" instruction="" value={formValue.first_name} onChange={handleInput} />
                        <FormContent title="Last Name*" type="Last Name" id="last_name" autoComplete="text" placeholder="" instruction="" value={formValue.last_name} onChange={handleInput} />
                    </div>
                    <FormContent title="Mobile Number*" type="number" id="phone" autoComplete="number" placeholder="" instruction="" value={formValue.phone} onChange={handleInput} />
                    {/* <FormContent title="Restaurant's image URL" type="text" id="image_url" autoComplete="text" placeholder="Example: https://imgur/myImage.png" instruction="You can use hosting platforms like imgur to host your images then copy the link here" value={formValue.image_url} onChange={handleInput} /> */}
                    <BigGreenButtons type='submit' disabled={isSubmitting} text='Update Restaurant' />
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateRestaurant;