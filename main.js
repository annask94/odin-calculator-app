let currentEquation = [];
let currentNumber = [];
let equationPair = [];

// NUMBER PICK

const userInput = document.querySelectorAll('[data-name="numberBtn"]');

userInput.forEach((button) => {
  button.addEventListener("click", () => {
    const userNumber = button.textContent;
    currentNumber.push(userNumber);
    console.log("Current Number Array:", currentNumber);
  });
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
