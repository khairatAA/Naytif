import React from 'react'
import api from "../api";
import UserTop from './UserTop';
import { FormContent } from "../Reusables";
import { BigGreenButtons } from '../Buttons';
import { useState } from 'react';
import UserMenuBar from './UserMenuBar';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
    const [formValue, setFormValue] = useState({first_name:'', last_name:''})
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");

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
                first_name: formValue.first_name,
                last_name: formValue.last_name,
              };

            const response = await api.patch(`/users/${user_id}`, payload);
            console.log(response);
            console.log(localStorage);
            setSuccessMessage('You have successfully updated your profile');
            setErrorMessage('');
            setFormValue({ first_name:'', last_name:'' });
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/users/home')
                window.location.reload();
            }, 3000);
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
    <div className="flex flex-col bg-yellow w-full py-2 min-h-screen  px-10 pb-10 justify-start gap-8">
        <UserTop />
        <div className="w-full flex flex-col gap-10">
            <h1 className=' font-extrabold text-3xl'>Update Your Profile</h1>
            <div className=' self-center p-8 rounded-xl bg-white flex flex-col gap-8 w-2/4 max-md:w-3/4'>
                <form action="" onSubmit={handleSubmit} className=' flex flex-col gap-5 pt-10' >
                    {successMessage && <p className=" text-green font-semibold">{successMessage}</p>}
                    {errorMessage && <p className=" text-[#ff0000] font-semibold">{errorMessage}</p>}
                        <FormContent title="First Name" type="First Name" id="first_name" autoComplete="text" placeholder="" instruction="" value={formValue.first_name} onChange={handleInput} />
                        <FormContent title="Last Name" type="Last Name" id="last_name" autoComplete="text" placeholder="" instruction="" value={formValue.last_name} onChange={handleInput} />
                    <BigGreenButtons type='submit' disabled={isSubmitting} text='Update Profile' />
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile