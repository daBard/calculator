// DOM ELEMENTS
const calcScreen = document.querySelector('#calc-screen');
const entryScreen = document.querySelector('#entry-screen');
const ac = document.querySelector('#ac');
const ce = document.querySelector('#ce');
const backspace = document.querySelector('#backspace');
const division = document.querySelector('#division');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');
const times = document.querySelector('#times');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const minus = document.querySelector('#minus');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const plus = document.querySelector('#plus');
const neg_pos = document.querySelector('#neg-pos');
const zero = document.querySelector('#zero');
const period = document.querySelector('#period');
const equals = document.querySelector('#equals');

// GLOBAL VARIABLES
const divZero = 'undefined';
let entryStr = '';
let operatorStr = '';
let firstNum = 0;
let secondNum = 0;
let totalNum = 0;
let first = true;

// INIT DIGIT-KEY EVENTS
let digitKeys = document.querySelectorAll('.digit-key')

for (i = 0; i < digitKeys.length; i++) {
    digitKeys[i].addEventListener('click', (e) => {
        if (entryScreen.innerHTML == '&nbsp;' || entryScreen.innerHTML == '0' || entryScreen.innerHTML == totalNum) {    
            if (first) { printCalc('&nbsp;'); }
            entryStr = e.target.innerHTML;
        }
        else {
            entryStr = entryStr + e.target.innerHTML;    
        }
        entryScreen.innerHTML = entryStr;
    });
}

// INIT AC
ac.addEventListener('click', () => {
    entryStr = '';
    operatorStr = '';
    firstNum = 0;
    secondNum = 0;
    totalNum = 0;
    first = true;
    printCalc('&nbsp;');
    entryScreen.innerHTML = '&nbsp;';
});

// INIT CE
ce.addEventListener('click', () => {
    if (first) { printCalc('&nbsp;'); }
    entryStr = '';
    entryScreen.innerHTML = '&nbsp;';
});

// INIT BACKSPACE
backspace.addEventListener('click', () => {
    if (first) { printCalc('&nbsp;'); }
    entryStr = entryStr.slice(0, -1);
    entryScreen.innerHTML = neverEmpty(entryStr);
});

// INIT NEG_POS
neg_pos.addEventListener('click', () => {
    if (first) { printCalc('&nbsp;'); }
    if (entryStr.charAt(0) == '-') {
        entryStr = entryStr.substring(1);
    } 
    else {
        entryStr = '-' + entryStr;
    }
    entryScreen.innerHTML = neverEmpty(entryStr);
});

// INIT PERIOD
period.addEventListener('click', () => {
    if (!entryStr.includes('.')) {
        if (entryScreen.innerHTML == '&nbsp;' || entryStr.length == 0) {
            if (first) { printCalc('&nbsp;'); }
            entryStr = '0.';
        }
        else {
            entryStr = entryStr + '.';
        }
        entryScreen.innerHTML = entryStr;
    }
});

// INIT DIVISION
division.addEventListener('click', () => {
    //operatorStr = '/';
    followOp('/');
});

// INIT TIMES
times.addEventListener('click', () => {
    //operatorStr = '*';
    followOp('*');
});

// INIT MINUS
minus.addEventListener('click', () => {
    //operatorStr = '-';
    followOp('-');
});

// INIT PLUS
plus.addEventListener('click', () => {
    //operatorStr = '+';
    followOp('+');
});

// FOLLOWS ALL OPERATORS
function followOp(_opStr) {
    if (entryStr == '-') { entryStr = '0'; }
    if (first) {
        if (calcScreen.innerHTML.includes('=')) {
            firstNum = totalNum;
        }
        else {
            firstNum = parseFloat(entryStr);
        }
        operatorStr = _opStr;
        first = false;
    }
    else {
        secondNum = parseFloat(entryStr);
        firstNum = fCalculate(firstNum, secondNum, operatorStr);
        operatorStr = _opStr;
    }
    printCalc(`${firstNum} ${_opStr}`);
    entryStr = '';
    if (entryScreen.innerHTML != divZero) { entryScreen.innerHTML = '&nbsp;'; }
}

// INIT EQUALS
equals.addEventListener('click', () => {
    if (entryStr == '-') { entryStr = '0'; }
    if (!first && !calcScreen.innerHTML.includes('=') && entryStr.length != 0) {
        secondNum = parseFloat(entryStr);
        printCalc(`${firstNum} ${operatorStr} ${secondNum} =`);
        fCalculate(firstNum, secondNum, operatorStr);
        if (entryScreen.innerHTML != divZero) { entryScreen.innerHTML = totalNum; }
        first = true;
    }
});

// DO CALCULATIONS
function fCalculate(_fNum, _sNum, _opStr) {
    if (_opStr == '/' && _sNum == 0) {
        entryScreen.innerHTML = divZero;
        totalNum = 0;
    }
    else {
        switch (_opStr) {
            case '/':
                totalNum = _fNum / _sNum;
                break;
            case '*':
                totalNum = _fNum * _sNum;
                break;
            case '-':
                totalNum = _fNum - _sNum;
                break;
            case '+':
                totalNum = _fNum + _sNum;
                break;
            default:
                console.log('This should never happen!');
        }
    }
    entryStr = '';
    return totalNum;
}

// FUNCTIONS
function printCalc(_calcStr) {
    _calcStr = _calcStr.replace(/\//g, "÷").replace(/\*/g, "×");
    calcScreen.innerHTML = _calcStr.toString();
}

function neverEmpty(_str) {
    if (_str == '') {
        _str = '0';
    }
    return _str;
}

// KEYBOARD
// divide by 0

