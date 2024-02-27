import UserTop from "./UserTop"
import { BigGreenButtons, GreenButtons } from "../Buttons"
import { AuthenticationInput } from "../Reusables"
import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import api from "../api";
import { ArrowBigLeftIcon, ArrowLeftCircleIcon } from "lucide-react";

function UserDelivery() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user_id = localStorage.getItem("user_id");

    const [formData, setFormData] = useState({
        phone:'',
        address:''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const formDataToSend = new FormData();
        formDataToSend.append('user_id', user_id);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address', formData.address);

        try {
            const response = await api.post('/delivery_details', formDataToSend);
            console.log('User successfully entered delivery details:', response.data);
            localStorage.setItem("delivery_details_id", response.data.delivery_details_id)
            setSuccessMessage('You have been successfully entered your delivery details');
            setErrorMessage('');
            setFormData({ phone:'', address:'' });
            setTimeout(() => {
                setIsSubmitting(false);
                setSuccessMessage('');
                navigate("/users/order_summary");
            }, 2000);
        } catch (error) {
            console.error('Error user delivery:', error);
            if (error.response.msg) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage("Something went wrong. Please try again."); // set error message
            }
            setSuccessMessage('');
            setIsSubmitting(false);
            window.scrollTo(0, 0); //scroll to the top of the page
        }
    };

  return (
    <div className=" bg-light-yellow h-full w-full flex flex-col gap-14 pb-10 min-h-screen">
        <div className=" bg-yellow py-2 px-10">
            <UserTop />
        </div>
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center w-96 p-6 border border-green rounded-2xl gap-6">
                <div className=" flex flex-col gap-2">
                    <form onSubmit={handleSubmit} className=" flex flex-col gap-5 w-full">
                        <div className=" flex flex-col gap-3"> 
                            <h1 className=" font-bold text-3xl text-center">Delivery Details</h1>
                            <div className=" text-base cursor-pointer">Update your delivery details <u className=" text-green"><span className=" text-green">here</span></u></div>
                            {successMessage && <p className=" text-green font-semibold">{successMessage}</p>}
                            {errorMessage && <p className=" text-[#ff0000] font-semibold">{errorMessage}</p>}
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label htmlFor="address">Delivery Address</label>
                                    <AuthenticationInput type="text" name="address" id="address" autoComplete="address" placeholder="Enter delivery address" value={formData.address} onChange={handleInputChange} />
                                    <p></p>
                                </div>
                                <div>
                                    <label htmlFor="phone">Delivery Phone Number</label>
                                    <AuthenticationInput type="tel" name="phone" id="phone" autoComplete="phone" placeholder="Enter phone number" value={formData.password} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <button className="" onClick={() => navigate(-1)}>
                                <ArrowLeftCircleIcon size={40} color="white"  />
                            </button>
                            <div className="">
                                <GreenButtons type='submit' disabled={isSubmitting} text="Proceed" />
                            </div>
                        </div>
                    </form>
                </div>
                <p className=" text-wrap text-center font-medium">Please note: We only accept payment on delivery at this time. You can transfer funds, use cash, or utilize POS on delivery.</p>
            </div>
        </div>
    </div>
  )
}

export default UserDelivery