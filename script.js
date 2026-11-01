const keypad = document.getElementById('keypad');
const display = document.getElementById('display');

let currentExpression = "0";

const buttons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'C'];

function shuffleButtons(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}


function renderKeypad() {
    keypad.innerHTML = "";

    const randomizedButtons = shuffleButtons(buttons);

    randomizedButtons.forEach(char => {
        const btn = document.createElement('button');
        btn.textContent = char;

        btn.addEventListener('click', () => {
            handleButtonClick(char);
            renderKeypad(); // Reshuffle immediately on every click
        });

        keypad.appendChild(btn);
    });
}

function handleButtonClick(char) {
    if (char === 'C') {
        currentExpression = "";
        display.textContent = "0";
    } else if (char === '=') {
        // Trigger Captcha stage (we'll implement this next)
        alert("Verification required!");
    } else {
        currentExpression += char;
        display.textContent = currentExpression;
    }
}

renderKeypad();