const display = document.getElementById('display');
let current = '';
let previous = '';
let operator = null;

function updateDisplay() {
    display.textContent = current || '0';
}

function appendNumber(number) {
    if (number === '.' && current.includes('.')) return;
    current += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (current === '') return;
    if (previous !== '') compute();
    operator = op;
    previous = current;
    current = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operator) {
        case '+': computation = prev + curr; break;
        case '-': computation = prev - curr; break;
        case '*': computation = prev * curr; break;
        case '/': 
            computation = curr === 0 ? 'Error' : prev / curr; 
            break;
        default: return;
    }
    current = computation.toString();
    operator = null;
    previous = '';
    updateDisplay();
}

function clear() {
    current = '';
    previous = '';
    operator = null;
    updateDisplay();
}

function deleteLast() {
    current = current.slice(0, -1);
    updateDisplay();
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.number !== undefined) {
            appendNumber(btn.dataset.number);
        } else if (btn.dataset.action) {
            switch (btn.dataset.action) {
                case 'add': chooseOperator('+'); break;
                case 'subtract': chooseOperator('-'); break;
                case 'multiply': chooseOperator('*'); break;
                case 'divide': chooseOperator('/'); break;
                case 'equals': compute(); break;
                case 'clear': clear(); break;
                case 'delete': deleteLast(); break;
            }
        }
    });
});

updateDisplay();