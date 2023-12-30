const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");
let prevOperand = prevOperandText.innerText;
let currentOperand = currentOperandText.innerText;
let operation;

function reset() {
  prevOperand = "";
  currentOperand = "0";
  operation = undefined;
}

function deleteOperand() {
  // Check if currentOperand is not "0" before attempting to delete
  if (currentOperand !== "") {
    currentOperand = currentOperand.toString().slice(0, -1);
    displayNum();
  }
}

function addNumber(number) {
  // Check if currentOperand is empty and number is a decimal point
  if (currentOperand === "" && number === ".") {
    // Do nothing if currentOperand is empty and the number is a decimal point
    return;
  }
  if (currentOperand === "0" && number === ".") {
    return;
  }

  // Check if currentOperand is "0" and replace it with the new number
  if (currentOperand === "0") {
    currentOperand = number.toString();
  } else {
    // Append the number to the currentOperand
    currentOperand = currentOperand.toString() + number.toString();
  }
  displayNum();
}

function operationSelection(operate) {
  if (currentOperandText === "") return;
  if (prevOperandText !== "") {
    calculatorOperation();
  }
  operation = operate;
  prevOperand = currentOperand;
  currentOperand = "";
}

function calculatorOperation() {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;

    case "-":
      result = prev - current;
      break;

    case "×":
      result = prev * current;
      break;

    case "/":
      result = prev / current;
      break;

    default:
      return;
  }
  currentOperand = result;
  operation = undefined;
  prevOperand = "";
  prevOperandText.innerText = "";
}

function displayNum() {
  currentOperandText.innerText = currentOperand.toLocaleString("en");
  if (operation !== undefined) {
    prevOperandText.innerText = `${prevOperand} ${operation.toString("en")}`;
  } else {
    prevOperandText.innerText = prevOperand;
  }
}

resetBtn.addEventListener("click", () => {
  reset();
  displayNum();
});

deleteBtn.addEventListener("click", () => {
  deleteOperand();
  displayNum();
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    addNumber(operand.innerText);
    displayNum();
  });
});

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentOperand !== "") {
      operationSelection(btn.innerText);
      // operation = btn.innerText;
      displayNum();
    }
  });
});

resultBtn.addEventListener("click", () => {
  if (currentOperand !== "" && operation !== undefined) {
    calculatorOperation();
    displayNum();
  }
});
