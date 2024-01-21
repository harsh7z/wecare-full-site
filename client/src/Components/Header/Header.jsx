import React from 'react'
import './header.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const [navbar,setNavbar] =React.useState(false)
  
  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  React.useEffect(() => {
    changeBackground()
    window.addEventListener("scroll", changeBackground)
  })

  return (
  <header> 
    <div className= {navbar ? 'nav-active flex-container' : 'nav-bar flex-container'} >
      <div className="nav-branding">
        <NavLink to="/home">WeCare</NavLink>
      </div>
      <div className="nav-links">
        <ul className='flex-container'>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink id='findsitter' to="/search-sitter">Find a sitter</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink id='account' to="/account">Account</NavLink></li>
        </ul>
      </div>
      
    </div>
  </header>
  )
}

export default Header