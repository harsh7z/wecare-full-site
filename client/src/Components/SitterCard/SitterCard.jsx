import React from 'react'
import './sittercard.css'
import { useNavigate } from 'react-router-dom'
const SitterCard = (props) => {
  const navigate = useNavigate()
  const onViewProfile = () => {
    navigate(`/search-sitter/sitter-profile/${props.item._id}`)
  }
  const onBookNow = () => {
    navigate(`/search-sitter/book-sitter/${props.item._id}`)
  }
  return (
    <>
      <div className="sitter-card flex-container" key={props.item._id}>
        <div className="sitter-img">
          <img src={props.item.profilImg} alt="" />
        </div>
        <div className="sitter-info">
          <div className="sitter-name flex-container">
            <span>{props.item.name}</span>
            <span>{props.item.services} starting from ₹{props.item.prices}/day</span>
          </div>
          <span>{props.item.about}</span>
          <span><i className="fa-solid fa-location-dot"></i> {props.item.city}</span>
          <div className="sitter-btns flex-container">
          <button id='viewprofile' type='submit' onClick={onViewProfile} className="sitter-btn">View profile</button>
          <button id= 'booksitter' type='submit' onClick={onBookNow} className="sitter-btn">Book A Sitter</button>
          </div>
        </div>
      </div>
    </>
  )
}


export default SitterCard