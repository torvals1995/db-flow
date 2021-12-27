import React, { useEffect, useState } from 'react'
import Asider from '../Common/Asider'
import Content from '../Common/Content';
import './index.scss';
import api from '../../api/project';
import request from '../../utils/request';
import ProjectInfo from './projInfo';
export default function Home() {
  const [projectInfos, setProjectInfos] = useState([]);
  async function fetchData() {
    const res = await request.get(api.project);
    if(res?.code === 0) setProjectInfos(res?.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="home">
      <Asider>

      </Asider>
      <Content>
        {projectInfos.map((item, index) => (
          <ProjectInfo key={index} data={item} />
        ))}
      </Content>
    </div>
  )
}
