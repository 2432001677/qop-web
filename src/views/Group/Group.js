/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import * as R from "ramda";
import { handleOpen } from "Utils/Utils.js";
import { get } from "Utils/Axios";
import { getQuestionnaires, inviteUser } from "Api/Api.js";
import { emailReg, phoneNumberReg } from "Utils/Reg.js";
import DialogScaffod from "components/Dialog/DialogScaffod.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/groupsStyle.js";

import "antd/dist/antd.css";
import { Row, Col, Result } from "antd";

import image from "assets/img/cover.jpeg";

const useStyles = makeStyles(styles);

export default function Groups() {
  const classes = useStyles();
  const [groupsInfo, setGroupsInfo] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [groupIndex, setGroupIndex] = useState(0);
  const changeGroup = (e) => {
    setGroupIndex(e.target.value);
  };

  const leaveGroup = () => {
    console.log("leave" + groupsInfo[groupIndex].group_name);
  };

  useEffect(() => {
    const getJoinedGroups = async () => {
      try {
        const { data } = await get("/group/group", false, true);
        setGroupsInfo(data.data);
        if (data.data.length !== 0) {
          const questionnaires = await getQuestionnaires(data.data[0].id);
          setQuestionnaires(questionnaires);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getJoinedGroups();
  }, []);

  useEffect(() => {
    const getQuestionnaireByGroupId = async () => {
      const data = groupsInfo[groupIndex]
        ? await getQuestionnaires(groupsInfo[groupIndex].id)
        : [];
      setQuestionnaires(data);
    };
    getQuestionnaireByGroupId();
  }, [groupIndex]);

  const NoQuestionnaire = () => {
    return <Result title="暂时还没有问卷" />;
  };
  const GridQuestionnaires = () => {
    return (
      <GridItem xs={12} sm={12} md={6}>
        <GridList cellHeight={200} className={classes.gridList} cols={7}>
          {questionnaires.map((prop, index) => {
            const plusZero = (number) => {
              return number <= 10 ? "0" + number : number;
            };
            const date = new Date(prop.create_time);
            const dateStr = `${plusZero(date.getHours())}:${plusZero(
              date.getMinutes()
            )}  ${plusZero(date.getMonth() + 1)}-${plusZero(
              date.getDate()
            )}-${date.getFullYear()}`;
            return (
              <GridListTile key={`title-${index}`}>
                <img src={image} alt={prop.title} />
                <GridListTileBar
                  title={prop.title}
                  subtitle={<span>{dateStr}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${prop.description}`}
                      className={classes.icon}
                      onClick={() => {
                        const w = window.open("about:blank");
                        w.location.href = `${location.origin}/questionnaire/${prop.id}`;
                      }}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            );
          })}
        </GridList>
      </GridItem>
    );
  };
  const [inviteDialog, setInviteDialog] = useState(false);
  const [inviteError, setInviteError] = useState(false);
  const inviteText = useRef("");

  const invite = async () => {
    const userName = inviteText.current.value.trim();
    if (!emailReg(userName) && !phoneNumberReg(userName)) {
      setInviteError(true);
      return;
    }
    setInviteError(false);
    try {
      const res = await inviteUser({
        group_id: groupsInfo[groupIndex].id,
        user_name: userName,
      });
      if (res.code === "200") {
        handleOpen(setInviteDialog)(false)();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const invitationDialog = {
    dialogOpen: inviteDialog,
    closeDialog: R.compose(
      handleOpen(setInviteDialog)(false),
      () => (inviteText.current = "")
    ),
    dialogTitle: "邀请",
    dialogContentText: "请输入你要邀请的用户的手机号或邮箱",
    dialogContent: (
      <TextField
        error={inviteError}
        autoFocus
        margin="dense"
        id="name"
        label="Email/Phone Number"
        type="email"
        fullWidth
        inputRef={inviteText}
      />
    ),
    dialogActions: (
      <DialogActions>
        <Button
          onClick={R.compose(
            handleOpen(setInviteDialog)(false),
            () => (inviteText.current = "")
          )}
          color="primary"
        >
          {"取消"}
        </Button>
        <Button onClick={invite} color="primary">
          {"邀请"}
        </Button>
      </DialogActions>
    ),
  };

  return (
    <GridContainer>
      <DialogScaffod {...invitationDialog} />
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain>
            <Row>
              <Col span={20}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">小组</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={groupIndex}
                    onChange={changeGroup}
                  >
                    {groupsInfo.map((prop, key) => {
                      return (
                        <MenuItem key={`group-${key}`} value={key}>
                          {prop.group_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Col>
              <Col span={4}>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    style={{ margin: "30" }}
                    onClick={R.compose(
                      handleOpen(setInviteDialog)(true),
                      () => (inviteText.current = "")
                    )}
                  >
                    邀请
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={{ margin: "30" }}
                    onClick={leaveGroup}
                  >
                    退出
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Hidden only={["sm", "xs"]}>
              {questionnaires === undefined || questionnaires.length === 0 ? (
                <NoQuestionnaire />
              ) : (
                <GridQuestionnaires />
              )}
            </Hidden>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
