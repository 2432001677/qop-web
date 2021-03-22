import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Copyright from 'components/Copyright/Copyright.js';
import { urlPrefix } from 'Config/Config.js';
import { emailReg, phoneNumberReg } from 'Utils/Reg.js';
import ResponsiveDialog from 'components/Dialog/ResponsiveDialog.js';

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
  const history = useHistory();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [registerForm, setRegisterForm] = useState({});
  const [usernameErrorInput, setUsernameErrorInput] = useState(false);
  const [nicknameErrorInput, setNicknameErrorInput] = useState(false);
  const [passwordErrorInput, setPasswordErrorInput] = useState(false);

  const clickRegister = async () => {
    try {
      const res = await axios.post(
        urlPrefix + '/account/user/register',
        registerForm,
        { validateStatus: false }
      );
      console.log(res);
      if (res.status === 200) {
        setOpenDialog(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeUsername = (e) => {
    e.target.value = e.target.value.trim();
    const input = e.target.value;
    const isValid = emailReg(input) || phoneNumberReg(input);
    registerForm['user_name'] = isValid ? input : '';
    setRegisterForm(registerForm);
    setUsernameErrorInput(!isValid);
  };

  const changeNickname = (e) => {
    e.target.value = e.target.value.trim();
    const input = e.target.value;
    registerForm['nick_name'] = input || '';
    setRegisterForm(registerForm);
    setNicknameErrorInput(!input);
  };

  const changePassword = (e) => {
    e.target.value = e.target.value.trim();
    const input = e.target.value;
    registerForm['password'] = input || '';
    setPasswordErrorInput(!input);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          注册
        </Typography>
        <TextField
          error={usernameErrorInput}
          onChange={changeUsername}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email/phone"
          label="电子邮件/手机号"
          name="email/phone"
          autoComplete="email/phone"
          autoFocus
        />
        <TextField
          error={nicknameErrorInput}
          onChange={changeNickname}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nick-name"
          label="昵称"
          name="nick-name"
          autoComplete="nick-name"
          autoFocus
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
        />
        <Button
          fullWidth
          onClick={clickRegister}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          注册
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/login">已经有账号了？登录</Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <ResponsiveDialog
        info={registerForm}
        open={openDialog}
        onChange={setOpenDialog}
        onExit={() => {
          history.push('/login');
        }}
      />
    </Container>
  );
}
