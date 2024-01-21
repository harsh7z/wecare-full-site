import React from 'react'
import { NavLink } from 'react-router-dom'
import './footer.css'
const Footer = () => {
  return (
    <>
    <div className="footer">
       <div className="footer-branding">
        <NavLink to="/home">WeCare</NavLink>
        </div>    
        
        <div className="footer-s1">
            <span>About us</span>
            <span>Blog</span>
            <span>Find a sitter</span>
        </div>

        <div className="footer-s2">
            <span>Pet Boarding</span>
            <span>Day care</span>
            <span>House sitting</span>
            <span>Dog walking</span>
            <span>Pet grooming</span>
        </div>

        <div className="footer-s3">
            <span>Help center</span>
            <span>Contact us</span>
            <NavLink className='join-us' to="/join-us">Become A Sitter</NavLink>
        </div>

        <div className="socials">
            <a href="https://www.facebook.com"><i className="fa-brands fa-facebook-square"></i></a>
            <a href="https://www.instagram.com"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://in.pinterest.com"><i className="fa-brands fa-pinterest-square"></i></a>
        </div>
    </div>
    </>
  )
}

export default Footer