const buttons = document.querySelectorAll("button");
const SPECIAL_START_WITH = "#";
const previousOperand = document.getElementById("previous-operand");
const currentOperand = document.getElementById("current-operand");
const OPERATIONS = {
  "+": (op1, op2) => op1 + op2,
  "-": (op1, op2) => op1 - op2,
};
let operand1 = "";
let operand2 = "";
let operator = "";

function onButtonClick(event) {
  const value = event.target.getAttribute("data-js-value");
  const operation = OPERATIONS[value];
  const isOperation = Boolean(operation);

  if (isOperation) {
    if (operand1 && operand2) {
      [operand2, operand1] = [operate(operator, operand2, operand1), ""];
    } else {
      [operand2, operator, operand1] = [operand1, value, ""];
    }
  } else {
    operand1 += value;
  }

  updateVisual();
}

function updateVisual() {
  if (operand2 !== previousOperand.textContent) {
    previousOperand.textContent = operand2;
  }
  if (operand1 !== currentOperand.textContent) {
    currentOperand.textContent = operand1;
  }
}

function handleSpecial(value) {
  switch (value) {
    case "#CE": {
      console.log("remove last");
      break;
    }
    case "#C": {
      console.log("remove all");
      break;
    }
    default: {
      console.log(`Unhandled special: ${value}`);
      break;
    }
  }
}

function operate(op, operand1, operand2) {
  const fnOperation = OPERATIONS[op];
  return fnOperation ? fnOperation(+operand1, +operand2) : "ERROR";
}

buttons.forEach((button) => button.addEventListener("click", onButtonClick));
