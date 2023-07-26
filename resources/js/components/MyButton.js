import React, { Component } from 'react'

const MyButton = (props) => (
  <button className={`${props.style} d-flex align-items-center px-2 py-1 rounded shadow`}
    onClick={props.onClick}
  >
    <span className={props.label&&props.asset?"mr-2":""}>{props.label}</span>
    { props.asset &&
      <img className="size-20" src={props.asset}/>
    }
  </button>
)

export default MyButton;
