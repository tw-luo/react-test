import React, { Component } from "react";
import Card from "./card";
import { connect } from "react-redux";
import DigitButton from "./../widgets/digitButton";
import OperateButton from './../widgets/operateButton';

class Calculator extends Component {
  state = {};
  
  render() {
    return (
      <Card style={{ marginTop: "20px" }}>
        <div className="calculator">
          <div className="output">
            <div className="lastOutput">
              {this.props.lastOperand}
              {this.props.operation}
            </div>
            <div className="currentOutput">{this.props.currentOperand}</div>
          </div>
          <OperateButton className="buttonAc" operation="AC"></OperateButton>
          <OperateButton operation="DEL"></OperateButton>
          <OperateButton operation="/"></OperateButton>
          <DigitButton digit="7"></DigitButton>
          <DigitButton digit="8"></DigitButton>
          <DigitButton digit="9"></DigitButton>
          <OperateButton operation="*"></OperateButton>
          <DigitButton digit="4"></DigitButton>
          <DigitButton digit="5"></DigitButton>
          <DigitButton digit="6"></DigitButton>
          <OperateButton operation="-"></OperateButton>
          <DigitButton digit="1"></DigitButton>
          <DigitButton digit="2"></DigitButton>
          <DigitButton digit="3"></DigitButton>
          <OperateButton operation="+"></OperateButton>
          <DigitButton digit="0"></DigitButton>
          <DigitButton digit="."></DigitButton>
          <OperateButton className="buttonEqual" operation="="></OperateButton>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentOperand: state.currentOperand,
    lastOperand: state.lastOperand,
    operation: state.operation,
  };
};

export default connect(mapStateToProps)(Calculator);
