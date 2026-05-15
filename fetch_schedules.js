const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARIRANG_SERVICE_KEY = 'bc5c5e21554e02acf8fca28853785a9083861d34d89f191a9aa6741d9e009621';

async function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    if (res.statusCode !== 200) {
                        reject(new Error(`Status ${res.statusCode} from ${url}`));
                        return;
                    }
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
                }
            });
        }).on('error', reject);
    });
}

function parseTimeStr(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.split(':');
    return parseInt(parts[0]) + parseInt(parts[1] || 0) / 60;
}

function parseArirangTime(overview, name) {
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
    if (knownPrograms[name]) return knownPrograms[name];
    const timePatterns = [/(\d{1,2}):(\d{2})\s*~\s*(\d{1,2}):(\d{2})/, /(\d{1,2})\s*(?:to|till|until)\s*(\d{1,2})\s*(?:a\.m\.|p\.m\.|AM|PM)?/i];
    for (let pattern of timePatterns) {
        const match = overview.match(pattern);
        if (match) {
            let sH = parseInt(match[1]), sM = parseInt(match[2] || 0), eH = parseInt(match[3]), eM = parseInt(match[4] || 0);
            if (overview.toLowerCase().includes('p.m.') && sH < 12) sH += 12;
            if (eH < sH) eH += 12;
            return { start: sH + sM/60, end: eH + eM/60 };
        }
    }
    return null;
}

async function getArirang() {
    const url = `https://api.odcloud.kr/api/15062861/v1/uddi:37fd45bd-f919-4b93-b1a1-dfd95b8f2faf?page=1&perPage=50&serviceKey=${ARIRANG_SERVICE_KEY}`;
    try {
        const json = await fetchJSON(url);
        return json.data.map(item => {
            const time = parseArirangTime(item.프로그램개요, item.프로그램명);
            return { name: item.프로그램명, start: time?.start, end: time?.end };
        }).filter(i => i.start !== undefined);
    } catch (e) {
        console.error('Error fetching Arirang:', e.message);
        return [];
    }
}

async function getMBC(channel) {
    const url = `https://control.imbc.com/Schedule/Radio?channel=${channel}`;
    try {
        const json = await fetchJSON(url);
        return json.map(item => {
            const sH = parseInt(item.StartTime.slice(0,2));
            const sM = parseInt(item.StartTime.slice(2,4));
            const eH = parseInt(item.EndTime.slice(0,2));
            const eM = parseInt(item.EndTime.slice(2,4));
            let start = sH + sM/60;
            let end = eH + eM/60;
            if (end < start) end += 24;
            return { name: item.Title, start, end };
        });
    } catch (e) {
        console.error(`Error fetching MBC ${channel}:`, e.message);
        return [];
    }
}

async function getEBS() {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const url = `https://api-bandi.ebs.co.kr/api/get_schedule?channel_id=fm&date=${today}`;
    try {
        const json = await fetchJSON(url);
        if (!json.programs) return [];
        return json.programs.map(item => ({
            name: item.program_nm,
            start: parseTimeStr(item.start_time),
            end: parseTimeStr(item.end_time)
        }));
    } catch (e) {
        console.error(`Error fetching EBS:`, e.message);
        return [];
    }
}

async function getCBS() {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const url = `https://rainbow.cbs.co.kr/Rainbow/Schedule/GetSchedule?channel=musicfm&date=${today}`;
    try {
        const json = await fetchJSON(url);
        if (!json.data || !json.data.schedule) return [];
        return json.data.schedule.map(item => ({
            name: item.program_title,
            start: parseTimeStr(item.start_time),
            end: parseTimeStr(item.end_time)
        }));
    } catch (e) {
        console.error(`Error fetching CBS:`, e.message);
        return [];
    }
}

async function getYTN() {
    const today = new Date().toISOString().slice(0, 10);
    const url = `https://radio.ytn.co.kr/program/schedule_json.php?date=${today}`;
    try {
        const json = await fetchJSON(url);
        if (!json.list) return [];
        const list = json.list;
        return list.map((item, index) => {
            const start = parseTimeStr(item.time);
            let end = 24;
            if (index < list.length - 1) {
                end = parseTimeStr(list[index + 1].time);
            }
            if (end < start) end += 24;
            return { name: item.title, start, end };
        });
    } catch (e) {
        console.error(`Error fetching YTN:`, e.message);
        return [];
    }
}

async function main() {
    console.log('Fetching all schedules...');
    const schedules = {
        arirang: await getArirang(),
        mbcfm4u: await getMBC('mfm'),
        mbcsfm: await getMBC('sfm'),
        ebs: await getEBS(),
        cbs: await getCBS(),
        ytn: await getYTN(),
        sbspower: [], 
        sbslove: [],  
        kbscool: [],  
        kbs1fm: []    
    };
    
    const outputPath = path.join(__dirname, 'radio-schedules.json');
    fs.writeFileSync(outputPath, JSON.stringify(schedules, null, 2));
    console.log(`Successfully saved unified schedules to ${outputPath}`);
}

main().catch(console.error);
