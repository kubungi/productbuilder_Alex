const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generateBtn = document.querySelector('#generate-btn');
const themeToggle = document.querySelector('#theme-toggle');
const langToggle = document.querySelector('#lang-toggle');

// Translations
const translations = {
    en: {
        page_title: "Lotto Number Generator & Dinner Recommender",
        main_heading: "Lotto Number Generator",
        generate_btn: "Generate Numbers",
        lotto_logic: "Algorithm: 6 unique random integers (1-45).",
        dinner_heading: "What's for Dinner? 🍕",
        dinner_default: "Click to get a recommendation!",
        recommend_btn: "Recommend Dinner",
        faq_heading: "Frequently Asked Questions",
        faq_q1: "How does the generator work?",
        faq_a1: "It uses JavaScript's built-in random function to select 6 non-repeating numbers.",
        faq_q2: "Are these numbers guaranteed to win?",
        faq_a2: "No, these are purely random numbers for entertainment purposes. Play responsibly.",
        contact_heading: "Partnership Inquiry 🤝",
        label_name: "Name",
        label_email: "Email",
        label_message: "Message",
        placeholder_name: "Your Name",
        placeholder_email: "your@email.com",
        placeholder_message: "How can we work together?",
        submit_btn: "Send Inquiry",
        status_sending: "Sending...",
        status_success: "Success! Your inquiry has been sent. 🚀",
        status_error: "Oops! There was a problem. Please try again.",
        status_conn_error: "Oops! There was a problem connecting to the server.",
        last_updated: "Last updated: May 9, 2026",
        // SEO Translations
        description: "Generate random lotto numbers and get daily dinner recommendations. A fun and useful tool for your daily life.",
        keywords: "lotto, lotto generator, dinner recommendation, what to eat, random numbers",
        "og:title": "Lotto Number Generator & Dinner Recommender",
        "og:description": "Generate random lotto numbers and get daily dinner recommendations. A fun and useful tool for your daily life.",
        "twitter:title": "Lotto Number Generator & Dinner Recommender",
        "twitter:description": "Generate random lotto numbers and get daily dinner recommendations. A fun and useful tool for your daily life."
    },
    ko: {
        page_title: "로또 번호 생성기 & 오늘 뭐 먹지",
        main_heading: "로또 번호 생성기",
        generate_btn: "번호 생성하기",
        lotto_logic: "알고리즘: 1~45 사이의 6개 중복 없는 난수 생성.",
        dinner_heading: "오늘 뭐 먹지? 🍕",
        dinner_default: "추천 버튼을 눌러보세요!",
        recommend_btn: "메뉴 추천받기",
        faq_heading: "자주 묻는 질문 (FAQ)",
        faq_q1: "번호는 어떤 방식으로 생성되나요?",
        faq_a1: "자바스크립트의 난수 생성 함수를 사용하여 중복되지 않는 6개의 번호를 무작위로 추출합니다.",
        faq_q2: "이 번호로 당첨을 보장할 수 있나요?",
        faq_a2: "아니요, 이 도구는 재미를 위한 랜덤 번호 제공기입니다. 로또 구매는 본인의 책임하에 즐겁게 참여하세요.",
        contact_heading: "제휴 문의 🤝",
        label_name: "이름",
        label_email: "이메일",
        label_message: "메시지",
        placeholder_name: "성함을 입력해주세요",
        placeholder_email: "your@email.com",
        placeholder_message: "어떤 협업을 원하시나요?",
        submit_btn: "문의 보내기",
        status_sending: "보내는 중...",
        status_success: "성공! 문의가 전송되었습니다. 🚀",
        status_error: "오류가 발생했습니다. 다시 시도해주세요.",
        status_conn_error: "서버 연결에 문제가 발생했습니다.",
        last_updated: "최근 업데이트: 2026년 5월 9일",
        // SEO Translations
        description: "랜덤 로또 번호 생성과 매일 저녁 메뉴 추천을 한 번에! 일상에 재미와 유용함을 더하는 도구입니다.",
        keywords: "로또, 로또 번호 생성기, 오늘 뭐 먹지, 메뉴 추천, 랜덤 번호",
        "og:title": "로또 번호 생성기 & 오늘 뭐 먹지",
        "og:description": "랜덤 로또 번호 생성과 매일 저녁 메뉴 추천을 한 번에! 일상에 재미와 유용함을 더하는 도구입니다.",
        "twitter:title": "로또 번호 생성기 & 오늘 뭐 먹지",
        "twitter:description": "랜덤 로또 번호 생성과 매일 저녁 메뉴 추천을 한 번에! 일상에 재미와 유용함을 더하는 도구입니다."
    }
};

