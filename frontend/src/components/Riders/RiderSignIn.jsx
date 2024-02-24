// This file contains the rider sign up page

import { GreenButtonsWithIcon } from "../Buttons"
import { Link } from "react-router-dom"
import loginIcon from "../../assets/loginIcon.svg"
import { FormContent, FormContentNotRequired } from "../Reusables"
import { BigGreenButtons } from "../Buttons"
import RiderImage from "../../assets/RiderImage.svg"
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

/**
 * Renders the RiderSignIn component.
 *
 * This component displays a sign-in form for riders.
 * It includes a navigation bar with a logo and a login button.
 *
 * @returns {JSX.Element} The rendered RiderSignIn component.
 */

export default function RiderSignIn() {

    // Connection wth backend and error and success handling
    const [formValue, setFormValue] = useState({first_name:'', last_name: '', email:'', image_url: '', phone_number:'', city:'', vehicle:''})
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate();

    const handleInput = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // const allInputvalue = { address: formValue.address, store_name: formValue.store_name, brand_name: formValue.brand_name, first_name: formValue.first_name, last_name: formValue.last_name, email: formValue.email, password: formValue.password, phone: formValue.phone }
        let formData = new FormData();
        formData.append("email", formValue.email);
        formData.append("first_name", formValue.first_name);
        formData.append("image_url", formValue.image_url);
        formData.append("last_name", formValue.last_name);
        // formData.append("password", formValue.password);
        formData.append("phone", formValue.phone);
        formData.append("vehicle_type", formValue.vehicle);
        
        api.post('/drivers', formData)
            .then(function (response) {
                console.log(response);
                navigate("/auth/rider/success");
            }) 
            .catch(function (error) {
                console.log(error);
                setErrorMessage("Something went wrong. Please try again."); // set error message
                window.scrollTo(0, 0); //scroll to the top of the page
            })

        // console.log(formData.values)
    }

    return (
        <div>
            {/* Navbar implementation */}
            <nav className="flex flex-row px-11 items-center justify-between py-5 bg-black fixed top-0 w-full">
                <div className="flex flex-row items-center justify-center gap-6">
                    <Link to="/" className="font-logo text-white text-4xl leading-7 font-bold">Naytif</Link>
                </div>
                <div className="flex flex-row items-center justify-center gap-6">
                    <Link to="">
                        <GreenButtonsWithIcon text="Log In" icon={ loginIcon } />
                    </Link>
                </div>
            </nav>
            
            {/* Page content */}
            <div className="bg-cover bg-no-repeat w-full mt-20 px-11 py-5 max-md:px-6 flex flex-col items-start gap-5" style={{backgroundImage: `url(${RiderImage})`}}>
                <div className=" self-end text-white font-bold text-3xl text-wrap p-5 w-1/2 max-sm:w-full">
                    <h1>Become a delivery driver and make money</h1>
                </div>
                <div className=" flex flex-row max-md:flex-col items-center justify-between gap-5 max-md:gap-3 w-full">
                    <div className=" flex flex-col items-center justify-between w-full">
                        <div className=" p-10 max-lg:p-7 bg-green text-white text-wrap text-2xl font-semibold rounded-t-2xl w-full">
                            <h2>Fill out the form to start delivering</h2>
                        </div>
                        <div className=" bg-white p-8 flex flex-col gap-5 w-full mb-16 rounded-b-2xl">
                            <div>
                                <h1 className=" font-bold text-xl">About you</h1>
                            </div>

                            {/* Form */}
                            <form action="" onSubmit={handleSubmit}>
                                {errorMessage && <p className=" text-red font-semibold">{errorMessage}</p>}
                                <div className=" flex flex-col gap-3">
                                    <FormContent title="First Name*" type="text" id="first_name" autoComplete="first-name" placeholder="Example: John" instruction="" value={formValue.first_name} onChange={handleInput} />
                                    <FormContent title="Last Name*" type="text" id="last_name" autoComplete="text" placeholder="Example: Joe" instruction="" value={formValue.last_name} onChange={handleInput} />
                                    <FormContent title="Email*" type="email" id="email" autoComplete="email" placeholder="Example: john@gmail.com" instruction="This e-mail will be used to create your courier account " value={formValue.email} onChange={handleInput} />
                                    <FormContentNotRequired title="Image URL" type="text" id="image_url" autoComplete="text" placeholder="Example: https://imgur/myImage.png" instruction="You can use hosting platforms like imgur to host your images then copy the link here" value={formValue.image_url} onChange={handleInput} />
                                    <FormContent title="Phone Number*" type="number" id="phone_number" autoComplete="number" placeholder="+23412345678" instruction="" value={formValue.phone_number} onChange={handleInput} />
                                    <FormContent title="City*" type="text" id="city" autoComplete="text" placeholder="Example: Lagos Island" instruction="Which region will you like to deliver " value={formValue.city} onChange={handleInput} />
                                    <div className=" flex flex-col justify-center items-start gap-1">
                                        <label htmlFor="vehicle" className="block text-sm font-medium leading-6 text-black">What will be your means of transportation?*</label>
                                        <select name="vehicle" required id="vehicle" className="block font-medium flex-1 rounded w-full bg-light-grey py-2 pl-1 focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green" value={formValue.vehicle} onChange={handleInput} >
                                            <option value="vehicle">Choose option</option>
                                            <option value="bike">Bike</option>
                                            <option value="bicycle">Bicycle</option>
                                            <option value="car">Car</option>
                                        </select>
                                    </div>
                                    
                                    <BigGreenButtons type='submit' text="Submit" />
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className=" flex flex-col w-full bg-[rgba(0,0,0,85%)] text-white p-3 gap-3 rounded-2xl" style={{ boxShadow: '0 2px 3px rgba(255, 255, 255, 0.68)' }}>
                        <h3 className=" text-2xl font-bold">Hello</h3>
                        <h4 className=" text-xl font-medium">Do you want to set your own schedule and connect when it suits you? Get paid for delivering orders Naytif.</h4>
                        <h5 className=" text-xl font-bold">Sign up today!</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}