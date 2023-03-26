import React, { Component } from "react";
import ContentBase from "./../components/contentBase";
import Status from "./TestStatus";
import Card from "./../components/card";
import $ from "jquery";
import Square from "./../components/square";
import Timer from './../components/timer';

class FocusTest extends Component {
  state = {
    status: Status.START,
    username: this.props.username,
    isLogin: this.props.isLogin,
    timeIntervals:[],
    score: 0,
    isUpload: false,
  };

  startTest = () => {
    this.setState({
      status: Status.RUNNING,
    });
  };

  cancelTest = () => {
    window.location.href = "/";
  };

  continueTest = () => {
    this.setState({
      status: Status.START,
    });
  };

  handleSubmit = () => {
    console.log(this.state.timeIntervals);
    console.log("测试结束");
    var score = 0;
    console.log(score);

    this.setState({
      timeIntervals:[],
      status: Status.END,
      score: score,
    });
  };

  uploadScore = () => {
    $.ajax({
      url: "https://tw-luo-opulent-goldfish-w546v5j77gh56xj-8000.preview.app.github.dev/game/api/add_score/",
      type: "get",
      data: {
        test_type: "专注力测试",
        score: this.state.score,
      },
      dataType: "json",
      success: (resp) => {
        console.log(resp);
        if (resp.result === "success") {
          this.setState({ isUpload: true });
        } else {
          alert("上传失败");
        }
      },
    });
  };

  game() {
    if (this.state.status === Status.START) {
      return (
        <Card>
          <div className="testTitle">测试说明</div>
          <pre className="testInstruction">
            {
              "本测试将随机改变方块颜色，你需要在方块颜色改变的时候立刻点击方块。"
            }
          </pre>
          <div className="row">
            <div className="col-sm-2">
              <button className="btn btn-primary" onClick={this.startTest}>
                开始测试
              </button>
            </div>
            <div className="col-sm-2">
              <button className="btn btn-danger" onClick={this.cancelTest}>
                取消测试
              </button>
            </div>
          </div>
        </Card>
      );
    } else if (this.state.status === Status.RUNNING) {
      return (
        <React.Fragment>
          <ContentBase>
            <Timer time={10} onTimeUp={this.handleSubmit}></Timer>
            <Square timeIntervals={this.state.timeIntervals}></Square>
          </ContentBase>
          
        </React.Fragment>
      );
    } else {
      if (this.state.isUpload === false) {
        this.uploadScore();
      }
      return (
        <Card>
          <div className="testTitle">测试说明</div>
          <pre className="testInstruction">
            {`测试结束，你的得分是 ${this.state.score} 分。`}
          </pre>
          <div className="row">
            <div className="col-sm-2">
              <button className="btn btn-primary" onClick={this.continueTest}>
                继续测试
              </button>
            </div>
            <div className="col-sm-2">
              <button className="btn btn-danger" onClick={this.cancelTest}>
                返回主页
              </button>
            </div>
          </div>
        </Card>
      );
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
          <h2>专注力测试</h2>
        </Card>
        {this.test()}
      </ContentBase>
    );
  }
}

export default FocusTest;
