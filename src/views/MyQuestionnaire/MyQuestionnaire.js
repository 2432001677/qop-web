import React, { useEffect, useState } from "react";
import { getPages, post } from "Utils/Axios.js";
import { useHistory } from "react-router-dom";

import { List, Skeleton, Space, Pagination } from "antd";

import {
  SmileTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

import "antd/dist/antd.css";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/myQuestionnaire.js";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Icon from "@material-ui/core/Icon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";

const QuestionNum = ({ number }) => {
  return <p>{"问题数:   " + (number || "0")}</p>;
};

const PublishState = ({ status }) => {
  if (status === 1) {
    return (
      <Space>
        <CloseCircleTwoTone />
        {"自己可见"}
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
  const [publiced, setPubliced] = useState(false);
  const [publicedDialog, setPublicedDialog] = useState(false);
  const [current, setCurrent] = useState(1);
  const [selecteId, setSelecteId] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const handleOpen = (fn) => (value) => () => fn(value);
  const switchPublic = (e) => handleOpen(setPubliced)(e.target.checked)();

  const getMyQuestionnaires = async (current, size) => {
    setCurrent(current);
    setSize(size);
    setLoading(true);
    try {
      const { data } = await getPages(
        "/account/user/my-questionnaire",
        current,
        size,
        false,
        true
      );
      setResponse(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyQuestionnaires(1, 10);
  }, []);

  const clickEdit = (id) => () => history.push(`/edit/${id}`);

  const clickPublish = (id) => () => {
    setSelecteId(id);
    handleOpen(setPublicedDialog)(true)();
  };

  const clickResult = (id) => () => history.push(`/analysis/${id}`);

  const clickDelete = (id) => {
    return () => {
      setSelecteId(id);
      setDeleteDialog(true);
    };
  };

  const confirmDelete = async () => {
    setDeleteDialog(false);
    try {
      const res = await post(
        "/questionnaire/questionnaire/delete/" + selecteId,
        null,
        false,
        true
      );
      if (res.status === 200) {
        getMyQuestionnaires(current, size);
      } else {
        alert(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePublish = async () => {
    try {
      const res = await post(
        "/questionnaire/questionnaire/publish",
        { qid: selecteId, open: publiced },
        false,
        true
      );
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

  return (
    <div>
      <Dialog
        open={deleteDialog}
        onClose={handleOpen(setDeleteDialog)(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"确定要删除吗?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen(setDeleteDialog)(false)} color="primary">
            取消
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            确认
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={publicedDialog}
        onClose={handleOpen(setPublicedDialog)(false)}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">修改发布状态</DialogTitle>
        <DialogContent>
          <DialogContentText>你可以在此发布到特定的小组中</DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">小组</InputLabel>
              <Select
                autoFocus
                // value={maxWidth}
                // onChange={handleMaxWidthChange}
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Switch checked={publiced} onChange={switchPublic} />}
              label="公开发布"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={updatePublish} color="primary">
            更新
          </Button>
        </DialogActions>
      </Dialog>
      <List
        itemLayout="horizontal"
        dataSource={response.data}
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
      <Pagination
        current={current}
        pageSize={size}
        total={response.total_elements}
        onChange={getMyQuestionnaires}
      />
    </div>
  );
}
