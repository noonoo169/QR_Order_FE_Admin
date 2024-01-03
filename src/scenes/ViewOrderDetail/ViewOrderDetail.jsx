import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './ViewOrderDetail.css';
import { IconButton, useTheme } from "@mui/material";
import orderService from "../../service/orderService";
import { Button } from '@mui/material';
import orderSerive from '../../service/orderService';
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import updatedOrderDetailSlice from "../../redux/updatedOrderDetailSlice";
import { tab } from '@testing-library/user-event/dist/tab';

const ViewOrderDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [order, setOrder] = useState({
        orderTime: [],
        orderDetails: []
    });
    const [paymentMethod, setPaymentMethod] = useState("notpayment");

    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        init();
    }, [])

    const init = () => {
        orderService.getOrderByIdTable(id)
            .then((res) => {
                setOrder(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleDateTime = () => {
        // Tạo đối tượng Date hiện tại
        const currentDate = new Date();

        // Lấy thông tin ngày giờ
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const currentDay = currentDate.getDate();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentSeconds = currentDate.getSeconds();

        // Hiển thị thời gian hiện tại
        return `${currentDay}/${currentMonth}/${currentYear} ${currentHours}:${currentMinutes}:${currentSeconds}`;

    }
    console.log(paymentMethod);
    const handleComfirmDoneOrder = () => {
        if (paymentMethod === "notpayment") {
            alert("Payment method has not been selected")
        }
        else {
            orderService.confirmDoneOrder(order.id, paymentMethod)
                .then((res) => {
                    navigate("/tableManagement");
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const handleChange = (e) => {
        order.orderStatus = e.target.value;
        setOrder(order);
        orderSerive.updateStatusOrder(order.id, order.orderStatus)
            .then(res => {
                init();
            }).catch(error => {
                console.log(error)
            });

    }
    const handleChangePayment = (e) => {
        const value = e.target.value;
        setPaymentMethod(value);
    }

    // Check if food is extra here
    const dispatch = useDispatch()
    const updatedOrderDetails = useSelector((state) => state.updatedOrderDetails.tables)

    const findExtraItem = (item, tableId) => {
        const updatedOrderDetail = updatedOrderDetails.find(detail => detail.tableId === tableId);
        console.log('updatedOrderDetail:', updatedOrderDetail);
    
        if (updatedOrderDetail) {
            if (item.product !== null) {
                const foundProduct = updatedOrderDetail.products.find(product => product.id === item.product.id);
                return foundProduct || null; // Return found product or null if not found
            }
            if (item.combo !== null) {
                const foundCombo = updatedOrderDetail.combos.find(combo => combo.id === item.combo.id);
                return foundCombo || null; // Return found combo or null if not found
            }
        }
        return null; // Return null if updatedOrderDetail is not found or item is invalid
    };
    

    const getExtraQuantity = () => {

    }

    const handleCheckExtraFood = (item, tableId) => {
        dispatch(updatedOrderDetailSlice.actions.deleteNotification({
            item: item,
            tableId: tableId
        }))
    }

    // 

    return (
        <div className="container-fluid" style={{ backgroundColor: colors.blueAccent[200] }}>
            <div className="container">
                {/* Title */}
                <div className="d-flex justify-content-between align-items-center py-3">
                    <h2 className="h5 mb-0"><a href="https://mui.com/" style={{ color: 'red' }}>Order #{order.id}</a></h2>
                </div>

                {/* Main content */}
                <div className="row">
                    <div className="col-lg-8">
                        {/* Details */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="mb-3 d-flex justify-content-between">
                                    <div>
                                        <span className="me-3">{handleDateTime()}</span>
                                        <span className="me-3">#{order.id}</span>
                                        <span className="me-3">Visa -1234</span>
                                        {/* <span className="badge rounded-pill bg-info">{order.orderStatus}</span> */}
                                        <select
                                            className="form-select badge rounded-pill bg-info"
                                            style={{ color: 'white', backgroundColor: '#17a2b8', width: "150px" }}
                                            value={order.orderStatus}
                                            onChange={handleChange}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text"><i className="bi bi-download"></i> <span className="text">Invoice</span></button>
                                        <div className="dropdown">
                                            <button className="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><a className="dropdown-item" href="https://mui.com/"><i className="bi bi-pencil"></i> Edit</a></li>
                                                <li><a className="dropdown-item" href="https://mui.com/"><i className="bi bi-printer"></i> Print</a></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Detail</th>
                                            <th>Quantity</th>
                                            <th className="text-end">Price</th>
                                            <th className="text-end">Extra Food</th>
                                            <th className="text-end">Extra Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.orderDetails.map((element, index) => {
                                                const extraItem = findExtraItem(element, order.tableId)
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <div className="d-flex mb-2">
                                                                <div className="flex-shrink-0">
                                                                    <img src={element.product ? element.product.images[0].imageUrl : "https://static.hotdeal.vn/images/1589/1588756/60x60/355791-combo-6-mon-an-nhat-ban-kem-do-uong-cho-2n-tai-nha-hang-kokoro.jpg"} alt="" width="35" className="img-fluid" />
                                                                </div>
                                                                <div className="flex-lg-grow-1 ms-3">
                                                                    <h6 className="small mb-0"><a href="https://mui.com/" className="text-reset">{element.product ? element.product.name : element.combo.name}</a></h6>
                                                                    <span className="small">Description: {element.product ? element.product.description : element.combo.description}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{element.quantity}</td>
                                                        <td className="text-end">{element.product ? element.product.price : element.combo.price}</td>
                                                        <td className="text-end">
                                                            {
                                                                extraItem ? (
                                                                    <IconButton color='primary' onClick={() => handleCheckExtraFood(element, order.tableId)}>
                                                                        <CheckIcon />
                                                                    </IconButton>
                                                                ) : ("")
                                                            }
                                                        </td>
                                                        <td className="text-end">
                                                            {
                                                                extraItem ? (
                                                                    extraItem.quantity
                                                                ) : ("")
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        {/* <tr>
                                            <td colSpan="2">Subtotal</td>
                                            <td className="text-end">$159.98</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">Shipping</td>
                                            <td className="text-end">$20.00</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">Discount (Code: NEWYEAR)</td>
                                            <td className="text-danger text-end">-$10.00</td>
                                        </tr> */}
                                        <tr className="fw-bold">
                                            <td colSpan="2">TOTAL</td>
                                            <td className="text-end">{order.totalPrice}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        {/* Payment */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h3 className="h6">Payment Method</h3>
                                        <p>{paymentMethod === "notpayment" ? "Choose a payment method" : paymentMethod}<br />
                                            Total: {order.totalPrice} <span className="badge bg-danger rounded-pill">UNPAID</span></p>
                                        <select
                                            className="form-select badge bg-success"
                                            style={{ color: 'white', backgroundColor: '#17a2b8', width: "150px" }}
                                            value={paymentMethod}
                                            onChange={handleChangePayment}
                                        >
                                            <option value="notpayment">Payment Method</option>
                                            <option value="CASH">CASH</option>
                                            <option value="BANKING">BANKING</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <h3 className="h6">Billing address</h3>
                                        <address>
                                            {/* <strong>John Doe</strong><br /> */}
                                            1355 Market St, Suite 900<br />
                                            San Francisco, CA 94103<br />
                                            <abbr title="Phone">P:</abbr> (123) 456-7890
                                        </address>
                                        <Button variant='contained' sx={{ marginRight: 2 }} onClick={handleComfirmDoneOrder}>Comfirm</Button>
                                        <Button variant='contained' color="secondary" onClick={() => navigate("/tableManagement")}>Back</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* Customer Notes */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="h6">Customer Notes</h3>
                                <p>{order.note}</p>
                            </div>
                        </div>
                        <div className="card mb-4">
                            {/* Shipping information */}
                            <div className="card-body">
                                <h3 className="h6">Table Information</h3>
                                <strong>Id Table: </strong>
                                <span><a href="https://mui.com/" className="text-decoration-underline" target="_blank" rel="noreferrer">{order.tableId}</a> <i className="bi bi-box-arrow-up-right"></i> </span>
                                <hr />
                                <h3 className="h6">Address</h3>
                                <address>
                                    {/* <strong>John Doe</strong><br /> */}
                                    1355 Market St, Suite 900<br />
                                    San Francisco, CA 94103<br />
                                    <abbr title="Phone">P:</abbr> (123) 456-7890
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );


}

export default ViewOrderDetail;