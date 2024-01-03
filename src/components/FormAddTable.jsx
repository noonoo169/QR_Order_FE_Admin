import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { tokens } from "../theme";
import Header from "./Header";
import tableService from "../service/tableService";

const FormAddTable = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [table, setTable] = useState({
        tableName: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setTable({ ...table, [e.target.name]: value });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTable({
            tableName: ""
        })
    };

    const handleAddSuccess = (e) => {
        e.preventDefault();
        tableService
            .saveTable(table.tableName)
            .then((res) => {
                console.log("Table Add Sucessfully");
                setTable({
                    tableName: ""
                })
                handleClose()
                props.handleRefreshTable();
            })
            .catch((error) => {
                alert(error.response.data);
                console.log(error);
            })
    }


    return (
        <Box mt="20px">
            <Header
                title="TABLE MANAGEMENT"
                subtitle="List of Table for Future Reference"
            />
            <Box>
                <Button variant="contained" onClick={handleClickOpen} size="large" startIcon={<AddIcon />} sx={{ backgroundColor: colors.blueAccent[500] }}>Add Table</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h2" component='div'>Add Table</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <Box component="form" sx={{ mt: 3 }} onSubmit={handleAddSuccess}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Table Name"
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                                name="tableName"
                                onChange={(e) => handleChange(e)}
                                value={table.tableName}
                            />
                            <Button variant="outlined" color="secondary" type="submit">Add Table</Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose} color="error">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box >
    )

}

export default FormAddTable