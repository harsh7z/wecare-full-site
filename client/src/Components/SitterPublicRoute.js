import React from 'react';
import { Navigate } from 'react-router-dom';

export default function SitterPublicRoute({children}){
    if(localStorage.getItem('sitterToken')){
        return <Navigate to={"/home"}/>
    }else{
        return children
    }
}