import React, { Component } from "react";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.getRandomColor(),
    };
    setInterval(() => {
      this.setState({ color: this.getRandomColor() });
    }, 2000);
  }

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  render() {
    return (
        
        <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:"20px",
      }}
    >
      <div
        style={{ backgroundColor: this.state.color,height:"200px",width:"200px"}}
      />
    </div>
    );
  }
}

export default Square;
