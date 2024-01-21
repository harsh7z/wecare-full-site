import React from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const ChangePassword = () => {
    const [otpSent, setOtpSent] = React.useState(false)
    const navigate = useNavigate()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        otp: ""
    })
    let name, value
    const inputHandler = (e) => {
        name = e.target.name
        value = e.target.value

        setUser({ ...user, [name]: value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (user.password === '') {
            message.error('Please enter your password')
        }
        else {
            if (user.password.length < 6) {
                message.error('Password must contain 6 or more letters')
            }
            else {
                if(user.otp === ''){
                    message.error('Please enter otp')
                }
                else{
                    try {

                        const res = await axios.post('http://localhost:8080/user/changePassword', user)
                        // console.log('here')
                        if (res.data.success) {
                            message.success('Password Changed Successfully')
                            navigate('/login')
                        }
                        else {
                            message.error(res.data.message)
                        }
                    } catch (error) {
                        console.log(error)
                        message.error('Something went wrong')
                    }
                }
            }
        }
    }
    const emailOtp = async (e) =>{
        if (user.email === '') {
            message.error('Please enter your email address')
        }
        else{
            try {
                const res = await axios.post('http://localhost:8080/user/sendPasswordEmail', user)
                if (res.data.success) {
                    message.success(res.data.message)
                    setOtpSent(true)
                }
                else {
                    message.error(res.data.message)
                }
            } catch (error) {
                console.log(error)
                message.error('Something went wrong')
            }
        }

    }
  return (
    <>
    <div className="login flex-container">
    <div className="login-img">
    <img src="./images/dog-bed.jpg" alt="" />
    </div>
    
    <form className='flex-container' onSubmit={onSubmit} onReset={emailOtp}>
        <h1>Member Login</h1>
        <input style={{textTransform : "lowercase"}} type="text" name='email' value={user.email} onChange={inputHandler} placeholder='E-mail'/>
        {otpSent && <input style={{textTransform : "none"}} type="password" name='password' value={user.password} onChange={inputHandler} placeholder='New Password' />}
        {otpSent && <input type="text" maxLength={4} name='otp' value={user.otp} onChange={inputHandler} placeholder='OTP' />}
        {otpSent ? <button type='submit'>Change Password</button> : <button type='reset'>Send Otp</button>}
    <Link to={'/register'}>Don't have an account yet? Click here</Link>
    <Link to={'/home'}>Back</Link>
    </form>
    </div>
    </>
  )
}

export default ChangePassword