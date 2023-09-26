import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const Nav = () => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate()
    const { email, password } = state;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = name => event => {

        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        console.log(event)

        event.preventDefault();

        axios.post(`http://localhost:4000/api/login`, { email, password }).then(response => {
            console.log(response);
            setOpen(false)
            // show sucess alert
            // alert(`Post titled ${response.data.data.title} is created`);
            return navigate("/");
        })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <>
            <div>
                <nav className='navbar sticky-top navbar-expand-lg navbar-dark bg-secondary'>
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id="navbarText">
            <ul className="navbar-nav">
            <li className="nav-item">
            <Link className="nav-link" to="/"> Home </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/create"> Create </Link>
            </li>
            <Button variant="outlined" onClick={handleClickOpen}>
                            Login
                        </Button>
            </ul>
            </div>

      </nav>
            </div>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <form >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleChange('email')}
                            value={email}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={handleChange('password')}
                            value={password}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Login</Button>

                </DialogActions>
            </Dialog>
            
        </>
    )
}

export default Nav