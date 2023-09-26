import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import { authenticate } from './helpers';
const Login = ({ openDialog, handleClose }) => {
    const [open, setOpen] = useState(openDialog)
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate()
    const { email, password } = state;
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    };
    const handleSubmit = event => {
        console.log(event)
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`, { email, password }).then(response => {
            console.log(response);
            setOpen(false)
            authenticate(response, () => navigate("/create"));
        })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };
    return (
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
    )
}

export default Login