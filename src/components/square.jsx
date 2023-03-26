import React, { Component } from "react";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.getRandomColor(),
      startTime: new Date(),
      endTime: null,
      isPush:false,
    };
  }

  componentDidUpdate() {
    const { endTime, startTime } = this.state;

    if (startTime != null && endTime != null) {
      const duration = endTime - startTime;
      console.log(`Duration: ${duration}ms`);
      this.props.timeIntervals.push(duration);
    }
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      if (this.state.endTime === null&&this.state.isPush===false) {
        this.props.timeIntervals.push(1000);
        this.setState({isPush:true})
      }
      this.setState({
        color: this.getRandomColor(),
        startTime: new Date(),
        endTime: null,
        isPush:false,
      });
      this.componentDidMount(); // 递归调用componentDidMount函数
    }, Math.floor(Math.random() * 4000) + 1000); // 随机时间在1-3秒之间
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
    const { color } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: color,
            height: "200px",
            width: "200px",
          }}
          onClick={() => {
            if (this.state.endTime === null) {
              this.setState({ endTime: new Date() });
            }
          }}
        />
      </div>
    );
  }
}

export default Square;
