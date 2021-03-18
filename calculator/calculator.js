var showCalculator = async (e) => {
  var activeLink = document.querySelectorAll(".active");
  activeLink.forEach((el) => {
    el.classList.remove("active");
  });
  classList = e.target.classList;
  classList.toggle("active");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      var calculator = xhr.response;
      content.innerHTML = calculator;
      window.history.pushState("Calculator", "Calculator", "/calculator");
      // Gets all input elements
      var elements = document.querySelectorAll(".input");

      // Gets Display Elements
      var smallDisplay = document.querySelector(".small-display"); // The small display element
      var largeDisplay = document.querySelector(".large-display"); // The large display element

      // Declares initail variables

      var currentNumber = ""; // The current number
      var previousNumber = ""; // The Previous number
      var currentOperand = ""; // The current operand
      var previousOperand = ""; // The previous operand
      var initialNumber = "";

      // Adds keydown event listener

      document.addEventListener("keydown", (e) => {
        handleEvent(e.key); // Call handle event function
      });

      // Iterate over all input elements

      elements.forEach((el) => {
        // Add click event listener to each input element

        el.addEventListener("click", (e) => {
          handleEvent(e.target.dataset.value); // Calls Handle event function
        });
      });

      var handleEvent = (key) => {
        let inputs = [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "0",
          ".",
          "+",
          "-",
          "*",
          "/",
          "=",
          "Enter",
          "Delete",
          "Backspace",
          "AC",
          "C",
        ];

        if (inputs.includes(key)) {
          // Prevents multiple full-stop entry

          if (key === "." && currentNumber.includes(".")) return;

          if (key === "." && currentNumber === "") {
            currentNumber = "0.";
            updateDisplay(true);
            return;
          }

          // Handles the plus operator click event

          if (key === "+") {
            initialNumber = currentNumber;
            handleOperand(key);

            return;
          }

          // Handles the minus operator click event

          if (key === "-") {
            initialNumber = currentNumber;
            handleOperand(key);

            return;
          }

          // Handles the multiplication operator click event

          if (key === "*") {
            initialNumber = currentNumber;
            handleOperand(key);

            return;
          }

          // Handles the division operator click event

          if (key === "/") {
            initialNumber = currentNumber;
            handleOperand(key);
            return;
          }

          // Handles the equals operator click event

          if (key === "=") {
            process();

            return;
          }

          if (key === "Enter") {
            process();

            return;
          }

          if (key === "Delete") {
            clear();
            updateDisplay();
            updateSmallDisplay(null);
            return;
          }

          if (key === "Backspace") {
            del();
            return;
          }

          if (key === "AC") {
            clear();
            updateDisplay();
            updateSmallDisplay(null);
            return;
          }

          if (key === "C") {
            del();
            return;
          }

          currentNumber += key;
          updateDisplay(true);
        }
        return;
      };

      var handleOperand = (key) => {
        // Sets the current operand

        currentOperand = key;

        // Handles operation when no current Number

        if (!currentNumber) {
          if (previousNumber) {
            updateSmallDisplay(currentOperand); // Updates display with current operand
          } else {
            return;
          }
          previousOperand = currentOperand; // Keeps the current operand in previous for next operation
          return;
        }
        handleOperation(currentOperand); // Handles the operation
        previousOperand = currentOperand; // Keeps the current operand in previous for next operation
        currentOperand = ""; // Empties the current operand
      };

      var process = () => {
        // Handles when no current number to process

        if (!currentNumber) {
          currentNumber = previousNumber; // Sets the previous number as the current
          updateDisplay(true); // Updates the display
          previousNumber = ""; // Clears the previous number
          updateSmallDisplay(""); // Updates the small display
          return;
        }

        if (!initialNumber && previousOperand) {
          initialNumber = currentNumber;
          calculate(previousOperand);
          return;
        }

        calculate(previousOperand); // Calls for calculation
        previousNumber = "";
        updateSmallDisplay("");
      };

      var clear = () => {
        currentNumber = "";
        previousOperand = "";
        previousNumber = "";
      };

      var del = () => {
        if (currentNumber.length > 1) {
          currentNumber = currentNumber.substr(0, currentNumber.length - 1);
          updateDisplay(true);
        } else {
          currentNumber = "";
          updateDisplay();
        }
      };

      var updateDisplay = (string) => {
        if (string) {
          var locale = parseFloat(currentNumber).toLocaleString("en", {
            style: "decimal",
            minimumFractionDigits: 1,
            maximumFractionDigits: 10,
          });

          if (currentNumber.includes(".")) {
            largeDisplay.innerHTML = locale;
            return;
          }

          largeDisplay.innerHTML = locale.substr(0, locale.length - 2);
          return;
        }
        largeDisplay.innerHTML = currentNumber;
        largeDisplay.scrollLeft = largeDisplay.scrollWidth;
      };

      var updateSmallDisplay = (e) => {
        var locale = parseFloat(previousNumber).toLocaleString("en", {
          style: "decimal",
          minimumFractionDigits: 1,
          maximumFractionDigits: 10,
        });

        if (!e) {
          if (previousNumber.includes(".")) {
            smallDisplay.innerHTML = locale;
            return;
          }
          smallDisplay.innerHTML = previousNumber;
          return;
        }
        if (previousNumber.includes(".")) {
          smallDisplay.innerHTML = locale + e;
          return;
        }
        smallDisplay.innerHTML = locale.substr(0, locale.length - 2) + e;
        return;
      };

      var handleOperation = () => {
        if (previousNumber) {
          calculate(previousOperand);
          previousNumber = currentNumber;
          updateSmallDisplay(currentOperand);
          currentNumber = "";
          updateDisplay();
          return;
        }
        previousNumber = currentNumber;
        currentNumber = "";
        updateSmallDisplay(currentOperand);
        updateDisplay();
        return;
      };

      var calculate = (e) => {
        var initNum = parseFloat(initialNumber);
        var num1 = parseFloat(previousNumber);
        var num2 = parseFloat(currentNumber);
        var operation = e;

        if (operation === "+") {
          if (!num1) {
            var result = initNum + num2;
            currentNumber = result.toString();
            previousOperand = operation;
            updateDisplay(true);
            return;
          }

          var result = num1 + num2;
          currentNumber = result.toString();
          previousOperand = operation;
          updateDisplay(true);
          return;
        }

        if (operation === "*") {
          if (!num1) {
            var result = initNum * num2;
            currentNumber = result.toString();
            previousOperand = operation;
            updateDisplay(true);
            return;
          }

          var result = num1 * num2;
          currentNumber = result.toString();
          previousOperand = operation;
          updateDisplay(true);
          return;
        }

        if (operation === "-") {
          if (!num1) {
            return;
          }

          var result = num1 - num2;
          currentNumber = result.toString();
          previousOperand = operation;
          updateDisplay(true);
          return;
        }

        if (operation === "/") {
          if (!num1) {
            return;
          }

          var result = num1 / num2;
          currentNumber = result.toString();
          previousOperand = operation;
          updateDisplay(true);
          return;
        }

        if (operation === "=") {
          if (previousOperand === "+") {
            var result = num1 + num2;
            currentNumber = result.toString();
            updateDisplay(true);
            previousOperand = "";
            return;
          }

          if (previousOperand === "*") {
            var result = num1 * num2;
            currentNumber = result.toString();
            updateDisplay(true);
            previousOperand = "";
            return;
          }

          if (previousOperand === "-") {
            var result = num1 - num2;
            currentNumber = result.toString();
            updateDisplay(true);
            previousOperand = "";
            return;
          }

          if (previousOperand === "/") {
            var result = num1 / num2;
            currentNumber = result.toString();
            updateDisplay(true);
            previousOperand = "";
            return;
          }
          updateDisplay(true);
          previousOperand = "";
          return;
        }

        return;
      };
    }
  };
  await xhr.open("GET", "calculator/index.html", true);
  xhr.responseText = "document";
  await xhr.send();
};
