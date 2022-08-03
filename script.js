const buttons = document.querySelectorAll("button");
const previousOperand = document.getElementById("previous-operand");
const currentOperand = document.getElementById("current-operand");
const OPERATIONS = {
  "+": (op1, op2) => op1 + op2,
  "-": (op1, op2) => op1 - op2,
  "/": (op1, op2) => op1 / op2,
  "*": (op1, op2) => op1 * op2,
};
const SPECIALS = {
  "#CE": () => {
    clearLast();
    updateVisual();
  },
  "#C": () => {
    clearAll();
    updateVisual();
  },
  "#EQ": () => {
    compute();
    updateVisual();
  },
};
let operand1 = "";
let operand2 = "";
let operator = "";

function onButtonClick(event) {
  const value = event.target.getAttribute("data-js-value");
  const isSpecial = SPECIALS[value];
  const isOperation = OPERATIONS[value];

  if (isSpecial) {
    SPECIALS[value]();
  } else if (isOperation) {
    if (operand1 === "") {
      if (operand2) {
        operator = value;
        updateVisual();
      }

      return;
    }
    if (operand2 !== "") compute();
    operator = value;
    operand2 = operand1;
    operand1 = "";
    updateVisual();
  } else {
    if (value === "." && operand1.indexOf(".") !== -1) return;
    operand1 = operand1.toString() + value.toString();
    updateVisual();
  }
}

function updateVisual() {
  currentOperand.textContent = operand1;
  if (operator !== "") {
    previousOperand.textContent = `${operand2} ${operator}`;
  } else {
    previousOperand.textContent = operand2;
  }
}

function clearAll() {
  operand2 = "";
  operator = "";
  operand1 = "";

  updateVisual();
}

function clearLast() {
  operand1 = operand1.toString().slice(0, -1);
}

function compute() {
  const result = operate(operator, operand2, operand1);
  operand2 = "";
  operator = "";
  operand1 = result;
}

function operate(op, operand1, operand2) {
  const fnOperation = OPERATIONS[op];
  return fnOperation && !isNaN(operand1) && !isNaN(operand2)
    ? fnOperation(parseFloat(operand1), parseFloat(operand2))
    : 0;
}

buttons.forEach((button) => button.addEventListener("click", onButtonClick));

clearAll();
