import React from 'react'
import './sitterbooking.css'
const SitterBooking = (props) => {
  return (
   <>
   <div className="booking-layout">
    <h1>{props.item.type}</h1>
    <h3>{props.item.message}</h3>
   </div>
   </>
  )
}

export default SitterBooking