import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400)

];

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
    console.log(startDate, endDate);
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

export default function Chart(props) {
    const theme = useTheme();
    // console.log(mapToOrderListDisplay(props.order));
    // console.log(handleDateTimeTwo(props.valueFromDate))

    // console.log(handleDateTimeTwo(props.valueToDate))
    // console.log(createDateArray(props.valueFromDate, props.valueToDate))

    //console.log(endDisplay(props.order, props.valueFromDate, props.valueToDate))
    return (
        <React.Fragment>
            <Title>Sales Statistics</Title>
            <ResponsiveContainer>
                <LineChart
                    data={endDisplay(props.order, props.valueFromDate, props.valueToDate)}
                    //data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        //stroke={theme.palette.primary.main}
                        stroke="red"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}