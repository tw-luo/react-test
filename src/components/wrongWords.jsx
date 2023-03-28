import React, { Component } from "react";
import Card from "./card";

class WrongWords extends Component {
 
  render() {
    const {visible}=this.props;
    return visible ? (
      <Card>
        <div className="hint" style={{marginBottom:"10px"}}>以下是系统推荐的易错词汇</div>
        {this.props.wordList.map((word) => {
          return (
            <div key={word} className="words">
              {word}
            </div>
          );
        })}
        <button className="btn btn-primary" onClick={this.props.cancelView}>
                收起
        </button>
      </Card>
    ) : null;
  }
}

export default WrongWords;
