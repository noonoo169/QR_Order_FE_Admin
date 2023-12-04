import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

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
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<VisibilityIcon />} color='success'>
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
        </React.Fragment>
    );
}