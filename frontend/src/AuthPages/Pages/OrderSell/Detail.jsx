/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerHeaderComponent from '../../Components/Layout/DrawerHeaderComponent';
import DrawerIndex from '../../Components/Layout/Drawer';
import BreadcrumbsIndex from '../../Components/Breadcrumbs/Index';
import FullPageLoader from '../../Components/Loader/FullPageLoader';

export default function OrderSellDetail() {

    const [breadcrumbs, setBreadcrumbs] = React.useState({
        previousPages: [
            { pageName: 'Dashboard', url: '/admin/dashboard' },
            { pageName: 'Sales Order', url: '/admin/orders-sales' },
        ],
        currentPage: 'Order Sales Detail'
    })
    const [fullPageLoading, setFullPageLoading] = React.useState(true)
    const [data, setData] = React.useState(
        { 
            _id: '69585254472894d25654',
            billNumber: '254152FDSA522',
            billDate: '14/10/2020', 
            orderStatus: 'Pending',
            vendorDetail: {
                _id: '69585254472894d25333',
                vendorName: 'John Doe',
                vendorPhone: '9658741230',
                vendorEmail: 'john@test.com',
                vendorGstNumber: '58422UNJH5874525',
                vendorCity: 'Gwalior',
                vendorPincode: '474001',
                vendorAddress: 'Lashkar, Gwalior, MP, india'
            },
            items: [
                { itemId: '758965254472894d25654', hsnNumber: '587412', itemName: 'Atta', batchNumber: '63524178', lotNumber: '85247896', serialNumber: '2541', unit: 'kg', unitQuantity: '5', subUnit: 'gm', subUnitQuantity: '300', price: '1500', discountPercent: '10', discountRupee: '', cgst: '9', sgst: '9', igst: '', subTotal: '2150' },
                { itemId: '758965254472894d11111', hsnNumber: '965874', itemName: 'Milk', batchNumber: '78965416', lotNumber: '369254871', serialNumber: '1478', unit: 'lt', unitQuantity: '2', subUnit: 'ml', subUnitQuantity: '600', price: '599', discountPercent: '', discountRupee: '25', cgst: '6', sgst: '6', igst: '', subTotal: '749' },
                { itemId: '758965254472894d22541', hsnNumber: '965875', itemName: 'Mens Tshirt', batchNumber: '78965485', lotNumber: '369254845', serialNumber: '8574', unit: 'pc', unitQuantity: '10', subUnit: '', subUnitQuantity: '', price: '599', discountPercent: '', discountRupee: '25', cgst: '6', sgst: '6', igst: '', subTotal: '749' },
            ],
            totalDiscountRupees: '149',
            grandTotal: '2899'
        }
    )

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
                    <div className="col-md-12">
                        <div className='bg-white rounded px-3 py-2 custom-shadow-light'>
                            <center><h5 className='fw-bold'>Bill Summary</h5></center>
                            <div className='fs-14px d-flex flex-wrap justify-content-between'>
                                <div>
                                    <div className='d-flex align-items-center mb-2'>
                                        <div className='w-150px'>Bill Date</div>
                                        <div>: {data?.billDate}</div>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div className='w-150px'>Bill Number</div>
                                        <div>: {data?.billNumber}</div>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div className='w-150px'>Status</div>
                                        <div>: <span className={`badge text-bg-${ data?.orderStatus == 'Pending' ? 'warning' : data?.orderStatus == 'Completed' ? 'success' : 'danger'}`}>{data?.orderStatus}</span></div>
                                    </div>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center mb-2'>
                                        <div className='w-150px fw-bold'>Vendor Detail:</div>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div className='w-150px'>Name</div>
                                        <div>: {data?.vendorDetail?.vendorName}</div>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div className='w-150px'>Phone</div>
                                        <div>: {data?.vendorDetail?.vendorPhone}</div>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div className='w-150px'>GST Number</div>
                                        <div>: {data?.vendorDetail?.vendorGstNumber}</div>
                                    </div>
                                    <div>
                                        <div style={{ float: 'right' }}>{data?.vendorDetail?.vendorPincode}, {data?.vendorDetail?.vendorCity}</div>
                                        <br />
                                        <div style={{ float: 'right' }}>{data?.vendorDetail?.vendorAddress}</div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div style={{ overflowX: 'auto' }}>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th className='text-secondary'>#</th>
                                            <th className='text-secondary'>HSN</th>
                                            <th className='text-secondary'>LOT</th>
                                            <th className='text-secondary'>Batch</th>
                                            <th className='text-secondary'>Serial</th>
                                            <th className='text-secondary'>Item</th>
                                            <th className='text-secondary'>Unit</th>
                                            <th className='text-secondary'>Sub Unit</th>
                                            <th className='text-secondary'>Discount %</th>
                                            <th className='text-secondary'>Discount (Rs.)</th>
                                            <th className='text-secondary'>CGST %</th>
                                            <th className='text-secondary'>SGST %</th>
                                            <th className='text-secondary'>IGST %</th>
                                            <th className='text-secondary'>Price</th>
                                            <th className='text-secondary'>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data?.items?.map((val,key)=>(
                                                <tr key={key}>
                                                    <td>{key + 1}.</td>
                                                    <td>{val?.hsnNumber}</td>
                                                    <td>{val?.lotNumber}</td>
                                                    <td>{val?.batchNumber}</td>
                                                    <td>{val?.serialNumber}</td>
                                                    <td>{val?.itemName}</td>
                                                    <td>{val?.unitQuantity} {val?.unit}</td>
                                                    <td>{val?.subUnitQuantity ? val?.subUnitQuantity : '-'} {val?.subUnit ? val?.subUnit : ''}</td>
                                                    <td>{val?.discountPercent ? val?.discountPercent + '%' : '-'}</td>
                                                    <td>{val?.discountRupee ? val?.discountRupee + '/-' : '-'}</td>
                                                    <td>{val?.cgst ? val?.cgst + '%' : '-'}</td>
                                                    <td>{val?.sgst ? val?.sgst + '%' : '-'}</td>
                                                    <td>{val?.igst ? val?.igst + '%' : '-'}</td>
                                                    <td>{val?.price}/-</td>
                                                    <td>{val?.subTotal}/-</td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td colSpan={14} className='text-secondary fw-bold' style={{ textAlign: 'right' }}>Total Discount</td>
                                            <td>{data?.totalDiscountRupees}/-</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={14} className='text-secondary fw-bold' style={{ textAlign: 'right' }}>Grand Total</td>
                                            <td>{data?.grandTotal}/-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}