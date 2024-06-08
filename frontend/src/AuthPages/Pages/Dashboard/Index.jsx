/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import { Link } from 'react-router-dom';
import BarChartComponent from '../../Components/Charts/BarChart';
import PieChartComponent from '../../Components/Charts/PieChart';
import FullPageLoader from '../../Components/Loader/FullPageLoader';
import LineChartComponent from '../../Components/Charts/LineChart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import gsap from 'gsap';

export default function DashboardIndex() {

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        currentPage: 'Dashboard'
    })
    const [dashBoxes, setDashBoxes] = React.useState([
        { url: '/customers', icon: <PeopleAltIcon fontSize='large' />, menu: 'Customers' },
        { url: '/vendors', icon: <ManageAccountsIcon fontSize='large' />, menu: 'Vendors' },
        { url: '/items', icon: <InventoryIcon fontSize='large' />, menu: 'Items' },
        { url: '/day-book', icon: <AutoStoriesIcon fontSize='large' />, menu: 'Day Book' },
    ]) 
    const [fullPageLoading, setFullPageLoading] = React.useState(true)

    React.useEffect(()=>{
        gsap.to('.dashDetailSection', {
            // x: 1,
            duration: 1,
            rotation: 360,
            startAt: { x: -100 },
        })
    },[])

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
                    <div className="col-md-4">
                        <center>
                            <BarChartComponent />
                        </center>
                    </div>
                    <div className="col-md-8">
                        <br /><br />
                        <center>
                            <PieChartComponent />
                        </center>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <LineChartComponent />
                    </div>
                    <div className="col-md-4">
                        <div className='bg-white dashDetailSection rounded px-3 py-2 custom-shadow-light fs-5'>
                            <div className='d-flex align-items-center justify-content-between pt-3'>
                                <div className='text-secondary'>Total Order Sales Pending</div>
                                <div className='text-primary fw-bold'>10</div>
                            </div>
                            <hr />
                            <div className='d-flex align-items-center justify-content-between pb-3'>
                                <div className='text-secondary'>Total Order Purchase Pending</div>
                                <div className='text-primary fw-bold'>5</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}