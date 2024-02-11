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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/auth/sign_up_1" element={<UserSignUp />} />
        <Route path="/auth/sign_up_2" element={<UserSignUp2 />} />
        <Route path="/auth/success" element={<UserHeroPage />} />
        <Route path="/auth/login" element={<UserLogin />} />

        <Route path="/auth/restuarant/sign_up" element={<ResturantSignUp />} />
        <Route path="/auth/restuarant/login" element={<RestaurantLogin />} />
        <Route path="/auth/restuarant/success" element={< RestuarantHeroPage />} />
        <Route path="/restuarant/home" element={<RestuarantHome />} />
        <Route path="/restuarant/addNewMenu" element={<AddNewMenuItem />} />

        <Route path="/auth/rider/sign_up" element={<RiderSignIn />} />
        <Route path="/auth/rider/success" element={<RiderHeroPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
