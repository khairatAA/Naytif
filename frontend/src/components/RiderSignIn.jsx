// This file contains the rider sign up page

import { GreenButtonsWithIcon } from "./Buttons"
import { Link } from "react-router-dom"
import loginIcon from "../assets/loginIcon.svg"
import { FormContent } from "./Reusables"
import { BigGreenButtons } from "./Buttons"
import RiderImage from "../assets/RiderImage.svg"

/**
 * Renders the RiderSignIn component.
 *
 * This component displays a sign-in form for riders.
 * It includes a navigation bar with a logo and a login button.
 *
 * @returns {JSX.Element} The rendered RiderSignIn component.
 */
export default function RiderSignIn() {
    return (
        <div>
            {/* Navbar implementation */}
            <nav className="flex flex-row px-11 items-center justify-between py-5 bg-black fixed top-0 w-full">
                <div className="flex flex-row items-center justify-center gap-6">
                    <a href="/" className="font-logo text-white text-4xl leading-7 font-bold">Naytif</a>
                </div>
                <div className="flex flex-row items-center justify-center gap-6">
                    <Link to="">
                        <GreenButtonsWithIcon text="Log In" icon={ loginIcon } />
                    </Link>
                </div>
            </nav>
            
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
                            <form action="">
                                <div className=" flex flex-col gap-3">
                                    <FormContent title="Name*" type="name" name="name" id="name" autoComplete="name" placeholder="Example: John Joe" instruction="" />
                                    <FormContent title="Email*" type="email" name="email" id="email" autoComplete="email" placeholder="Example: john@gmail.com" instruction="This e-mail will be used to create your courier account " />
                                    <FormContent title="Phone Number*" type="tel" name="number" id="phone_number" autoComplete="number" placeholder="+23412345678" instruction="" />
                                    <FormContent title="City*" type="text" name="text" id="city" autoComplete="text" placeholder="Example: Lagos Island" instruction="Which region will you like to deliver " />
                                    <div className=" flex flex-col justify-center items-start gap-1">
                                        <select name="vehicle" id="vehicle" className="block font-medium flex-1 rounded w-full bg-light-grey py-2 pl-1 focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green" >
                                            <option value="vehicle" disabled>Vehicle*</option>
                                            <option value="bike">Bike</option>
                                            <option value="bicycle">Bicycle</option>
                                            <option value="car">Car</option>
                                        </select>
                                    </div>
                                    
                                    <BigGreenButtons text="Submit" />
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