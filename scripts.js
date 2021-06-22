//basic math function declarations
function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function operate(operator, num1, num2) {
    //operates two numbers using the operator
    return this[operator](num1, num2)
}

//logic to construct calculator buttons
const buttonsGrid = document.querySelector('#buttonsContainer')
let button = document.createElement('button')
let buttonsTemplate = ['CE', 'C', '←', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '=']
for (i = 0; i < 19; i++) {
    let clonedButton = button.cloneNode()
    clonedButton.textContent = buttonsTemplate[i];
    if(typeof(buttonsTemplate[i]) === 'number' || buttonsTemplate[i] === '.'){clonedButton.setAttribute('style', 'background-color: #e1e0e0;')}
    if(i == 16){clonedButton.setAttribute('style', 'grid-column: 1 / 3; background-color: #e1e0e0;')}
    if(i == 18){clonedButton.setAttribute('style', 'background-color: #bafcff;')}
    if(['/', '-', '+', '*'].indexOf(buttonsTemplate[i]) + 1){clonedButton.setAttribute('style', 'background-color: #e6f1ff;')}
    buttonsGrid.appendChild(clonedButton)
}