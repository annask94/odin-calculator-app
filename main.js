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
  if (currentNumber.length > 0) {
    numberDisplay.textContent = currentNumber.join("");
  } else if (finalResultDisplay !== undefined) {
    numberDisplay.textContent = finalResultDisplay.toString();
  } else numberDisplay.textContent = "0";
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
  finalResult = 0;
  finalResultDisplay = 0;
  updateDisplay();
});

// NUMBER PICK

const userInput = document.querySelectorAll('[data-name="numberBtn"]');

userInput.forEach((button) => {
  button.addEventListener("click", () => {
    const userNumber = button.textContent;

    if (currentNumber[0] === "0" && userNumber === "0") {
    } else if (currentNumber[0] === "0") {
      currentNumber.splice(1, 0, ".");
    } else if (
      typeof currentEquation[0] === "number" &&
      typeof currentEquation[currentEquation.length - 1] !== "string" &&
      currentEquation.length > 0
    ) {
      currentEquation = [];
    }
    currentNumber.push(userNumber);

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

const operatorMapping = {
  divisionBtn: "/",
  multiplicationBtn: "*",
  substractionBtn: "-",
  additionBtn: "+",
};

userOperatorInput.forEach((button) => {
  const userOperator = operatorMapping[button.getAttribute("data-name")];
  button.addEventListener("click", () => equationConstruction(userOperator));
});

//EQUATION CONSTRUCTION

function equationConstruction(userOperator) {
  const operator = userOperator;

  if (currentNumber.length > 0) {
    let number = parseFloat(currentNumber.join(""));
    currentEquation.push(number);
    updateDisplay();
    currentNumber = [];
  }

  if (currentEquation.length === 0) {
    if (["+", "*", "/"].includes(operator)) {
      return;
    } else if (operator === "-") {
      currentEquation.push(operator);
    }
  } else if (currentEquation.length === 1 && currentEquation[0] === "-") {
    return;
  }

  updateEquationDisplay();

  let lastArgument = currentEquation[currentEquation.length - 1];

  //PREVENT STACKING MULTIPLE OPERATORS

  if (lastArgument === operator) {
    return;
  } else if (typeof lastArgument === "string" && lastArgument !== operator) {
    currentEquation[currentEquation.length - 1] = operator;
  } else if (typeof lastArgument !== "string") {
    currentEquation.push(operator);
  }

  updateEquationDisplay();
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
    //NEGATIVE NUMBER WHEN FIRST ARGUMENT IS "-" AND ANY OTHER OPERATOR WONT BE FIRST ARGUMENT OF THE CURRENT EQUATION ARRY
    if (currentEquation[0] === "-") {
      currentEquation.splice(0, 2, -currentEquation[1]);
    }
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
