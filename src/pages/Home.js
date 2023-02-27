import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  ImageListItemBar,
  ImageListItem,
  Box,
  Button,
  AppBar,
  Toolbar,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "../hooks";
import "./Home.scss";

export const Home = () => {
  const { _signOut } = useAuth();

  const handleSignOut = (event) => {
    event.preventDefault();
    _signOut();
  };

  const images = [
    {
      src: require("../images/maithri.jpeg"),
      alt: "Mythri",
      title: "Mythri",
      link: "/fieldworkerform?org=mythri",
    },
    {
      src: require("../images/manushi.jpeg"),
      alt: "Manushi",
      title: "Manushi",
      link: "/fieldworkerform?org=manushi",
    },
    {
      src: require("../images/snehidhi.jpeg"),
      alt: "Snehidhi",
      title: "Snehidhi",
      link: "/fieldworkerform?org=snehidi",
    },
  ];

  const cardContent = {
    "flexGrow": 1,
  };

  // const card = {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "space-between",
  //   height: "100%",
  // };

  const media = { height: 440 };

  const renderCards = () => {
    return images.map((image, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card className="card ">
          <CardActionArea href={image.link}>
            <CardMedia
              className={media}
              image={image.src}
              title={image.title}
              style={media}
            />

            <CardContent className="cardContent">
              {/* <Link to={image.link}>  */}
              <Typography gutterBottom variant="h5" component="div">
                {image.title}
              </Typography>
              {/* </Link> */}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Centre for Women's Development and Research
          </Typography>
          <Button
            color="inherit"
            onClick={handleSignOut}
            startIcon={<Logout />}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} sx={{ marginTop: "1rem" }}>
        {renderCards()}
      </Grid>
    </Box>
  );
};
