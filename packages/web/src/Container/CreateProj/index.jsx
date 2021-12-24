import React, { useState, useCallback } from 'react'
import { Collapse, Steps, Form, Input, Button, Space, Radio } from 'antd';
import './index.scss';
import keyMirror from 'keymirror';
import { useHistory } from 'react-router';
const { Step } = Steps;
const { Panel } = Collapse;
const { TextArea } = Input;
const repoState = keyMirror({
  online: null, // 独立仓库
  subPath: null, // 子目录仓库
})
export default function CreateProj() {
  const [radioValue, setRadioValue] = useState(repoState.online);
  const history = useHistory();
  const renderRepo = useCallback(() => {
    if (radioValue === repoState.online) {
      return (
        <React.Fragment>
          <Form.Item
            label="代码仓库"
            name='repoCode'
            rules={[
              {
                required: true,
                message: '请输入代码仓库！！！',
              },
            ]}
          >
            <Input style={{ width: 200 }} />
          </Form.Item>
          {/* 仓库名称：用于显示代码仓库的链接是否正确 */}
          <Form.Item
            label="仓库名称"
            name='repoName'
          >
            <Input style={{ width: 200 }} disabled />
          </Form.Item>
        </React.Fragment>
      )
    } else if (radioValue === repoState.subPath) {
      return (
        <div>正在拼命开发中</div>
      )
    } else return null;
  }, [radioValue]);
  const onRadioChange = e => {
    setRadioValue(e.target.value);
  };

  // form表单操作
  const onFinish = async (values) => {
    // console.log('Success:', values);

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  function onCancel() {
    history.push('/');
  }

  //   {
  //     "projName": "codeShop",
  //     "host": "119.45.223.71",
  //     "path": "/home/",
  //     "deployOrder": "npm shell",
  //     "repoCode": "git@gitee.com:torvals/code-shop.git"
  // }

  return (
    <div className="create-proj">
      <div className="create">
        <div className="create-content">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Collapse defaultActiveKey={['1', '2', '3']}>
              <Panel header="项目配置" key="1" style={{ background: 'rgb(247, 248, 252)' }}>
                <Form.Item
                  label="项目名"
                  name="projName"
                  rules={[
                    {
                      required: true,
                      message: '请输入项目名！！！',
                    },
                  ]}
                >
                  <Input style={{ width: 300 }} />
                </Form.Item>
                <Form.Item
                  label="项目描述"
                  name="projDesc"
                >
                  <TextArea style={{ width: 300 }} rows={4} />
                </Form.Item>
              </Panel>
              <Panel header="仓库配置" key="2" style={{ background: 'rgb(247, 248, 252)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <Radio.Group onChange={onRadioChange} value={radioValue}>
                    <Radio value={repoState.online}>独立仓库</Radio>
                    <Radio value={repoState.subPath}>子目录仓库</Radio>
                  </Radio.Group>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>

                  {renderRepo()}
                </div>


              </Panel>
              <Panel header="服务器配置" key="3" style={{ background: 'rgb(247, 248, 252)' }}>
                <Form.Item
                  label="ip地址"
                  name="host"
                  rules={[
                    {
                      required: true,
                      message: '请输入ip地址！！！',
                    },
                  ]}
                >
                  <Input style={{ width: 300 }} />
                </Form.Item>
                <Form.Item
                  label="部署目录"
                  name="path"
                  rules={[
                    {
                      required: true,
                      message: '请输入部署目录！！！',
                    },
                  ]}
                >
                  <Input style={{ width: 300 }} />
                </Form.Item>
                <Form.Item
                  label="部署指令"
                  name="deployOrder"
                  rules={[
                    {
                      required: true,
                      message: '请输入部署指令！！！',
                    },
                  ]}
                >
                  <Input style={{ width: 300 }} />
                </Form.Item>
              </Panel>
            </Collapse>
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 0,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
                <Button htmlType="button" onClick={onCancel}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  完成配置
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>

    </div>
  )
}
