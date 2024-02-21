// Footer section
import { Copyright } from 'lucide-react';
import twitter from '../assets/twitter.svg';
import whatsapp from '../assets/whatsapp.svg';
import facebook from '../assets/facebook.svg';
import { Link } from "react-router-dom";
import { Linkedin } from 'lucide-react';

function Footer() {
    return (
      <footer className=' flex flex-col bg-powder-blue pt-20 pb-4 px-11 gap-6 items-stretch'>
        <div className=' flex flex-row flex-wrap gap-5 items-start justify-between'>
            <div>
                <h1 className=' font-semibold text-4xl'>Naytif</h1>
            </div>
            <div className=' flex flex-row justify-between gap-20'>
                <div className=' flex flex-col gap-1'>
                    <Link to="">Get help</Link>
                    <Link to="">Sign Up</Link>
                    <Link to="">Log in</Link>
                    <Link to="">Create a business account</Link>
                    <Link to="">Promotions</Link>
                </div>
                <div className=' flex flex-col gap-1'>
                    <Link to="">Restaurants Near Me</Link>
                    <Link to="">Menu Categories</Link>
                    <Link to="">View all Cities</Link>
                    <Link to="">Pick Up or Delivery</Link>
                    <Link to="">About Naytiv</Link>
                </div>
            </div>
        </div>
        <div className=' flex flex-col items-center justify-center gap-3'>
            <div className=' flex flex-row gap-3 items-baseline'>
                <p className=' font-semibold'>Built by Khairat Adesina</p>
                <a href="https://www.linkedin.com/in/khairat-adesina1234/" target='_blank'><Linkedin size={20} color='blue' /></a>
                <a href="https://twitter.com/_dedamola" target='_blank'><img src={twitter} className=' w-5' alt="" /></a>
                <p className=' font-semibold'> and Omar Jammeh</p>
                <a href="http://www.linkedin.com/in/omar-jammeh-a4b0b029a" target='_blank'><Linkedin size={20} color='blue' /></a>
                <a href="https://twitter.com" target='_blank'><img src={twitter} className=' w-5' alt="" /></a>
            </div>
            <div className=' flex flex-row justify-center items-center gap-3'>
                <Copyright />
                <p>2024 Naytiv</p>
            </div>
        </div>
      </footer>
    )
  }
  
  export default Footer;