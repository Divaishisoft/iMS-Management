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

export default function BankList() {

    const navigate = useNavigate()

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
        ],
        currentPage: 'Banks'
    })
    const [fullPageLoading, setFullPageLoading] = React.useState(true)
    const [list, setList] = React.useState([
        { _id: '69585254472894d25654', bankName: 'SBI', accountNumber: '5698547', accountHolderName: 'John Doe', ifscCode: 'UTHI0002569', bankBranch: 'India', availableBalance: '1500' },
        { _id: '69585254472894d25d23', bankName: 'BOB', accountNumber: '5698569', accountHolderName: 'Sam Torrent', ifscCode: 'UTHI0002111', bankBranch: 'India', availableBalance: '2500' },
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
          const bankName = item?.bankName?.toLowerCase()?.includes(searchInput?.toLowerCase());
          const accountHolderName = item?.accountHolderName?.toLowerCase()?.includes(searchInput?.toLowerCase());
          return bankName || accountHolderName;
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
        { field: 'bankName', headerName: 'Bank Name', flex: 1 },
        { field: 'accountHolderName', headerName: 'Account Holder Name', flex: 1 },
        { field: 'accountNumber', headerName: 'Account Number', flex: 1 },
        { field: 'availableBalance', headerName: 'Available Balance', flex: 1, valueFormatter: (params) => {return `${params}/-`} },
        { field: 'ifscCode', headerName: 'IFSC Code', flex: 1 },
        { field: 'bankBranch', headerName: 'Bank Branch', flex: 1 },
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
                            navigate(`/admin/bank-edit/${params.row._id}`);
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
                                        navigate('/admin/bank-add')
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