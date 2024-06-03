/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FullPageLoader from './Components/Loader/FullPageLoader'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../Features/Auth/AuthSlice'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fields = {
        email: '',
        password: '',
    }

    const [data, setData] = useState(fields)
    const [showPassword, setShowPassword] = useState(false)
    const [fullPageLoading, setFullPageLoading] = useState(true)

    const { loading, success, userInfo, message, error } = useSelector((state) => state.auth)

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefaukt()

        setTimeout(() => {
            setFullPageLoading(true)
            dispatch(userLogin(data))
        }, 500);
    }

    useEffect(()=>{
        setTimeout(() => {
            setFullPageLoading(false)
        }, 1000);
    },[])
    
    useEffect(()=>{
        if (success) {
            setFullPageLoading(false)
            setData({
                email: '',
                password: '',
            })
            navigate('/admin/dashboard')
        }
        if (error == 'Email not Found!') {
            setFullPageLoading(false)
            setData({
                email: '',
                password: '',
            })
        }
    },[success, message, error])

    return (
        <>
            { fullPageLoading && <FullPageLoader /> }
            <div className='guest-bg'>
                <div className='guest-body-bg guest-body-width p-4 custom-shadow rounded'>
                    <center>
                        <div className='d-flex flex-wrap align-items-center justify-content-center mb-4'>
                            <img src="/favIcon.png" style={{ width: '100px' }} alt="/favIcon.jpg" />
                            <div>
                                <div className='fs-3 text-primary fw-bold'>iMS</div>
                                <div className='fs-5 fw-bold'>Login to Get Started!</div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <TextField 
                                        id="outlined-basic" 
                                        name='email'
                                        label="Email" 
                                        variant="outlined" 
                                        size="small"
                                        className='mb-4'
                                        sx={{
                                            width: '100%'
                                        }}
                                        value={data?.email}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <TextField 
                                        id="outlined-basic"
                                        type={showPassword ? 'text' : 'password'}
                                        label="Password" 
                                        variant="outlined" 
                                        size="small"
                                        className='mb-4'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    { <i role='button' className={`fa-solid fa-eye${!showPassword ? '' : '-slash'}`} onClick={() => setShowPassword(!showPassword)}></i> }
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </div>
                            <Button type='submit' size="small" className='bg-primary mb-3' variant="contained"><i className="fa-solid fa-arrow-right-to-bracket"></i>&nbsp;&nbsp;Sign In</Button>
                        </form>
                    </center>
                    <Link to='/forget-password'>Forget Password ?</Link>
                    <div>Do not have account ?<Link to='/register'> Click here</Link> to register yourself!</div>
                </div>
            </div>
        </>
    )
}

export default Login