import React, { useState, useEffect } from 'react';

import EditSider from 'components/Sidebar/EditSider.js';
import EditContent from 'components/Content/EditContent.js';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import { Layout } from 'antd';

export default function Edit(props) {
  console.log('edit');
  console.log(props.location.state);
  const success = props.location.state === true ? true : false;
  const [questionnaire, setQuestionnaire] = useState({
    title: '',
    answer_num: 0,
    description: '',
    questions: [],
  });
  const [questions, setQuestions] = useState([
    {
      qtitle: 'strings',
      qtype: 0,
      required: true,
      option_num: 2,
      options: {
        list: ['xxx', 'aaa'],
      },
    },
    // {
    //   qtitle: 'xxx',
    //   qtype: 0,
    //   required: true,
    //   option_num: 1,
    //   options: {
    //     list: ['xxx'],
    //   },
    // },
  ]);
  const [login, setLogin] = useState(success);
  const state = {
    login: login,
    change: setLogin,
    questionnaire,
    setQuestionnaire,
    questions,
    setQuestions,
  };

  return (
    <Layout>
      <EditSider {...state} />
      <EditContent {...state} />
    </Layout>
  );
}
