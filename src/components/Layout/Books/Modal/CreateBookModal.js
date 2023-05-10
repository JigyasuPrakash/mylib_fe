import React from "react";
import { levels, modalStyle } from "../../../Constants/Constants";
import { Backdrop, Box, Button, Checkbox, Fade, FormControl, InputLabel, ListItemText, MenuItem, Modal, OutlinedInput, Select, TextField, Typography } from "@mui/material";

function CreateBookModal({ open, handleClose, handleSubmit, bookTitle, setBookTitle, price, setPrice, level, handleLevelChange, authorsName, handleAuthorsName, authors }) {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            }
        }
    };

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
                    timeout: 500
                }
            }}
        >
            <Fade in={open}>
                <form onSubmit={handleSubmit}>
                    <Box sx={modalStyle}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Create New Book
                        </Typography><br />
                        <FormControl>
                            <TextField id="bookTitle" label="Book Title" variant="outlined" value={bookTitle} onInput={e => setBookTitle(e.target.value)} /><br />
                            <TextField id="price" label="Price" variant='outlined' value={price} onInput={e => setPrice(e.target.value)} type='number' /><br />
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Level"
                                value={Object.keys(levels).find(key => levels[key] === level)}
                                onChange={e => handleLevelChange(e.target.value)}
                            >
                                {Object.keys(levels).map((key) => (
                                    <MenuItem key={levels[key]} value={key}>
                                        {key}
                                    </MenuItem>
                                ))}
                            </TextField><br />
                        </FormControl><br />
                        <FormControl>
                            <InputLabel id="demo-multiple-checkbox-label">Author</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={authorsName}
                                onChange={handleAuthorsName}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.map(x => `${x.first_name} ${x.last_name}`).join(', ')}
                                MenuProps={MenuProps}
                            >
                                {authors.map((author) => (
                                    <MenuItem key={author.id} value={author}>
                                        <Checkbox checked={authorsName.indexOf(author) > -1} />
                                        <ListItemText primary={author.first_name + " " + author.last_name} />
                                    </MenuItem>
                                ))}
                            </Select><br />
                            <Button type='submit' variant='contained'>Create</Button>
                        </FormControl>
                    </Box>
                </form>
            </Fade>
        </Modal>
    )
}

export default CreateBookModal;