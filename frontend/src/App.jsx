import './App.css'
import LandingPage from './components/Users/LandingPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignUp from './components/Users/UserSignUp';
import UserSignUp2 from './components/Users/UserSignUp2';
import UserHeroPage from './components/Users/UserHeroPage';
import UserLogin from './components/Users/UserLogin';
import ResturantSignUp from './components/Restaurants/RestuarantSignIn';
import RestuarantHeroPage from './components/Restaurants/RestuarantHero';
import RiderSignIn from './components/Riders/RiderSignIn';
import RestaurantLogin from './components/Restaurants/RestaurantLogin';
import RiderHeroPage from './components/Riders/RiderHero';
import RestuarantSideBar from './components/Restaurants/RestuarantSideBar';
import RestuarantHome from './components/Restaurants/RestuarantHome';
import AddNewMenuItem from './components/Restaurants/AddNewMenu';
import AvaliableMenuItems from './components/Restaurants/AvaliableMenuItems';
import UpdateRestaurant from './components/Restaurants/UpdateRestaurant';
import UserTop from './components/Users/UserTop';
import UserHome from './components/Users/UserHome';
import UserMenuPage from './components/Users/UserMenuPage';
import UserDelivery from './components/Users/UserDelivery';
import OrderSummary from './components/Users/OrderSummary';
import OrderConfirmation from './components/Users/OrderComfirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/auth/sign_up_1" element={<UserSignUp />} />
        <Route path="/auth/sign_up_2" element={<UserSignUp2 />} />
        <Route path="/auth/success" element={<UserHeroPage />} />
        <Route path="/auth/login" element={<UserLogin />} />
        <Route path="/users/home" element={<UserHome />} />
        <Route path="/users/:restaurant_id/available_menu" element={<UserMenuPage />} />
        <Route path="/users/delivery_details" element={<UserDelivery />} />
        <Route path="/users/order_summary" element={<OrderSummary />} />
        <Route path="/users/order_confirmation" element={<OrderConfirmation />} />

        <Route path="/auth/restuarants/sign_up" element={<ResturantSignUp />} />
        <Route path="/auth/restuarants/login" element={<RestaurantLogin />} />
        <Route path="/auth/restuarants/success" element={< RestuarantHeroPage />} />
        <Route path="/restuarants/home" element={<RestuarantHome />} />
        <Route path="/restaurants/:restaurant_id/menu" element={<AddNewMenuItem />} />
        <Route path="/restaurants/:restaurant_id/available_menu" element={<AvaliableMenuItems />} />
        <Route path="/restaurants/:restaurant_id/update_restaurant" element={<UpdateRestaurant /> } />

        <Route path="/auth/rider/sign_up" element={<RiderSignIn />} />
        <Route path="/auth/rider/success" element={<RiderHeroPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
