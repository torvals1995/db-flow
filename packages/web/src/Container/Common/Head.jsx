import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Menu } from 'antd';
import classname from 'classname';
import keyMirror from 'keymirror';
import './style/Head.scss';
const menuState = keyMirror({
  home: null,
  createProj: null,
})
export default function Head() {
  const [curMenu, setCurMenu] = useState(menuState.home);
  function onMenu(state) {
    console.log(state);
  }
  return (
    <div className="header">
      <div className="logo" />
      <div className="header-menu">
        <Link to="/">
          <div
            className="menu-item"
            // className={classname('menu-item', )}
            onClick={() => { onMenu(menuState.home) }}
          >
            首页
          </div>
        </Link>
        <Link to="/createProj">
          <div
            className="menu-item"
            onClick={() => { onMenu(menuState.createProj) }}
          >项目创建</div>
        </Link>
      </div>
    </div>
  )
}
