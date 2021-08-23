//============================================//
//              GLOBAL VARIABLES              //
//============================================//
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

//Tracks if last button press was operator. If so, true. Otherwise, false.
let last = false;

//============================================//
//                FUNCTIONS                   //
//============================================//
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

//Determines whether current/prev expressions are valid.
function checkValid(e){
    //Checks that entry does not exceed calculator screen width.
    if(currValue.length == 19){
        alert("That number is too big!");
        currValue = "0";
        updateDisplay();
        return false;
    }
    //Checks that the running total does not exceed calculator screen width.
    if(prevValue.length >= 17){
        alert("That value is too big!");
        return false;
    }
    //Disallows consecutive equalBtn presses.
    if(last && e.target.textContent == EQUALS){
        return false;
    }
    //If none of the previous blocks are exectuted, we consider the curr/prev expressions valid.
    return true;
}

//Updates current expression 
function currExpression(e){
    //Stores button text.
    let currBtn = e.target.textContent;
    if (botExpr.textContent == "0" || last){
        currValue = currBtn;
        last = false;
    }
    else{
        //Check for decimal in current expression.
        if (currValue.includes(".") && currBtn == "."){
            return;
        }
        currValue += currBtn;
        last = false;
    }
}

//Updates previous expression
function prevExpression(){
    prevValue = currValue+operator;
}

//Stores recently pressed operator
function setOperator(e){
    //Performs running total if prevValue contains a valid expression(Has an operand and ends with operator).
    if(calcOperators.includes(prevValue.charAt(prevValue.length-1))){
        evalExpression();
    }
    operator = e.target.textContent;
    last = true;
}

//Evaluates the current expression and previous expression using the operator
function evalExpression(){
    //Disallow division by zero.
    if (operator == DIVIDE && currValue == "0"){
        alert("You cannot divide by zero!");
        return;
    }
    //Pressing Equals does nothing if there is no expression to equate.
    if (prevValue == ''){
        return;
    }
    [a, b] = getOperands();
    prevValue += currValue;
    currValue = String(operation(operator, a, b));
    last = true;
}

//Convers current, previous values to integers/floats
function getOperands(){
    a = prevValue.includes(".") ? parseFloat(prevValue) : parseInt(prevValue);
    b = currValue.includes(".") ? parseFloat(currValue) : parseInt(currValue);
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

//============================================//
//              EVENT LISTENERS               //
//============================================//
//Clear Button
document.getElementById("clearBtn").addEventListener('click',() => {
    clearAll();
    updateDisplay();
})

//Delete Button
document.getElementById("deleteBtn").addEventListener('click',() => {
    clearCurrent();
    updateDisplay();
})

//Calculator buttons (operands)
document.querySelectorAll(".operand").forEach(button => {
    button.addEventListener('click',(e) => {
        if(checkValid(e)){
            currExpression(e);
            updateDisplay();
        }
    });
});

//Calculator buttons (operators)
document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener('click',(e) => {
        if(checkValid(e)){
            setOperator(e);
            prevExpression();
            updateDisplay();
        }
    });
});

//Equals button
document.querySelector(".equate").addEventListener('click',(e) => {
    if(checkValid(e)){
        evalExpression();
        updateDisplay();
    }
});