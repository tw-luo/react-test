import React, { Component } from "react";
import Card from "./card";

class WrongWords extends Component {
 
  render() {
    const {visible,textColor,info,cancelView}=this.props;
    return visible ? (
      <Card>
        <div className="hint" style={{marginBottom:"10px"}}>{info}</div>
        {this.props.wordList.map((word) => {
          return (
            <div key={word} className="words" style={{color:textColor}}>
              {word}
            </div>
          );
        })}
        <button className="btn btn-primary" onClick={cancelView} style={{marginTop:"10px"}}>
                收起
        </button>
      </Card>
    ) : null;
  }
}

export default WrongWords;
