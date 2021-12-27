import React, { useCallback, useEffect, useState } from 'react'
import { Menu } from 'antd';
import { useLocation, useRouteMatch } from 'react-router';
import {
  CloudUploadOutlined,
  ContainerOutlined,
  SettingOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import Asider from '../Common/Asider'
import Content from '../Common/Content'
import Publish from './Publish';
import './index.scss';
import { Link } from 'react-router-dom';
import Setting from './Setting';
import keyMirror from 'keymirror';
import request from '../../utils/request';
import api from '../../api/project';
import DeployLog from './Log';
const menuState = keyMirror({
  publish: '项目发布',
  log: '发布记录',
  setting: '项目设置',
});

export default function Deploy(props) {
  const [curMenu, setCurMenu] = useState(menuState.publish)
  const [projInfo, setProjInfo] = useState(null);
  const { params: { id } } = useRouteMatch();
  function onMenuClick(ev) {
    setCurMenu(ev.key);
  }
  const renderContent = useCallback(() => {
    if (curMenu === menuState.publish) return (<Publish />)
    else if (curMenu === menuState.log) return (<DeployLog />)
    else if (curMenu === menuState.setting) return (<Setting data={projInfo} />)
  }, [curMenu, projInfo])
  async function fetchData() {
    const res = await request.get(`${api.project}/${id}`);
    if(res?.code === 0) setProjInfo(res?.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="deploy">
      <Asider>
        <Menu
          defaultSelectedKeys={[curMenu]}
          mode="inline"
          onClick={onMenuClick}
        >

          <Menu.Item key="0" icon={<LeftOutlined />}>
            <Link to='/'>
              {projInfo?.projName}
            </Link>
          </Menu.Item>
          <Menu.Item key={menuState.publish} icon={<CloudUploadOutlined />}>
            项目发布
          </Menu.Item>
          <Menu.Item key={menuState.log} icon={<ContainerOutlined />}>
            发布记录
          </Menu.Item>
          <Menu.Item key={menuState.setting} icon={<SettingOutlined />}>
            项目设置
          </Menu.Item>
        </Menu>
      </Asider>
      <Content>
        {renderContent()}
      </Content>
    </div >
  )
}
