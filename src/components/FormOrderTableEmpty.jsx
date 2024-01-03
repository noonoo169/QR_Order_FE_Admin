import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteDialog from '../components/DeleteDialog';
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Box } from '@mui/material';

export default function FormOrderTableEmpty() {
    const [open, setOpen] = React.useState(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen} color='success' size="medium" sx={{ marginLeft: 1 }}>
                View
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"THIS IS TABLE IS EMPTY"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This table currently has no orders. Please come back when there are new orders
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ backgroundColor: colors.blueAccent[600] }}>OK</Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
}