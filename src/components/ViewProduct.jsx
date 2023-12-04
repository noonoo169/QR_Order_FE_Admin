import { Grid, Button, TextField, Typography, Container, Stack, Box, Input } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import productService from "../service/productService";
import Comment from "./Comment";
import categoryService from "../service/categoryService";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";

const ViewProduct = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        amount: "",
        categoryName: "",
        images: []
    });

    const [categoryList, setCategoryList] = useState([]);

    console.log(product);

    const handleChange = (e) => {
        const value = e.target.value;
        if (e.target.name === "images") {
            const file = e.target.files[0];
            product.images[0] = file;
            setProduct(product);
        }
        else {
            setProduct({ ...product, [e.target.name]: value });
        }

    }

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        productService.getProductById(id)
            .then((res) => {
                const valueProduct = res.data;
                setProduct({
                    name: valueProduct.name,
                    price: valueProduct.price,
                    description: valueProduct.description,
                    amount: valueProduct.amount,
                    categoryName: valueProduct.category.name,
                    images: valueProduct.images
                });
            })
            .catch((error) => {
                console.log(error);
            });
        getAllCategory()
    }

    const getAllCategory = () => {
        categoryService.getAllCategory()
            .then((res) => {
                setCategoryList(res.data);
            })
    }

    const hanldeUpdateForm = (e) => {
        e.preventDefault();
        const userResponse = window.confirm('Bạn có muốn tiếp tục không?')
        const file = new File([product.images[0].imageUrl], "anhdep", { type: "image/jpeg" });

        if (userResponse) {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            formData.append('amount', product.amount);
            formData.append('categoryName', product.categoryName);
            formData.append('images', file);

            productService.updateProduct(id, formData)
                .then(res => {
                    init();
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            console.log("Dong hop thoai");
        }
    }

    console.log(product);

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" textAlign={'center'} sx={{ color: "red" }}>Product Management</Typography>
            <Grid container spacing={5} style={{ marginTop: "20px" }}>
                <Grid item xs={12} sm={6} ms={6}>
                    <Carousel showArrows={true} autoPlay infiniteLoop interval={1500}>

                        {
                        /* <div>
                            <img src="https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/2/neu-moi-ngay-uong-mot-lon-nuoc-ngot-co-the-ban-bi-huy-hoai-nhu-the-nao-4-16331122198881292950569.jpg" alt="" />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src="https://genk.mediacdn.vn/2017/95y56z78-1496903896-1498248535506.jpg" alt="" />
                        </div>
                        <div>
                            <img src="https://vcdn-kinhdoanh.vnecdn.net/2023/05/15/do-uong-1600399082-7850-160039-1771-6858-1684126414.jpg" alt="" />
                        </div>
                        <div>
                            <img src="https://i.vnbusiness.vn/2023/05/15/nuoc-ngot-1684142008.png" alt="" />
                        </div>
                        {
                            product.images[0].imageUrl
                        } */}
                        <div>
                            <img src={product.images.length > 0 ? product.images[0].imageUrl : "https://res.klook.com/image/upload/q_85/c_fill,w_750/v1596017380/blog/fdhbsx1x6tmyswssvb1v.webp"} alt="anhDuPhong" style={{ width: "100%", height: '50%' }} />
                        </div>
                    </Carousel>
                </Grid>
                <Grid item xs={12} sm={6} ms={6} >
                    <Box component="form" onSubmit={hanldeUpdateForm} sx={{ backgroundColor: colors.primary[700], padding: 3, borderRadius: "5%" }}>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Product Name"
                                name="name"
                                disabled
                                value={product.name}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                required
                            />
                            <TextField
                                fullWidth
                                color="secondary"
                                select
                                required
                                label="Category"
                                disabled
                                name="categoryName"
                                onChange={(e) => handleChange(e)}
                                value={product.categoryName}
                                sx={{ width: 300 }}
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
                            variant='outlined'
                            color='secondary'
                            label="Amount"
                            name="amount"
                            disabled
                            value={product.amount}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Description"
                            name="description"
                            disabled
                            value={product.description}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            name="price"
                            label="Price"
                            disabled
                            value={product.price}
                            onChange={(e) => handleChange(e)}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
                        <Button variant="contained" color="secondary" size="large" sx={{ mr: 2 }} onClick={() => navigate("/product")}>Back</Button>
                    </Box>
                </Grid>
            </Grid>
            <Comment idProduct={id} />
        </Container>
    );
}
export default ViewProduct