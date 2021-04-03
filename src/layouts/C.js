export default function Edit(props) {
  console.log('edit');
  console.log(props.location.state);
  const classNamees = useStyles();
  const success = props.location.state === true ? true : false;
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [login, setLogin] = useState(success);
  const state = {
    login: login,
    change: setLogin,
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // React.useEffect(() => {
  //   console.log(navigator);
  //   if (
  //     navigator.platform.indexOf('Win') > -1 ||
  //     navigator.platform.indexOf('Linux') > -1
  //   ) {
  //     ps = new PerfectScrollbar(mainPanel.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false,
  //     });
  //     document.body.style.overflow = 'hidden';
  //   }
  //   window.addEventListener('resize', resizeFunction);
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (
  //       navigator.platform.indexOf('Win') > -1 ||
  //       navigator.platform.indexOf('Linux') > -1
  //     ) {
  //       ps.destroy();
  //     }
  //     window.removeEventListener('resize', resizeFunction);
  //   };
  // }, [mainPanel]);

  return (
    <Layout>
      <Sider className="sider" width="280">
        <div className="all-btn">
          <div>
            <Button
              className="btn"
              type="primary"
              icon={<PoweroffOutlined />}
              // onClick="addAndLocate('单选')"
              onClick={() => console.log('btn')}
            >
              单选题
            </Button>
            <Button
              className="btn"
              type="primary"
              icon={<PoweroffOutlined />}
              // onClick="addAndLocate('多选')"
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
              // onClick="addAndLocate('填空')"
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
              // onClick="addAndLocate('评分')"
              onClick={() => {
                console.log('btn');
              }}
            >
              评分题
            </Button>
          </div>
          {/* <div>
            <Button
              className="btn"
              type="info"
              icon="md-analytics"
              onClick="addAndLocate('级联')"
            >
              级联题
            </Button>
            <Button
              className="btn"
              type="info"
              icon="md-arrow-dropdown-circle"
              onClick="addAndLocate('下拉')"
            >
              下拉题
            </Button>
          </div> */}
          {/* <div>
            <Button
              className="btn"
              type="info"
              icon="md-color-fill"
              onClick="addAndLocate('比重')"
            >
              比重题
            </Button>
            <Button
              className="btn"
              type="info"
              icon="ios-folder-open"
              onClick="addAndLocate('附件')"
            >
              附件题
            </Button>
          </div> */}
        </div>
      </Sider>
      <Content className="content" ref="content">
        <div className="title-card">
          <input
            className="title-text"
            // v-model="title"
            placeholder="请输入"
          />
          <TextArea
            className="description-text"
            // v-model="description"
            showCount
            maxLength={500}
            autoSize={{ minRows: 2, maxRows: 5 }}
            placeholder="Enter something..."
          />
        </div>
        <div
          className="question-card"
          // v-for="(question,index) in questionList"
          // key="question.qtitle"
          id="['anchor-'+index]"
        >
          <div className="question-title">
            <span className="question-sort-num">{'index+1'}</span>
            <Input
              className="question-title-text"
              // v-model="question['qtitle']"
              placeholder="请输入"
            />
            <div className="operation-btns">
              {/* <Button
                type="info"
                size="small"
                icon="md-disc"
                onClick="modifyQuestionType(index)"
              ></Button>
              <Button
                v-if="index > 0"
                type="info"
                size="small"
                icon="md-arrow-up"
                onClick="moveUpQuestionCard(index)"
              ></Button>
              <Button
                v-else
                disabled
                type="info"
                size="small"
                icon="md-arrow-up"
                onClick="moveUpQuestionCard(index)"
              ></Button>
              <Button
                v-if="index < questionList.length-1"
                type="info"
                size="small"
                icon="md-arrow-down"
                onClick="moveDownQuestionCard(index)"
              ></Button> */}
              <Button
                disabled
                type="primary"
                size="small"
                // icon="md-arrow-down"
                icon={<PoweroffOutlined />}
                // onClick="moveDownQuestionCard(index)"
                onClick={() => {
                  console.log('operation-btns');
                }}
              ></Button>
              <Button
                danger
                size="small"
                icon="md-trash"
                onClick="deleteQuestionCard(index)"
              ></Button>
            </div>
          </div>
          <div>
            {/* <template v-if="question['qtype']==='单选'"> */}
            <div
              className="option-div no-hover"
              // v-for="(option,optionIndex) in question['options']"
            >
              <div style={{ display: 'flex', width: '50%' }}>
                <Radio className="option-radio" key="option" />
                <Input maxLength={50} placeholder="Enter something..." />
              </div>
              <Button
                className="option-delete"
                shape="circle"
                size="small"
                // icon="md-trash"
                icon={<PoweroffOutlined />}
                // onClick="deleteOption(index,optionIndex)"
                onClick={() => {
                  console.log('option-delete');
                }}
              ></Button>
            </div>

            <Button
              className="new-option-add"
              type="primary"
              // onClick="addOneOption(index)"
              onClick={() => {
                console.log('newOneOption');
              }}
            >
              <SmileTwoTone />
              {'添加单个选项'}
            </Button>
            {/* </template> */}
            {/* <template v-else-if="question['qtype']==='多选'">
              <div
                className="option-div no-hover"
                v-for="(option,optionIndex) in question['options']"
              >
                <div style="display: flex;width: 50%">
                  <Checkbox className="option-multi" key="option" />
                  <Input
                    style="margin-left: 5px"
                    v-model="question['options'][optionIndex]"
                    type="text"
                    maxlength={50}
                    autosize="{minRows: 1,maxRows: 1}"
                    placeholder="Enter something..."
                    on-blur="blurOptionIndex(index,optionIndex)"
                    on-focus="thisFocus(question['options'][optionIndex])"
                  />
                </div>
                <Button
                  className="option-delete"
                  shape="circle"
                  size="small"
                  icon="md-trash"
                  onClick="deleteOption(index,optionIndex)"
                ></Button>
              </div>
              <Button
                className="new-option-add"
                type="primary"
                onClick="addOneOption(index)"
              >
                <Icon type="md-add"></Icon>
                添加单个选项
              </Button>
            </template> */}
            {/* <template v-else-if="question['qtype']==='填空'">
              <Input
                className="blank-text"
                disabled
                type="textarea"
                show-word-limit
                maxlength={500}
                autosize="{minRows: 6,maxRows: 10}"
                placeholder="Enter something..."
              />
            </template> */}
            {/* <template v-else-if="question['qtype']==='评分'">
              <Col span="12" style="margin-left: 3%;margin-top: 10px">
                <Rate show-text v-model="question['score']" />
              </Col>
            </template> */}
            {/* <template v-else-if="question['qtype']==='级联'">
              <Cascader
                data="question['data']"
                v-model="question['value1']"
                style="margin-top: 10px;margin-left: 3%;width: 77%"
              />
            </template> */}
            {/* <template v-else-if="question['qtype']==='下拉'">
              <div
                className="option-div no-hover"
                v-for="(option,optionIndex) in question['options']"
              >
                <Input
                  v-model="question['options'][optionIndex]"
                  prefix="md-arrow-dropdown"
                  type="text"
                  maxlength={50}
                  autosize="{minRows: 1,maxRows: 1}"
                  placeholder="Enter something..."
                  style="width: 50%;margin-left: 3.8%"
                  on-blur="blurOptionIndex(index,optionIndex)"
                  on-focus="thisFocus(question['options'][optionIndex])"
                />
                <Button
                  className="option-delete"
                  shape="circle"
                  size="small"
                  icon="md-trash"
                  onClick="deleteOption(index,optionIndex)"
                ></Button>
              </div>
              <Button
                className="new-option-add"
                type="primary"
                onClick="addOneOption(index)"
              >
                <Icon type="md-add"></Icon>
                添加单个选项
              </Button>
            </template> */}
            {/* <template v-else-if="question['qtype']==='比重'">
              <span style="display: inline-block;margin-top: 10px;margin-left: 3%">
                最大比重总和：100
              </span>
              <div
                className="weight-div"
                v-for="(option,optionIndex) in question['options']"
              >
                <div className="option-div no-hover">
                  <Input
                    v-model="question['options'][optionIndex]"
                    type="text"
                    maxlength={50}
                    autosize="{minRows: 1,maxRows: 1}"
                    placeholder="Enter something..."
                    style="width: 40%;margin-left: 3.8%"
                    on-blur="blurOptionIndex(index,optionIndex)"
                    on-focus="thisFocus(question['options'][optionIndex])"
                  />
                  <Button
                    className="option-delete"
                    shape="circle"
                    size="small"
                    icon="md-trash"
                    onClick="deleteOption(index,optionIndex)"
                  ></Button>
                </div>
                <Slider
                  disabled
                  className="slider"
                  v-model="question['weight']"
                  show-input
                />
              </div>
              <Button
                className="new-option-add"
                type="primary"
                onClick="addOneWeight(index)"
              >
                <Icon type="md-add"></Icon>
                添加单个选项
              </Button>
            </template> */}
            {/* <template v-else-if="question['qtype']==='附件'">
              <div style="width: 77%;margin-top: 10px;margin-left: 3%">
                <Upload
                  disabled
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                >
                  <div style="padding: 20px 0">
                    <Icon
                      type="ios-cloud-upload"
                      size="52"
                      style="color: #3399ff"
                    ></Icon>
                    <p>选择文件(30M以内)</p>
                  </div>
                </Upload>
              </div>
            </template> */}
          </div>
        </div>
      </Content>
    </Layout>
  );
}