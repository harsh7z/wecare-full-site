import React from 'react'
import axios from 'axios'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './userlogin.css'
const UserLogin = () => {
    const navigate = useNavigate()

    const [user,setUser] = React.useState({
        email:"",
        password:""
    })
    let name,value
    const inputHandler = (e) =>{
    name = e.target.name 
    value = e.target.value

    setUser({...user,[name]:value})

    }

const onSubmitHandler = async(e) =>{
    e.preventDefault()
    if(user.name === '' || user.password === ''){
        message.error('Please provide all information')
    }
    else{
        if(!user.email.match("[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+")){
            message.error('invalid email address')
        }
        else{
            try{
                const res = await axios.post('http://localhost:8080/user/login',user)
                if(res.data.success){
                    localStorage.setItem("token",res.data.token)
                    message.success('logged in successfully')
                    navigate('/home')
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
    }

}
  return (
    <>
    <div className="login flex-container">
    <div className="login-img">
    <img src="./images/dog-bed.jpg" alt="" />
    </div>
    
    <form className='flex-container' onSubmit={onSubmitHandler}>
        <h1>Member Login</h1>
        <input id='email' style={{textTransform : "lowercase"}} type="text" name='email' value={user.email} onChange={inputHandler} placeholder='E-mail'/>
        <input id='password' style={{textTransform : "none"}} type="password" name='password' value={user.password} onChange={inputHandler} placeholder='Password'/>
        <button id='loginbtn' type='submit'>Login</button>
    <Link id='register' to={'/register'}>Don't have an account yet? Click here</Link>
    <Link to={'/change-password'}>Forgot Password?</Link>
    <Link to={'/home'}>Back</Link>
    </form>
    </div>
    </>
  )
}

export default UserLogin