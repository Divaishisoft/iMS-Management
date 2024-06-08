/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FullPageLoader from '../../Components/Loader/FullPageLoader'
import { useNavigate } from 'react-router-dom'

const FirmSelect = () => {

    const navigate = useNavigate()

    const [fullPageLoading, setFullPageLoading] = useState(true)
    const [list, setList] = useState([
        { _id: '646ef6541841651ed541', firmName: 'Shriram Textiles' },
        { _id: '646ef6541841651ed963', firmName: 'Bajrang Cement' },
    ])

    const handleFirmSelection = (id) => {
        console.log(id)
    }

    useEffect(()=>{
        setTimeout(() => {
            setFullPageLoading(false)
        }, 1000)
    },[])

    return (
        <>
            { fullPageLoading && <FullPageLoader /> }
            <div className='guest-bg'>
                <div className='guest-body-bg guest-body-width p-4 custom-shadow rounded'>
                    <h5 className='text-center text-primary mb-4'>Select Company</h5>
                    <div className='d-flex align-items-center justify-content-center gap-3'>
                        {
                            Array?.isArray(list) && list?.map((val,key) => (
                                <Button key={key} variant="outlined" onClick={()=>{
                                    setTimeout(() => {
                                        handleFirmSelection(val?._id)
                                    }, 500);
                                }}>{val?.firmName}</Button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FirmSelect