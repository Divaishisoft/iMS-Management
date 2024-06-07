/* eslint-disable no-debugger */
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
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Autocomplete, Button, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';

export default function OrderPurchaseForm() {

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
            { pageName: 'Purchase Order', url: '/admin/orders-purchase' },
        ],
        currentPage: 'Add Purchase Order'
    });
    const [fullPageLoading, setFullPageLoading] = React.useState(true);
    const [data, setData] = React.useState(fields);
    const [vendorData, setVendorData] = React.useState([
        { _id: '69585254472894d25650', vendorName: 'John Doe', vendorPhone: '9856324587', vendorEmail: 'john@test.com', vendorCity: 'Mexico' },
        { _id: 'b58525fr55f69d2894d1', vendorName: 'Sam Dure', vendorPhone: '9856324888', vendorEmail: 'sam@test.com', vendorCity: 'Berlin' },
    ]);
    const [itemData, setItemData] = React.useState([
        { _id: '69585254472894d25654', hsnNumber: '254154', itemName: 'Atta', itemUnit: 'kg', itemSubUnit: 'gm', itemUnitQuantity: '5', itemSubUnitQuantity: '300' },
        { _id: 'b58525fr55f69d2894d2', hsnNumber: '963258', itemName: 'Milk', itemUnit: 'lt', itemSubUnit: 'ml', itemUnitQuantity: '3', itemSubUnitQuantity: '500' },
        { _id: 'b58525fr55f69d2894j8', hsnNumber: '963298', itemName: 'Tshirt', itemUnit: 'pcs', itemSubUnit: '', itemUnitQuantity: '5', itemSubUnitQuantity: '' },
    ]);
    const [bankData, setBankData] = React.useState([
        { _id: '69585254472894d25655', bankName: 'SBI', accountNumber: '5698547', accountHolderName: 'John Doe', ifscCode: 'UTHI0002569', bankBranch: 'India', availableBalance: '1500' },
        { _id: '69585254472894d25d12', bankName: 'BOB', accountNumber: '5698569', accountHolderName: 'Sam Torrent', ifscCode: 'UTHI0002111', bankBranch: 'India', availableBalance: '2500' },
    ]);

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const selectedOption = e.target.options?.[e.target.selectedIndex];
        const itemUnit = selectedOption ? selectedOption.getAttribute('data-item_unit') : '';

        const newItems = [...data.items];
        const currentItem = newItems[index];

        if (name === 'itemId') {
            const selectedItem = itemData.find(item => item._id === value);

            if (selectedItem) {
                currentItem.itemUnit = selectedItem.itemUnit;
            }

            currentItem.serials = [];
        } else if (name === 'itemUnit' || name === 'itemUnitQuantity') {
            currentItem.serials = [];
        }

        newItems[index] = {
            ...currentItem,
            [name]: value,
            subTotal: calculateItemSubtotal({
                ...currentItem,
                [name]: value
            })
        };

        setData({ ...data, items: newItems }, () => {
            calculateTotal(newItems);
        });
    };

    const calculateItemSubtotal = (item) => {
        const itemUnit = item?.itemUnit
        const itemUnitQuantity = parseFloat(item.itemUnitQuantity) || 0;
        const price = parseFloat(item.price) || 0;
        const discountPercent = parseFloat(item.discountPercent) || 0;
        const discountRupee = parseFloat(item.discountRupee) || 0;
        const cgst = parseFloat(item.cgst) || 0;
        const sgst = parseFloat(item.sgst) || 0;
        const igst = parseFloat(item.igst) || 0;
        
        const discountAmountPercent = (price * discountPercent) / 100;
        const effectivePrice = price - (discountAmountPercent + discountRupee);
        const taxAmount = (effectivePrice * (cgst + sgst + igst)) / 100;
        var finalTotal = effectivePrice + taxAmount;
        
        // debugger;
        // if (itemUnit == 'pcs' && itemUnitQuantity > 0) {
        //     finalTotal * itemUnitQuantity
        // }
        // console.log(itemUnit, itemUnitQuantity);
        return finalTotal;
    };

    const handleSerialChange = (itemIndex, serialIndex, e) => {
        const { name, value } = e.target;
        const newItems = [...data.items];
        
        if (!newItems[itemIndex].serials) {
            newItems[itemIndex].serials = [];
        }
    
        if (!newItems[itemIndex].serials[serialIndex]) {
            newItems[itemIndex].serials[serialIndex] = {};
        }
    
        newItems[itemIndex].serials[serialIndex][name] = value;
        
        setData({ ...data, items: newItems }, () => {
            calculateTotal(newItems);
        });
    };

    const addItem = () => {
        setData({
            ...data,
            items: [...data.items, { itemId: '', itemUnit: '', price: '', itemUnitQuantity: '', itemSubUnitQuantity: '', discountPercent: '', discountRupee: '', cgst: '', sgst: '', igst: '', subTotal: '' }]
        });
    };

    const removeItem = (index) => {
        const newItems = data.items.filter((item, i) => i !== index);
        setData({ ...data, items: newItems }, () => calculateTotal(newItems));
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
        const effectivePrice = price - (discountAmountPercent + discountRupee);
        const taxAmount = (effectivePrice * (cgst + sgst + igst)) / 100;
        const subTotal = effectivePrice + taxAmount;

        const newItems = [...items];
        newItems[index] = { ...item, subTotal };

        setData({ ...data, items: newItems }, () => calculateTotal(newItems));
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
    const refreshGrandTotal = () => {
        calculateTotal(data.items)
    }

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
        // calculateTotal(data.items);
        calculateTotal();
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
                                    <div className='mb-2'><small>Fields with <span className='text-danger'>*</span> are required.</small></div>
                                    <div className="col-md-3">
                                        <TextField 
                                            id="billNumber" 
                                            name='billNumber'
                                            value={data?.billNumber} 
                                            size='small'
                                            className='w-100 mb-3' 
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
                                            className='w-100 mb-3 mt-3'
                                            variant="standard"
                                            onChange={handleInput} 
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Autocomplete
                                            id="vendorId"
                                            options={vendorData}
                                            getOptionLabel={(option) => `${option.vendorName} (${option.vendorEmail})`}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Vendor"
                                                    variant="standard"
                                                    size="small"
                                                    required
                                                />
                                            )}
                                            value={vendorData.find(v => v._id === data?.vendorId) || null}
                                            onChange={(e, newValue) => {
                                                setData({ ...data, vendorId: newValue ? newValue._id : '' });
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <FormControl variant="standard" className='w-100 mb-3'>
                                            <InputLabel id="orderStatus">Order Status</InputLabel>
                                            <Select
                                                labelId="orderStatus"
                                                id="orderStatus"
                                                name="orderStatus"
                                                value={data?.orderStatus}
                                                onChange={handleInput}
                                                size="small"
                                            >
                                                <MenuItem value='Pending'>Pending</MenuItem>
                                                <MenuItem value='Completed'>Completed</MenuItem>
                                                <MenuItem value='Cancelled'>Cancelled</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='col-md-9 mb-3'>
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
                                    <div className="col-md-3"></div>
                                    <div className="col-md-9">
                                        {data.items.map((item, index) => (
                                            <div key={index} className='border custom-shadow-light p-2 mb-4'>
                                                <div className='w-100 d-flex align-items-center justify-content-between'>
                                                    <h6>Item {index + 1}</h6>
                                                    <Tooltip title="Remove" onClick={() => removeItem(index)}>
                                                        <IconButton>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-md-4">
                                                        <Autocomplete
                                                            options={itemData}
                                                            getOptionLabel={(option) => `${option.itemName} (${option.hsnNumber})`}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="Select Item"
                                                                    variant="standard"
                                                                    size="small"
                                                                    required
                                                                />
                                                            )}
                                                            value={itemData.find(i => i._id === item?.itemId) || null}
                                                            onChange={(e, newValue) => {
                                                                handleItemChange(index, { target: { name: 'itemId', value: newValue ? newValue._id : '' } });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <FormControl variant="standard" className='w-100 mb-3'>
                                                            <InputLabel id={`itemUnit-${index}`}>Unit</InputLabel>
                                                            <Select
                                                                labelId={`itemUnit-${index}`}
                                                                id={`itemUnit-${index}`}
                                                                name="itemUnit"
                                                                value={item?.itemUnit}
                                                                onChange={(e) => handleItemChange(index, e)}
                                                                size="small"
                                                                readOnly
                                                            >
                                                                <MenuItem value='kg'>Kilogram</MenuItem>
                                                                <MenuItem value='lt'>Litre</MenuItem>
                                                                <MenuItem value='m'>Meter</MenuItem>
                                                                <MenuItem value='ft'>Feet</MenuItem>
                                                                <MenuItem value='pcs'>Pieces</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <TextField
                                                            id={`itemUnitQuantity-${index}`}
                                                            name='itemUnitQuantity'
                                                            value={item?.itemUnit == 'Pcs' ? '' : item.itemUnitQuantity}
                                                            size='small'
                                                            className='w-100 mb-3'
                                                            label="Unit Quantity"
                                                            variant="standard"
                                                            type='number'
                                                            inputProps={{ min: 1 }}
                                                            onChange={(e) => handleItemChange(index, e)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <TextField
                                                            id={`itemSubUnitQuantity-${index}`}
                                                            name='itemSubUnitQuantity'
                                                            value={item.itemSubUnitQuantity}
                                                            size='small'
                                                            className='w-100 mb-3'
                                                            label="Sub Unit Quantity"
                                                            variant="standard"
                                                            type='number'
                                                            onChange={(e) => handleItemChange(index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <TextField
                                                            id={`price-${index}`}
                                                            name='price'
                                                            value={item.price}
                                                            size='small'
                                                            className='w-100 mb-3'
                                                            label="Price"
                                                            variant="standard"
                                                            type='number'
                                                            onChange={(e) => handleItemChange(index, e)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row serialsRows">
                                                    {item?.itemUnit === 'pcs'
                                                        ? [...Array(parseInt(data.items[index].itemUnitQuantity || 0)).keys()].map(serialIndex => (
                                                            <React.Fragment key={serialIndex}>
                                                                <div className="col-md-2">
                                                                    <TextField
                                                                        id={`batchNumber-${index}-${serialIndex}`}
                                                                        name='batchNumber'
                                                                        value={(data.items[index].serials && data.items[index].serials[serialIndex]?.batchNumber) || ''}
                                                                        size='small'
                                                                        className='w-100 mb-3'
                                                                        label={`Batch Number ${serialIndex + 1}`}
                                                                        variant="standard"
                                                                        onChange={(e) => handleSerialChange(index, serialIndex, e)}
                                                                    />
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <TextField
                                                                        id={`lotNumber-${index}-${serialIndex}`}
                                                                        name='lotNumber'
                                                                        value={(data.items[index].serials && data.items[index].serials[serialIndex]?.lotNumber) || ''}
                                                                        size='small'
                                                                        className='w-100 mb-3'
                                                                        label={`LOT Number ${serialIndex + 1}`}
                                                                        variant="standard"
                                                                        onChange={(e) => handleSerialChange(index, serialIndex, e)}
                                                                    />
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <TextField
                                                                        id={`serialNumber-${index}-${serialIndex}`}
                                                                        name='serialNumber'
                                                                        value={(data.items[index].serials && data.items[index].serials[serialIndex]?.serialNumber) || ''}
                                                                        size='small'
                                                                        className='w-100 mb-3'
                                                                        label={`Serial Number ${serialIndex + 1}`}
                                                                        variant="standard"
                                                                        onChange={(e) => handleSerialChange(index, serialIndex, e)}
                                                                    />
                                                                </div>
                                                                <div className="col-md-6"></div>
                                                            </React.Fragment>
                                                        ))
                                                        : (
                                                            <>
                                                                <div className="col-md-2">
                                                                    <TextField
                                                                        id={`batchNumber-${index}-0`}
                                                                        name='batchNumber'
                                                                        value={(data.items[index].serials && data.items[index].serials[0]?.batchNumber) || ''}
                                                                        size='small'
                                                                        className='w-100 mb-3'
                                                                        label="Batch Number 1"
                                                                        variant="standard"
                                                                        onChange={(e) => handleSerialChange(index, 0, e)}
                                                                    />
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <TextField
                                                                        id={`lotNumber-${index}-0`}
                                                                        name='lotNumber'
                                                                        value={(data.items[index].serials && data.items[index].serials[0]?.lotNumber) || ''}
                                                                        size='small'
                                                                        className='w-100 mb-3'
                                                                        label="LOT Number 1"
                                                                        variant="standard"
                                                                        onChange={(e) => handleSerialChange(index, 0, e)}
                                                                    />
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <TextField
                                                                        id={`serialNumber-${index}-0`}
                                                                        name='serialNumber'
                                                                        value={(data.items[index].serials && data.items[index].serials[0]?.serialNumber) || ''}
                                                                        size='small'
                                                                        className='w-100 mb-3'
                                                                        label="Serial Number 1"
                                                                        variant="standard"
                                                                        onChange={(e) => handleSerialChange(index, 0, e)}
                                                                    />
                                                                </div>
                                                                <div className="col-md-6"></div>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <TextField
                                                            id={`discountPercent-${index}`}
                                                            name='discountPercent'
                                                            value={item.discountPercent}
                                                            size='small'
                                                            className='w-100 mb-3'
                                                            label="Discount%"
                                                            variant="standard"
                                                            type='number'
                                                            onChange={(e) => handleItemChange(index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <TextField
                                                            id={`discountRupee-${index}`}
                                                            name='discountRupee'
                                                            value={item.discountRupee}
                                                            size='small'
                                                            className='w-100 mb-3'
                                                            label="Discount ₹"
                                                            variant="standard"
                                                            type='number'
                                                            onChange={(e) => handleItemChange(index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <TextField
                                                            id={`cgst-${index}`}
                                                            name='cgst'
                                                            value={item.cgst}
                                                            size='small'
                                                            className='w-100 mb-3'
                                                            label="CGST%"
                                                            variant="standard"
                                                            type='number'
                                                            onChange={(e) => handleItemChange(index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <TextField
                                                            id={`sgst-${index}`}
                                                            name='sgst'
                                                            value={item.sgst}
                                                            size='small'
                                                            className='w-100 mb-3'
                                                            label="SGST%"
                                                            variant="standard"
                                                            type='number'
                                                            onChange={(e) => handleItemChange(index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <TextField
                                                            id={`igst-${index}`}
                                                            name='igst'
                                                            value={item.igst}
                                                            size='small'
                                                            className='w-100 mb-3'
                                                            label="IGST%"
                                                            variant="standard"
                                                            type='number'
                                                            onChange={(e) => handleItemChange(index, e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <TextField
                                                            id={`subTotal-${index}`}
                                                            name='subTotal'
                                                            value={item.subTotal}
                                                            size='small'
                                                            className='w-100 mb-3'
                                                            label="Sub Total"
                                                            variant="standard"
                                                            type='number'
                                                            onChange={(e) => handleItemChange(index, e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-md-3">
                                        <div className='border custom-shadow-light p-2 mb-4'>
                                            <div className='d-flex justify-content-between w-100'>
                                                <div className='fw-bold text-secondary mt-2'>Summary</div>
                                                <div>&nbsp;</div>
                                            </div>
                                            <hr />
                                            <div className='d-flex justify-content-between w-100 mb-3'>
                                                <div className='text-secondary'>Total Discount %</div>
                                                <div>{data?.totalDiscountPercent}%</div>
                                            </div>
                                            <div className='d-flex justify-content-between w-100 mb-3'>
                                                <div className='text-secondary'>Total Discount ₹</div>
                                                <div>{data?.totalDiscountRupees}/-</div>
                                            </div>
                                            <hr />
                                            <div className='d-flex justify-content-between w-100 mb-2'>
                                                <div className='text-secondary fw-bold'>Grand Total</div>
                                                {/* <div>
                                                    <span>{data?.grandTotal}/-</span>
                                                    <Tooltip title="Remove" onClick={refreshGrandTotal}>
                                                        <IconButton>
                                                            <RefreshIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div> */}
                                                <div>{data?.grandTotal}/-</div>
                                            </div>
                                        </div>
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}