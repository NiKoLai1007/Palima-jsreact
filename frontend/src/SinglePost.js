import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography,   styled } from '@mui/material'
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import axios from 'axios'
import Nav from './Nav';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const SinglePost = () => {

    const [post, setPost] = useState({});
    const [expanded, setExpanded] = useState(false);
    let { id } = useParams();
    console.log(id);
    const fetchPost = () => {
        axios.get(`http://localhost:4000/api/posts/${id}`)
            .then(response => {
                console.log(response.data);
                setPost(response.data);
            })
            .catch(error => alert('Error fetching posts'));
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    useEffect(() => {
        fetchPost();
    }, []);
    return (
        <Container>
            <Nav />
            <br />
            <Card sx={{ maxWidth: 'md' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {post.id}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={post.title}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="/images/ojt2.jpeg"
                    alt="ojt"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{post.slug}</Typography>
                        <Typography paragraph>
                            {post.content}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            
        </Container>
    )
}

export default SinglePost