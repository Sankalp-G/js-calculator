////query selectors
const buttonsGrid = document.querySelector('#buttonsContainer')
const calcButtons = buttonsGrid.childNodes
const mainDisplay = document.querySelector('#mainDisplay')
const subDisplay = document.querySelector('#subDisplay')

////basic math function declarations
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
    if (operator == '+'){operator = 'add'}
    if (operator == '-'){operator = 'subtract'}
    if (operator == '/'){operator = 'divide'}
    if (operator == '*'){operator = 'multiply'}
    num1 = Number(num1)
    num2 = Number(num2)

    return this[operator](num1, num2)
}

////logic to construct calculator buttons
let button = document.createElement('button')
let buttonsTemplate = ['AC', 'CE', '←', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '=']
for (i = 0; i < 19; i++) {
    let clonedButton = button.cloneNode()
    clonedButton.textContent = buttonsTemplate[i];
    if(typeof(buttonsTemplate[i]) === 'number' || buttonsTemplate[i] === '.'){clonedButton.setAttribute('style', 'background-color: #e1e0e0;')}
    if(i == 16){clonedButton.setAttribute('style', 'grid-column: 1 / 3; background-color: #e1e0e0;')}
    if(i == 18){clonedButton.setAttribute('style', 'background-color: #bafcff;')}
    if(['/', '-', '+', '*'].indexOf(buttonsTemplate[i]) + 1){clonedButton.setAttribute('style', 'background-color: #e6f1ff;')}
    buttonsGrid.appendChild(clonedButton)
}

////event listeners
//numerical logic
let numericals = ['1','2','3','4','5','6','7','8','9','0']
calcButtons.forEach(button => {
    if (numericals.indexOf(button.textContent) + 1) {
        button.addEventListener('click', () => {
            mainDisplay.textContent += button.textContent;
        })
    }
})

//period logic
calcButtons.forEach(button => {
    if (button.textContent == '.') {
        button.addEventListener('click', () => {
            if (mainDisplay.textContent == '') { mainDisplay.textContent += '0.' }
            else if ((['/', '*', '-', '+'].indexOf(mainDisplay.textContent.split(' ')[mainDisplay.textContent.split(' ').length - 2]) + 1) == 0
                && mainDisplay.textContent.split('').indexOf('.') == -1) { mainDisplay.textContent += '.' }
            else {
                let split = mainDisplay.textContent.split(' ')
                if (split[split.length - 1] == '') { mainDisplay.textContent += '0.' }
                else if (split[split.length - 1].indexOf('.') == -1) { mainDisplay.textContent += '.' }
            }
        })
    }
})

//clear buttons logic
calcButtons.forEach(button => {
    if(button.textContent == 'AC'){
        button.addEventListener('click', () => {
            mainDisplay.textContent = '';
            subDisplay.textContent = '';
        })
    }
    if(button.textContent == 'CE'){
        button.addEventListener('click', () => {
            mainDisplay.textContent = '';
        })
    }
})

//partial operator logic
calcButtons.forEach(button => {
    if(['/', '*', '-', '+'].indexOf(button.textContent) + 1){
        button.addEventListener('click', () => {
                mainDisplay.textContent += ' '+button.textContent+' ';
            })
        }
})