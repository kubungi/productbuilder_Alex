// Main JS for Lotto & Radio
const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generateBtn = document.querySelector('#generate-btn');
const themeToggle = document.querySelector('#theme-toggle');
const langToggle = document.querySelector('#lang-toggle');

// Radio Player Variables
const stationGrid = document.querySelector('#station-grid');
const playPauseBtn = document.querySelector('#play-pause-btn');
const volumeSlider = document.querySelector('#volume-slider');
const currentStationDisplay = document.querySelector('#current-station');
const playIcon = playPauseBtn ? playPauseBtn.querySelector('.play-icon') : null;
const pauseIcon = playPauseBtn ? playPauseBtn.querySelector('.pause-icon') : null;

// Unified Schedule Variables
const timelineRuler = document.querySelector('#timeline-ruler');
const scheduleGridContent = document.querySelector('#schedule-grid-content');
const currentTimeLine = document.querySelector('#current-time-line');

const radioStations = [
    { id: 'sbspower', name: { en: "SBS Power FM", ko: "SBS 파워FM" }, type: 'sbs', channel: 'powerfm' },
    { id: 'kbscool', name: { en: "KBS Cool FM", ko: "KBS 쿨FM" }, type: 'kbs', channel: '25' },
    { id: 'kbs1fm', name: { en: "KBS Classic FM", ko: "KBS 클래식FM" }, type: 'kbs', channel: '24' },
    { id: 'arirang', name: { en: "Arirang Radio", ko: "아리랑 라디오" }, type: 'arirang', url: "https://amdlive-ch01-ctnd-com.akamaized.net/arirang_3ch/smil:arirang_3ch.smil/playlist.m3u8" },
    { id: 'cbs', name: { en: "CBS Music FM", ko: "CBS 음악FM" }, url: "https://m-aac.cbs.co.kr/cbs939/_definst_/cbs939.stream/playlist.m3u8" },
    { id: 'ebs', name: { en: "EBS FM", ko: "EBS FM" }, url: "https://ebsonair.ebs.co.kr/fmradiofamilypc/familypc1m/playlist.m3u8" },
    { id: 'ytn', name: { en: "YTN Radio", ko: "YTN 라디오" }, url: "https://radiolive.ytn.co.kr/radio/_definst_/20211118_fmlive/playlist.m3u8" }
];

let hls = null;
let audio = new Audio();
let isPlaying = false;
let activeStationId = null;
let metadataInterval = null;

// Translations
const translations = {
    en: {
        page_title: "Korean Internet Radio Streaming Service, Lotto Number Generator & Dinner Recommender",
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
        last_updated: "Last updated: May 15, 2026",
        radio_heading: "Korean Internet Radio 📻",
        now_playing_label: "Now Playing:",
        select_station: "Select a station",
        description: "Generate random lotto numbers and get daily dinner recommendations. A fun and useful tool for your daily life.",
        keywords: "lotto, lotto generator, dinner recommendation, what to eat, random numbers",
        "og:title": "Lotto Number Generator & Dinner Recommender",
        "og:description": "Generate random lotto numbers and get daily dinner recommendations. A fun and useful tool for your daily life.",
        "twitter:title": "Lotto Number Generator & Dinner Recommender",
        "twitter:description": "Generate random lotto numbers and get daily dinner recommendations. A fun and useful tool for your daily life.",
        unified_schedule_heading: "Unified Radio Schedule 📻",
        unified_schedule_desc: "Click on any program to start listening live!",
        today_schedule: "Today's Schedule",
        loading_schedule: "Loading schedule...",
        error_schedule: "Failed to load schedule."
    },
    ko: {
        page_title: "한국 인터넷 라디오, 로또 번호 생성기 & 오늘 뭐 먹지",
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
        last_updated: "최근 업데이트: 2026년 5월 15일",
        radio_heading: "한국 인터넷 라디오 📻",
        now_playing_label: "현재 방송:",
        select_station: "방송국을 선택해주세요",
        description: "랜덤 로또 번호 생성과 매일 저녁 메뉴 추천을 한 번에! 일상에 재미와 유용함을 더하는 도구입니다.",
        keywords: "로또, 로또 번호 생성기, 오늘 뭐 먹지, 메뉴 추천, 랜덤 번호",
        "og:title": "로또 번호 생성기 & 오늘 뭐 먹지",
        "og:description": "랜덤 로또 번호 생성과 매일 저녁 메뉴 추천을 한 번에! 일상에 재미와 유용함을 더하는 도구입니다.",
        "twitter:title": "로또 번호 생성기 & 오늘 뭐 먹지",
        "twitter:description": "랜덤 로또 번호 생성과 매일 저녁 메뉴 추천을 한 번에! 일상에 재미와 유용함을 더하는 도구입니다.",
        unified_schedule_heading: "통합 라디오 편성표 📻",
        unified_schedule_desc: "편성표를 클릭하면 해당 방송이 즉시 재생됩니다!",
        today_schedule: "오늘의 편성표",
        loading_schedule: "편성표를 불러오는 중...",
        error_schedule: "편성표를 불러오지 못했습니다."
    }
};

