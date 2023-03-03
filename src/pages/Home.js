import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
<<<<<<< HEAD
    <React.Fragment>
      <Header />
      <Toolbar />
      
        {renderCards()}
      
      
      
    // {/* </Box> */}
    </React.Fragment>
    
=======
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
>>>>>>> dv/form_wip
  );
};
