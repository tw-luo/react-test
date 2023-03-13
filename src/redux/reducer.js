import ACTIONS from "./actions";

const calc = (state) => {
  let { lastOperand, currentOperand, operation } = state;
  let last = parseFloat(lastOperand);
  let current = parseFloat(currentOperand);

  let res = "";
  switch (operation) {
    case "+":
      res = last + current;
      break;
    case "-":
      res = last - current;
      break;
    case "*":
      res = last * current;
      break;
    case "/":
      res = last / current;
      break;
    default:
      return false;
  }
  return res.toString();
};

const reducer = (
  state = {
    currentOperand: "",
    lastOperand: "",
    operation: "",
  },
  action
) => {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.currentOperand === "0" && action.digit === "0") return state;
      if (state.currentOperand === "0" && action.digit !== ".")
        return {
          ...state,
          currentOperand: action.digit,
        };
      if (action.digit === "." && state.currentOperand.includes("."))
        return state;
      if (action.digit === "." && state.currentOperand === "")
        return {
          ...state,
          currentOperand: "0.",
        };
      return {
        ...state,
        currentOperand: state.currentOperand + action.digit,
      };
    case ACTIONS.DEL_DIGIT:
      if (state.currentOperand === "") return state;
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.lastOperand === "" && state.currentOperand === "") return state;
      if (state.lastOperand === "")
        return {
          ...state,
          lastOperand: state.currentOperand,
          operation: action.operation,
          currentOperand: "",
        };
      if (state.currentOperand === "")
        return {
          ...state,
          operation: action.operation,
        };
      return {
        ...state,
        lastOperand: calc(state),
        operation: action.operation,
        currentOperand: "",
      };
    case ACTIONS.CLEAR:
      return { ...state, lastOperand: "", currentOperand: "", opreation: "" };
    case ACTIONS.CALC:
      if (
        state.currentOperand === "" ||
        state.lastOperand === "" ||
        state.operation === ""
      )
        return state;
      return {
        ...state,
        currentOperand: calc(state),
        lastOperand: "",
        operation: "",
      };
    default:
      return state;
  }
};

export default reducer;
