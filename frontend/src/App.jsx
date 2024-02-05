import './App.css'
import LandingPage from './components/LandingPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import UserSignUp2 from './components/UserSignUp2';
import UserHeroPage from './components/UserHeroPage';
import UserLogin from './components/UserLogin';
import ResturantSignUp from './components/RestuarantSignIn';
import RestuarantHeroPage from './components/RestuarantHero';
import RiderSignIn from './components/RiderSignIn';
import RestaurantLogin from './components/RestaurantLogin';
import RiderHeroPage from './components/RiderHero';
import RestuarantSideBar from './components/RestuarantSideBar';
import RestuarantHome from './components/RestuarantHome';

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

        <Route path="/auth/rider/sign_up" element={<RiderSignIn />} />
        <Route path="/auth/rider/success" element={<RiderHeroPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
