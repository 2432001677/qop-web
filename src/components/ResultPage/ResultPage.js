import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";

export default function ResultPage() {
  const history = useHistory();
  return (
    <Result
      icon={<SmileOutlined />}
      title="感谢您的回答!"
      subTitle="你可以关闭此页面或继续回到主页"
      extra={[
        [
          <Button key="home" type="primary" onClick={() => history.push("/")}>
            {"回主页"}
          </Button>,
        ],
      ]}
    />
  );
}
