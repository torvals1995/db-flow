import React, { useState, useCallback } from 'react'
import { Collapse, Steps, Form, Input, Button, Modal, Alert } from 'antd';
import keyMirror from 'keymirror';
import { useHistory } from 'react-router';
import request from '../../../utils/request';
import api from '../../../api/project';
import './index.scss';

const { Step } = Steps;
const { Panel } = Collapse;
const { TextArea } = Input;
const repoState = keyMirror({
  online: null, // 独立仓库
  subPath: null, // 子目录仓库
})

export default function Setting({ data }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const { _id } = data;

  // form表单操作
  const onFinish = async (values) => {
    await request.put(`${api.project}/${_id}`, {
      ...data,
      ...values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showDelModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    const res = await request.delete(`${api.project}/${_id}`);
    if (res?.code === 0) history.push('/');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="deploy-setting">
      <Form
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={data}
      >
        <Form.Item label="项目名" name="projName"
          rules={[{ required: true, message: '请输入项目名！！！' }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>
        <Form.Item label="项目描述" name="projDesc">
          <TextArea style={{ width: 300 }} rows={4} />
        </Form.Item>
        <Form.Item label="ip地址" name="host"
          rules={[{ required: true, message: '请输入ip地址！！！' }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>
        <Form.Item label="部署目录" name="path"
          rules={[{ required: true, message: '请输入部署目录！！！' }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>
        <Form.Item label="部署指令" name="deployOrder"
          rules={[{ required: true, message: '请输入部署指令！！！' }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">保存</Button>
          <Button type="primary" danger style={{ marginLeft: 20 }} onClick={showDelModal}>删除项目</Button>
        </Form.Item>
      </Form>
      <Modal
        title="删除仓库"
        visible={isModalVisible}
        onOk={handleOk} onCancel={handleCancel}
        okText="确认删除" cancelText="取消"
      >
        <Alert style={{ marginBottom: 10 }} message={<strong style={{ color: '#DB2828' }}>此操作无法恢复！请慎重操作！</strong>} type="error" />

        <Alert
          style={{ marginBottom: 10 }}
          message="Error"
          description={<strong style={{ color: 'red' }}>该操作将永久删除仓库 onehalf-back 的数据，同时取消仓库的协作者关联。为防止意外，确认继续操作请输入以下内容：torvals/onehalf-back</strong>}
          type="error"
          showIcon
        />

        <Input placeholder="请输入提示内容以确认继续操作" />
      </Modal>
    </div>
  )
}
