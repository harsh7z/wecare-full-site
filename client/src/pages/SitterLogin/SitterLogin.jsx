import React from 'react'
import axios from 'axios'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './sitterlogin.css'

const SitterLogin = () => {
    const navigate = useNavigate()
    const [sitter,setSitter] = React.useState({
        email:"",
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
    try{
        const res = await axios.post('http://localhost:8080/sitter/sitter-login',sitter)
        if(res.data.success){
            localStorage.setItem("sitterToken",res.data.sitterToken)
            message.success('logged in successfully')
            navigate('/sitter')
        }
        else{
            message.error(res.data.message)
        }
    }
    catch(error){
        console.log(error)
        message.error('Something went wrong')
    }
}
  return (
    <>
   <div className="login flex-container">
    <div className="login-img">
    <img src="./images/site-info.jpg" alt="" />
    </div>
    
    <form className='flex-container' onSubmit={onSubmit}>
        <h1>Sitter Login</h1>
        <input style={{textTransform : "lowercase"}} type="text" name='email' value={sitter.email} onChange={inputHandler} placeholder='email'/>
        <input style={{textTransform : "none"}} type="password" name='password' value={sitter.password} onChange={inputHandler} placeholder='password'/>
        <button type='submit'>Login</button>
        <Link to={'/sitter-register'}>Don't have an account yet? Click here</Link>
    <Link to={'/home'}>Back</Link>
    </form>
    </div>
    </>
  )
}

export default SitterLogin