import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CssBaseline from "@mui/material/CssBaseline";

import {
  Box,
} from "@mui/material";
import "./Home.scss";
import { Header } from "../components";

export const Home = () => {


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
        <Box>
      <CssBaseline />
    
      <Header />
      <Box sx={{padding: "1rem"}}>
        <Typography
          variant="h5"
          noWrap
          title="Navigate to home"
          style={{ color: "black",           justifyContent:"center",     display:"flex", color: "#9131b9"

        }}
        >
          SELECT A PROGRAM TO ENROLL USERS
        </Typography>
      </Box>
      <Grid className="overallContainer">{renderCards()}</Grid>
      </Box>
    </>
  );
};
