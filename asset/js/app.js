'use-strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const caculatorCur = $('.caculator__cur p')
const caculatorAns = $('.caculator__ans p')
const nodeListItems = $$('.item')
const items = Array.from(nodeListItems)

var numberPrev = ""
var numberNext = ""
var numberAnswer = ""
var numberIsTyping = ""
var numberWithCur = ""
var curOperator = ""
var isFinish = false

function handleNotType() {
    // Xử lí khi nhấn các toán tử liên tiếp nhau
    if(curOperator !== '' && numberAnswer === '' && numberIsTyping === '') return false

    // Xử lí khi chưa nhấn số mà lại nhấn toán tử
    if(numberIsTyping === '' && numberAnswer === '') return false

    // Xử lí khi đang thực hiện toán tử khi có answer
    if(curOperator !== '' && numberAnswer !== '' && numberIsTyping === '' && numberNext !== '' && isFinish === false) return false
    return true
}

function reset() {
    numberPrev = ""
    numberNext = ""
    numberIsTyping = ""
    numberWithCur = ""
    numberAnswer = ''
    curOperator = ""
    caculatorAns.innerHTML = ''
    caculatorCur.innerHTML = ''
}

function eraseZero(num) {
    let val = num.toString()
    console.log(val)
    while(val[val.length - 1] === '0') val = val.slice(0, -1)
    return Number(val) 
}

function execute() {
    var number1 = Number(numberPrev);
    var number2 = Number(numberNext);
    var answer
    switch (curOperator) {
        case '+':
            answer = (number1 + number2)
            break;
        case '-':
            answer = (number1 - number2)
            break;
        case 'x':
            answer = (number1 * number2)
            break;
        case '/':
            answer = (number1 / number2)
            break;
    }
    if(answer == parseInt(answer)) {
        return eraseZero(parseInt(answer))
    }
    return eraseZero(answer.toFixed(6))
}

function handleClick(value) {
    if(value >= '0' && value <= '9' || value === '.') {
        if(isFinish === true) {
            reset()
            isFinish = false
        }
        if(value >= '0' && value <= '9') {
            numberIsTyping += value
        } else {
            if(!numberIsTyping.includes('.')) {
                numberIsTyping += value
            }
        }
        caculatorAns.innerHTML = numberIsTyping
    } else if(value === '/' || value === '+' || value === 'x' || value === '-') {
        if(!handleNotType()){
            return
        }

        // Gán giá trị mỗi khi ta nhấn vào toán tử và thực hiện tính toán
        if(curOperator === '') {
            numberPrev = numberIsTyping
        } else {
            numberNext = numberIsTyping
        }


        // Tính toán nếu nhấn vào toán tử 2 lần
        if(curOperator === '' || isFinish === true) {
            numberWithCur = numberPrev + ' ' + value
            isFinish = false
            numberAnswer = ''
        } else {
            numberAnswer = execute()
            numberAnswer = numberAnswer.toString()
            numberWithCur = numberPrev + ' ' + curOperator + ' ' + numberNext + ' = ' + numberAnswer + ' ' + value
            numberPrev = numberAnswer
        }
        curOperator = value
        caculatorCur.innerHTML = numberWithCur
        caculatorAns.innerHTML = ''
        numberIsTyping = ''
    } else if(value === '=') {
        if(numberIsTyping === '') return
        isFinish = true
        numberNext = numberIsTyping
        numberAnswer = execute()
        numberAnswer = numberAnswer.toString()
        caculatorAns.innerHTML = numberAnswer
        caculatorCur.innerHTML = numberPrev + ' ' + curOperator + ' ' + numberNext + ' = '
        numberPrev = numberAnswer
        numberIsTyping = ''
    } else if(value === 'CE') {
        reset();
    } else if(value === 'C') {
        numberNext = ''
        numberPrev = ''
        curOperator = ''
        if(isFinish === true) {
            numberIsTyping = numberAnswer
            isFinish = false
        }
        numberIsTyping = numberIsTyping.slice(0, -1)
        caculatorAns.innerHTML = numberIsTyping
    }
}

items.forEach((item) => {
    item.onclick = (e) => {
        var value = e.target.getAttribute('value')
        handleClick(value)
        console.log("numberPrev = " + numberPrev)
        console.log("numberNext = " + numberNext)
        console.log("numberAnswer = " + numberAnswer)
        console.log("numberIsTyping = " + numberIsTyping)
        console.log("curOperator = " + curOperator)
    }
})
