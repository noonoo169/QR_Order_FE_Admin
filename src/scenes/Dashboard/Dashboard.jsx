import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { useTheme } from "@mui/material";
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { tokens } from "../../theme";
import { ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import orderSerive from '../../service/orderService';
import { useState } from 'react';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();




const areDatesEqual = (date1, date2) => {
    if (date1 === undefined || date2 === undefined) {
        return false;
    }
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}
const mapToOrderListDisplay = (orderList) => {
    const order = orderList.map(element => {
        return {
            paymentTime: handleDateTime(element.paymentTime),
            totalPrice: element.totalPrice
        }
    })
    const groupedOrders = order.reduce((result, currentOrder) => {
        const currentDate = currentOrder.paymentTime;

        // Tìm kiếm trong mảng result xem có ngày nào trùng khớp không
        const existingDate = result.find((date) => areDatesEqual(date.paymentTime, currentDate));

        if (existingDate) {
            // Nếu ngày đã tồn tại, cộng totalPrice vào ngày đó
            existingDate.totalPrice += currentOrder.totalPrice;
        } else {
            // Nếu ngày chưa tồn tại, thêm một đối tượng mới vào mảng result
            result.push({
                paymentTime: currentDate,
                totalPrice: currentOrder.totalPrice,
            });
        }
        return result;
    }, []);
    groupedOrders.sort((a, b) => a.paymentTime - b.paymentTime);
    return groupedOrders.map(element => {
        return {
            time: element.paymentTime,
            amount: element.totalPrice
        }
    });
}
const handleDateTime = (timeArray) => {
    const dateTime = new Date(timeArray[0], timeArray[1] - 1, timeArray[2], timeArray[3], timeArray[4], timeArray[5]);
    return dateTime;
}


const createDateArray = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}



const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
    let year = date.getFullYear();
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
}


const endDisplay = (orderList, startDate, endDate) => {
    if (startDate > endDate) {
        alert('Nên nhập ngày bắt đầu phải trước hoặc bằng ngày kết thúc.');
    }
    else {
        const dateArray = createDateArray(startDate, endDate);
        const groupedOrders = mapToOrderListDisplay(orderList);
        const displayChart = dateArray.map(element => {
            const existingDate = groupedOrders.find((date) => areDatesEqual(date.time, element));
            if (existingDate) {
                return {
                    time: formatDate(existingDate.time),
                    amount: existingDate.amount
                }
            }
            else {
                return {
                    time: formatDate(element),
                    amount: 0
                }
            }
        })
        return displayChart;
    }
}

export default function Dashboard() {
    const [orderList, setOrderList] = useState([]);
    var currentDate = new Date();

    // Lấy thời gian 7 ngày trước
    var sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 6);
    const orderDisplay = endDisplay(orderList, sevenDaysAgo, currentDate);

    const totalRevenue = () => {
        let total = 0;
        if (orderDisplay !== undefined) {
            orderDisplay.forEach(element => {
                total += element.amount;
            })
        };
        return total;
    }

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        orderSerive.getAllOrder()
            .then(res => {
                const order = []
                res.data.forEach(element => {
                    if (element.paymentTime !== null) {
                        order.push(element);
                    }
                })
                // console.log(order)
                setOrderList(order);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                {/* <CssBaseline /> */}
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? colors.blueAccent[900]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <h2 style={{ textAlign: 'center', marginTop: "20px", color: colors.redAccent[500], fontWeight: 'bold' }}>DASHBOARD</h2>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Chart orderDisplay={orderDisplay} />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Deposits total={totalRevenue()} />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Orders />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}