/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import gsap from 'gsap';

const LineChartComponent = () => {

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    useEffect(()=>{
        gsap.to('.line', {
            x: 5,
            duration: 1,
            startAt: { x: -100 },
        })
    },[])
    
    return (
        <>
            <div className='line'>
                <LineChart
                    width={700}
                    height={400}
                    series={[
                        { data: pData, label: 'pv' },
                        { data: uData, label: 'uv' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </div>
        </>
    )
}

export default LineChartComponent