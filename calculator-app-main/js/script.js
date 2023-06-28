"use strict";
// alert("hello");
class Calc {
  constructor(previous_digit, current_digit) {
    this.previous_digit = previous_digit;
    this.current_digit = current_digit;
    this.reset();
  }

  reset() {
    this.currentDigit = " ";
    this.previousDigit = "";
    this.operation = undefined;
  }

  del() {
    this.currentDigit = this.currentDigit.toString().slice(0, -1);
  }

  append(number) {
    // to remove clicking more . points
    if (number === "." && this.currentDigit.includes(".")) return;

    this.currentDigit = this.currentDigit.toString() + number.toString();
  }

  chooseOperation(operation) {
    //exit for empty string
    if (this.currentDigit === " ") return;

    if (this.previousDigit !== " ") this.compute();

    this.operation = operation;
    this.previousDigit = this.currentDigit;
    this.currentDigit = " ";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousDigit);
    const curr = parseFloat(this.currentDigit);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      default:
        return;
    }

    this.currentDigit = computation;
    this.operation = undefined;
    this.previousDigit = " ";
  }

  getDisplay(number) {
    const stringNumber = number.toString();
    const intDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let intDisplay;

    if (isNaN(intDigits)) {
      intDisplay = " ";
    } else {
      intDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${intDisplay}.${decimalDigits}`;
    } else {
      return intDisplay;
    }
  }

  updateDisplay() {
    this.current_digit.innerText = this.currentDigit;
    //  this.previous_digit.innerText = this.previousDigit;

    if (this.operation != null) {
      //  this.previous_digit.innerText = `${this.previousDigit} ${this.operation}`;

      this.previous_digit.innerText = `${this.getDisplay(previousDigit)}`;
    }
  }
}

const btn_numbers = document.querySelectorAll("[data-number]");
const btn_operands = document.querySelectorAll("[data-operation]");
const btn_equals = document.querySelector("[data-equals]");
const btn_del = document.querySelector("[data-del]");
const btn_reset = document.querySelector("[data-reset]");
const current_digit = document.querySelector("[data-current-digit]");
const previous_digit = document.querySelector("[data-previous-digit]");

const calculate = new Calc(current_digit, previous_digit);
console.log(calculate);

btn_numbers.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.innerText);

    calculate.append(button.innerText);
    calculate.updateDisplay();
  });
});

btn_operands.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.innerText);

    calculate.chooseOperation(button.innerText);
    calculate.updateDisplay();
  });
});

btn_equals.addEventListener("click", (button) => {
  calculate.compute();
  calculate.updateDisplay();
});

btn_reset.addEventListener("click", (button) => {
  calculate.reset();
  calculate.updateDisplay();
});

btn_del.addEventListener("click", (button) => {
  calculate.del();
  calculate.updateDisplay();
});

// ------------------------------------------------
//        theme selector
// ------------------------------------------------
const rangeInput = document.getElementById("rng");
const body = document.body;

rangeInput.addEventListener("change", (e) => {
  const selectedValue = parseInt(e.target.value);

  console.log(selectedValue);
  //method 1
  // switch (selectedValue) {
  //   case 0: //add .theme--1;
  //     document.body.classList.add("theme--1");
  //     document.body.classList.remove("theme--2", "theme--3");
  //     break;
  //   case 1: //add/ .theme--2;
  //     document.body.classList.add("theme--2");
  //     document.body.classList.remove("theme--1", "theme--3");
  //     break;
  //   case 2: //add/ .theme--3;
  //     document.body.classList.add("theme--3");
  //     document.body.classList.remove("theme--2", "theme--1");
  //     break;
  //   default: // .theme--1;
  //     document.body.classList.add("theme--1");
  //     document.body.classList.remove("theme--2", "theme--3");
  //     break;
  // }

  //method 2
  const themes = ["theme--1", "theme--2", "theme--3"];
  body.classList.remove(...themes);
  body.classList.add(themes[selectedValue]);
});