// Language Logic
let currentLang = localStorage.getItem('lang') || 'ko';

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

    // Update Radio Grid
    if (stationGrid) {
        initStationGrid();
        if (activeStationId) {
            const station = radioStations.find(s => s.id === activeStationId);
            if (station) {
                fetchNowPlaying(station);
            }
        }
    }

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
    if (!lottoNumbersContainer) return;
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

if (generateBtn) {
    generateBtn.addEventListener('click', handleGenerate);
}

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
    { name: { en: "Bulgogi 🥢", ko: "불고기 🥢" }, image: "https://images.unsplash.com/photo-1616031037011-087000171abe?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Salad 🥗", ko: "샐러드 🥗" }, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Burgers 🍔", ko: "햄버거 🍔" }, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Jajangmyeon 🍜", ko: "짜장면 🍜" }, image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Samgyeopsal 🥓", ko: "삼겹살 🥓" }, image: "https://images.unsplash.com/photo-1632761352433-255d654593f6?q=80&w=800&auto=format&fit=crop" },
    { name: { en: "Donkatsu 🍛", ko: "돈까스 🍛" }, image: "https://images.unsplash.com/photo-1596450514735-3164478479e0?q=80&w=800&auto=format&fit=crop" }
];

function recommendDinner() {
    if (!dinnerResult) return;
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

if (dinnerBtn) {
    dinnerBtn.addEventListener('click', recommendDinner);
}
if (dinnerResult) {
    dinnerResult.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// Form Handling
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('#submit-btn');
        submitBtn.disabled = true;
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

// Radio Player Logic
function initStationGrid() {
    if (!stationGrid) return;
    stationGrid.innerHTML = '';
    radioStations.forEach(station => {
        const btn = document.createElement('button');
        btn.classList.add('station-btn');
        btn.dataset.id = station.id;
        btn.textContent = station.name[currentLang];
        btn.addEventListener('click', () => playStation(station));
        if (activeStationId === station.id) {
            btn.classList.add('active');
        }
        stationGrid.appendChild(btn);
    });
}

async function fetchArirangSchedule() {
    try {
        const response = await fetch('./arirang-schedule.json');
        return await response.json();
    } catch (err) {
        return null;
    }
}

async function fetchNowPlaying(station) {
    let programTitle = "";
    try {
        // Try static schedule first for certain stations or as fallback
        const staticData = await fetchStaticSchedules();
        if (staticData[station.id]) {
            const now = new Date();
            const day = now.getDay();
            const hours = now.getHours() + now.getMinutes() / 60;
            
            let dailySchedule = [];
            const sched = staticData[station.id];
            if (sched.default) dailySchedule = sched.default;
            else if (day === 0 && sched.sunday) dailySchedule = sched.sunday;
            else if (day === 6 && sched.saturday) dailySchedule = sched.saturday;
            else if (day >= 1 && day <= 5 && sched.weekdays) dailySchedule = sched.weekdays;
            else if (sched.weekends && (day === 0 || day === 6)) dailySchedule = sched.weekends;

            const current = dailySchedule.find(prog => hours >= prog.start && hours < prog.end);
            if (current) programTitle = current.name;
        }

        // If no static program found or we want live API data, try APIs
        if (!programTitle) {
            if (station.type === 'sbs') {
                const response = await fetch(`https://gorealraapi.sbs.co.kr/v1/program/nowplaying?channel=${station.channel}`);
                const data = await response.json();
                programTitle = data.data && data.data.title ? data.data.title : "";
            } else if (station.type === 'kbs') {
                const response = await fetch(`https://api.kbs.co.kr/v1/radio/nowplaying?channel_code=${station.channel}`);
                const data = await response.json();
                programTitle = data.program_title || (data.data && data.program_title) || "";
            } else if (station.type === 'arirang') {
                const schedule = await fetchArirangSchedule();
                if (schedule) {
                    const now = new Date();
                    const today = now.getDay();
                    const hours = now.getHours() + now.getMinutes() / 60;
                    const current = schedule.find(prog => prog.days.includes(today) && hours >= prog.start && hours < prog.end);
                    programTitle = current ? current.name : "";
                }
            }
        }

        if (currentStationDisplay) {
            currentStationDisplay.textContent = programTitle 
                ? `${station.name[currentLang]} - ${programTitle}`
                : station.name[currentLang];
        }
    } catch (err) {
        if (currentStationDisplay) {
            currentStationDisplay.textContent = station.name[currentLang];
        }
    }
}

async function playStation(station) {
    if (activeStationId === station.id && isPlaying) {
        pauseAudio();
        return;
    }

    activeStationId = station.id;
    if (currentStationDisplay) {
        currentStationDisplay.textContent = station.name[currentLang];
        currentStationDisplay.removeAttribute('data-i18n');
    }
    
    fetchNowPlaying(station);
    clearInterval(metadataInterval);
    metadataInterval = setInterval(() => fetchNowPlaying(station), 60000);

    document.querySelectorAll('.station-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.id === station.id);
    });

    if (hls) {
        hls.destroy();
    }

    let streamUrl = station.url;

    // Dynamic Stream URL fetching
    try {
        if (station.type === 'sbs') {
            const res = await fetch(`https://apis.sbs.co.kr/play-api/1.0/livestream/powerpc/${station.channel}?protocol=hls&ssl=Y`);
            streamUrl = await res.text();
        } else if (station.type === 'kbs') {
            const res = await fetch(`https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/${station.channel}`);
            const data = await res.json();
            streamUrl = data.channel_item[0].service_url;
        }
    } catch (err) {
        console.error('Failed to fetch stream URL:', err);
    }

    if (!streamUrl) {
        console.error('No stream URL available');
        return;
    }

    if (Hls.isSupported() && streamUrl.includes('.m3u8')) {
        hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(audio);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            playAudio();
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
                switch(data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        hls.recoverMediaError();
                        break;
                    default:
                        hls.destroy();
                        break;
                }
            }
        });
    } else {
        audio.src = streamUrl;
        playAudio();
    }

    if (playPauseBtn) playPauseBtn.disabled = false;
}

