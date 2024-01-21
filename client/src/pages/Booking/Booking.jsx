import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { DatePicker } from 'antd'
import './booking.css'
const Booking = () => {
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
  React.useEffect(() => {
    getUserData()
  }, [])
  const [sitter, setSitter] = React.useState({})
  const param = useParams()
  const id = param.id
  const fatchHandler = async () => {
    return await axios.get(`http://localhost:8080/sitter/getSitter/${id}`).then((res) => res.data)
  }
  React.useEffect(() => {
    fatchHandler().then((data) => setSitter(data.sitter))
  }, []);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_2OYT9adMjcX9Ve",
      amount: data.amount,
      currency: data.currency,
      name: sitter.name,
      description: "Test Transaction",
      order_id: data.id,
      redirect: false,
      handler: async () => {
        try {
          const res = await axios.post('http://localhost:8080/user/bookSitter', booking)
          if (res.data.success) {
            message.success(res.data.message)
            navigate('/account')
          }
          else {
            message.error(res.data.message)
          }
        }
        catch (error) {
          console.log(error)
          message.error('Something went wrong!')
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

  };
  const[date,setDate] =React.useState()
  const booking = {
    userId: user && user._id,
    sitterId: sitter._id,
    date:date
  }
  const bookSitter = async () => {

    try {
      const data = await axios.post(`http://localhost:8080/user/payment/${sitter._id}`)
      initPayment(data.data.data)
    }
    catch (error) {
      console.log(error)
      message.error('Something went wrong!')
    }

  }
  const getDatePicker =(e)=>{
    setDate(e.format("DD-MM-YYYY"))
  }
  return (
    <>
    <Header />
    <main className="booking-cointainer">
    <div className="sitter-card flex-container" key={sitter._id}>
        <div className="sitter-img">
          <img src={sitter.profilImg} alt="" />
        </div>
        <div className="sitter-info">
          <div className="sitter-name flex-container">
            <span>{sitter.name}</span>
            <span>{sitter.services} starting from ₹{sitter.prices}/day</span>
          </div>
          <span>{sitter.about}</span>
          <span><i className="fa-solid fa-location-dot"></i> {sitter.city}</span>
          <div className="sitter-btns flex-container">
          </div>
        </div>
      </div>
      <div className="booking-con flex-container">
      <DatePicker id='datepicker' onChange={value => getDatePicker(value)} size='large' className='datePicker' format='DD-MM-YY' />
      <button id='confirmbooking' onClick={bookSitter} className='book-btn'>confirm Booking</button>
      </div>
    </main>
    <Footer />
    </>
  )
}

export default Booking