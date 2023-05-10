import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


function AuthorBooksTable({ books }) {
    const navigate = useNavigate();
    const navigateToIndividualBook = (id) => navigate(`/book/${id}`);

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                <b>Book Title</b>
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                <b>Price</b>
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                <b>Level</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow hover key={book.id}>
                                <TableCell align="center" colSpan={3}>
                                    <Button onClick={() => navigateToIndividualBook(book.id)}>{book.book_title}</Button>
                                </TableCell>
                                <TableCell align="center" colSpan={3}>
                                    $ {book.price}
                                </TableCell>
                                <TableCell align="center" colSpan={3}>
                                    {book.level}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default AuthorBooksTable;