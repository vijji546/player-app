import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Alert from '@mui/material/Alert';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fafafa",
  },
});
const baseURL = "http://localhost:8080/api/players";

function Player() {

const [players, setPlayers] = useState(null);
const [error, setError] = React.useState({displayError:false});

React.useEffect(() => {
                axios.get(baseURL).then((response) => {
                  setPlayers(response.data);
                }).catch(error => {
                        setError({displayError:true});
                      });
              }, []);
const classes = useStyles();
return (
    <div>
      {players != null && <Container>
         <Typography
          color="textPrimary"
          gutterBottom
          variant="h2"
          align="center"
        >
          Players{" "}
        </Typography>
        <Grid container spacing={3}>
                  {players.map((p) => (
                    <Grid item xs={12} sm={4}>
                      <Card className={classes.card}>
                        <CardContent>
                          <Typography color="primary" variant="h5">
                           Name: {p.name}
                          </Typography>
                          <Typography color="textSecondary" variant="subtitle2">
                            Debut: {p.debut}
                          </Typography>
                          <Typography color="textSecondary" variant="subtitle2">
                           Height: {p.height} centimeters
                          </Typography>
                          <Typography color="textSecondary" variant="subtitle2">
                           Weight: {p.weight} lbs
                          </Typography>
                          <Typography color="textSecondary" variant="subtitle2">
                           Birth City: {p.location.birthCity}
                          </Typography>
                          <Typography color="textSecondary" variant="subtitle2">
                           Birth State: {p.location.birthState}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container> }
              { error.displayError ?
                              <Alert severity="error">Something went wrong, Please try again later</Alert>: null}
            </div>
          );
}

export default Player;