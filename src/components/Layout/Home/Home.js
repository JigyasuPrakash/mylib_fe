import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { sections } from '../../Constants/Constants';

function Home() {    
    return (
        <div>
            <h4 style={{ textAlign: "center" }}>Welcome to My Library</h4>
            <Grid container justifyContent={'space-evenly'}>
                {Object.keys(sections).map(key => (
                    <Grid item xs={3} key={key}>
                        <NavLink to={sections[key]} style={{ textDecoration: 'none' }}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align='center'>
                                            {key}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </NavLink>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Home;