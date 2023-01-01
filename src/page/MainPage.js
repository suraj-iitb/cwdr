import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MainPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid xs>
          <Item>
            <Link to="/hello">
              <ImageListItem key={1}>
                <img
                  src={require('../images/manushi.jpeg')}
                  alt={'Maithri'}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={'Maithri'}
                  position="below"
                />
              </ImageListItem>
            </Link>
          </Item>
        </Grid>
        <Grid xs>
          <Item>
            <ImageListItem key={2}>
              <img
                src={require('../images/manushi.jpeg')}
                alt={'Manushi'}
                loading="lazy"
              />
              <ImageListItemBar
                title={'Manushi'}
                position="below"
              />
            </ImageListItem>
          </Item>
        </Grid>
        <Grid xs>
          <Item>
            <ImageListItem key={1}>
              <img
                src={require('../images/snehidhi.jpeg')}
                alt={'Snehidhi'}
                loading="lazy"
              />
              <ImageListItemBar
                title={'Snehidhi'}
                position="below"
              />
            </ImageListItem>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}