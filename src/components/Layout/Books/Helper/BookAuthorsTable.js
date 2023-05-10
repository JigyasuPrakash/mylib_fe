import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function BookAuthorsTable({ authors }) {
    const navigate = useNavigate();
    const navigateToIndividualAuthor = (id) => navigate(`/author/${id}`);

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                <b>Author Name</b>
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                <b>Date of birth</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authors.map((author) => (
                            <TableRow hover key={author.id}>
                                <TableCell align="center" colSpan={3}>
                                    <Button onClick={() => navigateToIndividualAuthor(author.id)}>{author.first_name} {author.last_name}</Button>
                                </TableCell>
                                <TableCell align="center" colSpan={3}>
                                    {new Date(author.date_of_birth).toDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default BookAuthorsTable;