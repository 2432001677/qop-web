import React, { useEffect, useState } from 'react';
import { getPages, post } from 'Utils/Axios.js';

import { hexToRgb } from 'assets/jss/material-dashboard-react.js';

import { List, Skeleton, Space } from 'antd';
import { Pagination } from 'antd';
import {
  SmileTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
} from '@ant-design/icons';

import 'antd/dist/antd.css';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  title: {
    fontSize: '18px',
  },
  itemIcon: {
    width: '24px',
    height: '30px',
    fontSize: '24px',
    lineHeight: '30px',
    float: 'left',
    marginRight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'rgba(' + hexToRgb('#0D47A1') + ', 0.8)',
  },
};

const QuestionNum = ({ number }) => {
  return <p>{'问题数:   ' + (number || '0')}</p>;
};

const PublishState = ({ status }) => {
  if (status === 1) {
    return (
      <Space>
        <CloseCircleTwoTone />
        {'自己可见'}
      </Space>
    );
  } else if (status === 2) {
    return (
      <Space>
        <SmileTwoTone twoToneColor="#9C27B0" />
        {'组内公开'}
      </Space>
    );
  } else if (status === 3) {
    return (
      <Space>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
        {'完全公开'}
      </Space>
    );
  } else {
    return null;
  }
};

const formatDate = (date) => {
  const plusZero = (number) => {
    return number <= 10 ? '0' + number : number;
  };
  return `${plusZero(date.getHours())}:${plusZero(
    date.getMinutes()
  )}:${plusZero(date.getSeconds())}  ${plusZero(
    date.getMonth() + 1
  )}-${plusZero(date.getDate())}-${date.getFullYear()}`;
};

const useStyles = makeStyles(styles);

export default function MyQuestionnaire() {
  const classes = useStyles();
  const [response, setResponse] = useState({
    total_elements: 0,
    data: [],
  });
  const [current, setCurrent] = useState(1);
  const [deleteId, setDeleteId] = useState('');
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const getMyQuestionnaires = async (current, size) => {
    setCurrent(current);
    setSize(size);
    setLoading(true);
    try {
      console.log(`current:${current},size:${size}`);
      const { data } = await getPages(
        '/account/user/my-questionnaire',
        current,
        size,
        false,
        true
      );
      console.log(data);
      setResponse(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyQuestionnaires(1, 10);
  }, []);

  const clickEdit = () => {};

  const clickPublish = () => {};

  const clickDelete = (id) => {
    return () => {
      console.log(id);
      setDeleteId(id);
      setOpen(true);
    };
  };

  const confirmDelete = async () => {
    setOpen(false);
    try {
      const res = await post(
        '/questionnaire/questionnaire/delete/' + deleteId,
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

  const cancelDelete = () => {
    console.log('cancel');
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'提示'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {'确定要删除吗?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            取消
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            确认
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
                <Button onClick={clickPublish} color="primary">
                  发布
                </Button>
                <Button onClick={clickEdit} color="default">
                  编辑
                </Button>
                <Button onClick={clickDelete(item.id)}>删除</Button>
              </ButtonGroup>,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={
                  // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <Icon className={classes.itemIcon}>{'content_paste'}</Icon>
                }
                title={
                  <p className={classes.title}>
                    <a href={'http://127.0.0.1:3000/questionnaire/' + item.id}>
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
