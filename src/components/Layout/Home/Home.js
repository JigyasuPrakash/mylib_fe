import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <h4>Welcome to My Library</h4>
                <Grid container justifyContent={'space-evenly'}>
                    <Grid item xs={3}>
                        <NavLink to="/books" style={{ textDecoration: 'none' }}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Books
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </NavLink>
                    </Grid>
                    <Grid item xs={3}>
                        <NavLink to="/authors" style={{ textDecoration: 'none' }}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Authors
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </NavLink>
                    </Grid>
                </Grid>
            </header>
        </div>

    )
}

export default Home;