import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { urlPrefix } from 'Config/Config.js';
import { emailReg, phoneNumberReg } from 'Utils/Reg.js';
import Copyright from 'components/Copyright/Copyright.js';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [loginForm, setLoginForm] = useState({});
  const [usernameErrorInput, setUsernameErrorInput] = useState(false);
  const [passwordErrorInput, setPasswordErrorInput] = useState(false);

  const changeUserName = (e) => {
    const input = (e.target.value = e.target.value.trim());
    const isValid = emailReg(input) || phoneNumberReg(input);
    loginForm['user_name'] = isValid ? input : '';
    setUsernameErrorInput(!isValid);
    setLoginForm(loginForm);
  };

  const changePassword = (e) => {
    const input = (e.target.value = e.target.value.trim());
    loginForm['password'] = input || '';
    setPasswordErrorInput(!input);
    setLoginForm(loginForm);
  };

  const clickLogin = async () => {
    console.log(loginForm);
    try {
      const res = await axios.post(
        urlPrefix + '/account/user/login',
        loginForm,
        { validateStatus: false }
      );
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('token', res.headers.authorization);
        history.push({ pathname: '/admin/dashboard', state: true  });
      } else {
        alert(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
        </Typography>
        <TextField
          error={usernameErrorInput}
          onChange={changeUserName}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="电子邮件/手机号"
          name="email"
          autoComplete="email"
          autoFocus
          helperText={usernameErrorInput ? '请输入正确的账号' : ''}
        />
        <TextField
          error={passwordErrorInput}
          onChange={changePassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="密码"
          type="password"
          id="password"
          autoComplete="current-password"
          helperText={passwordErrorInput ? '请输入正确的密码' : ''}
        />
        <Button
          fullWidth
          onClick={clickLogin}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          登录
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="#">忘记密码？</Link>
          </Grid>
          <Grid item>
            <Link to="/register">没有账号？注册一个</Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
