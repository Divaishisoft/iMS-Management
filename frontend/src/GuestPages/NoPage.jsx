/* eslint-disable no-unused-vars */
import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FullPageLoader from './Components/Loader/FullPageLoader'
import { Link } from 'react-router-dom'

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [fullPageLoading, setFullPageLoading] = useState(true)

    useEffect(()=>{
        setTimeout(() => {
            setFullPageLoading(false)
        }, 1000);
    },[])

    return (
        <>
            { fullPageLoading && <FullPageLoader /> }
            <div className='guest-bg'>
                <div className='guest-body-bg guest-body-width p-4 custom-shadow rounded'>
                    <center>
                        <img src="/noPageFound.png" className='w-100' alt="/noPageFound.png" />
                        <h3>No Page Found</h3>
                    </center>
                </div>
            </div>
        </>
    )
}

export default Login