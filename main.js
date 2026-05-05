const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generateBtn = document.querySelector('#generate-btn');

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    lottoNumbersContainer.innerHTML = '';
    for (const number of numbers) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('lotto-number');
        numberDiv.textContent = number;
        lottoNumbersContainer.appendChild(numberDiv);
    }
}

function handleGenerate() {
    const numbers = generateNumbers();
    displayNumbers(numbers);
}


generateBtn.addEventListener('click', handleGenerate);

// Initial generation
handleGenerate();
