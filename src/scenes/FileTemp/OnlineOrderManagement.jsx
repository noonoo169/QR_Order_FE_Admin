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
import orderOnlineService from '../../service/orderOnlineService';

const OnlineOrderManagement = () => {


    const theme = useTheme();
    const status = 'IN_PROGRESS';
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
                        orderStatus: element.orderStatus,
                        totalPrice: element.totalPrice
                    }
                });
                setOrderOnlineList(list);
            })
            .catch(error => {
                console.log(error);
            })
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
            flex: 1,
            cellClassName: "name-column--cell",
        },

        {
            field: "orderStatus",
            headerName: "Order Status",
            flex: 1,
        },
        {
            field: "totalPrice",
            headerName: "Total Price",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1.5,
            align: "right",
            renderCell: (params) => (
                <div>
                    <Status status={status} />
                </div>
            ),

        },
        // {
        //     field: "orderTime",
        //     headerName: "Order Time",
        //     flex: 1,

        // },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div>
                    {/* Nút View */}
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<VisibilityIcon />}
                        component={Link} to="/viewOrderDetail"
                    //onClick={() => handleViewClick(params.row.id)}    
                    >
                        View
                    </Button>

                    {/* Nút Delete */}
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{ marginLeft: "8px" }}
                    //onClick={() => handleDeleteClick(params.row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="ONLINE ORDER MANAGEMENT"
                subtitle="List of Contacts for Future Reference"
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
                //components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
}

export default OnlineOrderManagement;