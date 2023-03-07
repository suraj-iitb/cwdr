import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CssBaseline from "@mui/material/CssBaseline";
import CssBaseline from "@mui/material/CssBaseline";

import {
  Box,
} from "@mui/material";
import "./Home.scss";
import { Header } from "../components";
import { COLLECTIONS } from "../constants/constants";

export const Home = () => {


  const images = [
    {
      src: require("../images/maithri.jpeg"),
      alt: COLLECTIONS.MAITHRI,
      title: COLLECTIONS.MAITHRI,
      link: `/fieldworkerform?org=${COLLECTIONS.MAITHRI}`,
    },
    {
      src: require("../images/manushi.jpeg"),
      alt: COLLECTIONS.MANUSHI,
      title: COLLECTIONS.MANUSHI,
      link: `/fieldworkerform?org=${COLLECTIONS.MANUSHI}`,
    },
    {
      src: require("../images/snehidhi.jpeg"),
      alt: COLLECTIONS.SNEHIDHI,
      title: COLLECTIONS.SNEHIDHI,
      link: `/fieldworkerform?org=${COLLECTIONS.SNEHIDHI}`,
    },
  ];


  const renderCards = () => {
    return images.map((image, index) => (
      <div class="first card">
        <img class="card-img" src={image.src} alt="" />
        <div class="card-description-bk"></div>
        <div class="card-description">
          <p>{image.title.toUpperCase()}</p>
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
    <div className="container">
      <CssBaseline />

     <Header />
     <div className="contentBody">
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
      </div>

    </div>
  );
};
