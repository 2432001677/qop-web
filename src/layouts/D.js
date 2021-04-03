<Layout>
<Sider className="sider" width="280">
  <div className="all-btn">
    <div>
      <Button
        className="btn"
        type="primary"
        icon={<PoweroffOutlined />}
        onClick={() => console.log('btn')}
      >
        单选题
      </Button>
      <Button
        className="btn"
        type="primary"
        icon={<PoweroffOutlined />}
        onClick={() => {
          console.log('btn');
        }}
      >
        多选题
      </Button>
    </div>
    <div>
      <Button
        className="btn"
        type="primary"
        icon={<PoweroffOutlined />}
        onClick={() => {
          console.log('btn');
        }}
      >
        填空题
      </Button>
      <Button
        className="btn"
        type="primary"
        icon={<PoweroffOutlined />}
        onClick={() => {
          console.log('btn');
        }}
      >
        评分题
      </Button>
    </div>
  </div>
</Sider>
<Content className="content" ref="content">
  <div className="title-card">
    <input
      className="title-text"
      placeholder="请输入"
    />
    <TextArea
      className="description-text"
      showCount
      maxLength={500}
      autoSize={{ minRows: 2, maxRows: 5 }}
      placeholder="Enter something..."
    />
  </div>
  <div
    className="question-card"
    id="['anchor-'+index]"
  >
    <div className="question-title">
      <span className="question-sort-num">{'index+1'}</span>
      <Input
        className="question-title-text"
        placeholder="请输入"
      />
      <div className="operation-btns">
        <Button
          disabled
          type="primary"
          size="small"
          icon={<PoweroffOutlined />}
          onClick={() => {
            console.log('operation-btns');
          }}
        ></Button>
        <Button
          danger
          size="small"
          icon="md-trash"
          // onClick="deleteQuestionCard(index)"
          onClick={() => console.log('deleteQuestionCard')}
        ></Button>
      </div>
    </div>
    <div>
      <div
        className="option-div no-hover"
      >
        <div style={{ display: 'flex', width: '50%' }}>
          <Radio className="option-radio" key="option" />
          <Input maxLength={50} placeholder="Enter something..." />
        </div>
        <Button
          className="option-delete"
          shape="circle"
          size="small"
          icon={<PoweroffOutlined />}
          onClick={() => {
            console.log('option-delete');
          }}
        ></Button>
      </div>
      <Button
        className="new-option-add"
        type="primary"
        onClick={() => {
          console.log('newOneOption');
        }}
      >
        <SmileTwoTone />
        {'添加单个选项'}
      </Button>
    </div>
  </div>
</Content>
</Layout>
);