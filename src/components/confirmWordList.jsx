import React, { Component } from "react";
import Card from "./card";

class ConfirmWordList extends Component {
  state = { visible: false, timer: this.props.timer,userInput:"" };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(
        (prevState) => ({ timer: prevState.timer - 1 }),
        () => {
          if (this.state.timer === 0) {
            clearInterval(this.interval);
            this.setState({ visible: true });
          }
        }
      );
    }, 1000);
  }

  render() {
    return this.state.visible ? (
      <React.Fragment>
        <Card style={{ marginBottom: "20px" }}>
          {this.props.wordList.map((word) => {
            return (
              <div key={word} className="words">
                {word}
              </div>
            );
          })}
        </Card>
        <Card>
          <div className="mb-3 form-check">
            <label htmlFor="exampleInputPassword1" className="form-label">
              请输入您的答案
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e)=>{
                this.setState({userInput:e.target.value})
              }}
            />
            <p>
              答案格式为 1,3,2,...,10 ,即依次回答每个单词的位置,使用逗号隔开
            </p>
            <button className="btn btn-primary" onClick={()=>{
                this.props.handleSubmit(this.state.userInput);
            }}>提交</button>
          </div>
        </Card>
      </React.Fragment>
    ) : null;
  }
}

export default ConfirmWordList;
