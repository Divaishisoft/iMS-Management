/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { Link, useNavigate } from 'react-router-dom';
import FullPageLoader from '../../Components/Loader/FullPageLoader';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function BankForm() {

    const navigate = useNavigate()

    const fields = {
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        availableBalance: '',
        ifscCode: '',
        bankBranch: '',
    }

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
            { pageName: 'Items', url: '/admin/banks' },
        ],
        currentPage: 'Add Bank'
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
                                            <label htmlFor="bankName" className='w-280px mb-2 text-secondary'>Bank Name <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="bankName" 
                                                name='bankName'
                                                value={data?.bankName} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Bank Name" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="accountHolderName" className='w-280px mb-2 text-secondary'>Account Holder Name <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="accountHolderName" 
                                                name='accountHolderName'
                                                value={data?.accountHolderName} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Account Holder Name" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="accountNumber" className='w-280px mb-2 text-secondary'>Account Number <span className='text-danger'>*</span></label>
                                            <TextField 
                                                type='text'
                                                id="accountNumber" 
                                                name='accountNumber'
                                                value={data?.accountNumber} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Account Number" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="availableBalance" className='w-280px mb-2 text-secondary'>Available Balance <span className='text-danger'>*</span></label>
                                            <TextField 
                                                type='text'
                                                id="availableBalance" 
                                                name='availableBalance'
                                                value={data?.availableBalance} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Available Balance" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="ifscCode" className='w-280px mb-2 text-secondary'>IFSC Code <span className='text-danger'>*</span></label>
                                            <TextField 
                                                type='text'
                                                id="ifscCode" 
                                                name='ifscCode'
                                                value={data?.ifscCode} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter IFSC Code" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="bankBranch" className='w-280px mb-2 text-secondary'>Bank Branch <span className='text-danger'>*</span></label>
                                            <TextField 
                                                type='text'
                                                id="bankBranch" 
                                                name='bankBranch'
                                                value={data?.bankBranch} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Bank Branch" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
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
                                    <div className="col-md-6"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}