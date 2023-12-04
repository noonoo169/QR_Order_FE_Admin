import { Avatar, Chip } from '@mui/material';

const Status = ({ status }) => {
  let color, backgroundColor;

  switch (status) {
    case 'PENDING':
      color = 'white';
      backgroundColor = 'red'; // Red background
      break;
    case 'IN_PROGRESS':
      color = 'white';
      backgroundColor = 'orange'; // Orange background
      break;
    case 'DONE':
      color = 'white';
      backgroundColor = 'green'; // Green background
      break;
    case 'SHIPPING':
      color = 'white';
      backgroundColor = 'blue'; // Blue background for SHIPPING status
      break;
    case 'CANCELLED':
      color = 'black'; // Black text color for CANCELLED status
      backgroundColor = 'gray'; // Gray background for CANCELLED status
      break;
    default:
      color = 'default';
      backgroundColor = 'rgba(255, 255, 255, 0.2)'; // Light gray background for unknown status
  }


  return (
    <Chip
      avatar={<Avatar sx={{ backgroundColor: color }}>{status.charAt(0)}</Avatar>}
      label={status}
      sx={{ backgroundColor: backgroundColor, color: '#fff' }}
    />
  );
};

export default Status;