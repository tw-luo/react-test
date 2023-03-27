import React, { Component } from "react";
import ContentBase from "./../components/contentBase";
import Status from "./TestStatus";
import Card from "./../components/card";
import Words from "../utils/word";
import WordList from "./../components/wordList";
import ConfirmWordList from "./../components/confirmWordList";
import $ from "jquery";

class MemoryTest extends Component {
  state = {
    status: Status.START,
    username: this.props.username,
    isLogin: this.props.isLogin,
    wordList: [],
    shuffleWordList: [],
    memoryTime: 10,
    wordNum: 10,
    score: 0,
    isUpload: false,
  };

  generateWordList = (num) => {
    const words = [];

    while (words.length < num) {
      const randomIndex = Math.floor(Math.random() * Words.length);
      const word = Words[randomIndex];
      if (!words.includes(word)) {
        words.push(word);
      }
    }

    return words;
  };

  shuffleArray = (array) => {
    const shuffled = JSON.parse(JSON.stringify(array));
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  startTest = () => {
    const words = this.generateWordList(this.state.wordNum);
    const shuffled = this.shuffleArray(words);

    //console.log(words);
    //console.log(shuffled);

    this.setState({
      status: Status.RUNNING,
      wordList: words,
      shuffleWordList: shuffled,
      memoryTime: 10,
      wordNum: 10,
      score: 0,
      isUpload: false,
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

  handleSubmit = (val) => {
    const newVal = val.replace("，", ",");
    console.log(newVal);

    //To do
    //变成数组，再计算得分，再上传数据库
    const arr = newVal.split(",").map((item) => parseInt(item));
    let score = 0;

    for (let i = 0; i < arr.length; ++i) {
      if (this.state.shuffleWordList[i] === this.state.wordList[arr[i] - 1]) {
        score++;
      }
    }

    console.log(score);

    this.setState({
      status: Status.END,
      score: score,
    });
  };

  uploadScore = () => {
    $.ajax({
      url: "https://tw-luo-opulent-goldfish-w546v5j77gh56xj-8000.preview.app.github.dev/game/api/add_score/",
      type: "get",
      data: {
        test_type: "记忆力测试",
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
              "本测试将随机生成 10 个单词，你需要在规定时间内记住这 10 个单词出现的位置。\n\n接下来将会随机打乱单词的顺序，你需要依次回答这些单词的初始位置。"
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
          <WordList
            wordList={this.state.wordList}
            timer={this.state.memoryTime}
          ></WordList>
          <ConfirmWordList
            wordList={this.state.shuffleWordList}
            timer={this.state.memoryTime}
            handleSubmit={this.handleSubmit}
          ></ConfirmWordList>
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
          <h2>记忆力测试</h2>
        </Card>
        {this.test()}
      </ContentBase>
    );
  }
}

export default MemoryTest;
