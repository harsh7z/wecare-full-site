import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSitter } from '../redux/features/sitterSlice';
import axios from 'axios';
export default function SitterProtectedRoute({children}){
    const dispatch = useDispatch()
    const  { sitter }   = useSelector(state => state.sitter)
    const getSitter = async() => {
        try {
            const res = await axios.post('http://localhost:8080/sitter/getSitterData',
            { sitterToken: localStorage.getItem('sitterToken')},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('sitterToken')}`
                }
            })
            if(res.data.success){
                dispatch(setSitter(res.data.data))
            }else{
               return <Navigate to='/sitter-register' />
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        if(!sitter){
            getSitter()
        }
    },[sitter,getSitter])

    if(localStorage.getItem('sitterToken')){
        return children
    }else{
        return <Navigate to={"/sitter-register"}/>
    }
}