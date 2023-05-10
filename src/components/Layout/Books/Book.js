import React from 'react';
import axios from 'axios';
import EditBookModal from './Modal/EditBookModal';
import BookAuthorsTable from './Helper/BookAuthorsTable';
import { levels, baseURL } from '../../Constants/Constants';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteBookConfirmationModal from './Modal/DeleteBookConfirmationModal';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';

function Book() {
    const { id } = useParams();
    const [book, setBook] = React.useState({});
    const [authors, setAuthors] = React.useState([]);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = React.useState(false);
    const [bookTitle, setBookTitle] = React.useState();
    const [price, setPrice] = React.useState();
    const [level, setLevel] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => fetchBookAuthors(), []);

    const handleEditModalOpen = () => setEditModalOpen(true);
    const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
    const handleConfirmationModalClose = () => setConfirmationModalOpen(false);
    const handleLevelChange = (newLevel) => setLevel(levels[newLevel]);

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setBookTitle(book.book_title);
        setPrice(book.price);
        setLevel(levels[book.level]);
    }

    const fetchBookAuthors = () => {
        axios.get(`${baseURL}/get_book_authors/${id}`)
            .then((response) => {
                setBook(response.data.book);
                setAuthors(response.data.authors);
                setBookTitle(response.data.book.book_title);
                setPrice(response.data.book.price);
                handleLevelChange(response.data.book.level);
            })
            .catch(e => console.error(e.message))
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        let params = { book_title: bookTitle, price, level: level }
        axios.put(`${baseURL}/books/${id}`, params)
            .then(() => {
                handleEditModalClose();
                fetchBookAuthors();
            })
            .catch(e => console.error(e.message))
    }

    const handleConfirmationSubmit = (e) => {
        e.preventDefault();
        axios.delete(`${baseURL}/books/${id}`)
            .then(() => navigate("/book"))
            .catch(e => console.error(e.message))
    }

    return (
        <div>
            <Grid container spacing={2} justifyContent={'space-evenly'}>
                <Grid item xs={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {book.book_title}
                            </Typography>
                            <Typography variant="body2">
                                Available only at $ {book.price}. Recommended for {book.level} readers. Written by {authors.length} writter(s). Below are the links for the same.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" variant='contained' onClick={handleEditModalOpen}>
                                Edit
                            </Button>
                            <Button size="small" color="secondary" variant='contained' onClick={handleConfirmationModalOpen}>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid><br />
            <BookAuthorsTable authors={authors} />
            <EditBookModal
                bookTitle={bookTitle}
                editModalOpen={editModalOpen}
                handleEditModalClose={handleEditModalClose}
                handleEditSubmit={handleEditSubmit}
                handleLevelChange={handleLevelChange}
                level={level}
                price={price}
                setBookTitle={setBookTitle}
                setPrice={setPrice}
            />
            <DeleteBookConfirmationModal
                confirmationModalOpen={confirmationModalOpen}
                handleConfirmationModalClose={handleConfirmationModalClose}
                handleConfirmationSubmit={handleConfirmationSubmit}
            />
        </div>
    )
}

export default Book;