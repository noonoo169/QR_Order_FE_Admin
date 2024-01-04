import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material"
import { createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Header from "../../components/Header"
import { useEffect, useState } from "react"
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chart from "./Chart";
import Deposits from "./Deposits";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import { initializeConnect } from "react-redux/es/components/connect";
import orderSerive from "../../service/orderService";
const statistics = [
  { id: 1, name: "Date" },
  { id: 2, name: "Month" },
  { id: 3, name: "Year" }
]


const defaultTheme = createTheme();
const Statistical = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [valueFromDate, setValueFromDate] = useState(dayjs('2023-12-25'));
  const [valueToDate, setValueToDate] = useState(dayjs('2023-12-30'));
  const [orderList, setOrderList] = useState([]);



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
        console.log(order)
        setOrderList(order);
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <Container maxWidth="lg">
      <Box>
        <Header
          title="REVENUE STATISTICS"
          subtitle="Monthly revenue statistics"
        />
        {/* <TextField
          color="secondary"
          select
          required
          label="Statistics Follow"
          name="statisticsFollow"
          onChange={(e) => handleChangeStatisticsFollow(e)}
          sx={{ width: 300 }}
        >
          {
            statistics.map(element => (
              <MenuItem key={element.id} value={element.name}>
                {element.name}
              </MenuItem>
            ))
          }
        </TextField> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="From Date"
              value={valueFromDate}
              onChange={(newValue) => setValueFromDate(newValue)}
            />
            <DatePicker
              label="To Date"
              value={valueToDate}
              onChange={(newValue) => setValueToDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
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
              // height: '100vh',
              overflow: 'auto',
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 300,
                    }}
                  >
                    <Chart order={orderList} valueFromDate={valueFromDate} valueToDate={valueToDate} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 300,
                    }}
                  >
                    <Deposits order={orderList} valueFromDate={valueFromDate} valueToDate={valueToDate} />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Container>

  )
}

export default Statistical