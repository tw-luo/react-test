import React, { Component } from "react";
import ContentBase from "./../components/contentBase";
import Status from "./TestStatus";
import Card from "./../components/card";
import $ from "jquery";
import Timer from "./../components/timer";
import Board from "../components/board";

class ReflexTest extends Component {
  state = {
    status: Status.START,
    username: this.props.username,
    isLogin: this.props.isLogin,
    score: 0,
    isUpload: false,
    isCheat: false,
    clickCount: 0,
  };

  startTest = () => {
    this.setState({
      status: Status.RUNNING,
      score: 0,
      isUpload: false,
      isCheat: false,
      clickCount: 0,
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

  handleClick = () => {
    this.setState((prevState) => ({ clickCount: prevState.clickCount + 1 }));
  };

  checkCheat(cnt, clickCount, clickValidCount) {
    // 可根据实际情况调整阈值
    const cheatingThresholds = {
      clickRatio: 0.8,
      validClickRatio: 0.95,
    };
  
    // 计算点击比率和有效点击比率
    const clickRatio = clickCount / cnt;
    const validClickRatio = clickValidCount / clickCount;
  
    // 使用决策树判断用户是否作弊
    if (clickRatio > cheatingThresholds.clickRatio) {
      if (validClickRatio > cheatingThresholds.validClickRatio) {
        return true; // 作弊
      } else {
        return false; // 正常
      }
    } else {
      return false; // 正常
    }
  }

  isCheating(changeCount) {
    const { clickCount } = this.state;
    return this.checkCheat(changeCount, clickCount, clickCount);
  }

  countNumbersLessThan = (numbers, cnt) => {
    let count = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] < cnt) {
        count++;
      }
    }
    return count;
  };

  handleSubmit = () => {
    const { clickCount } = this.state;
    console.log("测试结束");
    console.log(clickCount);

    const min = 10;
    const max = 30;
    var count = 100;

    const numbers = [];
    for (let i = 0; i < count; i++) {
      const number = Math.random() * (max - min) + min;
      numbers.push(number);
    }

    count = this.countNumbersLessThan(numbers, clickCount);

    var score = Math.floor(count / 10);

    this.setState({
      status: Status.END,
      score: score,
    });
  };

  uploadScore = () => {
    this.setState({ isUpload: true });
    $.ajax({
      url: "https://tw-luo-opulent-goldfish-w546v5j77gh56xj-8000.preview.app.github.dev/game/api/add_score/",
      type: "get",
      data: {
        test_type: "反应力测试",
        score: this.state.score,
      },
      dataType: "json",
      success: (resp) => {
        console.log(resp);
        if (resp.result === "success") {
          alert("上传成绩成功");
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
              "本测试将在 9 个方块中随机出现，你需要迅速点击出现的方块。\n\n点击方块的速度越快，你的得分就越高。"
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
            <Board handleClick={this.handleClick}></Board>
          </ContentBase>
        </React.Fragment>
      );
    } else {
      if (this.state.isCheat === true) {
        return (
          <Card>
            <div className="testTitle">测试说明</div>
            <pre className="testInstruction">
              系统检测到您本次测试存在作弊行为，本次测试不计入成绩。
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
          <h2>反应力测试</h2>
        </Card>
        {this.test()}
      </ContentBase>
    );
  }
}

export default ReflexTest;
