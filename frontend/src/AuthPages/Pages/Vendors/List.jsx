/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InventoryIcon from '@mui/icons-material/Inventory';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { Link } from 'react-router-dom';
import BarChartComponent from '../../Components/Charts/BarChart';
import PieChartComponent from '../../Components/Charts/PieChart';
import FullPageLoader from '../../Components/Loader/FullPageLoader';

export default function VendorList() {

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
        ],
        currentPage: 'Vendors'
    })
    const [dashBoxes, setDashBoxes] = React.useState([
        { url: '/customers', icon: <PeopleAltIcon fontSize='large' />, menu: 'Customers' },
        { url: '/vendors', icon: <AddBusinessIcon fontSize='large' />, menu: 'Vendors' },
        { url: '/items', icon: <InventoryIcon fontSize='large' />, menu: 'Items' },
        { url: '/day-book', icon: <AutoStoriesIcon fontSize='large' />, menu: 'Day Book' },
    ]) 
    const [fullPageLoading, setFullPageLoading] = React.useState(true)

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
                    <BreadcrumbsIndex breadcrumbs={breadcrumbs} />
                    {
                        dashBoxes?.map((val,key)=>(
                            <div key={key} className="col-md-3 mb-4">
                                <Link to={val?.url} className='text-decoration-none text-secondary'>
                                    <div className='dash-boxes'>
                                        {val?.icon}
                                        {val?.menu}
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <BarChartComponent />
                    </div>
                    <div className="col-md-5">
                        <PieChartComponent />
                    </div>
                </div>
            </Box>
        </Box>
    );
}