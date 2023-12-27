import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { LegendToggle } from '@mui/icons-material';

function preventDefault(event) {
  event.preventDefault();
}

const totalRevenue = (orderList) => {
  let total = 0;
  orderList.forEach(element => {
    total += element.totalPrice;
  });
  return total;
}
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



export default function Deposits(props) {


  const orderList = endDisplay(props.order, props.valueFromDate, props.valueToDate);
  const getMaxSale = () => {
    let maxOrder = {
      time: "",
      total: 0
    }
    if (orderList !== undefined) {
      for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].amount >= maxOrder.total) {
          maxOrder = {
            time: orderList[i].time,
            total: orderList[i].amount
          };
        }
      }
    }
    return maxOrder;
  }

  const getMinOrder = () => {
    let maxOrder = {
      time: "",
      total: getMaxSale().total
    }
    if (orderList !== undefined) {
      for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].amount <= maxOrder.total) {
          maxOrder = {
            time: orderList[i].time,
            total: orderList[i].amount
          };
        }
      }
    }
    return maxOrder;
  }

  const totalRevenue = () => {
    let total = 0;
    if (orderList !== undefined) {
      orderList.forEach(element => {
        total += element.amount;
      })
    };
    return total;
  }

  return (
    <React.Fragment>
      <Title>Total Revenue</Title>
      <Typography component="p" variant="h4">
        {`${totalRevenue(props.order)} VND`}
      </Typography>
      <Typography color="text.secondary" sx={{ fontWeight: 'bold' }}>
        Highest sales:
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 0.5 }}>
        {getMaxSale().total === 0 ? `${getMaxSale().total} VND` : `${getMaxSale().total}VND: ${getMaxSale().time}`}
      </Typography>
      <Typography color="text.secondary" sx={{ fontWeight: 'bold' }}>
        Lowest sales:
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }} >
        {getMinOrder().total === 0 ? `${getMinOrder().total} VND` : `${getMinOrder().total}VND: ${getMinOrder().time}`}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}