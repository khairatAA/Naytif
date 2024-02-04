import './App.css'
import LandingPage from './components/LandingPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import UserSignUp2 from './components/UserSignUp2';
import UserHeroPage from './components/UserHeroPage';
import UserLogin from './components/UserLogin';
import ResturantSignUp from './components/RestuarantSignIn';
import RestuarantHeroPage from './components/RestuarantHero';

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
        <Route path="/auth/restuarant/success" element={< RestuarantHeroPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
