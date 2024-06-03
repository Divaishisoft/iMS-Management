/* eslint-disable no-unused-vars */
import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FullPageLoader from './Components/Loader/FullPageLoader'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {

    const [fullPageLoading, setFullPageLoading] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)
    const [formState, setFormState] = useState('rp')

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
                                <div className='fs-5 fw-bold'>
                                    {
                                        formState == 'fp' &&
                                        <>Forget Password ?</>
                                    }
                                    {
                                        formState == 'vt' &&
                                        <>Verify OTP Here !</>
                                    }
                                    {
                                        formState == 'rp' &&
                                        <>Reset Password Now !</>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            formState == 'fp' &&
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField 
                                            id="outlined-basic" 
                                            label="Email" 
                                            variant="outlined" 
                                            size="small"
                                            className='mb-4'
                                            sx={{
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </div>
                                <Button type='submit' size="small" className='bg-primary mb-3' variant="contained"><i className="fa-solid fa-paper-plane"></i>&nbsp;&nbsp;Sent OTP</Button>
                            </form>
                        }
                        {
                            formState == 'vt' &&
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField 
                                            id="outlined-basic" 
                                            label="OTP" 
                                            variant="outlined" 
                                            size="small"
                                            className='mb-4'
                                            sx={{
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </div>
                                <Button type='submit' size="small" className='bg-primary mb-3' variant="contained"><i className="fa-solid fa-circle-check"></i>&nbsp;&nbsp;Verify OTP</Button>
                            </form>
                        }
                        {
                            formState == 'rp' &&
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField 
                                            id="outlined-basic"
                                            type={showPassword ? 'text' : 'password'}
                                            label="New Password" 
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
                                    <div className="col-md-12">
                                        <TextField 
                                            id="outlined-basic"
                                            type={showCPassword ? 'text' : 'password'}
                                            label="Confirm Password" 
                                            variant="outlined" 
                                            size="small"
                                            className='mb-4'
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        { <i role='button' className={`fa-solid fa-eye${!showCPassword ? '' : '-slash'}`} onClick={() => setShowCPassword(!showCPassword)}></i> }
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </div>
                                <Button type='submit' size="small" className='bg-primary mb-3' variant="contained"><i className="fa-solid fa-key"></i>&nbsp;&nbsp;Change Password</Button>
                            </form>
                        }
                    </center>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword