import React, { Component } from "react";
import ContentBase from "./../components/contentBase";
import Status from "./TestStatus";
import Card from "./../components/card";

class MemoryTest extends Component {
  state = {
    status: Status.START,
    username: this.props.username,
    isLogin: this.props.isLogin,
    wordList:[],
  };

  generateWordList=()=>{
    
  }

  startTest=()=>{
    this.setState({
      status:Status.RUNNING
    });
  }

  cancelTest=()=>{

    window.location.href = "/";
  }

  game() {
    if (this.state.status === Status.START) {
      return (
        <Card>
          <div className="testTitle">测试说明</div>
          <pre className="testInstruction">{"本测试将随机生成10个单词，你需要在5s中内记住这10个单词出现的位置。\n\n接下来将会随机打乱单词的顺序，你需要依次回答这些单词的初始位置。"}
          </pre>
          <div className="row">
            <div className="col-sm-2"><button className="btn btn-primary" onClick={this.startTest}>开始测试</button></div>
            <div className="col-sm-2"><button className="btn btn-danger" onClick={this.cancelTest}>取消测试</button></div>
          </div>
          
          
        </Card>
      );
    } else if (this.state.status === Status.RUNNING) {
      return (
        <div>game running</div>
      )
    } else {
      return (
        <div>game over</div>
      )
    }
  }

  test() {
    if (this.state.isLogin === false) {
      return <Card>请登录后再进行测试</Card>;
    } else {
      return this.game();
    }
  }

  render() {
    return (
      <ContentBase>
        <Card style={{ marginBottom: "20px" }}>
          <h2>Memory Test</h2>
        </Card>
        {this.test()}
      </ContentBase>
    );
  }
}

export default MemoryTest;
