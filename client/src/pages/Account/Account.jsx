import React from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import './account.css'
const Account = () => {
  const Bookings = (props) => {
    return(
      <>
    <div className="booking-layout">
    <h1>{props.item.type}</h1>
      <h2>{props.item.message}</h2>
    </div>
      </>
    )
  }
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  const getUserData = async () => {
    try {
      const res = await axios.post('http://localhost:8080/user/getUserData', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
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
    getUserData()
  }, [])
  return (
    <>
      <Header />
      <div className='user-account'>
        <div className="account-layout">
          <div className="user-info flex-container">
            <div className="username flex-container">
              <span>{user && user.name}</span>
              <span>{user && user.email}</span>
            </div>
            <button className='user-btns' onClick={onLogout}>Logout</button>
          </div>

          <div className="bookings flex-container">
            <span style={{fontSize: '2rem', fontFamily : 'FreigeistMono-Medium',}}>Bookings</span>
            <div className="booking-list">
              {user && user.bookings.map((item) => 
                  <Bookings item={item}/>  
            )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Account