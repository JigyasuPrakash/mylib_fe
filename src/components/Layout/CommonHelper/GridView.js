import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

function GridView({ elements }) {
    const navigate = useNavigate();
    const navigateToIndividualElement = (id) => navigate(`/${elements[0].type.toLowerCase()}/${id}`);

    return (
        <Grid container spacing={2}>
            {elements.map((ele) => (
                <Grid item xs={3} key={ele.id}>
                    <Card variant="outlined" onClick={() => navigateToIndividualElement(ele.id)}>
                        <CardActionArea>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {ele.type.toUpperCase()}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {ele.header}
                                </Typography>
                                <Typography variant="body2">
                                    {ele.body}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default GridView;