import { Button, Container, Grid, Typography } from "@mui/material";
import { CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { product } from './data'
import { Link } from "react-router-dom";
import DeleteDialog from "../../components/DeleteDialog"
import FormAddProduct from "../../components/FormAddProduct";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from "react";
import productService from "../../service/productService";

const Product = () => {

    const [productList, setProductList] = useState([]);

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

    const handleGetProductByCategoryName = (nameCategory) => {
        if (nameCategory === "All Product") {
            init();
        } else {
            productService.getProductByCategoryName(nameCategory)
                .then((res) => {
                    setProductList(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


    console.log(productList);

    return (
        <Container maxWidth="lg">
            <FormAddProduct handleRefreshProduct={init} handleGetProductByCategoryName={handleGetProductByCategoryName} />
            <Grid container spacing={5} sx={{ mt: 1 }}>
                {productList.map((element, index) => (

                    <Grid item xs={12} sm={4} ms={4} key={index}>
                        <Card sx={{ maxWidth: 345 }} style={{ padding: "10px", marginBotton: "30px" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={element.images[0] ? element.images[0].imageUrl : "https://res.klook.com/image/upload/q_85/c_fill,w_750/v1596017380/blog/fdhbsx1x6tmyswssvb1v.webp"}
                                    alt="green iguana"
                                    style={{ borderRadius: "5px" }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {element.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {element.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant="contained" color="success" size="medium" component={Link} to={"/viewDetailProduct/" + element.id} sx={{ mr: 1 }} startIcon={<VisibilityIcon />}>
                                    View
                                </Button>
                                <DeleteDialog name="product" id={element.id} handleRefreshProduct={init} />
                            </CardActions>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
        </Container>
    )
}

export default Product;