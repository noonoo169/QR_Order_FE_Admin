import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import categoryService from "../service/categoryService";

const FormUpdateCategory = (props) => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState({
        name: props.name
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setCategory({ ...category, [e.target.name]: value });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateSuccess = (e) => {
        e.preventDefault();
        categoryService
            .updateCategory(props.id, category.name)
            .then((res) => {
                console.log("Category Update Sucessfully");
                handleClose();
                props.handleRefreshCategory();
            })
            .catch((error) => {
                handleClose();
                alert(error.response.data);
                console.log(error);
            })
    }

    return (
        <Box>
            <Button variant="contained" color="secondary" size="medium" onClick={handleClickOpen} sx={{ ml: 1, mr: 1 }} startIcon={<EditIcon />}>
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h2" component='div'>Update Category</Typography>
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
                            label="Category Name"
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                            name="name"
                            onChange={(e) => handleChange(e)}
                            value={category.name}
                        />
                        <Button variant="outlined" color="secondary" type="submit">Update Category</Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default FormUpdateCategory;