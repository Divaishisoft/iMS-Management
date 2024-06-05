/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { Link, useNavigate } from 'react-router-dom';
import FullPageLoader from '../../Components/Loader/FullPageLoader';
import { Button, TextField } from '@mui/material';

export default function OrderPurchaseDetail() {

    const navigate = useNavigate()

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
            { pageName: 'Vendors', url: '/admin/vendors' },
        ],
        currentPage: 'Order Purchase Detail'
    })
    const [fullPageLoading, setFullPageLoading] = React.useState(true)
    const [data, setData] = React.useState(
        { 
            _id: '69585254472894d25654', 
            vendorName: 'John Doe', 
            billNumber: '254152FDSA522', 
            hsnNumber: '524163', 
            billDate: '14/10/2020', 
            orderStatus: 'Pending',
            vendorDetail: {
                _id: '69585254472894d25333',
                vendorName: 'John Doe',
                vendorPhone: '9658741230',
                vendorEmail: 'john@test.com',
                gstNumber: '58422UNJH5874525',
                vendorCity: 'Gwalior',
                vendorPincode: '474001',
                vendorAddress: 'Lashkar, Gwalior, MP, india'
            },
            items: [
                { itemId: '758965254472894d25654', itemName: 'Atta', unitQuantity: '5', subUnitQuantity: '300', price: '1500', discountPercent: '10', discountRupee: '', cgst: '9', sgst: '9', igst: '', subTotal: '2150' },
                { itemId: '758965254472894d25654', itemName: 'Dal', unitQuantity: '2', subUnitQuantity: '600', price: '599', discountPercent: '', discountRupee: '25', cgst: '6', sgst: '6', igst: '', subTotal: '749' },
            ] 
        }
    )

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
                                            <label htmlFor="vendorName" className='w-280px mb-2'>Vendor Name <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="vendorName" 
                                                name='vendorName'
                                                value={data?.vendorName} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Vendor Name" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="vendorEmail" className='w-280px mb-2'>Vendor Email <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="vendorEmail"
                                                name='vendorEmail'
                                                value={data?.vendorEmail}  
                                                size='small' 
                                                className='w-280px mb-4' 
                                                label="Enter Vendor Email" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required 
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="vendorPhone" className='w-280px mb-2'>Vendor Phone <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="vendorPhone"
                                                name='vendorPhone'
                                                value={data?.vendorPhone}  
                                                size='small' 
                                                className='w-280px mb-4' 
                                                label="Enter Vendor Phone" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required 
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="vendorCity" className='w-280px mb-2'>Vendor City <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="vendorCity" 
                                                name='vendorCity'
                                                value={data?.vendorCity} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Vendor City" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="vendorPincode" className='w-280px mb-2'>Vendor Pincode <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="vendorPincode"
                                                name='vendorPincode'
                                                value={data?.vendorPincode}  
                                                size='small' 
                                                className='w-280px mb-4' 
                                                label="Enter Vendor Pincode" 
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
                                            <label htmlFor="vendorState" className='w-280px mb-2'>Vendor State <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="vendorState"
                                                name='vendorState'
                                                value={data?.vendorState}  
                                                size='small' 
                                                className='w-280px mb-4' 
                                                label="Enter Vendor State" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required 
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="vendorAddress" className='w-280px mb-2'>Vendor Address <span className='text-danger'>*</span></label>
                                            <TextField
                                                id="vendorAddress"
                                                name='vendorAddress'
                                                value={data?.vendorAddress} 
                                                className='w-280px mb-4' 
                                                label="Enter Vendor Address"
                                                multiline
                                                rows={4}
                                                defaultValue={data?.vendorAddress} 
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