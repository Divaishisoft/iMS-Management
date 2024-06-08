/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { Link, useNavigate } from 'react-router-dom';
import FullPageLoader from '../../Components/Loader/FullPageLoader';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function UserForm() {

    const navigate = useNavigate()

    const fields = {
        name: '',
        email: '',
        phone: '',
        role: '',
        itemUnitQuantity: '0',
        itemSubUnitQuantity: '0',
    }

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
            { pageName: 'Users', url: '/admin/users' },
        ],
        currentPage: 'Add User'
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
                                            <label htmlFor="name" className='w-280px mb-2 text-secondary'>Name <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="name" 
                                                name='name'
                                                value={data?.name} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Name" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="email" className='w-280px mb-2 text-secondary'>Email <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="email" 
                                                name='email'
                                                value={data?.email} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Email" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="phone" className='w-280px mb-2 text-secondary'>Phone <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="phone" 
                                                name='phone'
                                                value={data?.phone} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Phone" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="role" className='w-280px mb-2 text-secondary'>Role <span className='text-danger'>*</span></label>
                                            <div className='w-280px'>
                                                <FormControl variant="standard">
                                                    <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="role"
                                                        label="Role"
                                                        name='role'
                                                        value={data?.role}
                                                        className='mb-4'
                                                        size='small'
                                                        variant="standard"
                                                        onChange={handleInput}
                                                        required
                                                    >
                                                        <MenuItem value='Sub Admin'>Sub Admin</MenuItem>
                                                        <MenuItem value='Operator'>Operator</MenuItem>
                                                        <MenuItem value='Accountant'>Accountant</MenuItem>
                                                        <MenuItem value='Petty Cash'>Petty Cash</MenuItem>
                                                        <MenuItem value='Godown operator'>Godown operator</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className='bg-white rounded px-3 py-2 custom-shadow-light mb-2'>
                                            <h6 className='fw-bold'>Permissions:</h6>
                                            <ul>
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Bank Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='Bank' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='Bank' value='View' /> View</span>
                                                        <span><input type="checkbox" id='Bank' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='Bank' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Vendor Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='Vendor' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='Vendor' value='View' /> View</span>
                                                        <span><input type="checkbox" id='Vendor' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='Vendor' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Customer Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='Customer' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='Customer' value='View' /> View</span>
                                                        <span><input type="checkbox" id='Customer' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='Customer' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Godown Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='Godown' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='Godown' value='View' /> View</span>
                                                        <span><input type="checkbox" id='Godown' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='Godown' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Transfer Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='Transfer' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='Transfer' value='View' /> View</span>
                                                        <span><input type="checkbox" id='Transfer' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='Transfer' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Item Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='Item' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='Item' value='View' /> View</span>
                                                        <span><input type="checkbox" id='Item' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='Item' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Inventory/Stock Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='Stock' value='View' /> View</span>
                                                        <span><input type="checkbox" id='Stock' value='Edit' /> Edit</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Day Book Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='DayBook' value='View' /> View</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Purchase Order Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='PurchaseOrder' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='PurchaseOrder' value='View' /> View</span>
                                                        <span><input type="checkbox" id='PurchaseOrder' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='PurchaseOrder' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Sales Order Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='SalesOrder' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='SalesOrder' value='View' /> View</span>
                                                        <span><input type="checkbox" id='SalesOrder' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='SalesOrder' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>Payroll Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='Payroll' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='Payroll' value='View' /> View</span>
                                                        <span><input type="checkbox" id='Payroll' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='Payroll' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                                <hr />
                                                <li className='mt-3'>
                                                    <div className='fw-bold'>GST Management</div>
                                                    <div className='d-flex align-items-center gap-5'>
                                                        <span><input type="checkbox" id='GST' value='Create' /> Create</span>
                                                        <span><input type="checkbox" id='GST' value='View' /> View</span>
                                                        <span><input type="checkbox" id='GST' value='Edit' /> Edit</span>
                                                        <span><input type="checkbox" id='GST' value='Delete' /> Delete</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}