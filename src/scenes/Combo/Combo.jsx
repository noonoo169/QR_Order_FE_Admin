import { Button, Card, CardActionArea, CardContent, CardMedia, CardActions, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FormUpdateCombo from "../../components/FormUpdateCombo";
import DeleteDialog from "../../components/DeleteDialog";
import FormAddCombo from "../../components/FormAddCombo";
import comboService from "../../service/comboService";
const Combo = () => {
    const [comboList, setComboList] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        comboService
            .getAllCombo()
            .then((res) => {
                setComboList(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Container maxWidth="lg">
            <FormAddCombo handleRefreshCombo={init} />
            <Grid container spacing={5} style={{ marginTop: "20px" }}>
                {
                    comboList.length > 0 ?
                        comboList.map((element, index) => (
                            <Grid item xs={12} sm={4} ms={4} key={index}>
                                <Card sx={{ maxWidth: 345 }} style={{ padding: "10px", marginBotton: "30px" }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://file.hstatic.net/1000135323/article/nhai_1_e2799f30ad9844d788470f1f7713fc57.jpg"
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
                                        {/* <Button variant="contained" color="success" size="medium" component={Link} to="/viewProductByIdCategory" startIcon={<VisibilityIcon />}>
                                    View
                                </Button> */}
                                        <FormUpdateCombo elementCombo={element} handleRefreshCombo={init} />
                                        <DeleteDialog name="combo" id={element.id} handleRefreshCombo={init} />
                                    </CardActions>
                                </Card>
                            </Grid>
                        )) : <></>
                }
            </Grid>
        </Container>
    )
}

export default Combo;