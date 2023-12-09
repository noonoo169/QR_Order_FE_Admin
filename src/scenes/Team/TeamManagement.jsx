import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useEffect, useState } from "react";
import userService from "../../service/userService";
import FormAddStaff from "../../components/FormAddStaff";
import adminActionService from "../../service/adminActionService";
import DeleteDialog from "../../components/DeleteDialog"
import LockResetIcon from '@mui/icons-material/LockReset';


const TeamManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userList, setUserList] = useState([]);


  useEffect(() => {
    init();
  }, [])

  const init = () => {
    userService.getAllUser()
      .then(res => {
        setUserList(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const findUserRole = (roles) => {
    if (roles.includes("ADMIN")) {
      return "admin";
    } else if (roles.includes("STAFF")) {
      return "staff";
    } else if (roles.includes("CUSTOMER")) {
      return "customer";
    }
  }

  const resetPassword = (username) => {
    adminActionService.resetUserPassword(username)
      .then(res => {
        alert("Reset Password successfully")
      })
      .catch(error => {
        console.log(error);
      })
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "roles",
      headerName: "Access Level",
      flex: 1,
      renderCell: (params) => {
        const access = findUserRole(params.row.roles)
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "staff"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "staff" && <SecurityOutlinedIcon />}
            {access === "customer" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.5,
      renderCell: (params) => (
        <div style={{ display: 'flex' }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => resetPassword(params.row.username)}
            sx={{ marginRight: 1 }}
            startIcon={<LockResetIcon />}
          >
            Reset Password
          </Button>
          <DeleteDialog name="user" username={params.row.username} handleRefreshUser={init} />
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <FormAddStaff handleRefreshUser={init} />
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
        }}
      >
        <DataGrid checkboxSelection rows={userList} columns={columns} />
      </Box>
    </Box>
  );
};

export default TeamManagement;