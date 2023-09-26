import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export const PostList = ({ post, fetchPosts }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let navigate = useNavigate()
    const deleteConfirm = id => {

        let answer = window.confirm('Are you sure you want to delete this post?');
        if (answer) {
            deletePost(id);
        }
    };

    const deletePost = id => {
        // console.log('delete', slug, ' post');
        axios
            .delete(`${process.env.REACT_APP_API}/posts/${id}`)
            .then(response => {
                // alert(response.data.status);
                fetchPosts()
                // navigate('/')
                
            })
            .catch(error => alert('Error deleting post'));
    };

    const dialog = () => {
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                delete this post?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    delete this post?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleClose} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    }
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {post.title}
                </Typography> */}
                <Link to={`/post/${post.id}`}>
                    <h2>{post.title}</h2>
                </Link>
                <Typography variant="subtitle1">
                    {post.slug}
                </Typography>
                <Typography variant="body2">
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">read More</Button>
            </CardActions>
            <Container>
                <Link to={`/post/update/${post.id}`} >
                    <Button variant="contained" >edit</Button>
                </Link>
                <Button variant="contained" color="error" onClick={() => deleteConfirm(post.id)}>Delete</Button>
            </Container>
        </Card>
    );

}