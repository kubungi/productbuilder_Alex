const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generateBtn = document.querySelector('#generate-btn');
const themeToggle = document.querySelector('#theme-toggle');

// Theme Logic
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

function toggleTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', toggleTheme);

// Lotto Logic
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

// Dinner Recommendation Logic
const dinnerBtn = document.querySelector('#dinner-btn');
const dinnerResult = document.querySelector('#dinner-result');

const dinnerMenus = [
    { name: "Kimchi Stew (김치찌개) 🥘", image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=800&auto=format&fit=crop" },
    { name: "Korean Fried Chicken 🍗", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop" },
    { name: "Bibimbap 🥗", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=800&auto=format&fit=crop" },
    { name: "Pasta 🍝", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop" },
    { name: "Sushi 🍣", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop" },
    { name: "Pizza 🍕", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop" },
    { name: "Tacos 🌮", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop" },
    { name: "Steak 🥩", image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=800&auto=format&fit=crop" },
    { name: "Ramen 🍜", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop" },
    { name: "Bulgogi 🥢", image: "https://images.unsplash.com/photo-1620023640245-565452ef61d8?q=80&w=800&auto=format&fit=crop" },
    { name: "Salad 🥗", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
    { name: "Burgers 🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" },
    { name: "Jajangmyeon 🍜", image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=800&auto=format&fit=crop" },
    { name: "Samgyeopsal 🥓", image: "https://images.unsplash.com/photo-1632761352433-255d654593f6?q=80&w=800&auto=format&fit=crop" },
    { name: "Donkatsu 🍛", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" }
];

function recommendDinner() {
    dinnerResult.style.opacity = 0;
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
        const menu = dinnerMenus[randomIndex];
        dinnerResult.innerHTML = `
            <img src="${menu.image}" alt="${menu.name}" class="dinner-image">
            <span>${menu.name}</span>
        `;
        dinnerResult.style.opacity = 1;
    }, 200);
}

dinnerBtn.addEventListener('click', recommendDinner);
dinnerResult.style.transition = 'opacity 0.2s ease';