// Language Logic
let currentLang = localStorage.getItem('lang') || 'en';

const updateLanguage = () => {
    // Update Text Content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // Update Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });

    // Update Meta Tags
    document.querySelectorAll('[data-i18n-meta]').forEach(el => {
        const key = el.getAttribute('data-i18n-meta');
        const content = translations[currentLang][key];
        if (el.tagName === 'META' && content) {
            el.setAttribute('content', content);
        }
    });

    // Special case for Title
    document.title = translations[currentLang].page_title;

    langToggle.textContent = currentLang === 'en' ? 'KO' : 'EN';
    document.documentElement.lang = currentLang;
    localStorage.setItem('lang', currentLang);
};

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ko' : 'en';
    updateLanguage();
});

// Theme Logic
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Initialize
setTheme(getPreferredTheme());
updateLanguage();

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

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
    numbers.forEach((number, index) => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('lotto-number');
        numberDiv.textContent = number;
        numberDiv.style.animationDelay = `${index * 0.1}s`;
        lottoNumbersContainer.appendChild(numberDiv);
    });
}

function handleGenerate() {
    const numbers = generateNumbers();
    displayNumbers(numbers);
}

generateBtn.addEventListener('click', handleGenerate);
handleGenerate();

// Dinner Recommendation Logic
const dinnerBtn = document.querySelector('#dinner-btn');
const dinnerResult = document.querySelector('#dinner-result');

const dinnerMenus = [
    { name: { en: "Kimchi Stew 🥘", ko: "김치찌개 🥘" }, image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Korean Fried Chicken 🍗", ko: "치킨 🍗" }, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Bibimbap 🥗", ko: "비빔밥 🥗" }, image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Pasta 🍝", ko: "파스타 🍝" }, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Sushi 🍣", ko: "초밥 🍣" }, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Pizza 🍕", ko: "피자 🍕" }, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Tacos 🌮", ko: "타코 🌮" }, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Steak 🥩", ko: "스테이크 🥩" }, image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Ramen 🍜", ko: "라멘 🍜" }, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Bulgogi 🥢", ko: "불고기 🥢" }, image: "https://images.unsplash.com/photo-1620023640245-565452ef61d8?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Salad 🥗", ko: "샐러드 🥗" }, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Burgers 🍔", ko: "햄버거 🍔" }, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Jajangmyeon 🍜", ko: "짜장면 🍜" }, image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Samgyeopsal 🥓", ko: "삼겹살 🥓" }, image: "https://images.unsplash.com/photo-1632761352433-255d654593f6?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Donkatsu 🍛", ko: "돈까스 🍛" }, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" }
];

function recommendDinner() {
    dinnerResult.style.opacity = 0;
    dinnerResult.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
        const menu = dinnerMenus[randomIndex];
        const menuName = menu.name[currentLang];
        dinnerResult.innerHTML = `
            <img src="${menu.image}" alt="${menuName}" class="dinner-image">
            <span>${menuName}</span>
        `;
        dinnerResult.style.opacity = 1;
        dinnerResult.style.transform = 'translateY(0)';
    }, 300);
}

dinnerBtn.addEventListener('click', recommendDinner);
dinnerResult.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// Form Handling
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('#submit-btn');
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = translations[currentLang].status_sending;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = translations[currentLang].status_success;
                formStatus.className = 'success';
                contactForm.reset();
            } else {
                formStatus.textContent = translations[currentLang].status_error;
                formStatus.className = 'error';
            }
        } catch (error) {
            formStatus.textContent = translations[currentLang].status_conn_error;
            formStatus.className = 'error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = translations[currentLang].submit_btn;
        }
    });
}
