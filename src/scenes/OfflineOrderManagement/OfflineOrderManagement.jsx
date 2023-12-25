import { useTheme } from "@emotion/react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { tokens } from "../../theme";
import Header from "../../components/Header"
import { mockDataContacts } from '../../data/mockData'
import { Link } from "react-router-dom";
import Status from "../../components/Status";
import { useEffect, useState } from "react";
import orderService from '../../service/orderService';
import tableService from "../../service/tableService";

const OfflineOrderManagement = () => {


    const theme = useTheme();
    const status = 'IN_PROGRESS';
    const colors = tokens(theme.palette.mode);

    const [orderOfflineList, setOrderOfflineList] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        orderService.getAllOrderOffline()
            .then(res => {
                const promises = res.data.map(element => {
                    return tableService.getNameTableById(element.tableId)
                        .then(res => {
                            const nameTable = res.data.name;
                            return {
                                id: element.id,
                                tableId: nameTable,
                                note: element.note,
                                timeOrder: handleDateTime(element.orderTime),
                                totalPrice: element.totalPrice,
                                orderStatus: element.orderStatus,
                                paymentMethod: element.paymentMethod
                            };
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });

                Promise.all(promises)
                    .then(orderList => {
                        setOrderOfflineList(orderList);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };


    console.log(orderOfflineList);

    const handleDateTime = (timeArray) => {
        const dateTime = new Date(timeArray[0], timeArray[1] - 1, timeArray[2], timeArray[3], timeArray[4], timeArray[5]);
        return dateTime;
    }


    const columns = [
        { field: "id", headerName: "ID Order", flex: 0.5 },
        { field: "tableId", headerName: "Table ID" },
        {
            field: "note",
            headerName: "Note",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "timeOrder",
            headerName: "Time Order",
            headerAlign: "left",
            align: "left",
            flex: 1
        },
        {
            field: "totalPrice",
            headerName: "Total Price",
            flex: 0.5,
            cellClassName: "name-column--cell",
        },

        {
            field: "paymentMethod",
            headerName: "Payment Method",
            flex: 1,
            cellClassName: "name-column--cell",
        },

        {
            field: "orderStatus",
            headerName: "Order Status",
            flex: 1,
            renderCell: (params) => (
                <div>
                    <Status status={params.row.orderStatus} />
                </div>
            ),
        },

        // {
        //     field: "status",
        //     headerName: "Status",
        //     flex: 1.5,
        //     align: "right",
        //     renderCell: (params) => (
        //         <div>
        //             <Status status={status} />
        //         </div>
        //     ),

        // },
        // {
        //     field: "orderTime",
        //     headerName: "Order Time",
        //     flex: 1,

        // },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     width: 200,
        //     renderCell: (params) => (
        //         <div>
        //             {/* Nút View */}
        //             <Button
        //                 variant="contained"
        //                 color="success"
        //                 startIcon={<VisibilityIcon />}
        //                 component={Link} to="/viewOrderDetail"
        //             //onClick={() => handleViewClick(params.row.id)}    
        //             >
        //                 View
        //             </Button>

        //             {/* Nút Delete */}
        //             <Button
        //                 variant="contained"
        //                 color="error"
        //                 startIcon={<DeleteIcon />}
        //                 sx={{ marginLeft: "8px" }}
        //             //onClick={() => handleDeleteClick(params.row.id)}
        //             >
        //                 Delete
        //             </Button>
        //         </div>
        //     ),
        // },
    ];

    return (
        <Box m="20px">
            <Header
                title="OFFLINE ORDER MANAGEMENT"
                subtitle="List of Order for Future Reference"
            />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={orderOfflineList}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
}

export default OfflineOrderManagement;