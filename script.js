//Defining Operators
const DIVIDE = "÷";
const MULTIPLY = "×";
const ADD = "+";
const SUBTRACT = "−";
const EQUALS = "=";
const CLEAR = "Clear";
const DELETE = "Delete";

//Assigning DOM Elements
const workingValues = document.getElementById('workingValues');
const finalValues = document.getElementById('finalValues');


const operators = [DIVIDE, MULTIPLY, ADD, SUBTRACT];
const calcFunctions = [EQUALS, CLEAR, DELETE];

let currExpression = "";
let currOperator = "";

document.querySelectorAll('.calculatorBtn').forEach(button => {
    button.addEventListener('click', testLOL)});

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function diivde(a,b){
    return a/b;
}

function operate(operator, a, b){
    if (operator == ADD){
        return add(a,b)
    }

    else if (operator == SUBTRACT){
        return subtract(a,b)
    }

    else if (operator == MULTIPLY){
        return multiply(a,b)
    }
    
    else if (operator == DIVIDE){
        return divide(a,b)
    }
}

function testLOL(e){
    if (operators.includes(e.target.textContent)){
        currOperator = e.target.textContent;
    }
    if (e.target.textContent == "Clear"){
        finalValues.textContent = "";
        currExpression = "";
        workingValues.textContent = "";
    }
    if (!calcFunctions.includes(e.target.textContent)){
    currExpression+=(e.target.textContent);
    workingValues.textContent = currExpression;
    }

    if (e.target.textContent == EQUALS){
        console.log(currOperator);
        let test = currExpression.split(currOperator);
        console.log(currExpression);
        console.log(test);
        a = parseInt(test[0]);
        // operator = test[1];
        b = parseInt(test[1]);
        finalValues.textContent = operate(currOperator, a, b);
    }
}