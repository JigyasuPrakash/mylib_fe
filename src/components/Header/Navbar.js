import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const navigateToAuthor = () => navigate("/author");
    const navigateToBook = () => navigate("/book");
    const navigateToHome = () => navigate("/");

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button onClick={navigateToHome}>
                        <Typography variant="h6" noWrap sx={{ fontWeight: 700, color: 'white' }}>
                            My Library
                        </Typography>
                    </Button>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button onClick={navigateToAuthor} sx={{ my: 2, color: 'white', display: 'block' }}>
                            Author
                        </Button>
                        <Button onClick={navigateToBook} sx={{ my: 2, color: 'white', display: 'block' }}>
                            Book
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;