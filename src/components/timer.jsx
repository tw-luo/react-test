import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      isTimeUp:false,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
        const { time } = this.state;
        if (time === 0) { // 判断剩余时间是否为0
          clearInterval(this.interval);
          this.setState({ isTimeUp: true });
          this.props.onTimeUp(); // 调用onTimeUp函数
        } else {
            this.setState(prevState => ({ time: prevState.time - 1 }));
        }
      }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { time } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto", // 设置高度为auto
          backgroundColor: "#f5f5f5",
          marginBottom:"20px"
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            paddingTop: "0.5rem", // 设置上内边距为0.5rem
            paddingBottom: "0.5rem", // 设置下内边距为0.5rem
          }}
        >
          剩余时间: {time}
        </div>
      </div>
    );
  }
}

export default Timer;
