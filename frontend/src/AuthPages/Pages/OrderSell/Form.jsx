/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { useNavigate } from 'react-router-dom';
import FullPageLoader from '../../Components/Loader/FullPageLoader';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function OrderSellForm() {

    const navigate = useNavigate();

    const fields = {
        billNumber: '',
        billDate: '',
        vendorId: '',
        orderStatus: '',
        items: [],
        totalDiscountPercent: 0,
        totalDiscountRupees: 0,
        grandTotal: 0,
    };

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
            { pageName: 'Sales Order', url: '/admin/orders-sales' },
        ],
        currentPage: 'Add Sales Order'
    });
    const [fullPageLoading, setFullPageLoading] = React.useState(true);
    const [data, setData] = React.useState(fields);
    const [customerData, setCustomerData] = React.useState([
        { _id: '69585254472894d25654', customerName: 'John Doe', customerPhone: '9856324587', customerEmail: 'john@test.com', customerCity: 'Mexico' },
        { _id: 'b58525fr55f69d2894d2', customerName: 'Sam Dure', customerPhone: '9856324888', customerEmail: 'sam@test.com', customerCity: 'Berlin' },
    ]);
    const [itemData, setItemData] = React.useState([
        { _id: '69585254472894d25654', hsnNumber: '254154', itemName: 'Atta', itemUnit: 'kg', itemSubUnit: 'gm', itemUnitQuantity: '5', itemSubUnitQuantity: '300' },
        { _id: 'b58525fr55f69d2894d2', hsnNumber: '963258', itemName: 'Milk', itemUnit: 'lt', itemSubUnit: 'ml', itemUnitQuantity: '3', itemSubUnitQuantity: '500' },
    ]);

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleItemChange = (index, e) => {
        const newItems = data.items.map((item, i) => {
            if (i === index) {
                return { ...item, [e.target.name]: e.target.value };
            }
            return item;
        });
        setData({ ...data, items: newItems });
        calculateItem(index, newItems);
    };

    const addItem = () => {
        setData({
            ...data,
            items: [...data.items, { batchNumber: '', lotNumber: '', serialNumber: '', itemId: '', price: '', itemUnitQuantity: '', itemSubUnitQuantity: '', discountPercent: '', discountRupee: '', cgst: '', sgst: '', igst: '', subTotal: '' }]
        });
    };

    const removeItem = (index) => {
        const newItems = data.items.filter((item, i) => i !== index);
        setData({ ...data, items: newItems }, () => calculateTotal(newItems));
        // setData({ ...data, items: newItems });
    };

    const calculateItem = (index, items) => {
        const item = items[index];
        const price = parseFloat(item.price) || 0;
        const discountPercent = parseFloat(item.discountPercent) || 0;
        const discountRupee = parseFloat(item.discountRupee) || 0;
        const cgst = parseFloat(item.cgst) || 0;
        const sgst = parseFloat(item.sgst) || 0;
        const igst = parseFloat(item.igst) || 0;

        const discountAmountPercent = (price * discountPercent) / 100;
        const effectivePrice = price - discountAmountPercent - discountRupee;
        const taxAmount = (effectivePrice * (cgst + sgst + igst)) / 100;
        const subTotal = effectivePrice + taxAmount;

        const newItems = [...items];
        newItems[index] = { ...item, subTotal };

        setData({ ...data, items: newItems }, () => calculateTotal(newItems));
        // setData({ ...data, items: newItems });
    };

    const calculateTotal = (items) => {
        let totalDiscountPercent = 0;
        let totalDiscountRupees = 0;
        let grandTotal = 0;
    
        data?.items.forEach(item => {
            grandTotal += item.subTotal;
        
            if (item.discountPercent !== "") {
                const discountPercent = parseFloat(item.discountPercent);
                totalDiscountPercent += discountPercent;
                totalDiscountRupees += (discountPercent / 100) * item.price;
            } else if (item.discountRupee !== "") {
                totalDiscountRupees += parseFloat(item.discountRupee);
            }
        });
    
        setData({ ...data, totalDiscountPercent, totalDiscountRupees, grandTotal });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setTimeout(() => {
            setFullPageLoading(false);
            console.log('data-->>', data);
        }, 1000);
    };

    React.useEffect(() => {
        setTimeout(() => {
            setFullPageLoading(false);
        }, 1000);
    }, []);
    
    React.useEffect(() => {
        calculateTotal()
    }, [data]);

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
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='mb-2'><small>Fields with <span className='text-danger'>*</span> are required.</small></div>
                                        <Button 
                                            type='button' 
                                            size="small" 
                                            className='bg-primary mb-3' 
                                            variant="contained"
                                            onClick={()=>{
                                                setTimeout(() => {
                                                    navigate('/admin/customer-add')
                                                }, 500);
                                            }}
                                        >
                                            <AddIcon /> ADD NEW CUSTOMER
                                        </Button>
                                    </div>
                                    <div className="col-md-3">
                                        <TextField 
                                            id="billNumber" 
                                            name='billNumber'
                                            value={data?.billNumber} 
                                            size='small'
                                            className='w-100 mb-4' 
                                            label="Enter Bill Number" 
                                            variant="standard"
                                            onChange={handleInput} 
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <TextField 
                                            type='date'
                                            id="billDate"
                                            name='billDate'
                                            value={data?.billDate}  
                                            size='small' 
                                            className='w-100 mb-4 mt-3'
                                            variant="standard"
                                            onChange={handleInput} 
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Autocomplete
                                            id="vendorId"
                                            options={customerData}
                                            getOptionLabel={(option) => option.customerName}
                                            value={customerData.find((customer) => customer._id === data?.customerId) || null}
                                            onChange={(event, value)=>{
                                                setData({
                                                    ...data,
                                                    customerId: value ? value._id : ''
                                                })
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Customer"
                                                    variant="standard"
                                                    size="small"
                                                    className="w-100 mb-4"
                                                    required
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <FormControl variant="standard">
                                            <InputLabel id="demo-simple-select-standard-label">Status*</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="orderStatus"
                                                label="Status"
                                                name='orderStatus'
                                                value={data?.orderStatus}
                                                className='mb-4'
                                                size='small'
                                                variant="standard"
                                                onChange={handleInput}
                                                required
                                            >
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="Completed">Completed</MenuItem>
                                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div className='col-md-12 mb-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                                            <h5>Item List</h5>
                                            <Button 
                                                variant="contained" 
                                                size="small" 
                                                className='bg-primary'
                                                startIcon={<AddIcon />} 
                                                onClick={addItem}
                                            >
                                                Add Item
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        {
                                            data?.items?.map((item, index) => (
                                                <div key={index} className='border custom-shadow-light p-2 mb-4'>
                                                    <div className='d-flex justify-content-between'>
                                                        <h6>Item {index + 1}</h6>
                                                        <CloseIcon role="button" onClick={() => removeItem(index)} />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <TextField 
                                                                id="batchNumber" 
                                                                name='batchNumber'
                                                                value={item.batchNumber} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter Batch Number" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)} 
                                                            />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <TextField 
                                                                id="lotNumber" 
                                                                name='lotNumber'
                                                                value={item.lotNumber} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter LOT Number" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)}
                                                            />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <TextField 
                                                                id="serialNumber" 
                                                                name='serialNumber'
                                                                value={item.serialNumber} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter Serial Number" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <FormControl variant="standard">
                                                                <InputLabel id="demo-simple-select-standard-label">Item*</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="itemId"
                                                                    label="Item"
                                                                    name='itemId'
                                                                    value={item.itemId}
                                                                    className='mb-4'
                                                                    size='small'
                                                                    variant="standard"
                                                                    onChange={(e) => handleItemChange(index, e)}
                                                                    required
                                                                >
                                                                    {
                                                                        itemData?.map((val,key)=>(
                                                                            <MenuItem key={key} value={val?._id}>{val?.itemName}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <TextField 
                                                                id="price" 
                                                                name='price'
                                                                value={item.price} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter Price" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <TextField 
                                                                type='number'
                                                                id="itemUnitQuantity" 
                                                                name='itemUnitQuantity'
                                                                value={item.itemUnitQuantity} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter Unit Quantity" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)} 
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <TextField 
                                                                type='number'
                                                                id="itemSubUnitQuantity" 
                                                                name='itemSubUnitQuantity'
                                                                value={item.itemSubUnitQuantity} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter Sub Unit Quantity" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)} 
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <TextField 
                                                                type='number'
                                                                id="discountPercent" 
                                                                name='discountPercent'
                                                                value={item.discountPercent} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter Discount Percent" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)} 
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <TextField 
                                                                type='number'
                                                                id="discountRupee" 
                                                                name='discountRupee'
                                                                value={item.discountRupee} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter Discount Amount" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)} 
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <TextField 
                                                                type='number'
                                                                id="cgst" 
                                                                name='cgst'
                                                                value={item.cgst} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter CGST" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)} 
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <TextField 
                                                                type='number'
                                                                id="sgst" 
                                                                name='sgst'
                                                                value={item.sgst} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter SGST" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)} 
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <TextField 
                                                                type='number'
                                                                id="igst" 
                                                                name='igst'
                                                                value={item.igst} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter IGST" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)} 
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <TextField 
                                                                type='number'
                                                                id="subTotal" 
                                                                name='subTotal'
                                                                value={item.subTotal} 
                                                                size='small'
                                                                className='w-100 mb-4' 
                                                                label="Enter Sub Total" 
                                                                variant="standard"
                                                                onChange={(e) => handleItemChange(index, e)} 
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        data?.items?.length > 0 &&
                                        <>
                                            <div className="col-md-4"></div>
                                            <div className="col-md-4">
                                                <div className='border custom-shadow-light p-2 mb-4'>
                                                    <div className='d-flex justify-content-between w-100'>
                                                        <div className='fw-bold text-secondary'>Summary</div>
                                                        <div>&nbsp;</div>
                                                    </div>
                                                    <hr />
                                                    <div className='d-flex justify-content-between w-100 mb-3'>
                                                        <div className='text-secondary fw-bold'>Total Discount</div>
                                                        <div>{data?.totalDiscountRupees}/-</div>
                                                    </div>
                                                    <div className='d-flex justify-content-between w-100'>
                                                        <div className='text-secondary fw-bold'>Grand Total</div>
                                                        <div>{data?.grandTotal}/-</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4"></div>
                                            <div className='col-md-12'>
                                                <div className='d-flex align-items-center justify-content-center gap-4'>
                                                    <Button 
                                                        variant="outlined" 
                                                        color="error"
                                                        size="small"
                                                        onClick={()=>{
                                                            setTimeout(() => {
                                                                navigate(-1);
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
                                                        Proceed
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}