import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './style/Head.scss';
export default function Head() {
  const [curMenu, setCurMenu] = useState('mail');
  function onMenuClick(e) {
    console.log('click ', e);
    // this.setState({ current: e.key });
  }
  return (
    <div className="header">
      <div className="logo" />
      <div className="header-menu">
        <Link to="/">
          <div className="menu-item">首页</div>
        </Link>
        <Link to="/createProj">
          <div className="menu-item">项目创建</div>
        </Link>
      </div>
    </div>
  )
}
