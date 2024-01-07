let currentEquation = [];
let currentNumber = [];
let finalResult = 0;
let finalResultDisplay = 0;

//DISPLAY

const equationDisplay = document.querySelector(
  "[data-name=currentEquationDisplay]"
);
const numberDisplay = document.querySelector('[data-name="outputDisplay"]');

function updateEquationDisplay() {
  let displayEquation = "";

  if (currentEquation.length > 0) {
    displayEquation += " " + currentEquation.join(" ");
  }

  if (currentNumber.length > 0) {
    displayEquation += currentNumber.join("");
  }

  equationDisplay.textContent = displayEquation.trim() || "0";
}

function updateNumberDisplay() {
  numberDisplay.textContent =
    currentNumber.length > 0 ? currentNumber.join("") : "0";
  if (finalResultDisplay !== undefined) {
    numberDisplay.textContent = finalResultDisplay.toString();
  }
}

function updateDisplay() {
  updateEquationDisplay();
  updateNumberDisplay();
}

//CLEAR ALL

const claerAll = document.querySelector('[data-name="clearAll"]');

claerAll.addEventListener("click", () => {
  currentEquation = [];
  currentNumber = [];
  finalResult = [];
  finalResultDisplay = [];
  updateDisplay();
});

// NUMBER PICK

const userInput = document.querySelectorAll('[data-name="numberBtn"]');

userInput.forEach((button) => {
  button.addEventListener("click", () => {
    const userNumber = button.textContent;
    currentNumber.push(userNumber);
    console.log("Current Number Array:", currentNumber);

    if (finalResult !== 0) {
      finalResult = 0;
      currentEquation = [];
    }
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

//EQUATION CONSTRUCTION

function equationConstruction(userOperator) {
  let number = parseFloat(currentNumber.join(""));

  if (currentNumber.length > 0) {
    currentEquation.push(number);
    console.log("Current Equation Array:", currentEquation);
  }

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
// Calculation on the base of the operator and equation pair from handleEquation function

function calculate(numberOne, operator, numberTwo) {
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

  return result;
}

const equalityBtn = document.querySelector('[data-name="equalityBtn"]');

equalityBtn.addEventListener("click", () => {
  function handleEquation() {
    let finalResult;
    const operators = ["*", "/", "+", "-"];

    for (let i = 0; i < operators.length; i++) {
      while (currentEquation.includes(operators[i])) {
        const operatorIndex = currentEquation.findIndex(
          (item) => item === operators[i]
        );

        const numberOne = parseFloat(currentEquation[operatorIndex - 1]);
        const operator = currentEquation[operatorIndex];
        const numberTwo = parseFloat(currentEquation[operatorIndex + 1]);

        const result = calculate(numberOne, operator, numberTwo);
        currentEquation.splice(operatorIndex - 1, 3, result);
      }
    }

    finalResult = parseFloat(currentEquation[0]);
    return finalResult;
  }
  finalResult = handleEquation();
  finalResult.toString().includes(".")
    ? (finalResultDisplay = finalResult.toFixed(2))
    : (finalResultDisplay = finalResult);
  currentEquation = [];
  currentEquation.push(finalResult);
  updateDisplay();
});
