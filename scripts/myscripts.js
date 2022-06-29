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
const decimals = 12;
let entryStr = '';
let firstNum = 0;
let secondNum = 0;
let totalNum;
let first = true;

//INIT KEYBOARD EVENT
document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) {
        fdigitKey(e.key)
    }

    if (e.code === 'NumpadDecimal' || e.code === 'Comma' || e.code === 'Period') { fPeriod(); }

    if (e.code === 'Enter' || e.code === 'NumpadEnter') { fEquals(); }

    switch(e.code) {
        case 'Backspace':
            fbackspace();
            break;
        case 'Delete':
            if (entryScreen.innerHTML == '&nbsp;') { fac(); }         
            else { fce(); }
            break;
        case 'NumpadDivide':
            followOp('/');
            break;
        case 'NumpadMultiply':
            followOp('*');
            break;
        case 'NumpadSubtract':
            if (entryScreen.innerHTML == '&nbsp;') { fNegPos(); }
            else { followOp('-'); }
            break;
        case 'NumpadAdd':
            followOp('+');
            break;
        default:
            break;
    }
});

// INIT DIGITS
let digitKeys = document.querySelectorAll('.digit-key')

for (i = 0; i < digitKeys.length; i++) {
    digitKeys[i].addEventListener('click', (e) => { fdigitKey(e.target.innerHTML) });
}

function fdigitKey(_key) {
    if (entryStr.length == 0) {
        if (first) { printCalc('&nbsp;'); }
        entryStr = _key;
    }
    else {
        entryStr = entryStr + _key;    
    }
    entryScreen.innerHTML = entryStr;
}

// INIT AC
ac.addEventListener('click', fac);

function fac() {
    entryStr = '';
    operatorStr = '';
    firstNum = 0;
    secondNum = 0;
    delete totalNum;
    first = true;
    printCalc('&nbsp;');
    entryScreen.innerHTML = '&nbsp;';
}

// INIT CE
ce.addEventListener('click', fce);

function fce() {
    if (first) { printCalc('&nbsp;'); }
    entryStr = '';
    entryScreen.innerHTML = '&nbsp;';
}

// INIT BACKSPACE
backspace.addEventListener('click', fbackspace);

function fbackspace() {
    if (first) { printCalc('&nbsp;'); }
    entryStr = entryStr.slice(0, -1);
    entryScreen.innerHTML = neverEmpty(entryStr);
}

// INIT NEG_POS
neg_pos.addEventListener('click', fNegPos);

function fNegPos() {
    if (first) { printCalc('&nbsp;'); }
    if (entryStr.charAt(0) == '-') {
        entryStr = entryStr.substring(1);
    } 
    else {
        entryStr = '-' + entryStr;
    }
    entryScreen.innerHTML = neverEmpty(entryStr);
}

// INIT PERIOD
period.addEventListener('click', fPeriod);

function fPeriod() {
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
}

// INIT DIVISION
division.addEventListener('click', () => {
    followOp('/');
});

// INIT TIMES
times.addEventListener('click', () => {
    followOp('*');
});

// INIT MINUS
minus.addEventListener('click', () => {
    followOp('-');
});

// INIT PLUS
plus.addEventListener('click', () => {
    followOp('+');
});

// FOLLOWS ALL OPERATORS
function followOp(_opStr) {
    if (entryStr == '-' || entryStr.length == 0) { entryStr = '0'; }
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
equals.addEventListener('click', fEquals);

function fEquals() {
    if (entryStr == '-') { entryStr = '0'; }
    if (!first && !calcScreen.innerHTML.includes('=') && entryStr.length != 0) {
        secondNum = parseFloat(entryStr);
        printCalc(`${firstNum} ${operatorStr} ${secondNum} =`);
        fCalculate(firstNum, secondNum, operatorStr);
        if (entryScreen.innerHTML != divZero) { entryScreen.innerHTML = totalNum; }
        first = true;
    }
}

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
    totalNum = parseFloat(totalNum.toPrecision(decimals));
    return totalNum;
}

// SUPPORT FUNCTIONS
function printCalc(_calcStr) {
    _calcStr = _calcStr.replace(/\//g, "÷").replace(/\*/g, "×");
    calcScreen.innerHTML = _calcStr;
}

function neverEmpty(_str) {
    if (_str == '') {
        _str = '&nbsp;';
    }
    return _str;
} 
