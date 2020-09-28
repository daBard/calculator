// DOM ELEMENTS
const calcScreen = document.querySelector('#calc-screen');
const sumScreen = document.querySelector('#screen');
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
let firstStr = '';
let secondStr = '';
let operatorStr = '';
let totalStr = '';
let first = true;

// INIT DIGIT-KEY EVENTS
let digitKeys = document.querySelectorAll('.digit-key')

for (i = 0; i < digitKeys.length; i++) {
    digitKeys[i].addEventListener('click', (e) => {
        if (first) { 
            if (sumScreen.innerHTML == '&nbsp;' || sumScreen.innerHTML == '0') {    
                firstStr = e.target.innerHTML;
            }
            else {
                firstStr = firstStr + e.target.innerHTML;    
            }
            sumScreen.innerHTML = firstStr;
        }
        else {
            if (sumScreen.innerHTML == '&nbsp;' || sumScreen.innerHTML == '0') {    
                secondStr = e.target.innerHTML;
            }
            else {
                secondStr = secondStr + e.target.innerHTML;    
            }
            sumScreen.innerHTML = secondStr;
        }
    });
}

// INIT AC
ac.addEventListener('click', () => {
    firstStr = '';
    secondStr = '';
    operatorStr = '';
    totalStr = '';
    first = true;
    calcScreen.innerHTML = '&nbsp;';
    sumScreen.innerHTML = '&nbsp;';
});

// INIT CE
ce.addEventListener('click', () => {
    if (first) {
        firstStr = ''
    }
    else {
        secondStr = '';
    }
    sumScreen.innerHTML = '&nbsp;';
});

// INIT BACKSPACE
backspace.addEventListener('click', () => {
    if (first) {
        firstStr = firstStr.slice(0, -1);
        sumScreen.innerHTML = neverEmpty(firstStr); 
    }
    else {
        secondStr = secondStr.slice(0, -1);
        sumScreen.innerHTML = neverEmpty(secondStr);
    }
});

// INIT NEG_POS
neg_pos.addEventListener('click', () => {
    if (first) { firstStr = fNeg_pos(firstStr) }
    else { secondStr = fNeg_pos(secondStr) }
});

function fNeg_pos(_str) {
    if (_str.charAt(0) == '-') {
        _str = _str.substring(1);
    } 
    else {
        _str = '-' + _str;
    }
    sumScreen.innerHTML = neverEmpty(_str);
    return _str;
}

// INIT PERIOD
period.addEventListener('click', () => {
    if (first) { firstStr = fPeriod(firstStr); }
    else { secondStr = fPeriod(secondStr); }
});

function fPeriod(_str) {
    if (!_str.includes('.')) {
        if (sumScreen.innerHTML == '&nbsp;') {
            _str = '0.';
        }
        else {
            _str = _str + '.';
        }
        sumScreen.innerHTML = _str;
    }
    return _str;
}

// INIT DIVISION
division.addEventListener('click', () => {
    operatorStr = '/';
    followOp();
});

// INIT TIMES
times.addEventListener('click', () => {
    operatorStr = '*';
    followOp();
});

// INIT MINUS
minus.addEventListener('click', () => {
    operatorStr = '-';
    followOp();
});

// INIT PLUS
plus.addEventListener('click', () => {
    operatorStr = '+';
    followOp();
});

// INIT EQUALS
equals.addEventListener('click', () => {
    if (!first && !calcScreen.innerHTML.includes('=')) {
        firstStr = fEquals(firstStr, secondStr, operatorStr);
        //printCalc(firstStr);
        //sumScreen.innerHTML = '&nbsp';
        first = true;
    }
});

function fEquals(_fStr, _sStr, _opStr) {
    if (_opStr.includes('/') && _sStr == '0') {
        sumScreen.innerHTML = 'undefined';
        totalStr = '0';
    }
    else {
        switch (_opStr) {
            case '/':
                totalStr = (parseFloat(_fStr) / parseFloat(_sStr));
                break;
            case '*':
                totalStr = (parseFloat(_fStr) * parseFloat(_sStr));
                break;
            case '-':
                totalStr = (parseFloat(_fStr) - parseFloat(_sStr));
                break;
            case '+':
                totalStr = (parseFloat(_fStr) + parseFloat(_sStr));
                break;
            default:
                console.log('This should never happen!');
        }
        sumScreen.innerHTML = totalStr;
    }
    printCalc(`${_fStr} ${_opStr} ${_sStr} =`);
    secondStr = '';
    //operatorStr = '';
    first = true;
    return totalStr.toString();
}

// FUNCTIONS
function printCalc(_calcStr) {
    _calcStr = _calcStr.replace(/\//g, "÷").replace(/\*/g, "×");
    calcScreen.innerHTML = _calcStr.toString();
}

function neverEmpty(_str) {
    if (_str == '') {
        _str = '&nbsp;';
    }
    return _str;
}

function followOp() {
    if (!firstStr) {
        firstStr = '0';
    }
    if (!first && secondStr) {
        firstStr = fEquals(firstStr, secondStr, operatorStr).toString();
    }
    printCalc(`${firstStr} ${operatorStr}`);
    sumScreen.innerHTML = '&nbsp';
    first = false;
}

// KEYBOARD
// OPERATORS WORK BACKWARDS
// REDO LOGIC!