import { useTheme } from "@emotion/react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { tokens } from "../../theme";
import Header from "../../components/Header"
import { Link } from "react-router-dom";
import Status from "../../components/Status";
import { useEffect, useState } from "react";
import orderOnlineService from '../../service/orderOnlineService';

const OnlineOrderManagement = () => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderOnlineList, setOrderOnlineList] = useState([]);

    useEffect(() => {
        init()
    }, []);

    const init = () => {
        orderOnlineService.getAllOrderOnline()
            .then(res => {
                const list = res.data.map(element => {
                    return {
                        id: element.id,
                        username: element.username,
                        phoneNumber: element.phoneNumber,
                        location: element.location,
                        orderTime: handleDateTime(element.orderTime),
                        orderStatus: element.orderStatus,
                        totalPrice: element.totalPrice,
                        paymentMethod: element.paymentMethod
                    }
                }).reverse();
                setOrderOnlineList(list);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDateTime = (timeArray) => {
        const dateTime = new Date(timeArray[0], timeArray[1] - 1, timeArray[2], timeArray[3], timeArray[4], timeArray[5]);
        return dateTime;
    }

    console.log(orderOnlineList);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "username", headerName: "User Name" },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1.5,
        },
        {
            field: "orderStatus",
            headerName: "Order Status",
            flex: 2,
            renderCell: (params) => (
                <div>
                    <Status status={params.row.orderStatus} />
                </div>
            ),
        },
        {
            field: "orderTime",
            headerName: "Order Time",
            flex: 3.5,
        },
        {
            field: "totalPrice",
            headerName: "Total Price",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "paymentMethod",
            headerName: "Payment Method",
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<VisibilityIcon />}
                        component={Link} to={"/viewOnlineOrderDetail/" + params.row.id}
                    >
                        View
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="ONLINE ORDER MANAGEMENT"
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
                    rows={orderOnlineList}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
}

export default OnlineOrderManagement;