import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { urlPrefix } from 'Config/Config.js';
import { emailReg, phoneNumberReg } from 'Utils/Reg.js';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

import avatar from 'assets/img/faces/marc.jpg';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

// const styles = {
//   cardCategoryWhite: {
//     color: 'rgba(255,255,255,.62)',
//     margin: '0',
//     fontSize: '14px',
//     marginTop: '0',
//     marginBottom: '0',
//   },
//   cardTitleWhite: {
//     color: '#FFFFFF',
//     marginTop: '0px',
//     minHeight: 'auto',
//     fontWeight: '300',
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: '3px',
//     textDecoration: 'none',
//   },
// };

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [profilesForm, setProfilesForm] = useState();
  const nickRef = useRef('');

  useEffect(() => {
    const getUserProfiles = async () => {
      try {
        const res = await axios.get(urlPrefix + '/account/user/profiles', {
          validateStatus: false,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(res);
        setProfilesForm(res.data.data);
        nickRef.current.value = res.data.data['nick_name'];
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfiles();
  }, []);

  const clickModify = () => {
    console.log(profilesForm);
  };

  const changeText = (dataType) => {
    return (e) => {
      const input = (e.target.value = e.target.value.trim());
      profilesForm[dataType] = input || '';
      console.log(profilesForm);
      console.log(nickRef.current.value);
      setProfilesForm(profilesForm);
    };
  };

  const changeEmail = (e) => {
    const input = (e.target.value = e.target.value.trim());
    profilesForm['email'] = emailReg(input) ? input : '';
    setProfilesForm(profilesForm);
  };

  const changePhoneNumber = (e) => {
    const input = (e.target.value = e.target.value.trim());
    profilesForm['phone_number'] = phoneNumberReg(input) ? input : '';
    setProfilesForm(profilesForm);
  };

  return (
    <div>
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
                    label="电子邮箱"
                    id="email"
                    variant="outlined"
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
                    label="手机号"
                    id="phone-number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
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
              <Button color="primary" onClick={clickModify}>
                更新资料
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>Bruce</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              {/* <Button color="primary" round>
                Follow
              </Button> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
