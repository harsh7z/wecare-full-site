import React from 'react'
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Sitter from './pages/Sitter/Sitter';
import About from './pages/About/About';
import Account from './pages/Account/Account';
import UserLogin from './pages/UserLogin/UserLogin';
import UserRegister from './pages/UserRegister/UserRegister';
import SitterLogin from './pages/SitterLogin/SitterLogin';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import SearchSitter from './pages/SearchSitter/SearchSitter';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SitterRegister from './pages/SitterRegister/SitterRegister';
import SitterProtectedRoute from './Components/SitterProtectedRoute';
import SitterPublicRoute from './Components/SitterPublicRoute';
import SitterProfile from './pages/SitterProfile/SitterProfile';
import JoinUs from './pages/JoinUs/JoinUs';
import Booking from './pages/Booking/Booking';
import ChangePassword from './pages/ChangePassword/ChangePassword';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/services",
    element: <Services />
  },
  {
    path: "/sitter",
    element: <SitterProtectedRoute><Sitter /></SitterProtectedRoute>
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/register",
    element: <PublicRoute><UserRegister /></PublicRoute>
  },
  {
    path: "/account",
    element: <ProtectedRoute><Account /></ProtectedRoute>
  },
  {
    path: "/login",
    element: <PublicRoute><UserLogin /></PublicRoute>
  },
  {
    path: "/sitter-login",
    element: <SitterPublicRoute><SitterLogin /></SitterPublicRoute>
  },
  {
    path: "/sitter-register",
    element: <SitterPublicRoute><SitterRegister /></SitterPublicRoute>
  },
  {
    path: "/search-sitter",
    element: <ProtectedRoute><SearchSitter /></ProtectedRoute>
  },
  {
    path: "/search-sitter/:location",
    element:  <ProtectedRoute><SearchSitter /></ProtectedRoute>
  },
  {
    path: "/search-sitter/sitter-profile/:id",
    element: <SitterProfile />
  },
  {
    path: "/search-sitter/book-sitter/:id",
    element: <Booking />
  },
  {
    path: "/join-us",
    element: <JoinUs />
  },
  {
    path: "/change-password",
    element: <ChangePassword />
  }
]);
const App = () => {

  return (
      <RouterProvider router={router} />
  )
} 

export default App