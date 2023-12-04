import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import categoryService from "../service/categoryService";
import productService from "../service/productService";
import comboService from "../service/comboService";
import commentService from "../service/commentService";

const DeleteDialog = (props) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        switch (props.name) {
            case "category":
                categoryService.deleleCategory(props.id)
                    .then((res) => {
                        console.log("Delete Successful");
                        handleClose();
                        props.handleRefreshCategory();
                    })
                    .catch((error) => {
                        handleClose();
                        console.log(error);
                        alert("Không thể xóa vì bị ràng buộc");
                    });
                break;
            case "product":
                productService.deleleProduct(props.id)
                    .then((res) => {
                        console.log("Delete Success");
                        props.handleRefreshProduct();
                        handleClose();
                    })
                    .catch((error) => {
                        handleClose();
                        console.log(error);
                        alert("Không thể xóa vì bị ràng buộc");
                    });
                break;
            case "combo":
                comboService.deleteCombo(props.id)
                    .then((res) => {
                        console.log("Delete Success");
                        props.handleRefreshCombo();
                        handleClose();
                    })
                    .catch((error) => {
                        handleClose();
                        console.log(error);
                        alert("Không thể xóa vì bị ràng buộc");
                    });
                break;
            case "comment":
                commentService.deleteComment(props.id)
                    .then((res) => {
                        console.log("Delete Success");
                        props.handleRefreshComment();
                        handleClose();
                    })
                    .catch((error) => {
                        handleClose();
                        console.log(error);
                    });
                break;
        }
    };
    
    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen} color="error" size="medium" startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Are you sure you want to delete it?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nhấn Yes để xóa, No để hủy
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" autoFocus onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button variant="contained" color="error" onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

}

export default DeleteDialog