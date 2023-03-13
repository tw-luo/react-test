import React, { Component } from "react";
import { connect } from "react-redux";
import ACTIONS from "../../redux/actions.js";
class DigitButton extends Component {
  state = {};
  render() {
    return (
      <button
        onClick={() => {
          this.props.addDigit(this.props.digit);
        }}
      >
        {this.props.digit}
      </button>
    );
  }
}

const mapDispatchToProps = {
  addDigit: (digit) => {
    return {
      type: ACTIONS.ADD_DIGIT,
      digit: digit,
    };
  },
};

export default connect(null, mapDispatchToProps)(DigitButton);
