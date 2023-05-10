import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { baseURL } from '../../Constants/Constants';
import EditAuthorModal from './Modal/EditAuthorModal';
import AuthorBooksTable from './Helper/AuthorBooksTable';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteAuthorConfirmationModal from './Modal/DeleteAuthorConfirmationModal';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';

function Author() {
    const { id } = useParams();
    const [author, setAuthor] = React.useState({});
    const [books, setBooks] = React.useState([]);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [dateOfBirth, setDateOfBirth] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => fetchAuthorBooks(), []);

    const handleEditModalOpen = () => setEditModalOpen(true);
    const handleConfirmationModalOpen = () => setConfirmationModalOpen(true);
    const handleConfirmationModalClose = () => setConfirmationModalOpen(false);

    const handleEditModalClose = () => {
        setEditModalOpen(false)
        setFirstName(author.first_name);
        setLastName(author.last_name);
        setDateOfBirth(dayjs(author.date_of_birth.toString()));
    }

    const fetchAuthorBooks = () => {
        axios.get(`${baseURL}/get_author_books/${id}`)
            .then((response) => {
                setAuthor(response.data.author);
                setBooks(response.data.books);
                setFirstName(response.data.author.first_name);
                setLastName(response.data.author.last_name);
                setDateOfBirth(dayjs(response.data.author.date_of_birth.toString()));
            })
            .catch(e => console.error(e.message));
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        let params = { first_name: firstName, last_name: lastName, date_of_birth: dateOfBirth }
        axios.put(`${baseURL}/authors/${id}`, params)
            .then(() => {
                handleEditModalClose();
                fetchAuthorBooks();
            })
            .catch(e => console.error(e.message));
    }

    const handleConfirmationSubmit = (e) => {
        e.preventDefault();
        axios.delete(`${baseURL}/authors/${id}`)
            .then(() => navigate("/author"))
            .catch(e => console.error(e.message));
    }

    return (
        <div>
            <Grid container spacing={2} justifyContent={'space-evenly'}>
                <Grid item xs={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {author.first_name + " " + author.last_name}
                            </Typography>
                            <Typography variant="body2">
                                Born on {new Date(author.date_of_birth).toDateString()}. {author.first_name} has written {books.length} book(s). Below are the links for the same.
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
            <AuthorBooksTable
                books={books}
            />
            <EditAuthorModal
                editModalOpen={editModalOpen}
                handleEditModalClose={handleEditModalClose}
                handleEditSubmit={handleEditSubmit}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                dateOfBirth={dateOfBirth}
                setDateOfBirth={setDateOfBirth}
            />
            <DeleteAuthorConfirmationModal
                confirmationModalOpen={confirmationModalOpen}
                handleConfirmationModalOpen={handleConfirmationModalOpen}
                handleConfirmationModalClose={handleConfirmationModalClose}
                handleConfirmationSubmit={handleConfirmationSubmit}
            />
        </div>
    )
}

export default Author;