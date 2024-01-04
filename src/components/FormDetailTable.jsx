import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { tokens } from "../theme";
import DeleteDialog from "../components/DeleteDialog";
import FormUpdateTable from "./FormUpdateTable";
import QRCodeGenerate from "./GenerateQR";
import CancelIcon from '@mui/icons-material/Cancel';

const FormDetailTable = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);


    };

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen} size="medium" sx={{ backgroundColor: colors.primary[400], width: "30%" }}>option</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h2" component='div'>Option</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, You can optionally update, delete, and download the QR Code here.
                    </DialogContentText>
                    <DialogContentText>
                        <QRCodeGenerate table={props}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <FormUpdateTable name={props.name} id={props.id} handleRefreshTable={props.handleRefreshTable} handleClose={handleClose} />
                    {
                        props.status === "EMPTY" ? <DeleteDialog name="table" id={props.id} handleRefreshTable={props.handleRefreshTable} handleClose={handleClose} />
                            : <Box></Box>
                    }
                    <Button variant="outlined" onClick={handleClose} startIcon={<CancelIcon />} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default FormDetailTable;