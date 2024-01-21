import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice'
import axios from 'axios';
export default function ProtectedRoute({children}){
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const getUser = async() => {
        try {
            const res = await axios.post('http://localhost:8080/user/getUserData',
            { token: localStorage.getItem('token')},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }else{
               return <Navigate to='/login' />
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        if(!user){
            getUser()
        }
    },[user,getUser])

    if(localStorage.getItem('token')){
        return children
    }else{
        return <Navigate to={"/login"}/>
    }
}