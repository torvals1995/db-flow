import React from 'react'
import './style/Asider.scss';
export default function Asider(props) {
  return (
    <div className="asider">
      {props.children}
    </div>
  )
}
