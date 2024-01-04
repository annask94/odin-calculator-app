let currentEquation = [];
let currentNumber = [];
let equationPair = [];

//DISPLAY

const equationDisplay = document.querySelector(
  "[data-name=currentEquationDisplay]"
);
const numberDisplay = document.querySelector('[data-name="outputDisplay"]');

function updateDisplay() {
  equationDisplay.textContent =
    currentEquation.length > 0 ? currentEquation.join(" ") : "0";
  numberDisplay.textContent =
    currentNumber.length > 0 ? currentNumber.join("") : "0";
}

//CLEAR ALL

const claerAll = document.querySelector('[data-name="clearAll"]');

claerAll.addEventListener("click", () => {
  currentEquation = [];
  currentNumber = [];
  updateDisplay();
});

// NUMBER PICK

const userInput = document.querySelectorAll('[data-name="numberBtn"]');

userInput.forEach((button) => {
  button.addEventListener("click", () => {
    const userNumber = button.textContent;
    currentNumber.push(userNumber);
    console.log("Current Number Array:", currentNumber);
    updateDisplay();
  });
});

// COMA

const comaSeparator = document.querySelector('[data-name="separatorBtn"]');

comaSeparator.addEventListener("click", () => {
  const separator = ".";
  currentNumber.includes(separator)
    ? (comaSeparator.disabled = true)
    : currentNumber.push(separator);
  updateDisplay();
});

// OPERATOR

const userOperatorInput = document.querySelectorAll(".operator_btn");

userOperatorInput.forEach((button) => {
  const userOperator = button.getAttribute("data-name");
  button.addEventListener("click", () => equationConstruction(userOperator));
});

function equationConstruction(userOperator) {
  let number = parseFloat(currentNumber.join(""));
  currentEquation.push(number);
  console.log("Current Equation Array:", currentEquation);

  currentNumber = [];

  switch (userOperator) {
    case "divisionBtn":
      currentEquation.push("/");
      break;
    case "multiplicationBtn":
      currentEquation.push("*");
      break;
    case "substractionBtn":
      currentEquation.push("-");
      break;
    case "additionBtn":
      currentEquation.push("+");
      break;
  }
  updateDisplay();
}

//CALCULATION

const equalityBtn = document.querySelector('[data-name="equalityBtn"]');

equalityBtn.addEventListener("click", computeEquation);

//MERGE AND EQUATION

function computeEquation() {
  let result;

  switch (operator) {
    case "+":
      result = numberOne + numberTwo;
      break;
    case "-":
      result = numberOne - numberTwo;
      break;
    case "*":
      result = numberOne * numberTwo;
      break;
    case "/":
      result = numberOne / numberTwo;
      break;
  }
}
