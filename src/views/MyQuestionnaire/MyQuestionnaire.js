import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {
  getJoinedGroups,
  publishQuestionnaire,
  deleteQuestionnaireByQid,
  getMyQuestionnairesPage,
} from "Api/Api.js";
import { handleOpen } from "Utils/Utils.js";
import DialogScaffod from "components/Dialog/DialogScaffod.js";
import * as R from "ramda";
import { useHistory } from "react-router-dom";

import { List, Skeleton, Space, Pagination, Empty } from "antd";

import { SmileTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

import "antd/dist/antd.css";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/myQuestionnaireStyle.js";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Icon from "@material-ui/core/Icon";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

const QuestionNum = ({ number }) => {
  return <p>{"问题数:   " + (number || "0")}</p>;
};

const PublishState = ({ status }) => {
  if (status === 1) {
    return (
      <Space>
        <CloseCircleTwoTone />
        {"未公开"}
      </Space>
    );
  } else if (status === 2) {
    return (
      <Space>
        <SmileTwoTone twoToneColor="#9C27B0" />
        {"完全公开"}
      </Space>
    );
  } else {
    return null;
  }
};

const formatDate = (date) => {
  const plusZero = (number) => {
    return number <= 10 ? "0" + number : number;
  };
  return `${plusZero(date.getHours())}:${plusZero(
    date.getMinutes()
  )}:${plusZero(date.getSeconds())}  ${plusZero(
    date.getMonth() + 1
  )}-${plusZero(date.getDate())}-${date.getFullYear()}`;
};

const useStyles = makeStyles(styles);

export default function MyQuestionnaire() {
  const history = useHistory();
  const classes = useStyles();
  const [response, setResponse] = useState({
    total_elements: 0,
    data: [],
  });
  const [groupsInfo, setGroupsInfo] = useState([]);
  const [publiced, setPubliced] = useState(false);
  const [publicedDialog, setPublicedDialog] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [current, setCurrent] = useState(1);
  const [selecteId, setSelecteId] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const switchPublic = (e) => handleOpen(setPubliced)(e.target.checked)();
  const switchGroup = (e) => setSelectedGroup(e.target.value);

  const getMyQuestionnaires = async (current, size) => {
    setCurrent(current);
    setSize(size);
    setLoading(true);
    try {
      const data = await getMyQuestionnairesPage(current, size);
      if (data.code === "200") {
        setResponse(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyQuestionnaires(1, 10);
  }, []);

  const clickEdit = (id) => () => history.push(`/edit/${id}`);

  const clickPublish = (id) => async () => {
    setSelecteId(id);
    const { data } = await getJoinedGroups();
    setGroupsInfo(data.data);
    handleOpen(setPublicedDialog)(true)();
  };

  const clickShare = (id) => () => {
    setShareLink(window.location.origin + "/questionnaire/" + id);
    handleOpen(setShareDialogOpen)(true)();
  };

  const clickResult = (id) => () => history.push(`/analysis/${id}`);

  const clickDelete = (id) => {
    return () => {
      setSelecteId(id);
      setDeleteDialogOpen(true);
    };
  };

  const confirmDelete = async () => {
    setDeleteDialogOpen(false);
    try {
      const data = await deleteQuestionnaireByQid(selecteId);
      if (data.status === 200) {
        getMyQuestionnaires(current, size);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePublish = async () => {
    try {
      const res = await publishQuestionnaire({
        qid: selecteId,
        open: publiced,
        group_id: selectedGroup || null,
      });
      if (res.status === 200) {
        getMyQuestionnaires(current, size);
      } else {
        alert(res.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleOpen(setPublicedDialog)(false)();
    }
  };

  const publishDialog = {
    dialogOpen: publicedDialog,
    closeDialog: R.compose(
      handleOpen(setSelectedGroup)(false),
      handleOpen(setPublicedDialog)(false)
    ),
    dialogTitle: "修改发布状态",
    dialogContentText: "你可以在此发布到特定的小组中",
    dialogContent: (
      <form className={classes.form} noValidate>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="max-width">{"小组"}</InputLabel>
          <Select autoFocus onChange={switchGroup}>
            {groupsInfo.map((prop, key) => {
              return (
                <MenuItem key={`group-${key}`} value={prop.id}>
                  {prop.group_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel
          className={classes.formControlLabel}
          control={<Switch checked={publiced} onChange={switchPublic} />}
          label="公开发布"
        />
      </form>
    ),
    dialogActions: (
      <DialogActions>
        <Button onClick={updatePublish} color="primary">
          {"更新"}
        </Button>
      </DialogActions>
    ),
  };

  const shareDialog = {
    dialogOpen: shareDialogOpen,
    closeDialog: R.compose(
      handleOpen(setCopied)(false),
      handleOpen(setShareDialogOpen)(false)
    ),
    dialogTitle: "分享",
    dialogContentText: "扫描二维码打开或分享链接",
    dialogContent: (
      <div>
        <QRCode size={330} value={shareLink} />
        <TextField
          defaultValue={shareLink}
          style={{ width: "300px" }}
          InputProps={{
            readOnly: true,
          }}
        />
        <span slot="append">
          <Button
            color="primary"
            onClick={R.compose(handleOpen(setCopied)(true), () =>
              navigator.clipboard.writeText(shareLink)
            )}
          >
            {copied ? "复制成功" : "复制"}
          </Button>
        </span>
      </div>
    ),
    dialogActions: (
      <DialogActions>
        <Button
          onClick={R.compose(
            handleOpen(setCopied)(false),
            handleOpen(setShareDialogOpen)(false)
          )}
          color="primary"
        >
          {"关闭"}
        </Button>
      </DialogActions>
    ),
  };

  const deleteDialog = {
    dialogOpen: deleteDialogOpen,
    closeDialog: handleOpen(setDeleteDialogOpen)(false),
    dialogTitle: "提示",
    dialogContentText: "确定要删除吗?",
    dialogActions: (
      <DialogActions>
        <Button
          onClick={handleOpen(setDeleteDialogOpen)(false)}
          color="primary"
        >
          {"取消"}
        </Button>
        <Button onClick={confirmDelete} color="primary" autoFocus>
          {"确认"}
        </Button>
      </DialogActions>
    ),
  };

  return (
    <div>
      <DialogScaffod {...publishDialog} />
      <DialogScaffod {...shareDialog} />
      <DialogScaffod {...deleteDialog} />
      <List
        itemLayout="horizontal"
        dataSource={response.data}
        locale={{ emptyText: "😥" }}
        renderItem={(item) => (
          <List.Item
            extra={formatDate(new Date(item.create_time))}
            actions={[
              <QuestionNum number={item.question_num} />,
              <PublishState status={item.status} />,
              <ButtonGroup
                size="small"
                // variant="contained"
                color="secondary"
                aria-label="contained primary button group"
              >
                <Button onClick={clickPublish(item.id)} color="primary">
                  发布
                </Button>
                <Button onClick={clickShare(item.id)} color="default">
                  分享
                </Button>
                <Button onClick={clickEdit(item.id)} color="default">
                  编辑
                </Button>
                <Button onClick={clickResult(item.id)} color="inherit">
                  结果
                </Button>
                <Button onClick={clickDelete(item.id)}>删除</Button>
              </ButtonGroup>,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={
                  // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <Icon className={classes.itemIcon}>{"content_paste"}</Icon>
                }
                title={
                  <p className={classes.title}>
                    <a
                      href={
                        window.location.origin + "/questionnaire/" + item.id
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </p>
                }
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      {response.data.length === 0 ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              <a href="https://github.com/2432001677/qop-web">{"还没有问卷"}</a>
            </span>
          }
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/edit")}
          >
            {"新建一个！"}
          </Button>
        </Empty>
      ) : null}
      <Pagination
        current={current}
        pageSize={size}
        total={response.total_elements}
        onChange={getMyQuestionnaires}
      />
    </div>
  );
}
