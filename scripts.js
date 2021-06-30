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

    let result = this[operator](num1, num2)

    return Math.round((result + Number.EPSILON) * 100000) / 100000

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
            if ((subDisplay.textContent.split('').indexOf('=') + 1)){
                subDisplay.textContent = '';
                mainDisplay.textContent = button.textContent;
            }
            else {
                mainDisplay.textContent += button.textContent;
            }
        })
    }
})

//period logic
calcButtons.forEach(button => {
    if (button.textContent == '.') {
        button.addEventListener('click', () => {
            if ((subDisplay.textContent.split('').indexOf('=') + 1)){
                subDisplay.textContent = '';
                mainDisplay.textContent = '0.';
            }
            else if (mainDisplay.textContent == '') { mainDisplay.textContent += '0.' }
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
            if (subDisplay.textContent.split('').indexOf('=') + 1){
                subDisplay.textContent = ''
            }
        })
    }
})

//operator logic
calcButtons.forEach(button => {
    if(['/', '*', '-', '+'].indexOf(button.textContent) + 1){
        button.addEventListener('click', () => {
            let mainSplit = mainDisplay.textContent.split(' ')
            let subSplit = subDisplay.textContent.split(' ')

            //if sub display is empty and there is only one number is in main display append an operator
            if (subDisplay.textContent == '' && !isNaN(mainSplit[0]) && mainSplit[0] !== '' && !(mainSplit.indexOf('+') + 1) && !(mainSplit.indexOf('-') + 1) && !(mainSplit.indexOf('/') + 1) && !(mainSplit.indexOf('*') + 1)){
                mainDisplay.textContent += ` ${button.textContent} `
            }
            //if sub display is empty and there is one number and an operator, replace the operator
            else if (subDisplay.textContent == '' && !isNaN(mainSplit[0]) && (['/', '*', '-', '+'].indexOf(mainSplit[1]) + 1) && mainSplit[2] == ''){
                mainDisplay.textContent = mainSplit[0] + ` ${button.textContent} `
            }
            //if subdisplay is empty and there are two numbers with an operator in the main display
            else if (subDisplay.textContent == '' && !isNaN(mainSplit[0]) && (['/', '*', '-', '+'].indexOf(mainSplit[1]) + 1) && !isNaN(mainSplit[2])){
                subDisplay.textContent = operate(mainSplit[1], mainSplit[0], mainSplit[2]) + ` ${button.textContent} `
                mainDisplay.textContent = ''
            }
            //if equal to is present in subdisplay
            else if (subSplit[subSplit.length - 2] == '='){
                mainDisplay.textContent += ` ${button.textContent} `
                subDisplay.textContent = ''
            }
            //if subdisplay has a number and an operator, maindisplay has a number
            else if (!isNaN(subSplit[0]) && (['/', '*', '-', '+'].indexOf(subSplit[1]) + 1) && !isNaN(mainSplit[0]) && !(mainDisplay.textContent == '')){
                subDisplay.textContent = operate(subSplit[1], subSplit[0], mainSplit[0]) + ` ${button.textContent} `
                mainDisplay.textContent = ''
            }
            //if there is already an operator in display replace the operator
            else if (!isNaN(subSplit[0]) && (['/', '*', '-', '+'].indexOf(subSplit[1]) + 1) && mainDisplay.textContent == ''){
                subDisplay.textContent = subSplit[0] + ` ${button.textContent} `
            }
        })
    }
})

//eval button logic
calcButtons.forEach(button => {
    if(button.textContent == '='){
        button.addEventListener('click', () => {
            let mainSplit = mainDisplay.textContent.split(' ')
            let subSplit = subDisplay.textContent.split(' ')

            //if subdisplay is empty evaluvate elements in the main display
            if(subDisplay.textContent == '' && !isNaN(mainSplit[0]) && (['/', '*', '-', '+'].indexOf(mainSplit[1]) + 1) && !isNaN(mainSplit[2]) && mainSplit[2] !== ''){
                subDisplay.textContent = mainDisplay.textContent + " = "
                mainDisplay.textContent = operate(mainSplit[1], mainSplit[0], mainSplit[2])
            }
            //if subdisplay and maindiplay has valid numbers and operator AND an equals sign then evaluvate using old result
            else if (!isNaN(subSplit[0]) && (['/', '*', '-', '+'].indexOf(subSplit[1]) + 1) && !isNaN(mainSplit[0]) && subSplit[subSplit.length - 2] == '='){
                subDisplay.textContent = mainSplit[0] + " " + subSplit[1] + " " + subSplit[2] + " = "
                mainDisplay.textContent = operate(subSplit[1], mainSplit[0], subSplit[2])
            }
            //if subdisplay and maindiplay has valid numbers and operator then evaluvate sub and main display
            else if (!isNaN(subSplit[0]) && (['/', '*', '-', '+'].indexOf(subSplit[1]) + 1) && !isNaN(mainSplit[0]) && mainSplit[2] !== ''){
                subDisplay.textContent = subSplit[0] + " " + subSplit[1] + " " + mainSplit[0] + " = "
                mainDisplay.textContent = operate(subSplit[1], subSplit[0], mainSplit[0])
            }
        })
    }
})

//backspace logic
calcButtons.forEach(button => {
    if (button.textContent == '←'){
        button.addEventListener('click', () => {
            let mainSplit = mainDisplay.textContent.split(' ')
            let subSplit = subDisplay.textContent.split(' ')
            let mainFullSplit = mainDisplay.textContent.split('')

            if (subDisplay.textContent == '' && (['/', '*', '-', '+'].indexOf(mainSplit[1]) + 1) && mainSplit[2] == ''){
                mainDisplay.textContent = mainSplit[0]
            }
            else if (!(subSplit.indexOf('=') + 1)){
                mainFullSplit.pop()
                mainDisplay.textContent = mainFullSplit.join('')
            }
        })
    }
})