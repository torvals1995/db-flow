import React from 'react'
import { Tabs } from 'antd';
import PublishForm from './PublishForm';

const { TabPane } = Tabs;
export default function Publish() {
  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition='left' style={{ height: 220 }}>
        <TabPane tab='Production' key={1}>
          <PublishForm />
        </TabPane>
        {/* <TabPane tab='staging' key={2}>
          (production)
        </TabPane>
        <TabPane tab='test' key={3}>
          (production)
        </TabPane> */}
      </Tabs>
    </div>
  )
}
