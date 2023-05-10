import React from "react";
import { modalStyle } from "../../../Constants/Constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Backdrop, Box, Button, Fade, FormControl, Modal, TextField, Typography } from "@mui/material";

function CreateAuthorModal({open, handleClose, handleSubmit, firstName, setFirstName, lastName, setLastName, dateOfBirth, setDateOfBirth}) {

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <form onSubmit={handleSubmit}>
                    <Box sx={modalStyle}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Create New Author
                        </Typography><br />
                        <FormControl>
                            <TextField id="firstName" label="First Name" variant="outlined" value={firstName} onInput={e => setFirstName(e.target.value)} /><br />
                            <TextField id="lastName" label="Last Name" variant="outlined" value={lastName} onInput={e => setLastName(e.target.value)} /><br />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker value={dateOfBirth} onChange={e => { setDateOfBirth(e) }} inputFormat="dd-MM-yyyy" />
                            </LocalizationProvider><br />
                            <Button type='submit' variant='contained'>Create</Button>
                        </FormControl>
                    </Box>
                </form>
            </Fade>
        </Modal>
    )
}

export default CreateAuthorModal;