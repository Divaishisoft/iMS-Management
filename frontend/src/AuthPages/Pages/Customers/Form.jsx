/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { Link, useNavigate } from 'react-router-dom';
import FullPageLoader from '../../Components/Loader/FullPageLoader';
import { Button, TextField } from '@mui/material';

export default function CustomerForm() {

    const navigate = useNavigate()

    const fields = {
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        gstNumber: '',
        customerCity: '',
        customerPincode: '',
        customerState: '',
        customerAddress: '',
    }

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
            { pageName: 'Customers', url: '/admin/customers' },
        ],
        currentPage: 'Add Customer'
    })
    const [fullPageLoading, setFullPageLoading] = React.useState(true)
    const [data, setData] = React.useState(fields)

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setTimeout(() => {
            setFullPageLoading(false)
        }, 1000);
    }

    React.useEffect(()=>{
        setTimeout(() => {
            setFullPageLoading(false)
        }, 1000);
    },[])

    return (
        <Box sx={{ display: 'flex' }}>
            { fullPageLoading && <FullPageLoader /> }
            <DrawerIndex />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeaderComponent />
                
                <div className='row'>
                    <div className="col-md-12 mb-3">
                        <div className='bg-white rounded px-3 py-2 custom-shadow-light'>
                            <BreadcrumbsIndex breadcrumbs={breadcrumbs} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className='bg-white rounded px-3 py-2 custom-shadow-light'>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className='mb-3'><small>Fields with <span className='text-danger'>*</span> are required.</small></div>
                                    <div className="col-md-6">
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="customerName" className='w-280px mb-2'>Customer Name <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="customerName" 
                                                name='customerName'
                                                value={data?.customerName} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Customer Name" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="customerEmail" className='w-280px mb-2'>Customer Email <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="customerEmail"
                                                name='customerEmail'
                                                value={data?.customerEmail}  
                                                size='small' 
                                                className='w-280px mb-4' 
                                                label="Enter Customer Email" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required 
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="customerPhone" className='w-280px mb-2'>Customer Phone <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="customerPhone"
                                                name='customerPhone'
                                                value={data?.customerPhone}  
                                                size='small' 
                                                className='w-280px mb-4' 
                                                label="Enter Customer Phone" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required 
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="customerCity" className='w-280px mb-2'>Customer City <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="customerCity" 
                                                name='customerCity'
                                                value={data?.customerCity} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Customer City" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="customerPincode" className='w-280px mb-2'>Customer Pincode <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="customerPincode"
                                                name='customerPincode'
                                                value={data?.customerPincode}  
                                                size='small' 
                                                className='w-280px mb-4' 
                                                label="Enter Customer Pincode" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="gstNumber" className='w-280px mb-2'>GST Number <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="gstNumber"
                                                name='gstNumber'
                                                value={data?.gstNumber}  
                                                size='small' 
                                                className='w-280px mb-4' 
                                                label="Enter GST Number" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required 
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="customerState" className='w-280px mb-2'>Customer State <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="customerState"
                                                name='customerState'
                                                value={data?.customerState}  
                                                size='small' 
                                                className='w-280px mb-4' 
                                                label="Enter Customer State" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required 
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="customerAddress" className='w-280px mb-2'>Customer Address <span className='text-danger'>*</span></label>
                                            <TextField
                                                id="customerAddress"
                                                name='customerAddress'
                                                value={data?.customerAddress} 
                                                className='w-280px mb-4' 
                                                label="Enter Customer Address"
                                                multiline
                                                rows={4}
                                                defaultValue={data?.customerAddress} 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='d-flex align-items-center justify-content-center gap-4'>
                                            <Button 
                                                variant="outlined" 
                                                color="error"
                                                size="small"
                                                onClick={()=>{
                                                    setTimeout(() => {
                                                        navigate(-1)
                                                    }, 500);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                type='submit' 
                                                size="small" 
                                                className='bg-primary' 
                                                variant="contained"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}