import React from "react";
import { levels, modalStyle } from "../../../Constants/Constants";
import { Backdrop, Box, Button, Fade, FormControl, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";

function EditBookModal({editModalOpen, handleEditModalClose, handleEditSubmit, bookTitle, setBookTitle, price, setPrice, level, handleLevelChange}) {

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={editModalOpen}
            onClose={handleEditModalClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={editModalOpen}>
                <form onSubmit={handleEditSubmit}>
                    <Box sx={modalStyle}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Update this book
                        </Typography><br />
                        <FormControl>
                            <TextField id="bookTitle" label="Book Title" variant="outlined" value={bookTitle} onInput={e => setBookTitle(e.target.value)} /><br />
                            <TextField id="lastName" label="Last Name" variant="outlined" value={price} type='number' onInput={e => setPrice(e.target.value)} /><br />
                            <Select
                                value={Object.keys(levels).find(key => levels[key] === level)}
                                onChange={e => handleLevelChange(e.target.value)}
                            >
                                {Object.keys(levels).map((key) => (
                                    <MenuItem key={levels[key]} value={key}>
                                        {key}
                                    </MenuItem>
                                ))}
                            </Select><br />
                            <Button type='submit' variant='contained'>Update</Button>

                        </FormControl><br />
                    </Box>
                </form>
            </Fade>
        </Modal>
    )

}

export default EditBookModal;