/* eslint-disable no-unused-vars */
import { styled } from '@mui/material';
import React from 'react'

const DrawerHeaderComponent = () => {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    return (
        <>
            <DrawerHeader />
        </>
    )
}

export default DrawerHeaderComponent