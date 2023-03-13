import React, { Component } from "react";
import ACTIONS from "../../redux/actions.js";
import { connect } from "react-redux";

class OperateButton extends Component {
  state = {};
  render() {
    return (
      <button
        className={this.props.className}
        onClick={() => {
          //console.log(this.props.operation);
          this.props.chooseOperation(this.props.operation);
        }}
      >
        {this.props.operation}
      </button>
    );
  }
}

const mapDispatchToProps = {
  chooseOperation: (op) => {
    if (op === "=") {
      return {
        type: ACTIONS.CALC,
      };
    } else if (op === "AC") {
      return {
        type: ACTIONS.CLEAR,
      };
    } else if (op === "DEL") {
      return {
        type: ACTIONS.DEL_DIGIT,
      };
    }
    return {
      type: ACTIONS.CHOOSE_OPERATION,
      operation: op,
    };
  },
};

export default connect(null, mapDispatchToProps)(OperateButton);
