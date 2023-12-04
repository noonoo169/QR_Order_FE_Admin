import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Stack, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import { tokens } from "../theme";
import Header from "./Header"
import categoryService from "../service/categoryService";
import productService from "../service/productService";

const FormAddProduct = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [categoryList, setCategoryList] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        amount: "",
        categoryName: "",
        images: []
    });

    const handleChange = (e) => {
        const value = e.target.value;
        if (e.target.name === "images") {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                console.log(file);
                setProduct({ ...product, [e.target.name]: file });
            } else {
                alert('Vui lòng chọn một file hình ảnh');
            }
        }
        else {
            setProduct({ ...product, [e.target.name]: value });
        }

    }

    useEffect(() => {
        init();
    }, []);

    const getProductByCategoryName = (e) => {
        const nameCategory = e.target.value;
        props.handleGetProductByCategoryName(nameCategory);
    }

    const init = () => {
        categoryService
            .getAllCategory()
            .then((res) => {
                setCategoryList(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddSuccess = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('amount', product.amount);
        formData.append('categoryName', product.categoryName);
        formData.append('images', product.images);

        productService.saveProduct(formData)
            .then((res) => {
                console.log("Them thanh cong");
                setProduct({
                    name: "",
                    price: "",
                    description: "",
                    amount: "",
                    categoryName: "",
                    images: null
                })
                handleClose();
                props.handleRefreshProduct()
            })
            .catch(error => {
                console.log(error);
            })
    }

    console.log(product);

    return (
        <Box mt="20px">
            <Header
                title="PRODUCT MANAGEMENT"
                subtitle="List of Product for Future Reference"
            />
            <Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3

                }}>
                    <Box>
                        <Button variant="contained" onClick={handleClickOpen} size="large" startIcon={<AddIcon />} sx={{ backgroundColor: colors.blueAccent[500] }}>Add Product</Button>
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            color="secondary"
                            select
                            required
                            label="Category"
                            name="categoryName"
                            onChange={(e) => getProductByCategoryName(e)}
                            sx={{ width: 300 }}
                        >
                            <MenuItem key={0} value="All Product">
                                All Product
                            </MenuItem>
                            {
                                categoryList.map(element => (
                                    <MenuItem key={element.id} value={element.name}>
                                        {element.name}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </Box>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h2" component='div'>Add Product</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <Box component="form" onSubmit={handleAddSuccess}>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color="secondary"
                                    label="Product Name"
                                    name="name"
                                    fullWidth
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextField
                                    fullWidth
                                    color="secondary"
                                    select
                                    required
                                    label="Category"
                                    name="categoryName"
                                    onChange={(e) => handleChange(e)}
                                >
                                    {
                                        categoryList.map(element => (
                                            <MenuItem key={element.id} value={element.name}>
                                                {element.name}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Stack>
                            <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Amount"
                                name="amount"
                                fullWidth
                                required
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Description"
                                name="description"
                                fullWidth
                                required
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Price"
                                name="price"
                                required
                                fullWidth
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                            <Input
                                type="file"
                                fullWidth
                                required
                                name="images"
                                onChange={(e) => { handleChange(e) }}
                                sx={{ mb: 4 }}
                            />
                            <Button variant="outlined" color="secondary" type="submit">Add Product </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose} color="error">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}

export default FormAddProduct;