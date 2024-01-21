import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
const Services = () => {
  const ServiceCard = (props) => {
    const { title, service } = props.services
    return (
      <div className="service-card">
        <h2>{title}</h2>
        <p>{service}</p>
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
  return (
    <>
    <Header />
    <main className="main-container">
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
    </main>
    <Footer/></>
  )
}

export default Services