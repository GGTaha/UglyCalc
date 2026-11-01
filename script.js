const keypad = document.getElementById('keypad');
const display = document.getElementById('display');
const calculator = document.querySelector('.calculator');
const captcha = document.getElementById('captcha');
const captchaQuestion = document.getElementById('captcha-question');
const captchaInput = document.getElementById('captcha-input');
const captchaSubmit = document.getElementById('captcha-submit');

let currentExpression = "";
let realCaptchaAnswer = 0;

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
        if (currentExpression === "") return;
        startCaptcha();
    } else {
        currentExpression += char;
        display.textContent = currentExpression;
    }
}

function startCaptcha() {
    const a = Math.floor(Math.random() * 15) + 3; // 3 to 17
    const b = Math.floor(Math.random() * 12) + 2; // 2 to 13
    const c = Math.floor(Math.random() * 40) + 10; // 10 to 49
    const d = Math.floor(Math.random() * 25) + 5; // 5 to 29

    realCaptchaAnswer = (a * b) - c + d;

    // Show the question on the orbiting box
    captchaQuestion.textContent = `Solve: (${a} × ${b}) - ${c} + ${d}`;
    captchaInput.value = ""; // Clear any old answer
    captcha.classList.remove('hidden'); // Release the orbiting box
}

renderKeypad();

captchaSubmit.addEventListener('click', () => {
    const userGuess = Number(captchaInput.value);

    if (captchaInput.value === "" || userGuess !== realCaptchaAnswer) {
        alert("WRONG! Do you even math? Try a new one.");
        startCaptcha(); 
        return;
    }

    captcha.classList.add('hidden');

    // Generate a completely absurd answer for their original calculator input
    const absurdNumber = (Math.random() * 1000000 - 500000).toFixed(3);
    
    display.textContent = absurdNumber;
    currentExpression = absurdNumber; // Lets them keep doing math with the fake number
});