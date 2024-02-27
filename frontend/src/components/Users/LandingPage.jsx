// This file contains the landing page of the Naytiv Web App
import React from 'react';
import Menu from "../../assets/Menu.svg"
import landingpageImage from "../../assets/landingpageImage.svg"
import { GreenButtonsWithIcon } from "../Buttons";
import { YellowButtons } from "../Buttons";
import loginIcon from "../../assets/loginIcon.svg"
import location from "../../assets/location.svg"
import clock from "../../assets/clock.svg"
import naytifDefault from "../../assets/naytifDefault.png";
import { GreenButtons } from "../Buttons";
import { Placeholder } from "../Reusables";
import { TopResturants } from "../Reusables";
import topResturant1 from "../../assets/topResturant1.svg"
import topRestuarant2 from "../../assets/topRestuarant2.svg"
import topRestuarant3 from "../../assets/topRestuarant3.svg"
import topRestuarant4 from "../../assets/topRestuarant4.svg"
import topRestuarant5 from "../../assets/topRestuarant5.svg"
import topResturant6 from "../../assets/topResturant6.svg"
import topResturant7 from "../../assets/topResturant7.svg"
import topResturant8 from "../../assets/topResturant8.svg"
import NomadsMap from "../../assets/NomadsMap.png"
import { TopCities } from "../Reusables";
import { BigGreenButtons } from "../Buttons";
import Footer from "../Footer";
import MenuBar from "./MenuBar";
import { useState } from "react";
import { Link } from "react-router-dom"



function LandingPage() {
    // Landing Page
    const [showMenuBar, setShowMenubar] = useState(false)

    return (
      <div>
        <div className="bg-cover bg-no-repeat h-screen" style={{backgroundImage: `url(${landingpageImage})`}}>
            {/* Navbar implementation */}
            <nav className="flex flex-row items-center justify-between z-10 px-11 max-md:px-6 py-3 fixed top-0 backdrop-blur-xl w-full ">
                <div className="flex flex-row items-center justify-center max-md:justify-between max-md:w-full gap-6">
                    <button type="button" onClick={() => setShowMenubar(true)}>
                        <img src={ Menu } alt="menubar icon" />
                    </button>
                    <Link to="/" className="font-logo text-black text-4xl leading-7 font-bold"><img src={naytifDefault} className="h-10 w-15 fill-slate-300" alt="Naytif" /></Link>
                </div>
                <div className="flex flex-row items-center justify-center gap-6 max-md:hidden">
                    <Link to="/auth/login">
                        <GreenButtonsWithIcon text="Log In" icon={ loginIcon } />
                    </Link>
                    <Link to="/auth/sign_up_1">
                        <YellowButtons text="Sign Up" />
                    </Link>
                </div>
                {showMenuBar && <MenuBar onClose={() => setShowMenubar(false)} />}
            </nav>
            <div className=" max-md:flex px-11 max-md:flex-col py-5 items-center md:pt-20 max-md:items-center justify-center">
                <div className="text-5xl font-bold pt-36 pb-6 max-md:text-5xl">
                    Order delivery near you
                </div>
                <form action="">
                    <div className="flex flex-row items-center justify-start gap-12 max-md:flex-col max-md:items-center max-md:gap-3">
                        <label className="relative inline-flex items-center">
                            <span className="sr-only">Address</span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <img src={ location } className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20" />
                            </span>
                            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border
                            border-slate-300 rounded-md py-4 pl-9 pr-20 shadow-sm focus:outline-none focus:border-yellow
                            focus:ring-light-yellow focus:ring-1 sm:text-sm" required placeholder="Enter delivery address" type="text" name="search"/>
                        </label>

                        <label className="relative inline-flex items-center">
                            <span className="sr-only">Delivery</span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <img src={ clock } className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20" />
                            </span>
                            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border
                            border-slate-300 rounded-md py-4 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow
                            focus:ring-light-yellow focus:ring-1 sm:text-sm max-md:pr-20" required placeholder="Deliver Now" type="text" name="search"/>
                        </label>
                        <div className="  max-md:flex max-md:pt-6 max-md:justify-center">
                            <GreenButtons text="Search Here"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        {/* Top restuarents in Nigeria */}
        <div className=" flex flex-col gap-14 pt-32 pb-32 bg-powder-blue px-11 max-md:px-6 max-md:py20">
            <div className="text-5xl font-semibold text-center max-md:text-4xl">Top Restaurants in Nigeria</div>
            <div className=" lg:grid lg:grid-cols-4  flex flex-row flex-wrap gap-28 items-center justify-center max-md:gap-6">
                <TopResturants image={topResturant1} text="Africana" />
                <TopResturants image={topRestuarant2} text="Mama Put" />
                <TopResturants image={topRestuarant3} text="On The Spot" />
                <TopResturants image={topRestuarant5} text="Chizziria" />
                <TopResturants image={topResturant6} text="Mr Biggs" />
                <TopResturants image={topRestuarant4} text="Calabar Kitchen" />
                <TopResturants image={topResturant7} text="Foodies" />
                <TopResturants image={topResturant8} text="Drinks n More" />
            </div>
        </div>

        {/* Cities we deliver to */}
        <div className=" flex flex-col gap-14 pt-32 pb-10 items-center bg-yellow px-11 max-md:px-6 max-md:py20">
            <div className=" flex flex-col items-center justify-center">
                <img src={NomadsMap} alt="Maps" />
                <p className="text-5xl font-semibold text-center max-md:text-4xl">
                    Top Cities We Deliver To
                </p>
            </div>
            <div className=" lg:grid lg:grid-cols-6 gap-6 flex flex-row flex-wrap items-center justify-center max-md:lg:gap-2">
                <TopCities text="Lekki" />
                <TopCities text="Ibadan" />
                <TopCities text="Abuja" />
                <TopCities text="Ilorin" />
                <TopCities text="Jos" />
                <TopCities text="Akwa Ibom" />
                <TopCities text="Malete" />
                <TopCities text="Ondo" />
                <TopCities text="Kano" />
                <TopCities text="Aba" />
                <TopCities text="Ikorodu" />
                <TopCities text="Abeokuta" />
            </div>
            <div className=" flex items-center justify-center w-fit">
                <Link to='/auth/sign_up_1'>
                    <BigGreenButtons text="See More Cities"/>
                </Link>
            </div>
        </div>

        {/* Top Catergories */}
        <div className=" flex flex-col items-center gap-14 pt-32 pb-32 bg-yellow px-11 max-md:px-6 max-md:py20">
            <div className=" flex flex-col items-center justify-center">
                <p className="text-5xl font-semibold text-center">
                    Top Categories
                </p>
            </div>
            <div className=" lg:grid lg:grid-cols-6 gap-6 flex flex-row flex-wrap items-center justify-center">
                <TopCities text="Swallow" />
                <TopCities text="Soups" />
                <TopCities text="Palmwine" />
                <TopCities text="Healthy meals" />
                <TopCities text="Snacks" />
                <TopCities text="Fruits" />
            </div>
            <div className=" flex items-center justify-center w-fit">
                <Link to='/auth/sign_up_1'>
                    <BigGreenButtons text="See More Categories"/>
                </Link>
            </div>
        </div>

        {/* Footer */}
        <Footer />

    </div>
    )
  }
  
  export default LandingPage
  
