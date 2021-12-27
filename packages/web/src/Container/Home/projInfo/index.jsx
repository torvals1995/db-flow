import React from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './index.scss';
export default function ProjectInfo({ data }) {
  const { _id } = data;
  const history = useHistory();
  function onClick() {
    history.push({
      pathname: `/deploy/${_id}`,
      state: {
        data: data,
      },
    });
  }
  return (
    // <Link to={{ pathname: '/deploy', state={ data } }}>
    // <Link to='/deploy'>
    <div className="home-project-info" onClick={onClick}>
      <p>{data?.projName}</p>
      <p className="item">描述：{data?.projDesc}</p>
    </div>
    // </Link>
  )
}
