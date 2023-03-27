import React, { Component } from "react";

const Square = (props) => {
  const { value, curId, click } = props;

  return curId === value ? (
    <div
      className="reflex-square col reflex-select"
      onClick={() => {
        click(value);
      }}
    >
      {value}
    </div>
  ) : (
    <div
      className="reflex-square col"
      onClick={() => {
        click(value);
      }}
    >
      {value}
    </div>
  );
};

const Row = (props) => {
  const { args, curId, click } = props;
  return (
    <div className="row">
      <Square
        value={args[0]}
        curId={curId}
        click={(argv) => {
          click(argv);
        }}
      ></Square>
      <Square
        value={args[1]}
        curId={curId}
        click={(argv) => {
          click(argv);
        }}
      ></Square>
      <Square
        value={args[2]}
        curId={curId}
        click={(argv) => {
          click(argv);
        }}
      ></Square>
    </div>
  );
};

class Board extends Component {
  state = {
    curSquare: 4,
    args: Array.from({ length: 10 }, (_, i) => i),
  };

  handleClick = (i) => {
    if (i === this.state.curSquare) {
      console.log(i);
      var num = 0;
      while (1) {
        num = Math.floor(Math.random() * 9);
        if (num !== i) break;
      }
      console.log("next " + num);
      this.props.handleClick();
      this.setState({curSquare:num});
    }
  };

  render() {
    return (
      <React.Fragment>
        <Row
          row={0}
          args={this.state.args.slice(0, 3)}
          curId={this.state.curSquare}
          click={this.handleClick}
        ></Row>
        <Row
          row={1}
          args={this.state.args.slice(3, 6)}
          curId={this.state.curSquare}
          click={this.handleClick}
        ></Row>
        <Row
          row={2}
          args={this.state.args.slice(6, 9)}
          curId={this.state.curSquare}
          click={this.handleClick}
        ></Row>
      </React.Fragment>
    );
  }
}

export default Board;
