/* eslint-disable no-unused-vars */
import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FullPageLoader from './Components/Loader/FullPageLoader'
import { Link } from 'react-router-dom'

const Register = () => {

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
                        <div className='d-flex flex-wrap align-items-center justify-content-center mb-4'>
                            <img src="/favIcon.png" style={{ width: '100px' }} alt="/favIcon.jpg" />
                            <div>
                                <div className='fs-3 text-primary fw-bold'>iMS</div>
                                <div className='fs-5 fw-bold'>Register Yourself!</div>
                            </div>
                        </div>
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <TextField 
                                        id="outlined-basic" 
                                        label="First name" 
                                        variant="outlined" 
                                        size="small"
                                        className='mb-4'
                                        sx={{
                                            width: '100%'
                                        }}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Last name" 
                                        variant="outlined" 
                                        size="small"
                                        className='mb-4'
                                        sx={{
                                            width: '100%'
                                        }}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Email" 
                                        variant="outlined" 
                                        size="small"
                                        className='mb-4'
                                        sx={{
                                            width: '100%'
                                        }}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Phone" 
                                        variant="outlined" 
                                        size="small"
                                        className='mb-4'
                                        sx={{
                                            width: '100%'
                                        }}
                                        required
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
                                        required
                                    />
                                </div>
                            </div>
                            <Button type='submit' size="small" className='bg-primary mb-3' variant="contained"><i className="fa-solid fa-user-check"></i>&nbsp;&nbsp;Register</Button>
                        </form>
                    </center>
                    <div>Already have account ?<Link to='/'> Click here</Link> to Login!</div>
                </div>
            </div>
        </>
    )
}

export default Register