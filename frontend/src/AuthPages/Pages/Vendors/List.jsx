/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { Link, useNavigate } from 'react-router-dom';
import FullPageLoader from '../../Components/Loader/FullPageLoader';
import { Button, TextField, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DataGrid } from '@mui/x-data-grid';

export default function VendorList() {

    const navigate = useNavigate()

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
        ],
        currentPage: 'Vendors'
    })
    const [fullPageLoading, setFullPageLoading] = React.useState(true)
    const [list, setList] = React.useState([
        { _id: '69585254472894d25654', vendorName: 'John Doe', vendorPhone: '9856324587', vendorEmail: 'john@test.com', vendorCity: 'Mexico' },
        { _id: 'b58525fr55f69d2894d2', vendorName: 'Sam Dure', vendorPhone: '9856324888', vendorEmail: 'sam@test.com', vendorCity: 'Berlin' },
    ]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState('');

    React.useEffect(()=>{
        setTimeout(() => {
            setFullPageLoading(false)
        }, 1000);
    },[])

    React.useEffect(() => {
        const filteredList = list.filter(item => {
          const vendorName = item?.vendorName?.toLowerCase()?.includes(searchInput?.toLowerCase());
          const vendorPhone = item?.vendorPhone?.toLowerCase()?.includes(searchInput?.toLowerCase());
          const vendorEmail = item?.vendorEmail?.toLowerCase()?.includes(searchInput?.toLowerCase());
          const vendorCity = item?.vendorCity?.toLowerCase()?.includes(searchInput?.toLowerCase());
          return vendorName || vendorPhone || vendorEmail || vendorCity;
        });
        setFilteredData(filteredList);
      }, [searchInput, list]);

    const columns = [
        // {
        //     field: 'serialNumber',
        //     headerName: 'S.No',
        //     flex: 0.5,
        //     valueGetter: (params) => params.api.getRowIndex(params.id) + 1,
        // },
        { field: 'vendorName', headerName: 'Vendor Name', flex: 1 },
        { field: 'vendorPhone', headerName: 'Vendor Phone', flex: 1 },
        { field: 'vendorEmail', headerName: 'Vendor Email', flex: 1 },
        { field: 'vendorGstNumber', headerName: 'GST Number', flex: 1 },
        { field: 'vendorCity', headerName: 'Vendor City', flex: 1 },
        { field: 'vendorPincode', headerName: 'Vendor Pincode', flex: 1 },
        { field: 'vendorState', headerName: 'Vendor State', flex: 1 },
        { field: 'vendorAddress', headerName: 'Vendor Address', flex: 1 },
        {
          field: 'action',
          headerName: 'Action',
          flex: 1,
          headerAlign: 'right', 
          align: 'right',
          renderCell: (params) => (
            <>
                <Tooltip title="Detail">
                    <Button type='button' className='bg-primary text-white py-0 me-1' onClick={()=>{
                        setTimeout(() => {
                            navigate(`/admin/vendor-detail/${params.row._id}`)
                        }, 500);
                    }}>
                        <RemoveRedEyeIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Edit">
                    <Button type='button' className='bg-primary text-white py-0' onClick={()=>{
                        setTimeout(() => {
                            navigate(`/admin/vendor-edit/${params.row._id}`)
                        }, 500);
                    }}>
                        <EditIcon />
                    </Button>
                </Tooltip>
            </>
          ),
        },
    ];

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
                        <div className='d-flex align-items-center justify-content-between'>
                            <TextField 
                                type='search'
                                id="standard-basic" 
                                label="Search" 
                                variant="standard"
                                name="searchInput"
                                className='mb-3'
                                onChange={e => setSearchInput(e.target.value)}
                                value={searchInput} 
                                InputProps={{
                                    endAdornment: (
                                    <SearchIcon />
                                    ),
                                }}
                            />
                            <Button 
                                type='button' 
                                size="small" 
                                className='bg-primary mb-3' 
                                variant="contained"
                                onClick={()=>{
                                    setTimeout(() => {
                                        navigate('/admin/vendor-add')
                                    }, 500);
                                }}
                            >
                                <AddIcon /> ADD NEW
                            </Button>
                        </div>
                        <div className='custom-shadow-light' style={{ height: 'auto', width: '100%', overflowX: 'auto' }}>
                            <DataGrid
                                rows={filteredData}
                                columns={columns}
                                pageSize={10}
                                pageSizeOptions={[10, 25, 50, 100]}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pagination
                                getRowId={(row) => row._id}
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}