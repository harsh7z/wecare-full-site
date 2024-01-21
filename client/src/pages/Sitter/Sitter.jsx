import React from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import SitterBooking from '../../Components/SitterBooking/SitterBooking'

const Sitter = () => {
  const { sitter } = useSelector((state) => state.sitter)

  const navigate = useNavigate()
  const getSitterData = async() =>{
    try {
      const res = await axios.post('http://localhost:8080/sitter/getSitterData',{},{
        headers:{
          Authorization: "Bearer " + localStorage.getItem('sitterToken')
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  
  const onLogout = () => {
    localStorage.clear()
    message.success('log out successfully')
    navigate('/home')
  }
  React.useEffect(() => {
    getSitterData()
  },[])

  return (
    <>
  <div className="user-info flex-container">
            <div className="username flex-container">
              <span>{sitter && sitter.name}</span>
              <span>{sitter && sitter.email}</span>
            </div>
            <button className='user-btns' onClick={onLogout}>Logout</button>
          </div>
    {sitter ? sitter.bookings.map((item) => 
    <SitterBooking item={item}/>
    ) : 'not found'}

    </>
  )
}

export default Sitter