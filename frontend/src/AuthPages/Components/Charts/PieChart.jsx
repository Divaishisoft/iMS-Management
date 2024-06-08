/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import gsap from 'gsap';

const PieChartComponent = () => {

    useEffect(()=>{
        gsap.to('.pie', {
            x: 5,
            duration: 1,
            rotation: 360,
            startAt: { x: -100 },
        })
    },[])

    return (
        <>
            <div className='pie'>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, color: '#0092c0', label: 'series C' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </div>
        </>
    )
}

export default PieChartComponent