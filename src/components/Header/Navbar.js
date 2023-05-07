import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
                            MyLibrary
                        </Typography>
                    </NavLink>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;