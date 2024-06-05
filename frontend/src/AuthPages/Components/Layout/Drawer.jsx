/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InventoryIcon from '@mui/icons-material/Inventory';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function DrawerIndex() {

    const navigate = useNavigate()

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [menu, setMenu] = React.useState([
        { menuItem: 'Dashboard', menuIcon: <DashboardIcon />, url:'/admin/dashboard' },
        { menuItem: 'Vendors', menuIcon: <AddBusinessIcon />, url:'/admin/vendors' },
        { menuItem: 'Customers', menuIcon: <PeopleAltIcon />, url:'/admin/customers' },
        { menuItem: 'Items/Stock', menuIcon: <InventoryIcon />, url:'/admin/items' },
        { menuItem: 'Day Book', menuIcon: <AutoStoriesIcon />, url:'/admin/day-book' },
        { menuItem: 'Order Purchase', menuIcon: <ShoppingBagIcon />, url:'/admin/orders-purchase' },
        { menuItem: 'Order Sales', menuIcon: <ShoppingCartIcon />, url:'/admin/orders-sell' },
    ])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <div className='d-flex align-items-center justify-content-between w-100'>
                        <div className='d-flex align-items-center gap-1'>
                            <IconButton
                                color="black"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className='text-dark' noWrap component="div">
                                <span className='text-primary fw-bold'>iMS</span>
                            </Typography>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ankur Shrivastava
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">My Profile</a></li>
                                <li><a className="dropdown-item" href="#">Change Password</a></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </div>
                    </div>

                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menu.map((val, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={()=>navigate(val?.url)}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Tooltip title={val?.menuItem}>{val?.menuIcon}</Tooltip>
                                </ListItemIcon>
                                <ListItemText primary={val?.menuItem} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}