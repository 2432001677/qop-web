import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { post } from 'Utils/Axios.js';

import EditSider from 'components/Sidebar/EditSider.js';
import EditContent from 'components/Content/EditContent.js';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import { Layout, Button } from 'antd';
import { ClockCircleTwoTone } from '@ant-design/icons';

export default function Edit(props) {
  console.log('edit');
  console.log(props.location.state);
  const history = useHistory();
  const [states, setStates] = useState({
    save: false,
    loading: false,
    countDown: 10,
  });
  const success = props.location.state === true ? true : false;
  const [login, setLogin] = useState(success);
  const [questionnaire, setQuestionnaire] = useState({
    title: 'title',
    answer_num: 0,
    description: 'des',
    questions: [],
  });
  const [questions, setQuestions] = useState([
    {
      qtitle: '单选题一',
      qtype: 0,
      required: true,
      option_num: 2,
      options: {
        list: ['xxx', 'aaa'],
      },
    },
    {
      qtitle: 'xxx',
      qtype: 1,
      required: true,
      option_num: 1,
      options: {
        list: ['xxx'],
      },
    },
  ]);

  const state = {
    login: login,
    change: setLogin,
    questionnaire,
    setQuestionnaire,
    questions,
    setQuestions,
  };

  const preserveAndRedirect = () => {
    preserve();
    history.goBack();
  };
  const preserve = async () => {
    states.loading = true;
    setStates(states);
    questionnaire.questions = questions;
    console.log(questionnaire);
    try {
      const res = await post(
        '/questionnaire/questionnaire',
        questionnaire,
        false,
        true
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      states.loading = false;
      setStates(states);
    }
  };

  const backToPrevious = () => {
    history.goBack();
  };

  return (
    <Layout>
      <EditSider {...state} />
      <EditContent {...state} />
      <div style={{ position: 'fixed', right: '5%' }}>
        <Button
          loading={states.loading}
          type="primary"
          onClick={preserveAndRedirect}
        >
          {'完成编辑'}
        </Button>
        <Button type="primary" onClick={preserve} icon={<ClockCircleTwoTone />}>
          <span>
            {states.save ? '自动保存中...' : '保存'} ({states.countDown})
          </span>
        </Button>
        <Button
          type="primary"
          onClick={backToPrevious}
          icon={<ClockCircleTwoTone />}
        >
          <span>{'返回'}</span>
        </Button>
      </div>
    </Layout>
  );
}
