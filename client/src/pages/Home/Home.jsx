import React from 'react'
import Header from '../../Components/Header/Header'
import { message } from 'antd'
import './home.css'
import Footer from '../../Components/Footer/Footer'
// import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const procedure = [
  {
    no: '01',
    task: 'Search for a sitter',
    para: 'Find experienced local pet sitter nearby'
  },
  {
    no: '02',
    task: 'Make a booking',
    para: 'Book the right sitter and get to know your sitter in person'
  },
  {
    no: '03',
    task: 'Pay online or cash',
    para: 'Choose the most convenlent payment method'
  }
]
const ProcedureCard = (props) => {
  const { no, task, para } = props.procedure
  return (
    <div className='procedure-card flex-container'>
      <span>{no}</span>
      <div className="procedure-card-text">
        <h2>{task}</h2>
        <p>{para}</p>
      </div>
    </div>
  )
}
const services = [
  {
    title: 'Pet Boarding',
    service: "Your pet stays overnight in the pet sitter's home during your absence"
  },
  {
    title: 'House Sitting',
    service: "Your sitter takes care of your pet and your home if you’re away for a few days"
  },
  {
    title: 'Day Care',
    service: "Your sitter takes care of your pet at your home during the daytime"
  },
  {
    title: 'Pet Grooming',
    service: "Regular grooming is essential to your pet's healthas it helps prevent skin issues"
  },
  {
    title: 'Dog Walking',
    service: "The dog walker comes for the dog, puts on safety gear and a GPS tracker, so you can track their location"
  }
]
const ServiceCard = (props) => {
  const { title, service } = props.services
  return (
    <div className="service-card">
      <h2>{title}</h2>
      <p>{service}</p>
    </div>
  )
}
const Home = () => {
  const navigate = useNavigate()
  const [location,setLocation] = React.useState('')
  // const getUserData = async() =>{
  //   try {
  //     const res = await axios.post('http://localhost:8080/user/getUserData',{},{
  //       headers:{
  //         Authorization: "Bearer " + localStorage.getItem('token')
  //       }
  //     })
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const locationInput = (e) => {
    setLocation(e.target.value)
  }
  const onSearch = (e) => {
    e.preventDefault()

    if(location===''){
      message.error('Please provide name of your city')
    }
    else{
      navigate(`/search-sitter/${location}`)
    }
  }
  // React.useEffect(() => {
  //   getUserData()
  // },[])
  return (
    <>
      <Header />
      <main className="main-container">
        <div className="landing-section flex-container">
          <div className="img-card">
          <img src='images/dog.jpg' alt="dog-img" srcSet="" />
          </div>
          <div className="text-card flex-container">
            <span>The ultimate care <br /> for your furry <br />family member.</span>
            <form className='search-bar' onSubmit={onSearch}> <select name="location" id="location" onChange={locationInput} defaultValue={location}>
            <option value="" disabled selected hidden>Select Your Location</option>
            <option value="ahmedabad">Ahmedabad</option>
            <option value="navsari">Navsari</option>
            <option value="surat">Surat</option>
            <option value="valsad">Valsad</option>
            </select>
            <button>Search</button></form>
          </div>

        </div>
        <div className="procedure-contianer flex-container">

          {
            procedure.map((item) => (
              <ProcedureCard procedure={item} />
            ))
          }

        </div>
        <div className="service-container">
          <span>Our services</span>
          <div className="services">
            <div className="service-img">
              <img src="./images/service.jpg" alt="service img" />
            </div>
            <div className="service-info">
              {services.map((item) => (
                <ServiceCard services={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="ad-container flex-container">
          <div className="info-card">
            <span>Why choose us ? </span>
            <div className="info-text">
              <p><i className="fa-solid fa-circle-check"></i> All sitter pass a manadatory background check</p>
              <p><i className="fa-solid fa-circle-check"></i> Meeting face to face with a sitter before booking</p>
              <p><i className="fa-solid fa-circle-check"></i> Flexible cancellations in case your plans change</p>
              <p><i className="fa-solid fa-circle-check"></i> GPS walk maps and photo updates</p>
              <p><i className="fa-solid fa-circle-check"></i> All reviews are verified</p>
              <p><i className="fa-solid fa-circle-check"></i> 24/7 support</p>
            </div>
          </div>
          <div className="ad-img flex-container">
            <img src="./images/dog-bed.jpg" alt="" />
          </div>
        </div>
        <div className="ad-container flex-container">
          <div className="ad-img flex-container">
            <img src="./images/ad.jpg" alt="" />
          </div>
          <div className="ad-text flex-container">
            <span>Trustworthy care for your pet</span>
            <p>All services booked on we care are backed by the guarantee and reservation protection</p>
            <Link to='/search-sitter' className='flex-container'>Search a sitter</Link>
          </div>
        </div>
        <div className="review-container">
        <div className="rating-section">
            <span>What people think about us?</span><br />
            <span> 245 reviews</span>
            <span>          
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half"></i>
            </span>
            <span> 4.9</span>
        </div>
        <div className="review-card-flex">
            <div className="review-card">
                <div className="review-img">
                    <img src="./images/review-1.jpg" alt=""/>
                </div>

                <div className="review-text">
                    <span>          
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </span>

                    <span>
                        My dog had a great time with Maria! She sent pictures and videos and updated me with how it was going! Would definitely user her again for dog sitting.
                    </span>

                    <span>Eva, Navsari</span>
                </div>

            </div>
            
            <div className="review-card">
                <div className="review-img">
                    <img src="./images/review-2.jpg" alt=""/>
                </div>

                <div className="review-text">
                    <span>          
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </span>

                    <span>
                        Natalie took great care of our cat. We got a lot of photos and even some videos. We came home to a happy cat, highly recommended.
                    </span>

                    <span>Ravi, Valsad</span>
                </div>

            </div>

        </div>
        </div>

              <div className="faq-section">
        <div className="faq-flex">
            <div className="faq-text">
                <span>FAQ's</span>
            </div>
            <div className="faq">
                <p>How does We Care work?</p>
                <p>How do I find p pet sitter?</p>
                <p>How do I change or cancle an appointment?</p>
                <p>Can I trust a We Care pet sitter?</p>
                <p>When do i need to pay?</p>
                <p>Can I pay the pet sitter directly or in cash?</p>
                <p>Will my pet be insured while in sitter's care?</p>
            </div>
        </div>
    </div>

    <div className="instagram">
        <div className="instagram-link">
            <span>Keep up with us on Instagram</span>
            <span><a href="https://www.instagram.com">@weCNameare</a></span>
        </div>

        <div className="instagram-imgs">
            <img src="./images/insta-1.jpg" alt=""/>
            <img src="./images//insta-2.jpg" alt=""/>
            <img src="./images/insta-3.jpg" alt=""/>
        </div>
    </div>
        
      </main>
      <Footer />
    </>
  )
}

export default Home