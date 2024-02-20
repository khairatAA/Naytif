import { BigGreenButtons } from "../Buttons"
import { AuthenticationInput } from "../Reusables"
import google from "../../assets/google.svg"
import { Link, useLocation, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import api from "../api";

function UserSignUp2() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
    });

    useEffect(() => {
        console.log("Location State:", location.state);
        if (location.state && location.state.formData) {
            setFormData(location.state.formData);
        }
    }, [location.state]);

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
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('confirm_password', formData.confirm_password);
        formDataToSend.append('first_name', formData.first_name);
        formDataToSend.append('last_name', formData.last_name);
        console.log("Form Data:", formDataToSend); // Log the FormData object before submission
        try {
            const response = await api.post('/users', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Specify the content type as multipart/form-data
                },
            });
            console.log('User signed up successfully:', response.data);
            navigate('/auth/success'); // Redirect to success page
        } catch (error) {
            console.error('Error signing up user:', error);
            setErrorMessage("Something went wrong. Please try again."); // set error message
        }
    };    

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="bg-light-yellow h-full flex justify-center items-center py-5">
                <div className="flex flex-col justify-center items-center p-8 border border-green rounded-2xl gap-6">
                    <h2 className="font-bold text-3xl">What's your Name?</h2>
                    <div className="flex flex-col gap-2 w-full">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                            {errorMessage && <p className=" text-red font-semibold">{errorMessage}</p>}
                            <AuthenticationInput type="text" id="first_name" autoComplete="name" placeholder="Enter First Name" value={formData.first_name} onChange={handleInputChange} />
                            <AuthenticationInput type="text" id="last_name" autoComplete="name" placeholder="Enter Last Name" value={formData.last_name} onChange={handleInputChange} />
                            <BigGreenButtons type="submit" text="Sign Up" className="w-full" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSignUp2;
