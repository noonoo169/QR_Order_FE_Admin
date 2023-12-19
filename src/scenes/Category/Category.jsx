import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import { Button, Container, Grid, Typography } from "@mui/material";
import { CardActionArea, CardActions } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormAddCategory from "../../components/FormAddCategory";
import FormUpdateCategory from "../../components/FormUpdateCategory";
import DeleteDialog from "../../components/DeleteDialog"
import { imgCategory } from '../../data/mockData';
import categoryService from "../../service/categoryService";


const Category = () => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        init();
    }, [])

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

    return (
        <Container maxWidth="lg">
            <FormAddCategory handleRefreshCategory={init} />
            <Grid container spacing={5} style={{ marginTop: "20px" }}>
                {categoryList.map((element, index) => (
                    <Grid item xs={12} sm={4} ms={4} key={index}>
                        <Card sx={{ maxWidth: 345 }} style={{ padding: "10px", marginBotton: "30px" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={imgCategory[index] === undefined ? "https://cubes-asia.com/wp-content/uploads/2021/12/cafe-Americano-1.jpg" : imgCategory[index].img}
                                    alt="green iguana"
                                    style={{ borderRadius: "5px" }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {element.name}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary">
                                        {element.description}
                                    </Typography> */}
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant="contained" color="success" size="medium" component={Link} to="/viewProductByIdCategory" startIcon={<VisibilityIcon />}>
                                    View
                                </Button>
                                <FormUpdateCategory name={element.name} id={element.id} handleRefreshCategory={init} />
                                <DeleteDialog name="category" id={element.id} handleRefreshCategory={init} />
                            </CardActions>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
        </Container>
    )
}

export default Category;