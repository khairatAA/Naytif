// This file contains the Resturant Sign In page
import { BigGreenButtons, GreenButtonsWithIcon } from "./Buttons";
import loginIcon from "../assets/loginIcon.svg"
import { Link } from "react-router-dom";
import restuarantbg from "../assets/restuarantbg.svg"
import { FormContent } from "./Reusables";
import Illustration1 from "../assets/Illustration1.svg"
import Illustration2 from "../assets/Illustration2.svg"
import Illustration3 from "../assets/Illustration3.svg"
import Footer from "./Footer";
import areYouReady from "../assets/areYouReady.svg"
import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";


/**
 * Function to handle the sign up process for restaurants.
 * 
 * @returns {JSX.Element} The JSX element containing the sign up form for restaurants.
 */
function ResturantSignUp() {
    // Connection wth backend and error and success handling
    const [formValue, setFormValue] = useState({address:'', store_name:'', brand_name:'', first_name:'', last_name:'', email:'', password:'', phone:''})
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
        formData.append("address", formValue.address);
        formData.append("brand_name", formValue.brand_name);
        formData.append("email", formValue.email);
        formData.append("first_name", formValue.first_name);
        formData.append("last_name", formValue.last_name);
        formData.append("password", formValue.password);
        formData.append("phone", formValue.phone);
        formData.append("store_name", formValue.store_name);
        formData.append("image_url", "");
        
        api.post('/restaurants/register', formData)
            .then(function (response) {
                console.log(response);
                navigate("/auth/restuarant/success");
            }) 
            .catch(function (error) {
                console.log(error);
                setErrorMessage("Something went wrong. Please try again."); // set error message
                window.scrollTo(0, 0); //scroll to the top of the page
            })

        // console.log(formData.values)
    }

    return (
        <div className="">
            {/* Navbar implementation */}
            <nav className="flex flex-row px-11 items-center justify-between py-5 bg-black fixed top-0 w-full">
                <div className="flex flex-row items-center justify-center gap-6">
                    <a href="/" className="font-logo text-white text-4xl leading-7 font-bold">Naytif</a>
                </div>
                <div className="flex flex-row items-center justify-center gap-6">
                    <Link to="/auth/restuarant/login">
                        <GreenButtonsWithIcon text="Log In" icon={ loginIcon } />
                    </Link>
                </div>
            </nav>

            <div className="bg-cover bg-no-repeat w-full px-11 mt-20 max-md:px-6 flex flex-row items-center gap-5" style={{backgroundImage: `url(${restuarantbg})`}}>
                <div className=" bg-white p-8 flex flex-col gap-5 w-full mb-16">
                    <div>
                        <h1 className=" font-bold text-xl">Get Started</h1>
                        <a href="" className=" text-sm"><u>Already have an account?</u></a>
                    </div>
                    {/* Form content */}
                    <form action="" onSubmit={ handleSubmit }>
                        {/* Show error message if somthing went wronh */}
                        {errorMessage && <p className=" text-red font-semibold">{errorMessage}</p>}
                        <div className=" flex flex-col gap-3">
                            <FormContent title="Restaurant Address*" type="text" id="address" autoComplete="text" placeholder="" instruction="" value={formValue.address} onChange={handleInput} />
                            <FormContent title="Store Name*" type="text" id="store_name" autoComplete="text" placeholder="Example: Sam's Pizza - 123 Main Street" instruction="This is how your store will appear in the app." value={formValue.store_name} onChange={handleInput} />
                            <FormContent title="Brand Name*" type="text" id="brand_name" autoComplete="text" placeholder="Example: Sam's Pizza" instruction="We’ll use this to help organize information that is shared across stores, such as menus." value={formValue.brand_name} onChange={handleInput} />
                            <div>
                                <FormContent title="First Name*" type="First Name" id="first_name" autoComplete="text" placeholder="" instruction="" value={formValue.first_name} onChange={handleInput} />
                                <FormContent title="Last Name*" type="Last Name" id="last_name" autoComplete="text" placeholder="" instruction="" value={formValue.last_name} onChange={handleInput} />
                            </div>
                            <FormContent title="Email*" type="email" name="email" id="email" autoComplete="text" placeholder="" instruction="" value={formValue.email} onChange={handleInput} />
                            <FormContent title="Create Password*" type="password" id="password" autoComplete="text" placeholder="" instruction="" value={formValue.password} onChange={handleInput} />
                            <FormContent title="Mobile Number*" type="number" id="phone" autoComplete="number" placeholder="" instruction="" value={formValue.phone} onChange={handleInput} />
                            <BigGreenButtons text="Submit" type="submit" />
                        </div>
                    </form>
                </div>
                <div className=" w-full max-sm:hidden">
                    <h1 className=" text-wrap text-white font-bold text-5xl">Unlock a new revenue stream</h1>
                    <p className=" text-wrap text-white font-medium text-base">Naytif’s platform gives you the flexibility, visibility and customer insights you need to connect with more customers. Partner with us today.</p>
                </div>
            </div>
            <div className=" flex flex-col px-11 py-11 gap-8">
                <div>
                    <h1 className=" font-bold text-3xl">Why Naytiv?</h1>
                </div>
                <div className=" flex flex-row max-sm:flex-col  justify-center items-start gap-5 ">
                    <div className=" flex flex-col gap-5 justify-center items-start">
                        <h3 className=" text-wrap font-semibold text-xl w-full">Deliver your way</h3>
                        <p className=" text-sm text-wrap">Our offerings are flexible so you can customize them to your needs. Get started with your delivery people or connect with delivery people through the Naytiv platform.</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start w-full">
                        <h3 className=" text-wrap font-semibold text-xl w-full">Boost your visibility</h3>
                        <p className=" text-sm text-wrap">Stand out with in-app marketing to reach even more customers and increase sales.</p>
                    </div>
                    <div className="flex flex-col gap-5 justify-center items-start w-full">
                        <h3 className=" text-wrap font-semibold text-xl w-full">Connect with customers</h3>
                        <p className=" text-sm text-wrap">Turn customers into regulars with actionable data insights, respond to reviews or offer a loyalty program.</p>
                    </div>
                </div>
            </div>

            <div className=" bg-white flex flex-col justify-center items-start px-11 py-11 gap-8">
                <div>
                    <h1 className=" font-bold text-3xl">How Naytiv works for restaurant partners</h1>
                </div>
                <div className=" flex  flex-row max-sm:flex-col justify-between items-start gap-5">
                    <div className=" flex flex-col items-start w-full gap-5">
                        <img src={Illustration1} alt="Illustration" className=" h-52 self-center" />
                        <h3 className="text-wrap font-semibold text-xl w-full">Customers order</h3>
                        <p className=" text-sm text-wrap">A customer finds your restaurant and places an order through the Naytiv app.</p>
                    </div>
                    <div className=" flex flex-col items-start w-full gap-5">
                        <img src={Illustration2} alt="Illustration" className=" h-52 self-center" />
                        <h3 className="text-wrap font-semibold text-xl w-full">You prepare</h3>
                        <p className=" text-sm text-wrap">Your restaurant accepts and prepares the order.</p>
                    </div>
                    <div className=" flex flex-col items-start w-full gap-5">
                        <img src={Illustration3} alt="Illustration" className=" h-52 self-center" />
                        <h3 className="text-wrap font-semibold text-xl w-full" >Delivery partners arrive</h3>
                        <p className=" text-sm text-wrap">Delivery people using the Naytiv platform pick up the order from your restaurant, then deliver it to the customer.</p>
                    </div>
                </div>
            </div>

            <div className=" bg-white flex flex-row max-sm:flex-col justify-between items-center max-sm:items-start px-11 py-11 gap-8">
                <img src={areYouReady} alt="Are you ready image" className=" w-3/6" />
                <div className=" flex flex-col gap-5">
                    <h3 className=" font-bold text-3xl">Get started in just 3 steps</h3>
                    <div className="flex flex-col items-start w-full gap-2">
                        <p className=" text-sm text-wrap"><span className=" font-semibold">1. </span>Tell us about your restaurant.</p>
                        <p className=" text-sm text-wrap"><span className=" font-semibold">2. </span>Upload your menu.</p>
                        <p className=" text-sm text-wrap"><span className=" font-semibold">3. </span>Access Restaurant Dashboard and go live!</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
  }
  
  export default ResturantSignUp;