import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { modalStyle } from "../../../Constants/Constants";

function DeleteBookConfirmationModal({confirmationModalOpen,handleConfirmationModalClose, handleConfirmationSubmit}) {

    return(
        <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={confirmationModalOpen}
                onClose={handleConfirmationModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={confirmationModalOpen}>
                    <form onSubmit={handleConfirmationSubmit}>
                        <Box sx={modalStyle}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Are you sure?
                            </Typography><br />
                            <Button variant='outlined' onClick={handleConfirmationModalClose}>No</Button>&emsp;
                            <Button variant='outlined' type='submit' color='secondary'>Yes</Button>
                        </Box>
                    </form>
                </Fade>
            </Modal>
    )

}

export default DeleteBookConfirmationModal;