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

function divide(a,b){
    return a/b;
}

function operation(operator, a, b){
    if (operator == ADD){
        return add(a,b);
    }

    else if (operator == SUBTRACT){
        return subtract(a,b);
    }

    else if (operator == MULTIPLY){
        return multiply(a,b);
    }
    
    else if (operator == DIVIDE){
        return divide(a,b);
    }
}

function testLOL(e){
    if (operators.includes(e.target.textContent)){
        currOperator = e.target.textContent;
    }

    if (e.target.textContent == CLEAR){
        finalValues.textContent = "0";
        currExpression = "";
        workingValues.textContent = "";
    }

    if (e.target.textContent == DELETE & currExpression.length>=1){
        currExpression = currExpression.slice(0,(currExpression.length)-1);
        workingValues.textContent = currExpression;
    }

    if (!calcFunctions.includes(e.target.textContent)){
        if (currOperator == DIVIDE & e.target.textContent == "0"){
            alert("You cannot divide by 0!");
            return;
        }
    currExpression+=(e.target.textContent);
    workingValues.textContent = currExpression;
    }

    if (e.target.textContent == EQUALS){
        console.log(currOperator);
        let test = currExpression.split(currOperator);
        console.log(currExpression);
        console.log(test);
        if (currExpression.includes(".")){
            a = parseFloat(test[0]);
            b = parseFloat(test[1]);
        }
        else{
        a = parseInt(test[0]);
        // operator = test[1];
        b = parseInt(test[1]);
        }
        finalValues.textContent = operation(currOperator, a, b);
    }
}