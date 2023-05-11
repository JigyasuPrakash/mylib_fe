import React from 'react';
import axios from 'axios';
import GridView from '../CommonHelper/GridView';
import CreateBookModal from './Modal/CreateBookModal';
import { levels, baseURL } from '../../Constants/Constants';
import { Button, Fab, Menu, MenuItem } from '@mui/material';

function Books() {
    const [books, setBooks] = React.useState([]);
    const [fBooks, setFBooks] = React.useState([]);
    const [authors, setAuthors] = React.useState([]);
    const [bookTitle, setBookTitle] = React.useState(null);
    const [level, setLevel] = React.useState(0);
    const [authorsName, setAuthorsName] = React.useState([]);
    const [price, setPrice] = React.useState(0.0);
    const [open, setOpen] = React.useState(false);
    const [priceFilter, setPriceFilter] = React.useState(null);
    const [levelFilter, setLevelFilter] = React.useState(null);
    const [authorFilter, setAuthorFiler] = React.useState(null);
    const openPriceFilter = Boolean(priceFilter);
    const openLevelFilter = Boolean(levelFilter);
    const openAuthorFilter = Boolean(authorFilter);

    React.useEffect(() => {
        fetchBookData();
        fetchAuthorData();
    }, []);


    const handlePriceFilterOpen = (event) => setPriceFilter(event.currentTarget);
    const handleLevelFilterOpen = (event) => setLevelFilter(event.currentTarget);
    const handleAuthorFilterOpen = (event) => setAuthorFiler(event.currentTarget);
    const handlePriceFilterClose = () => setPriceFilter(null);
    const handleLevelFilterClose = () => setLevelFilter(null);
    const handleAuthorFilterClose = () => setAuthorFiler(null);
    const handleOpen = () => setOpen(true);
    const handleLevelChange = (newLevel) => setLevel(levels[newLevel]);
    const clearAllFilters = () => setFBooks(books);
    
    const filterBooksPrice = (type) => {
        setFBooks(sort_by(books, book => book.price, type === "dec"));
        handlePriceFilterClose();
    }
    function sort_by (array, key_func, reverse = false) {
        return array.sort((a, b) => (key_func(b) - key_func(a)) * (reverse ? 1 : -1))
    }
    
    const filterBooksLevel = (level) => {
        setFBooks(books.filter(book => levels[book.level] === level));
        handleLevelFilterClose();
    }

    const filterBooksAuthor = (author_id) => {
        setFBooks(books.filter(book => book.author_ids.includes(author_id)));
        handleAuthorFilterClose();
    }
    
    const handleAuthorsName = (event) => {
        const { target: { value } } = event;
        setAuthorsName(typeof value === 'string' ? value.split(',') : value);
    };

    const handleClose = () => {
        setBookTitle();
        setPrice();
        setLevel();
        setAuthorsName([]);
        setOpen(false);
    }

    const fetchBookData = () => {
        axios.get(`${baseURL}/books`)
            .then((response) => {
                setBooks(response.data);
                setFBooks(response.data);
            })
            .catch(e => console.error(e.message))
    }

    const fetchAuthorData = () => {
        axios.get(`${baseURL}/authors`)
            .then((response) => setAuthors(response.data))
            .catch(e => console.error(e.message))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let params = { book_title: bookTitle, price, level: level, authors: { ids: authorsName.map(x => x.id) } }
        axios.post(`${baseURL}/books`, params)
            .then(() => {
                handleClose();
                fetchBookData();
            })
            .catch(e => console.error(e.message))
    }

    return (
        <div>
            <div>
                Filters: &emsp;
                <Button
                    id="price-button"
                    aria-controls={openPriceFilter ? 'price-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openPriceFilter ? 'true' : undefined}
                    onClick={handlePriceFilterOpen}
                >
                    Price
                </Button>
                <Menu
                    id="price-menu"
                    anchorEl={priceFilter}
                    open={openPriceFilter}
                    onClose={handlePriceFilterClose}
                    MenuListProps={{
                        'aria-labelledby': 'price-button',
                    }}
                >
                    <MenuItem onClick={() => filterBooksPrice("inc")}>Increasing</MenuItem>
                    <MenuItem onClick={() => filterBooksPrice("dec")}>Decreasing</MenuItem>
                </Menu>&emsp;
                <Button
                    id="level-button"
                    aria-controls={openLevelFilter ? 'level-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openLevelFilter ? 'true' : undefined}
                    onClick={handleLevelFilterOpen}
                >
                    Level
                </Button>
                <Menu
                    id="level-menu"
                    anchorEl={levelFilter}
                    open={openLevelFilter}
                    onClose={handleLevelFilterClose}
                    MenuListProps={{
                        'aria-labelledby': 'level-button',
                    }}
                >
                    <MenuItem onClick={() => filterBooksLevel(0)}>Begineer</MenuItem>
                    <MenuItem onClick={() => filterBooksLevel(1)}>Intermediate</MenuItem>
                    <MenuItem onClick={() => filterBooksLevel(2)}>Advanced</MenuItem>
                </Menu>&emsp;
                <Button
                    id="author-button"
                    aria-controls={openAuthorFilter ? 'author-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAuthorFilter ? 'true' : undefined}
                    onClick={handleAuthorFilterOpen}
                >
                    Author
                </Button>
                <Menu
                    id="author-menu"
                    anchorEl={authorFilter}
                    open={openAuthorFilter}
                    onClose={handleAuthorFilterClose}
                    MenuListProps={{
                        'aria-labelledby': 'author-button',
                    }}
                >
                    {authors.map(author => (
                        <MenuItem key={author.id} onClick={() => filterBooksAuthor(author.id)}>{author.first_name + " " + author.last_name}</MenuItem>
                    ))}
                </Menu>&emsp;&emsp;
                <Button
                    onClick={clearAllFilters}
                >
                    Clear
                </Button>
            </div><br />
            <GridView elements={fBooks.map(book => ({ id: book.id, type: "book", header: book.book_title, body: `Available only at $ ${book.price}. Recommended for ${book.level} readers.` }))} />
            <Fab style={{ position: 'fixed', bottom: 35, right: 35 }} color="primary" size='large' aria-label="add" onClick={handleOpen}>
                Add
            </Fab>
            <CreateBookModal
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                bookTitle={bookTitle}
                setBookTitle={setBookTitle}
                price={price}
                setPrice={setPrice}
                level={level}
                setLevel={setLevel}
                handleLevelChange={handleLevelChange}
                authorsName={authorsName}
                handleAuthorsName={handleAuthorsName}
                authors={authors}
            />
        </div>
    )
}

export default Books;