function playAudio() {
    audio.play().then(() => {
        isPlaying = true;
        updatePlayerUI();
    }).catch(err => {
        console.error('Playback error:', err);
    });
}

function pauseAudio() {
    audio.pause();
    isPlaying = false;
    updatePlayerUI();
}

function updatePlayerUI() {
    if (!playIcon || !pauseIcon) return;
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            if (activeStationId) {
                playAudio();
            }
        }
    });
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
}

// Unified Schedule Logic
let scheduleDataCache = null;
let staticSchedulesCache = null;

async function fetchStaticSchedules() {
    if (staticSchedulesCache) return staticSchedulesCache;
    try {
        const response = await fetch('./static-schedules.json');
        if (!response.ok) throw new Error('Static schedule not found');
        staticSchedulesCache = await response.json();
        return staticSchedulesCache;
    } catch (err) {
        console.error('Failed to fetch static schedules:', err);
        return {};
    }
}

async function fetchAllSchedules() {
    if (scheduleDataCache) return scheduleDataCache;
    try {
        const [dynamicRes, staticData] = await Promise.all([
            fetch('./radio-schedules.json').then(res => res.ok ? res.json() : {}),
            fetchStaticSchedules()
        ]);

        const merged = { ...dynamicRes };
        const now = new Date();
        const day = now.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat

        // Process static schedules based on current day
        for (const [id, schedule] of Object.entries(staticData)) {
            let dailySchedule = [];
            if (schedule.default) {
                dailySchedule = schedule.default;
            } else if (day === 0 && schedule.sunday) {
                dailySchedule = schedule.sunday;
            } else if (day === 6 && schedule.saturday) {
                dailySchedule = schedule.saturday;
            } else if (day >= 1 && day <= 5 && schedule.weekdays) {
                dailySchedule = schedule.weekdays;
            } else if (schedule.weekends && (day === 0 || day === 6)) {
                dailySchedule = schedule.weekends;
            }
            
            // Prefer static schedule if available or if dynamic is empty
            if (dailySchedule.length > 0) {
                merged[id] = dailySchedule;
            }
        }

        scheduleDataCache = merged;
        return scheduleDataCache;
    } catch (err) {
        console.error('Failed to fetch schedules:', err);
        return null;
    }
}

