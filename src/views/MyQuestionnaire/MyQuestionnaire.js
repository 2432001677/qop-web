import React, { useEffect, useState } from 'react';
import { getPages, post } from 'Utils/Axios.js';

import { hexToRgb } from 'assets/jss/material-dashboard-react.js';

import { List, Avatar, Skeleton } from 'antd';
import { Pagination } from 'antd';

import 'antd/dist/antd.css';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';

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

const useStyles = makeStyles(styles);

export default function MyQuestionnaire() {
  const classes = useStyles();
  const [response, setResponse] = useState({
    total_elements: 0,
    data: [],
  });
  const [current, setCurrent] = useState(1);
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

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={response.data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <ButtonGroup
                size="small"
                // variant="contained"
                color="secondary"
                aria-label="contained primary button group"
              >
                <Button onClick={() => clickEdit}>编辑</Button>
                <Button onClick={() => clickPublish}>发布</Button>
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
                    <a href="https://www.google.com">{item.title}</a>
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
        total={response.total_elememts}
        onChange={getMyQuestionnaires}
      />
    </div>
  );
}
