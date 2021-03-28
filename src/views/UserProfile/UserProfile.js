import React, { useEffect, useState, useRef } from 'react';
import { get, post } from 'Utils/Axios.js';
import { emailReg, phoneNumberReg } from 'Utils/Reg.js';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [profilesForm, setProfilesForm] = useState({});
  const [msg, setMsg] = useState('未登录');
  const [nicknameErrorInput, setNicknameErrorInput] = useState(false);
  const [emailErrorInput, setEmailErrorInput] = useState(false);
  const [phoneNumberErrorInput, setPhoneNumberErrorInput] = useState(false);
  const nickRef = useRef('');
  const emailRef = useRef('');
  const phoneNumberRef = useRef('');
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  useEffect(() => {
    const getUserProfiles = async () => {
      try {
        const { data } = await get('/account/user/profiles', false, true);
        console.log(data);
        setProfilesForm(data.data);
        nickRef.current.value = data.data['nick_name'];
        emailRef.current.value = data.data['email'];
        phoneNumberRef.current.value = data.data['phone_number'];
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfiles();
  }, []);

  const clickModify = (Transition) => async () => {
    setState({
      open: true,
      Transition,
    });
    if (nicknameErrorInput || emailErrorInput || phoneNumberErrorInput) {
      setMsg('输入格式错误');
      return;
    }

    try {
      let profiles = {};
      profiles['nick_name'] = nickRef.current.value;
      profiles['email'] = emailRef.current.value;
      profiles['phone_numebr'] = phoneNumberRef.current.value;
      const { data } = await post(
        '/account/user/profiles',
        profiles,
        false,
        true
      );
      setMsg(data.msg);
    } catch (error) {
      alert(error);
    }
  };

  const changeText = (dataType) => {
    return (e) => {
      const input = (e.target.value = e.target.value.trim());
      profilesForm[dataType] = input || '';
      setProfilesForm(profilesForm);
      setNicknameErrorInput(!input);
    };
  };

  const changeEmail = (e) => {
    const input = (e.target.value = e.target.value.trim());
    profilesForm['email'] = emailReg(input) ? input : '';
    setProfilesForm(profilesForm);
    setEmailErrorInput(!emailReg(input));
  };

  const changePhoneNumber = (e) => {
    const input = (e.target.value = e.target.value.trim());
    profilesForm['phone_number'] = phoneNumberReg(input) ? input : '';
    setProfilesForm(profilesForm);
    setPhoneNumberErrorInput(!phoneNumberReg(input));
  };

  function Name() {
    return (
      <h4 className={classes.cardTitle}>
        {profilesForm ? profilesForm['nick_name'] : '未知'}
      </h4>
    );
  }

  function Icon() {
    console.log(profilesForm ? profilesForm['img'] || 'cxcx' : 'cxcx');
    const upload = (info) => {
      console.log(info);
    };
    return (
      <CardAvatar profile>
        {/* <Upload
          name={'wenwoImage'}
          action={'https://iask.sina.com.cn/question/ajax/fileupload'}
          onChange={upload}
        > */}
        <img
          src={
            profilesForm
              ? profilesForm['img'] ||
                'https://pic.iask.cn/fimg/535142567219.jpg'
              : 'https://pic.iask.cn/fimg/535142567219.jpg'
          }
          alt="icon"
          title="20200903-PicoIsland_ZH-CN6719354511_1920x1080.jpg"
        />
        {/* </Upload> */}
      </CardAvatar>
    );
  }

  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={msg}
        key={state.Transition.name}
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>编辑资料</h4>
              <p className={classes.cardCategoryWhite}>完整填写你的资料</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                {/* <p className={useStyles.cardCategory}>ID</p> */}
                {/* <CustomInput
                    labelText="ID : 1"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  /> */}
                {/* <CustomInput
                  labelText="昵称"
                  id="username"
                  formControlProps={{
                    fullWidth: true,
                  }}
                /> */}
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    error={nicknameErrorInput}
                    label="昵称"
                    id="nick-name"
                    variant="outlined"
                    onChange={changeText('nick_name')}
                    inputRef={nickRef}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    error={emailErrorInput}
                    label="电子邮箱"
                    id="email"
                    variant="outlined"
                    onChange={changeEmail}
                    inputRef={emailRef}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <TextField
                    error={phoneNumberErrorInput}
                    label="手机号"
                    id="phone-number"
                    variant="outlined"
                    onChange={changePhoneNumber}
                    inputRef={phoneNumberRef}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
              </GridContainer>
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer> */}
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={clickModify(SlideTransition)}>
                更新资料
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            {/* <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  src="https://pic.iask.cn/fimg/373482566503.jpg"
                  alt="20200903-PicoIsland_ZH-CN6719354511_1920x1080.jpg"
                  title="20200903-PicoIsland_ZH-CN6719354511_1920x1080.jpg"
                  width="300"
                  height="300"
                />
              </a>
            </CardAvatar> */}
            <Icon />
            <CardBody profile>
              <Name />
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
