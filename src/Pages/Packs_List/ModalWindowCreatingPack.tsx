import React from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";


export const ModalWindowCreatingPack = () => {

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}  fullWidth>
                <DialogTitle>Add New Pack</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a title for your pack.
                    </DialogContentText>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'end'}}>
                        <TextField
                            fullWidth
                            autoFocus
                            required
                            margin="dense"
                            id="pack"
                            label="Title Pack"
                            type="text"
                            variant="standard"
                        />
                        <Checkbox
                            checked={true}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Back</Button>
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

