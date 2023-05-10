import React from 'react';
import axios from 'axios';
import { Fab } from '@mui/material';
import GridView from '../CommonHelper/GridView';
import { baseURL } from '../../Constants/Constants';
import CreateAuthorModal from './Modal/CreateAuthorModal';

function Authors() {

    const [authors, setAuthors] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [dateOfBirth, setDateOfBirth] = React.useState();

    React.useEffect(() => fetchAuthorData(), []);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setFirstName();
        setLastName();
        setDateOfBirth();
        setOpen(false);
    }

    const fetchAuthorData = () => {
        axios.get(`${baseURL}/authors`)
            .then((response) => setAuthors(response.data))
            .catch(e => console.error(e.message));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let params = { first_name: firstName, last_name: lastName, date_of_birth: dateOfBirth }
        axios.post(`${baseURL}/authors`, params)
            .then(() => {
                handleClose();
                fetchAuthorData();
            })
            .catch(e => console.error(e.message));
    }

    return (
        <div>
            <GridView elements={authors.map(author => ({ id: author.id, type: "author", header: `${author.first_name} ${author.last_name}`, body: `Born on ${new Date(author.date_of_birth).toDateString()}.` }))} />
            <Fab style={{ position: 'fixed', bottom: 35, right: 35 }} color="primary" size='large' aria-label="add" onClick={handleOpen}>
                Add
            </Fab>
            <CreateAuthorModal
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                dateOfBirth={dateOfBirth}
                setDateOfBirth={setDateOfBirth}
            />
        </div>
    )
}

export default Authors;