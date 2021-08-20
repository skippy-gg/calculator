//Defining Operators
const DIVIDE = "÷";
const MULTIPLY = "×";
const ADD = "+";
const SUBTRACT = "−";
const EQUALS = "=";
const CLEAR = "A/C";
const DELETE = "Delete";

//Define operator array
const calcOperators = [DIVIDE, MULTIPLY, ADD, SUBTRACT];

//Define top and bottom text DOM elements
const topExpr = document.getElementById("topValues");
const botExpr = document.getElementById("bottomValues");

//Global Variables
let currValue = '0';
let prevValue = '';
let operator = '';
let last = false;

//Calculator math functions
function operation(operator, a, b){
    if (operator == ADD){
        return a+b;
    }

    else if (operator == SUBTRACT){
        return a-b;
    }

    else if (operator == MULTIPLY){
        return a*b;
    }
    
    else if (operator == DIVIDE){
        return a/b;
    }
}

//Updates current expression 
function currExpression(e){
    if (botExpr.textContent == "0" | last){
        currValue = e.target.textContent;
        last = false;
    }
    else{
        currValue += e.target.textContent;
        last = false;
    }
}

//Updates previous expression
function prevExpression(){
    prevValue = currValue+operator;
}

//Stores recently pressed operator
function setOperator(e){
    operator = e.target.textContent;
    last = true;
}

//Evaluates the current expression and previous expression using the operator
function evalExpression(){
    if (operator == DIVIDE & currValue == "0"){
        alert("You cannot divide by zero!");
        return;
    }
    [a, b] = getOperands();
    prevValue += currValue;
    currValue = operation(operator, a, b);
}

//Convers current, previous values to integers/floats
function getOperands(){
    a = currValue.includes(".") ? parseFloat(currValue) : parseInt(currValue);
    b = prevValue.includes(".") ? parseFloat(prevValue) : parseInt(prevValue);
    return [a,b];
}
//Updates display text on calculator
function updateDisplay(){
    topExpr.textContent = prevValue;
    botExpr.textContent = currValue;
}

//Clears prev and current values
function clearAll(){
    currValue = '0';
    prevValue = '';
}

//Clears last digit in current value
function clearCurrent(){
    currValue.length<=1 ? currValue = '0' : currValue = currValue.slice(0,-1)
}

//EVENT LISTENERS
document.getElementById("clearBtn").addEventListener('click',() => {
    clearAll();
    updateDisplay();
})

document.getElementById("deleteBtn").addEventListener('click',() => {
    clearCurrent();
    updateDisplay();
})

document.querySelectorAll(".operand").forEach(button => {
    button.addEventListener('click',(e) => {
    currExpression(e);
    updateDisplay();
    });
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener('click',(e) => {
    setOperator(e);
    prevExpression();
    updateDisplay();
    });
});

document.querySelector(".equate").addEventListener('click',() => {
    evalExpression();
    updateDisplay();
});