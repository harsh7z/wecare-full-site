import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import './sitterregister.css'
const SitterRegister = () => {
    const navigate = useNavigate()
    const handleImgUpload = async(e) => {
        const file = e.target.files[0]
        convertToBase64(file).then((value) => setSitter({...sitter,profilImg: value }))        
    }
    const [sitter,setSitter] = React.useState({
        profilImg: "",
        name:"",
        email:"",
        address:"",
        phone:"",
        password:""
    })

let name,value
const inputHandler = (e) =>{
    name = e.target.name 
    value = e.target.value
    setSitter({...sitter,[name]:value})
}

const onSubmit = async(e) =>{
    e.preventDefault()

    const res = await axios.post('http://localhost:8080/sitter/register',sitter)
    if(res.data.success){
        message.success('Registerd Successfully')
        navigate('/sitter-login')
    }
    else{
        message.error(res.data.message)
    }
}
  return (
    <>
    <div className="sitter-register flex-container">
    <div className="sitter-profile-img" >
    <img src={sitter.profilImg || './images/user.png' } alt="userImg" />
    <input className='imgUpload' type="file" name='profileImg' accept='.jpeg, .png, .jpg' onChange={handleImgUpload}/>
    
    </div>
    
    <form className='flex-container' onSubmit={onSubmit}>
    <h1>Get Started</h1>
        <input type="text" name='name' value={sitter.name} onChange={inputHandler} placeholder='Name'/>
        <input style={{textTransform : "lowercase"}} type="email" name='email' value={sitter.email} onChange={inputHandler} placeholder='E-mail'/>
        <input type="text" name='about' value={sitter.about} onChange={inputHandler} placeholder='about'/>
        <input type="text" name='address' value={sitter.address} onChange={inputHandler} placeholder='Address'/>
        <input type="text" name='city' value={sitter.city} onChange={inputHandler} placeholder='City'/>
        <input type="text" name='services' value={sitter.services} onChange={inputHandler} placeholder='Services'/>
        <input type="text" name='prices' value={sitter.prices} onChange={inputHandler} placeholder='Price'/>
        <input type="text" name='phone' value={sitter.phone} onChange={inputHandler} placeholder='Phone'/>
        <input style={{textTransform : "none"}} type="password" name='password' value={sitter.password} onChange={inputHandler} placeholder='Password'/>
        <button type='submit'>Create sitter account</button>
    <Link to={'/sitter-login'}>Already a sitter? Click here</Link>
    <Link to={'/home'}>Back</Link>
    </form>
    </div>
    </>
  )
}

export default SitterRegister

function convertToBase64(file){

    return new Promise((resolve ,reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}