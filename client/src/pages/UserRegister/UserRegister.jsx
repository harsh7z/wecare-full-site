import React from 'react'
import axios from 'axios'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './userregister.css'
const UserRegister = () => {
    const navigate = useNavigate()
    const [otpSent, setOtpSent] = React.useState(false)
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: "",
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
        if(user.name === '' && user.email === '' && user.address === '' && user.city === '' && user.password === '' && user.phone === '') {
            message.error('Please provide add information !!')
        }
        else{

        if (user.name === '') {
            message.error('Please enter your name')
        }
        else {
            if (user.email === '' || !user.email.match("[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+")) {
                message.error('Invalid Email address')
            }
            else {
                if (user.address === '') {
                    message.error('Please enter your address')
                }
                else {
                    if (user.city === '') {
                        message.error('Please enter your city')
                    }
                    else {
                        if (user.phone === '') {
                            message.error('Please enter your phone number')
                        }
                        else {
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
                                            const res = await axios.post('http://localhost:8080/user/register', user)
                                            if (res.data.success) {
                                                message.success('Registerd Successfully')
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
                    }
                }
            }
        }
        }

    }

    const emailOtp = async(e) => {
        e.preventDefault()
        if(user.name === '' && user.email === '' && user.address === '' && user.city === '' && user.password === '' && user.phone === '') {
            message.error('Please provide add information !!')
        }
        else{

        if (user.name === '') {
            message.error('Please enter your name')
        }
        else {
            if (user.email === '') {
                message.error('Invalid Email address')
            }
            else {
                if (user.address === '') {
                    message.error('Please enter your address')
                }
                else {
                    if (user.city === '') {
                        message.error('Please enter your city')
                    }
                    else {
                        if (user.phone === '') {
                            message.error('Please enter your phone number')
                        }
                        else {
                            if (user.password === '') {
                                message.error('Please enter your password')
                            }
                            else {
                                if (user.password.length < 6) {
                                    message.error('Password must contain 6 or more letters')
                                }
                                else {
                                    try {
                                        const res = await axios.post('http://localhost:8080/user/sendEmail', user)
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
                        }
                    }
                }
            }
        }
        }
    }
    return (
        <>
            <div className="register flex-container">
                <div className="register-img">
                    <img src="./images/service.jpg" alt="" />
                </div>
                <form className='flex-container' onSubmit={onSubmit} onReset={emailOtp}>
                    <h1>Get Started</h1>
                    <input id='name' type="text" name='name' value={user.name} onChange={inputHandler} placeholder='Name' />
                    <input id='email' style={{textTransform : "lowercase"}} type="email" name='email' value={user.email} onChange={inputHandler} placeholder='E-mail Address' />
                    <input id='address' type="text" name='address' value={user.address} onChange={inputHandler} placeholder='Address' />
                    <input id='city' type="text" name='city' value={user.city} onChange={inputHandler} placeholder='City' />
                    <input id='phone' type="text" name='phone' value={user.phone} onChange={inputHandler} placeholder='Phone' />
                    <input id='password' style={{textTransform : "none"}} type="password" name='password' value={user.password} onChange={inputHandler} placeholder='Password' />
                    {otpSent && <input type="text" maxLength={4} name='otp' value={user.otp} onChange={inputHandler} placeholder='OTP' />}
                    {otpSent ? <button id='createAcc' type='submit'>Create account</button> : <button id='sendOtp' type='reset'>Send Otp</button>}
                    <Link to={'/login'}>Already a member? Click here</Link>
                    <Link to={'/home'}>Back</Link>
                </form>
            </div>
        </>
    )
}

export default UserRegister