import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import './about.css'
const About = () => {
  return (
    <>
  <Header/>
  <main>
  <div className="about">
            <div className="about-img">
                <img src="./images/about.jpg" alt=""/>
            </div>
            <div className="about-info">
                <span>About Us</span>
                <div className="about-text">
                    <p>Pets are not merely animals living with us. They become a part of our family because of the sheer comfort we get from them. I have always wanted a pet and last summer my mother bought me a puppy. He was the most adorable and beautiful puppy I had ever seen, and taking care of him became my responsibility. It was a suitable breed and had soft paws, which was a sign of expensive breeding. We decided to name our new golden retriever, Comet.</p>
                    <p>Comet had golden fur and long ears. His eyes were always joyful, and he was a bundle of joy. His golden coat shone in the sunlight as he ran about in our lawn. He loved eating roasted chicken and his dog food. At night, he would cuddle up in my bed, next to me, and go to sleep.</p>
                    <p>My father had created a small sleeping area for Comet, but he never slept there. He loved sleeping next to me at night. Comet was an active dog. He loved to go on walks, and we took him to the field twice a day. He became very popular among my friends, and they adored him.</p>
                    <p>Dogs are the most faithful animals, and Comet was no different. He knew all of us by our smell. Comet loved my mother very much, and when she would come home after work, Comet would jump on her and lick her face. All he wanted to be a little pat on the head. My mother would scratch his neck lovingly, and Comet would bask in all that attention he got.</p>
                    <p>He was a favorite in the family. We treated him like any other member and took him everywhere we went. We occasionally went on road trips, and Comet loved to ride the car. He would bark joyously when the wind ruffled his fur and enjoy the warm sunlight.</p>
                </div>
            </div>
        </div>
  </main>
  <Footer/>
    </>
  )
}

export default About