import React, { Component } from "react";
import Card from "./card";

class WordList extends Component {
  state = { visible: true, timer: this.props.timer };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(
        (prevState) => ({ timer: prevState.timer - 1 }),
        () => {
          if (this.state.timer === 0) {
            clearInterval(this.interval);
            this.setState({ visible: false });
          }
        }
      );
    }, 1000);
  }


  
  render() {
    return this.state.visible ? (
      <Card>
        <Card style={{marginBottom:"20px"}}>{`剩余记忆时间: ${this.state.timer}`}</Card>
        {this.props.wordList.map((word) => {
          return (
            <div key={word} className="words">
              {word}
            </div>
          );
        })}
      </Card>
    ) : null;
  }
}

export default WordList;
