import { Button, TextField, Container, Box, Grid, Typography, CardActionArea, CardActions, Card, CardContent, CardMedia } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { tokens } from '../../theme';
import FormAddTable from '../../components/FormAddTable';
import { useState, useEffect } from 'react';
import tableService from '../../service/tableService';
import QRCodeGenerate from '../../components/GenerateQR';
import FormOrderTableEmpty from '../../components/FormOrderTableEmpty';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from '../../components/DeleteDialog'
import FormUpdateTable from "../../components/FormUpdateTable";
import FormDetailTable from '../../components/FormDetailTable';

const TableManagement = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [tableList, setTableList] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        tableService
            .getAllTable()
            .then((res) => {
                setTableList(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Container maxWidth="lg">
            <FormAddTable handleRefreshTable={init} />
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
                {tableList.map((element, index) => (
                    <Grid item xs={12} sm={2} ms={2} key={index}>
                        <Card style={{ padding: "10px", height: "100%", marginBotton: "30px", borderRadius: "10%", backgroundColor: element.status === "EMPTY" ? colors.grey[300] : colors.redAccent[500] }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image="https://media-cdn.tripadvisor.com/media/photo-s/15/c5/84/65/khong-gian-nha-hang-vu.jpg"
                                    alt="green iguana"
                                    style={{ borderRadius: "50%" }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div" color={colors.redAccent[800]} sx={{ fontWeight: 'bold' }}>
                                        {element.name}
                                    </Typography>
                                    <Typography variant="body2" color={colors.blueAccent[800]}>
                                        {element.status}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {element.status === "UNEMPTY" ?
                                    <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                                        <Button variant="contained" color="success" size="smail" component={Link} to={"viewOrderDetail/" + element.id} >
                                            View
                                        </Button>
                                        <Box sx={{ marginLeft: 1 }}>
                                            <FormDetailTable name={element.name} id={element.id} status={element.status} handleRefreshTable={init} />
                                        </Box>
                                    </Box>
                                    :
                                    <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box>
                                            <FormOrderTableEmpty />
                                        </Box>
                                        <Box sx={{ marginLeft: 0.4 }}>
                                            <FormDetailTable name={element.name} id={element.id} status={element.status} handleRefreshTable={init} />
                                        </Box>
                                    </Box>
                                }

                            </CardActions>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
        </Container>
    );
}

export default TableManagement;