import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { ImageListItemBar, ImageListItem, Box } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '& img': {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.2)',
        border: '2px solid black',
    }
}));
  
export const Home = () => {
    // let navigate = useNavigate();
    // useEffect(() => {
    //     let authToken = sessionStorage.getItem('Auth Token');
    //     if (!authToken) {
    //         navigate('/signin');
    //     }
    //   }, [navigate])
      

    const images = [
        {
            src: require('../images/maithri.jpeg'),
            alt: 'Mythri',
            title: 'Mythri',
            link: '/field_worker_form'
        },
        {
            src: require('../images/manushi.jpeg'),
            alt: 'Manushi',
            title: 'Manushi',
            link: '/fw_form'
        },
        {
            src: require('../images/snehidhi.jpeg'),
            alt: 'Snehidhi',
            title: 'Snehidhi',
            link: '/fw_form'
        }
    ]

    const renderImageList = () => {
        return images.map((image, index) => (
            <Grid xs key={index}>
                <Item>
                    <Link to={image.link}>
                        <ImageListItem>
                            <img src={image.src} alt={image.alt} loading="lazy"/>
                            <ImageListItemBar
                                title={image.title}
                                position="below"
                            />
                        </ImageListItem>
                    </Link>
                </Item>
            </Grid>
        ))
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                {renderImageList()}
            </Grid>
        </Box>
    );
}