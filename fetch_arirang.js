const https = require('https');
const fs = require('fs');
const path = require('path');

const SERVICE_KEY = 'bc5c5e21554e02acf8fca28853785a9083861d34d89f191a9aa6741d9e009621';
const API_URL = `https://api.odcloud.kr/api/15062861/v1/uddi:37fd45bd-f919-4b93-b1a1-dfd95b8f2faf?page=1&perPage=50&serviceKey=${SERVICE_KEY}`;

function parseTime(overview, name) {
    // Known programs map for fallback or precision
    const knownPrograms = {
        "GOOD MORNING SEOUL": { start: 7, end: 9 },
        "#daily K": { start: 9, end: 11 },
        "Culture Crunch": { start: 11, end: 12 },
        "K-POPPIN'": { start: 12, end: 14 },
        "h[a:rt] attack": { start: 14, end: 16 },
        "THE ARCHIVE": { start: 16, end: 18 },
        "The Kulture Inc.": { start: 18, end: 20 },
        "Radio'n Us": { start: 20, end: 22 },
        "WONDERS OF JEJU": { start: 22, end: 24 }
    };

    // 1. Check known programs first
    if (knownPrograms[name]) return knownPrograms[name];

    // 2. Regex for various time formats
    const timePatterns = [
        /(\d{1,2}):(\d{2})\s*~\s*(\d{1,2}):(\d{2})/, // 16:00 ~ 17:55
        /(\d{1,2})\s*(?:to|till|until)\s*(\d{1,2})\s*(?:a\.m\.|p\.m\.|AM|PM)?/i, // 7 to 9 a.m.
        /(\d{1,2})\s*(?:a\.m\.|p\.m\.|AM|PM)\s*(?:to|till|until)\s*midnight/i, // 10 pm till midnight
    ];

    for (let pattern of timePatterns) {
        const match = overview.match(pattern);
        if (match) {
            let startHour, startMin = 0, endHour, endMin = 0;
            
            if (pattern.source.includes(':')) {
                startHour = parseInt(match[1]);
                startMin = parseInt(match[2]);
                endHour = parseInt(match[3]);
                endMin = parseInt(match[4]);
            } else if (overview.toLowerCase().includes('midnight')) {
                let isPM = overview.toLowerCase().includes('p.m.') || overview.toLowerCase().includes('pm');
                startHour = isPM && parseInt(match[1]) < 12 ? parseInt(match[1]) + 12 : parseInt(match[1]);
                endHour = 24;
            } else {
                let isPM = overview.toLowerCase().includes('p.m.') || overview.toLowerCase().includes('pm');
                startHour = isPM && parseInt(match[1]) < 12 ? parseInt(match[1]) + 12 : parseInt(match[1]);
                endHour = isPM && parseInt(match[2]) < 12 ? parseInt(match[2]) + 12 : parseInt(match[2]);
                if (endHour < startHour) endHour += 12; // Handle 11pm to 1am etc.
            }
            return { start: startHour + startMin/60, end: endHour + endMin/60 };
        }
    }
    return null;
}

function parseDays(overview) {
    const text = overview.toLowerCase();
    if (text.includes('everyday') || text.includes('monday to sunday') || text.includes('daily')) {
        return [0, 1, 2, 3, 4, 5, 6]; // All days
    }
    if (text.includes('weekday')) {
        return [1, 2, 3, 4, 5]; // Mon-Fri
    }
    if (text.includes('weekend')) {
        return [0, 6]; // Sun, Sat
    }
    
    const days = [];
    const dayMap = { 'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6, 'sunday': 0 };
    Object.keys(dayMap).forEach(day => {
        if (text.includes(day)) days.push(dayMap[day]);
    });
    
    return days.length > 0 ? days : [0, 1, 2, 3, 4, 5, 6]; // Default to all if not specified
}

https.get(API_URL, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (!json.data) {
                console.error('No data found in response:', json);
                return;
            }

            const processed = json.data.map(item => {
                const time = parseTime(item.프로그램개요, item.프로그램명);
                const days = parseDays(item.프로그램개요);
                return {
                    name: item.프로그램명,
                    overview: item.프로그램개요,
                    start: time ? time.start : null,
                    end: time ? time.end : null,
                    days: days,
                    genre: item.쟝르
                };
            }).filter(item => item.start !== null);

            // Sort by start time
            processed.sort((a, b) => a.start - b.start);

            const outputPath = path.join(__dirname, 'arirang-schedule.json');
            fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2));
            console.log(`Successfully saved ${processed.length} programs to ${outputPath}`);
        } catch (e) {
            console.error('Failed to parse API response:', e);
        }
    });
}).on('error', (err) => {
    console.error('Error fetching API:', err.message);
});
