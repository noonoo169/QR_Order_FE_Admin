import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, DialogContentText, Typography, Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import productService from "../service/productService";
import comboService from '../service/comboService';

const FormUpdateCombo = (props) => {

    const [combo, setCombo] = useState({
        name: props.elementCombo.name,
        price: props.elementCombo.price,
        description: props.elementCombo.description,
        detailsProducts: props.elementCombo.detailsProducts.map((element) => {
            return {
                quantity: element.quantity,
                productId: element.product.id
            }
        })
    });
    const lengthProductOfCombo = combo.detailsProducts.length
    const [countProduct, setCountProduct] = useState(lengthProductOfCombo);
    const [open, setOpen] = useState(false);
    const [productList, setProductList] = useState([]);



    const handleChangeCountProduct = (e) => {
        setCountProduct(e.target.value);
    }
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        productService
            .getAllProduct()
            .then((res) => {
                setProductList(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const nameElement = e.target.name;
        if (!isNaN(nameElement)) {
            const updatedDetailsProducts = [...combo.detailsProducts];
            if (combo.detailsProducts.length > nameElement) {
                updatedDetailsProducts[nameElement].productId = value;
            }
            else {
                updatedDetailsProducts.push({ productId: value, quantity: 1 });
            }

            setCombo((prevCombo) => ({
                ...prevCombo,
                detailsProducts: updatedDetailsProducts
            }));
        }
        else if (nameElement.startsWith("numberOfProduct")) {
            const numberValue = parseInt(nameElement.substring("numberOfProduct".length), 10);
            const updatedDetailsProducts = [...combo.detailsProducts];
            if (combo.detailsProducts.length > numberValue) {
                updatedDetailsProducts[numberValue].quantity = value;
            }
            else {
                updatedDetailsProducts.push({ productId: "", quantity: value });
            }
            setCombo((prevCombo) => ({
                ...prevCombo,
                detailsProducts: updatedDetailsProducts
            }));
        }
        else {
            setCombo({ ...combo, [e.target.name]: value });
        }

    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddSuccess = (e) => {
        e.preventDefault();
        console.log(combo);
        comboService.updateCombo(props.elementCombo.id, combo)
            .then((res) => {
                console.log("Update Successful");
                handleClose();
                props.handleRefreshCombo();
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Box>
            <Box>
                <Button variant="contained" color="secondary" size="medium" onClick={handleClickOpen} sx={{ ml: 1, mr: 1 }} startIcon={<EditIcon />}>
                    Update
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h2" component='div'>Update Combo</Typography>
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
                                label="Combo Name"
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                                name="name"
                                onChange={(e) => handleChange(e)}
                                value={combo.name}
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Price"
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                                name="price"
                                onChange={(e) => handleChange(e)}
                                value={combo.price}
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Description"
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                                name="description"
                                onChange={(e) => handleChange(e)}
                                value={combo.description}
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="The Number Of Products"
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                                onChange={(e) => handleChangeCountProduct(e)}
                                value={countProduct}
                            />
                            {Array.from({ length: countProduct }, (_, index) => (
                                index < lengthProductOfCombo ?
                                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                        <TextField
                                            fullWidth
                                            color="secondary"
                                            select
                                            required
                                            label="Product Name"
                                            name={index}
                                            value={combo.detailsProducts[index].productId}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            {
                                                productList.map(element => (
                                                    <MenuItem key={element.id} value={element.id}>
                                                        {element.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        <TextField
                                            type="text"
                                            variant='outlined'
                                            color='secondary'
                                            label="Number Of Product"
                                            fullWidth
                                            required
                                            sx={{ mb: 3 }}
                                            name={"numberOfProduct" + index}
                                            onChange={(e) => handleChange(e)}
                                            value={combo.detailsProducts[index].quantity}
                                        />
                                    </Stack> :
                                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                        <TextField
                                            fullWidth
                                            color="secondary"
                                            select
                                            required
                                            label="Product Name"
                                            name={index}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            {
                                                productList.map(element => (
                                                    <MenuItem key={element.id} value={element.id}>
                                                        {element.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        <TextField
                                            type="text"
                                            variant='outlined'
                                            color='secondary'
                                            label="Number Of Product"
                                            fullWidth
                                            required
                                            sx={{ mb: 3 }}
                                            name={"numberOfProduct" + index}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </Stack>
                            ))}
                            <Button variant="outlined" color="secondary" type="submit">Update Combo</Button>
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

export default FormUpdateCombo;