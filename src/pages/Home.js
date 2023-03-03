import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
import { Header } from "../components";

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
    flexGrow: 1,
  };
  
  const media = { height: 440 };

  const renderCards = () => {
    return images.map((image, index) => (
      <div class="first card">
        <img class="card-img" src={image.src} alt="" />
        <div class="card-description-bk"></div>
        <div class="card-description">
          <p>{image.title}</p>
        </div>
        <div class="card-btn">
          <a href={image.link}>
            <ArrowForwardIcon fontSize="medium" />
          </a>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Header />
      <Box sx={{padding: "1rem"}}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          title="Navigate to home"
          style={{ color: "black" }}
        >
          Click on a category tile below that matches the member's profile to
          start the enrollment process.
        </Typography>
      </Box>
      <Grid className="overallContainer">{renderCards()}</Grid>
    </>
  );
};
