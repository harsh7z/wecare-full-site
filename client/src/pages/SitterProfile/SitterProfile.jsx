import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import './sitterprofile.css'
const SitterProfile = () => {
  const [sitter, setSitter] = React.useState({})
  const navigate = useNavigate()
  const param = useParams()
  const id = param.id
  const fatchHandler = async () => {
    return await axios.get(`http://localhost:8080/sitter/getSitter/${id}`).then((res) => res.data)
  }
  React.useEffect(() => {
    fatchHandler().then((data) => setSitter(data.sitter))
  }, []);

  const onBookNow = () => {
    navigate(`/search-sitter/book-sitter/${id}`)
  }
  return (
    <>
      <Header />
      <main className="profile-container">
        <div className="sitter-img-name flex-container">
          <div className="sitter-profile">
            <img src={sitter.profilImg} alt="" />
          </div>
          <div className="sitter-about flex-container">
            <span>{sitter.name}</span>
            <span>{sitter.about}</span>
            <span><i className="fa-solid fa-location-dot"></i> {sitter.city}</span>
            <span><i class="fa-solid fa-phone"></i> {sitter.phone}</span>
          </div>
        </div>
        <div className="services">
            <table>
              <tr>
                <th>services</th>
                <th>prices</th>
              </tr>
              <tr>
                <td>{sitter.services}</td>
                <td>{sitter.prices}₹</td>
              </tr>
            </table>
            <button id= 'booksitter' onClick={onBookNow} className='book-btn' >Book a sitter</button>
        </div>

      </main>
      <Footer />
    </>
  )
}

export default SitterProfile