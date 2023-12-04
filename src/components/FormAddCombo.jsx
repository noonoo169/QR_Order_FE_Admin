import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, DialogContentText, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import AddIcon from '@mui/icons-material/Add';
import Header from "./Header";
import { useEffect, useState } from "react";
import { tokens } from "../theme";
import MenuItem from '@mui/material/MenuItem';
import productService from "../service/productService";
import comboService from '../service/comboService';

const FormAddCombo = (props) => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [countProduct, setCountProduct] = useState(0);
    const [open, setOpen] = useState(false);
    const [productList, setProductList] = useState([]);
    const [combo, setCombo] = useState({
        name: "",
        price: "",
        description: "",
        detailsProducts: []
    })

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
        console.log(combo);
        if (!isNaN(nameElement)) {
            if (combo.detailsProducts.length > nameElement) {
                combo.detailsProducts[nameElement] = { productId: value, quantity: combo.detailsProducts[nameElement].quantity || 1 }
                setCombo(combo);
            }
            else {
                combo.detailsProducts.push({ productId: value, quantity: 1 })
                setCombo(combo);
            }
        }
        else if (nameElement.startsWith("numberOfProduct")) {
            const numberValue = parseInt(nameElement.substring("numberOfProduct".length), 10);
            if (combo.detailsProducts.length > numberValue) {
                combo.detailsProducts[numberValue] = { productId: combo.detailsProducts[numberValue].productId, quantity: value }
                setCombo(combo);
            }
            else {
                combo.detailsProducts.push({ productId: "", quantity: value });
                setCombo(combo);
            }
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
        comboService.saveCombo(combo)
            .then((res) => {
                console.log("Add Successful");
                setCombo({
                    name: "",
                    price: "",
                    description: "",
                    detailsProducts: []
                });
                setCountProduct(0);
                handleClose();
                props.handleRefreshCombo();
            })
            .catch(error => {
                alert(error.response.data);
            })
    }

    return (
        <Box mt="20px">
            <Header
                title="COMBO MANAGEMENT"
                subtitle="List of Combo for Future Reference"
            />
            <Box>
                <Button variant="contained" onClick={handleClickOpen} size="large" startIcon={<AddIcon />} sx={{ backgroundColor: colors.blueAccent[500] }}>Add Combo</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h2" component='div'>Add Combo</Typography>
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
                                //name="countProduct"
                                onChange={(e) => handleChangeCountProduct(e)}
                            //value={combo.description}
                            />
                            {Array.from({ length: countProduct }, (_, index) => (
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
                                    //value={combo.description}
                                    />
                                </Stack>
                            ))}
                            <Button variant="outlined" color="secondary" type="submit">Add Combo</Button>
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

export default FormAddCombo;