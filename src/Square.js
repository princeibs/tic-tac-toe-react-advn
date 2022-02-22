import React from "react"

class Square extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} className={this.props.className}>
        {this.props.value}
      </div>
    )
  }
}

export default Square;