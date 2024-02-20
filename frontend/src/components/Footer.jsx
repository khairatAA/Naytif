// Footer section
import { Copyright } from 'lucide-react';
import twitter from '../assets/twitter.svg';
import whatsapp from '../assets/whatsapp.svg';
import facebook from '../assets/facebook.svg';

function Footer() {
    return (
      <footer className=' flex flex-col bg-powder-blue pt-20 pb-4 px-11 gap-6 items-stretch'>
        <div className=' flex flex-row flex-wrap gap-5 items-start justify-between'>
            <div>
                <h1 className=' font-semibold text-4xl'>Naytif</h1>
            </div>
            <div className=' flex flex-row justify-between gap-20'>
                <div className=' flex flex-col gap-1'>
                    <a href="">Get help</a>
                    <a href="">Sign Up</a>
                    <a href="">Log in</a>
                    <a href="">Create a business account</a>
                    <a href="">Promotions</a>
                </div>
                <div className=' flex flex-col gap-1'>
                    <a href="">Restaurants Near Me</a>
                    <a href="">Menu Categories</a>
                    <a href="">View all Cities</a>
                    <a href="">Pick Up or Delivery</a>
                    <a href="">About Naytiv</a>
                </div>
            </div>
        </div>
        <div className=' flex flex-col items-center justify-center gap-3'>
            <div className=' flex flex-row gap-3'>
                <a href=""><img src={twitter} alt="" /></a>
                <a href=""><img src={whatsapp} alt="" /></a>
                <a href=""><img src={facebook} alt="" /></a>
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