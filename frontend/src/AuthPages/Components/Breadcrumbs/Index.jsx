/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const BreadcrumbsIndex = ({ breadcrumbs }) => {

    // const [breadcrumbs, setBreadcrumbs] = React.useState({
    //     previousPages: [
    //         { pageName: '', url: '' },
    //         { pageName: '', url: '' },
    //     ],
    //     currentPage: ''
    // })

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                    {
                        Array?.isArray(breadcrumbs?.previousPages) && breadcrumbs?.previousPages && breadcrumbs?.previousPages?.length > 0 && breadcrumbs?.previousPages?.map((val,key)=>(
                            <li key={key} className="breadcrumb-item"><Link to={val?.url} className='text-decoration-none text-primary'>{val?.pageName}</Link></li>
                        ))
                    }
                    <li className="breadcrumb-item active" aria-current="page">{breadcrumbs?.currentPage}</li>
                </ol>
            </nav>
        </>
    )
}

export default BreadcrumbsIndex