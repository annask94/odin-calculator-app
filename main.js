let partialComputation = [];
let numOne = [];
let numTwo = [];
let operator = [];
let equationPair = [];

// NUMBER PICK

const userInput = document.querySelectorAll('[data-name="numberBtn"]');

userInput.forEach((button) => {
  button.addEventListener("click", () => {
    const userNumber = button.textContent;
    equationConstruction(userNumber);
  });
});

// USER NUMBER ARRAY ADDITION

equationConstruction = (number) => {
  if (operator.length === 0) {
    numOne.push(number);
  } else {
    numTwo.push(number);
  }
};

// OPERATOR

const userOperatorInput = document.querySelectorAll(".operator_btn");

userOperatorInput.forEach((button) => {
  button.addEventListener("click", () => {
    const userOperator = button.getAttribute("data-name");
    switch (userOperator) {
      case "divisionBtn":
        operator.push("/");
        break;
      case "multiplicationBtn":
        operator.push("*");
        break;
      case "substractionBtn":
        operator.push("-");
        break;
      case "additionBtn":
        operator.push("+");
        break;
    }
  });
});

//CALCULATION

const equalityBtn = document.querySelector('[data-name="equalityBtn"]');

equalityBtn.addEventListener("click", computePair);

//MERGE AND EQUATION

function computePair() {
  let numberOne = parseInt(numOne.join(""));
  let numberTwo = parseInt(numTwo.join(""));
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
  partialComputation.push(result);
}

console.log(partialComputation);
