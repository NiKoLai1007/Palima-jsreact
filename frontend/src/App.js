import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer';
import Nav from './Nav';
import Create from './Create';
import axios from 'axios'
import Title from './Title';
import { Card, Container, Typography } from '@mui/material';
import { PostList } from './PostList';

function App() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    axios
       .get(`${process.env.REACT_APP_API}/posts`)
      .then(response => {
        console.log(response);
        setPosts(response.data);
      })
      .catch(error => alert('Error fetching posts'));
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container pb-5">
      <Nav />
      <Title title="welcome to my blog" />
      {posts.length > 0 ? posts.map((post, i) => (
        <PostList post={post} key={post.id} fetchPosts={fetchPosts} />

      )) : <Container
        direction="column"
        alignItems="center"
       >
        <Typography>No posts yet</Typography>
      </Container>}

      <Footer />
    </div>
  );
}

export default App;