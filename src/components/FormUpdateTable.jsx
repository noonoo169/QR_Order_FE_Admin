import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import categoryService from "../service/categoryService";
import tableService from "../service/tableService";

const FormUpdateTable = (props) => {
    const [open, setOpen] = useState(false);
    const [table, setTable] = useState({
        name: props.name
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
    };

    const handleUpdateSuccess = (e) => {
        e.preventDefault();
        tableService
            .updateTable(props.id, table.name)
            .then((res) => {
                console.log("Table Update Sucessfully");
                handleClose();
                props.handleClose();
                props.handleRefreshTable();
            })
            .catch((error) => {
                handleClose();
                alert(error.response.data);
                console.log(error);
            })
    }

    return (
        <Box>
            <Button variant="contained" color="primary" size="medium" onClick={handleClickOpen} startIcon={<EditIcon />} sx={{ ml: 1, mr: 1 }} >
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h2" component='div'>Update Table</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <Box component="form" sx={{ mt: 3 }} onSubmit={handleUpdateSuccess}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Table Name"
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                            name="name"
                            onChange={(e) => handleChange(e)}
                            value={table.name}
                        />
                        <Button variant="outlined" color="secondary" type="submit">Update Table</Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default FormUpdateTable;