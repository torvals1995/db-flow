import React from 'react'
import { Pagination } from 'antd';
export default function DeployLog() {
  function itemRender(current, type, originalElement) {
    if (type === 'prev') return <a>Previous</a>;
    else if (type === 'next') return <a>Next</a>;
    else return originalElement;
  }
  return (
    <div>
      <Pagination total={500} itemRender={itemRender} />
    </div>
  )
}
