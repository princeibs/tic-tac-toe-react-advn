import React from "react"

export default function Square(props) {  
    return (
      <div onClick={props.onClick} className={props.className}>
        {props.value}
      </div>
    )  
}
