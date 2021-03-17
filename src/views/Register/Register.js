import React, { useState } from 'react';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/2432001677/qop-web">
        Bruce
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginIn() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');

  const clickLogin = async () => {
    console.log(username);
    console.log(password);
    try {
      const res = await axios.post(
        'http://127.0.0.1:9001/account/user/register',
        {
          username: username,
          nickname: nickName,
          password: password,
        }
      );
      console.log(res.headers);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert('err');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <TextField
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email/phone"
          label="Email/Phone"
          name="email/phone"
          autoComplete="email/phone"
          autoFocus
        />
        <TextField
          onChange={(e) => {
            setNickName(e.target.value);
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nick-name"
          label="Nick Name"
          name="nick-name"
          autoComplete="nick-name"
          autoFocus
        />
        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          fullWidth
          onClick={clickLogin}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              {"Already have an account? Log In"}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