function initTimeline() {
    if (!timelineRuler) return;
    timelineRuler.innerHTML = '';
    for (let i = 0; i < 24; i++) {
        const marker = document.createElement('div');
        marker.classList.add('hour-marker');
        marker.textContent = `${i.toString().padStart(2, '0')}:00`;
        timelineRuler.appendChild(marker);
    }
}

async function renderUnifiedSchedule() {
    if (!scheduleGridContent) return;

    initTimeline();
    const allSchedules = await fetchAllSchedules();
    if (!allSchedules) return;

    // Clear content but keep time line marker
    const rows = scheduleGridContent.querySelectorAll('.station-row');
    rows.forEach(r => r.remove());

    // Only render stations that have schedule data
    const stationsWithSchedule = radioStations.filter(s => allSchedules[s.id] && allSchedules[s.id].length > 0);

    stationsWithSchedule.forEach(station => {
        const row = document.createElement('div');
        row.classList.add('station-row');

        const label = document.createElement('div');
        label.classList.add('station-label');
        label.textContent = station.name[currentLang];
        row.appendChild(label);

        const programsContainer = document.createElement('div');
        programsContainer.classList.add('programs-container');

        const programs = allSchedules[station.id];
        programs.forEach(prog => {
            const block = document.createElement('div');
            block.classList.add('program-block');

            // Handle programs that cross midnight if needed (though API usually splits them)
            const startX = prog.start * 60; 
            const width = (prog.end - prog.start) * 60;

            block.style.left = `${startX}px`;
            block.style.width = `${width}px`;
            block.innerHTML = `
                <span class="program-name">${prog.name}</span>
                <span class="program-time">${formatTime(prog.start)} - ${formatTime(prog.end)}</span>
            `;

            block.addEventListener('click', () => playStation(station));
            programsContainer.appendChild(block);
        });

        row.appendChild(programsContainer);
        scheduleGridContent.appendChild(row);
    });

    updateCurrentTimeIndicator(true);
}

function formatTime(decimalHour) {
    const h = Math.floor(decimalHour) % 24;
    const m = Math.round((decimalHour - Math.floor(decimalHour)) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function updateCurrentTimeIndicator(shouldScroll = false) {
    if (!currentTimeLine) return;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const decimalTime = hours + minutes / 60 + seconds / 3600;
    const xPos = decimalTime * 60;
    currentTimeLine.style.left = `${xPos + 120}px`; // Offset by station-label width (120px)

    // Highlight current programs across all rows
    const programs = document.querySelectorAll('.program-block');
    programs.forEach(block => {
        const left = parseFloat(block.style.left);
        const width = parseFloat(block.style.width);
        if (xPos >= left && xPos <= left + width) {
            block.classList.add('active-program');
        } else {
            block.classList.remove('active-program');
        }
    });

    if (shouldScroll) {
        const wrapper = document.querySelector('.schedule-grid-container');
        if (wrapper) {
            const scrollPos = xPos - (wrapper.offsetWidth - 120) / 2;
            wrapper.scrollLeft = scrollPos;
        }
    }
}
// Initialize Everything
setTheme(getPreferredTheme());
updateLanguage();
handleGenerate();
initStationGrid();
renderUnifiedSchedule();

if (volumeSlider) {
    audio.volume = volumeSlider.value;
}

const refreshBtn = document.querySelector('#refresh-schedule');
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        scheduleDataCache = null; // Clear cache
        renderUnifiedSchedule();
    });
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

setInterval(updateCurrentTimeIndicator, 60000);
