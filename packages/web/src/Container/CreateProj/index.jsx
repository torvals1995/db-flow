import React from 'react'
import { Collapse, Steps } from 'antd';
import './index.scss';
const { Step } = Steps;
const { Panel } = Collapse;

export default function CreateProj() {
  function callback(key) {
    console.log(key);
  }
  const text = '123';
  return (
    <div className="create-proj">
      <div className="create">
        <div className="create-header">
          <Steps current={0}>
            <Step title="Finished" description="This is a description." />
            <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
            <Step title="Waiting" description="This is a description." />
          </Steps>
        </div>
        <div className="create-content">
          <Collapse defaultActiveKey={['1', '2', '3']} onChange={callback}>
            <Panel header="This is panel header 1" key="1" style={{ background: 'rgb(247, 248, 252)' }}>
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
      </div>

    </div>
  )
}
