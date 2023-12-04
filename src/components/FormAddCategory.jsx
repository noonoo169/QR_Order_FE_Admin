import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { tokens } from "../theme";
import Header from "./Header";
import categoryService from "../service/categoryService";

const FormAddCategory = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState({});

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

    const handleAddSuccess = (e) => {
        e.preventDefault();
        categoryService
            .saveCategory(category)
            .then((res) => {
                console.log("Category Add Sucessfully");
                setCategory({
                    name: ""
                })
                handleClose();
                props.handleRefreshCategory();
            })
            .catch((error) => {
                alert(error.response.data);
            })
    }

    return (
        <Box mt="20px">
            <Header
                title="CATEGORY MANAGEMENT"
                subtitle="List of Category for Future Reference"
            />
            <Box>
                <Button variant="contained" onClick={handleClickOpen} size="large" startIcon={<AddIcon />} sx={{ backgroundColor: colors.blueAccent[500] }}>Add Category</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h2" component='div'>Add Category</Typography>
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
                                label="Category Name"
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                                name="name"
                                onChange={(e) => handleChange(e)}
                                value={category.name}
                            />
                            <Button variant="outlined" color="secondary" type="submit">Add Category</Button>
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

export default FormAddCategory;