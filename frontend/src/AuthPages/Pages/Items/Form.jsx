/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { Link, useNavigate } from 'react-router-dom';
import FullPageLoader from '../../Components/Loader/FullPageLoader';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function ItemForm() {

    const navigate = useNavigate()

    const fields = {
        itemName: '',
        itemUnit: '',
        itemSubUnit: '',
        itemUnitQuantity: '0',
        itemSubUnitQuantity: '0',
    }

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
            { pageName: 'Items', url: '/admin/items' },
        ],
        currentPage: 'Add Item'
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
                                            <label htmlFor="itemName" className='w-280px mb-2'>Item Name <span className='text-danger'>*</span></label>
                                            <TextField 
                                                id="itemName" 
                                                name='itemName'
                                                value={data?.itemName} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Item Name" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        {/* Unit */}
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="itemUnit" className='w-280px mb-2'>Item Unit <span className='text-danger'>*</span></label>
                                            <FormControl variant="standard">
                                                <InputLabel id="demo-simple-select-standard-label">Unit</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="itemUnit"
                                                    label="Unit"
                                                    name='itemUnit'
                                                    value={data?.itemUnit}
                                                    className='w-280px mb-4'
                                                    size='small'
                                                    variant="standard"
                                                    // onChange={handleInput}
                                                    onChange={(e)=>{
                                                        const { value } = e.target
                                                        setData({
                                                            ...data,
                                                            itemUnit: value,
                                                            itemSubUnit: value == 'kg' ? 'gm' : value == 'lt' ? 'ml' : value == 'm' ? 'cm' : value == 'ft' ? 'in' : ''
                                                        })
                                                    }}
                                                    required
                                                >
                                                    <MenuItem value='kg'>Kilogram</MenuItem>
                                                    <MenuItem value='lt'>Litre</MenuItem>
                                                    <MenuItem value='m'>Meter</MenuItem>
                                                    <MenuItem value='ft'>Feet</MenuItem>
                                                    <MenuItem value='pcs'>Pieces</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        {/* Sub Unit */}
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="itemSubUnit" className='w-280px mb-2'>Item Sub Unit <span className='text-danger'>*</span></label>
                                            <FormControl variant="standard">
                                                <InputLabel id="demo-simple-select-standard-label">Sub Unit</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="itemSubUnit"
                                                    label="Sub Unit"
                                                    name='itemSubUnit'
                                                    value={data?.itemSubUnit}
                                                    className='w-280px mb-4'
                                                    size='small'
                                                    variant="standard"
                                                    // onChange={handleInput}
                                                    readOnly
                                                >
                                                    <MenuItem value='gm'>Gram</MenuItem>
                                                    <MenuItem value='ml'>Milli Litre</MenuItem>
                                                    <MenuItem value='cm'>Centimeter</MenuItem>
                                                    <MenuItem value='in'>Inche</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="itemUnitQuantity" className='w-280px mb-2'>Item Unit Quantity <span className='text-danger'>*</span></label>
                                            <TextField 
                                                type='number'
                                                id="itemUnitQuantity" 
                                                name='itemUnitQuantity'
                                                value={data?.itemUnitQuantity} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Item Unit Quantity" 
                                                variant="standard"
                                                onChange={handleInput} 
                                                required
                                            />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <label htmlFor="itemSubUnitQuantity" className='w-280px mb-2'>Item Sub Unit Quantity <span className='text-danger'>*</span></label>
                                            <TextField 
                                                type='number'
                                                id="itemSubUnitQuantity" 
                                                name='itemSubUnitQuantity'
                                                value={data?.itemSubUnitQuantity} 
                                                size='small'
                                                className='w-280px mb-4' 
                                                label="Enter Item Sub Unit Quantity" 
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