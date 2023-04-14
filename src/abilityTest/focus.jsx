import React, { Component } from "react";
import ContentBase from "./../components/contentBase";
import Status from "./TestStatus";
import Card from "./../components/card";
import $ from "jquery";
import Square from "./../components/square";
import Timer from "./../components/timer";

class FocusTest extends Component {
  state = {
    status: Status.START,
    username: this.props.username,
    isLogin: this.props.isLogin,
    timeIntervals: [],
    averTime: 0,
    score: 0,
    isUpload: false,
    clickCount: 0,
    isCheat: false,
  };

  startTest = () => {
    this.setState({
      status: Status.RUNNING,
      timeIntervals: [],
      averTime: 0,
      score: 0,
      isUpload: false,
      clickCount: 0,
      isCheat: false,
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

  calculateScore = (aver_time) => {
    // 首先将aver_time映射到0-1之间的值
    const normalizedTime = Math.min(Math.max(aver_time / 1000, 0), 1);

    // 然后将normalizedTime映射到0-10之间的值
    const score = Math.floor(10 * (1 - normalizedTime));

    return score;
  };

  handleClick = () => {
    this.setState((prevState) => ({ clickCount: prevState.clickCount + 1 }));
  };

  checkCheat=(cnt, clickCount, clickValidCount)=> {
    // 可根据实际情况调整阈值
    const cheatingThresholds = {
      clickRatio: 2,
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

  handleSubmit = () => {
    console.log(this.state.timeIntervals);
    console.log("测试结束");

    const times = this.state.timeIntervals;

    var sum_time = 0;
    var len = times.length - 1;
    for (let index = 0; index < times.length - 1; index++) {
      const element = times[index];
      sum_time += element;
    }

    var back = times.pop();
    if (back !== 1000) {
      sum_time += back;
      len += 1;
    }

    var aver_time = sum_time / len;

    console.log(aver_time);

    var score = this.calculateScore(aver_time);
    console.log(score);

    var cheat = this.isCheating(len);

    this.setState({
      timeIntervals: [],
      status: Status.END,
      score: score,
      averTime: aver_time,
      isCheat: cheat,
    });
  };

  uploadScore = () => {
    this.setState({ isUpload: true });
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
          alert('上传成绩成功');
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
              "本测试将会随机改变方块颜色，你需要在方块颜色改变的时候立刻点击方块。\n\n点击方块的速度越快，你的得分就越高\n\n注意，请勿一直点击方块，否则将会被认为作弊！"
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
            <Square
              timeIntervals={this.state.timeIntervals}
              click={this.handleClick}
            ></Square>
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
          <h2>专注力测试</h2>
        </Card>
        {this.test()}
      </ContentBase>
    );
  }
}

export default FocusTest;
