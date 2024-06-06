/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { useNavigate } from 'react-router-dom';
import FullPageLoader from '../../Components/Loader/FullPageLoader';
import { Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DayBookList() {

    const navigate = useNavigate()

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
        ],
        currentPage: 'Items'
    })
    const [fullPageLoading, setFullPageLoading] = React.useState(true)
    const [list, setList] = React.useState([
        { _id: '69585254472894d25654', billNumber: '254154', dayBookTitle: 'Sales Order', credit: '4000', debit: '' },
        { _id: '69585254472894d25654', billNumber: '254859', dayBookTitle: 'Purchase Order', credit: '', debit: '2000' },
        { _id: '69585254472894d25654', billNumber: '', dayBookTitle: 'Milk Expenses', credit: '', debit: '60' },
        { _id: '69585254472894d25654', billNumber: '', dayBookTitle: 'Money Transfer', credit: '', debit: '60' },
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
          const itemName = item?.itemName?.toLowerCase()?.includes(searchInput?.toLowerCase());
          return itemName;
        });
        setFilteredData(filteredList);
    }, [searchInput, list]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRowId, setSelectedRowId] = React.useState(null);
    
    const open = Boolean(anchorEl);
    const handleTableMenuClick = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
    };
    const handleTableMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
    };

    const columns = [
        // {
        //     field: 'serialNumber',
        //     headerName: 'S.No',
        //     flex: 0.5,
        //     valueGetter: (params) => params.api.getRowIndex(params.id) + 1,
        // },
        { field: 'hsnNumber', headerName: 'HSN Number', flex: 1 },
        { field: 'itemName', headerName: 'Item Name', flex: 1 },
        { field: 'itemUnitQuantity', headerName: 'Item Unit Quantity', flex: 1 },
        { field: 'itemUnit', headerName: 'Item Unit', flex: 1 },
        { field: 'itemSubUnitQuantity', headerName: 'Item Sub Unit Quantity', flex: 1 },
        { field: 'itemSubUnit', headerName: 'Item Sub Unit', flex: 1 },
        {
          field: 'action',
          headerName: 'Action',
          flex: 1,
          headerAlign: 'right', 
          align: 'right',
          renderCell: (params) => (
            <>
                <IconButton
                    id={`basic-button-${params.row._id}`}
                    aria-controls={open && selectedRowId === params.row._id ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open && selectedRowId === params.row._id ? 'true' : undefined}
                    onClick={(event) => handleTableMenuClick(event, params.row._id)}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id={`basic-menu-${params.row._id}`}
                    anchorEl={anchorEl}
                    open={open && selectedRowId === params.row._id}
                    onClose={handleTableMenuClose}
                    MenuListProps={{
                        'aria-labelledby': `basic-button-${params.row._id}`,
                    }}
                >
                    <MenuItem onClick={() => {
                        handleTableMenuClose();
                        setTimeout(() => {
                            navigate(`/admin/item-detail/${params.row._id}`);
                        }, 500);
                    }}>
                        Detail
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleTableMenuClose();
                        setTimeout(() => {
                            navigate(`/admin/item-edit/${params.row._id}`);
                        }, 500);
                    }}>
                        Edit
                    </MenuItem>
                </Menu>
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
                                        navigate('/admin/item-add')
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