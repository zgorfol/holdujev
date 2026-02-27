import { useState } from 'react';
import './Wensorrend.css';

const HEXAGRAMS = {
    "乾": [1, 1, 1, 1, 1, 1], "坤": [0, 0, 0, 0, 0, 0], "屯": [1, 0, 0, 0, 1, 0],
    "蒙": [0, 1, 0, 0, 0, 1], "需": [1, 1, 1, 0, 1, 0], "訟": [0, 1, 0, 1, 1, 1],
    "師": [0, 1, 0, 0, 0, 0], "比": [0, 0, 0, 0, 1, 0], "小畜": [1, 1, 1, 0, 1, 1],
    "履": [1, 1, 0, 1, 1, 1], "泰": [1, 1, 1, 0, 0, 0], "否": [0, 0, 0, 1, 1, 1],
    "同人": [1, 0, 1, 1, 1, 1], "大有": [1, 1, 1, 1, 0, 1], "謙": [0, 0, 1, 0, 0, 0],
    "豫": [0, 0, 0, 1, 0, 0], "隨": [1, 0, 0, 1, 1, 0], "蠱": [0, 1, 1, 0, 0, 1],
    "臨": [1, 1, 0, 0, 0, 0], "觀": [0, 0, 0, 0, 1, 1], "噬嗑": [1, 0, 0, 1, 0, 1],
    "賁": [1, 0, 1, 0, 0, 1], "剝": [0, 0, 0, 0, 0, 1], "復": [1, 0, 0, 0, 0, 0],
    "无妄": [1, 0, 0, 1, 1, 1], "大畜": [1, 1, 1, 0, 0, 1], "頤": [1, 0, 0, 0, 0, 1],
    "大過": [0, 1, 1, 1, 1, 0], "坎": [0, 1, 0, 0, 1, 0], "離": [1, 0, 1, 1, 0, 1],
    "咸": [0, 0, 1, 1, 1, 0], "恒": [0, 1, 1, 1, 0, 0], "遯": [0, 0, 1, 1, 1, 1],
    "大壯": [1, 1, 1, 1, 0, 0], "晉": [0, 0, 0, 1, 0, 1], "明夷": [1, 0, 1, 0, 0, 0],
    "家人": [1, 0, 1, 0, 1, 1], "睽": [1, 1, 0, 1, 0, 1], "蹇": [0, 0, 1, 0, 1, 0],
    "解": [0, 1, 0, 1, 0, 0], "損": [1, 1, 0, 0, 0, 1], "益": [1, 0, 0, 0, 1, 1],
    "夬": [1, 1, 1, 1, 1, 0], "姤": [0, 1, 1, 1, 1, 1], "萃": [0, 0, 0, 1, 1, 0],
    "升": [0, 1, 1, 0, 0, 0], "困": [0, 1, 0, 1, 1, 0], "井": [0, 1, 1, 0, 1, 0],
    "革": [1, 0, 1, 1, 1, 0], "鼎": [0, 1, 1, 1, 0, 1], "震": [1, 0, 0, 1, 0, 0],
    "艮": [0, 0, 1, 0, 0, 1], "漸": [0, 0, 1, 0, 1, 1], "歸妹": [1, 1, 0, 1, 0, 0],
    "豐": [1, 0, 1, 1, 0, 0], "旅": [0, 0, 1, 1, 0, 1], "巽": [0, 1, 1, 0, 1, 1],
    "兌": [1, 1, 0, 1, 1, 0], "渙": [0, 1, 0, 0, 1, 1], "節": [1, 1, 0, 0, 1, 0],
    "中孚": [1, 1, 0, 0, 1, 1], "小過": [0, 0, 1, 1, 0, 0], "既濟": [1, 0, 1, 0, 1, 0],
    "未濟": [0, 1, 0, 1, 0, 1],
};

const HU_NAMES = {
    "乾": "Ég / Alkotó", "坤": "Föld / Befogadó", "屯": "Nehézség / Csírázás",
    "蒙": "Ifjúi balgaság", "需": "Várakozás", "訟": "Viszály",
    "師": "Hadsereg", "比": "Szövetség", "小畜": "Kis visszatartó",  // A "小畜" jelentése lehet "Kis visszatartó" vagy "Kis birtok", de a hexagram jelentése inkább a visszatartó erőre utal, ezért ezt választottam.
    "履": "Lépés / Viselkedés", "泰": "Béke", "否": "Pangás",
    "同人": "Embertársak", "大有": "Nagy birtok", "謙": "Alázat",
    "豫": "Lelkesedés", "隨": "Követés", "蠱": "Romlás",
    "臨": "Közeledés", "觀": "Szemlélődés", "噬嗑": "Harapás",
    "賁": "Díszítés", "剝": "Szétesés", "復": "Visszatérés",
    "无妄": "Ártatlanság", "大畜": "Nagy visszatartó", "頤": "Táplálás",
    "大過": "Nagy túllépés", "坎": "Örvény / Víz", "離": "Tűz / Ragaszkodás",
    "咸": "Érzékiség", "恒": "Tartósság", "遯": "Visszavonulás",
    "大壯": "Nagy erő", "晉": "Előrehaladás", "明夷": "A fény megsebzése",
    "家人": "Háznép", "睽": "Ellentét", "蹇": "Akadály",
    "解": "Felszabadulás", "損": "Csökkentés", "益": "Növekedés",
    "夬": "Elszántság", "姤": "Találkozás", "萃": "Gyűjtés",
    "升": "Emelkedés", "困": "Kimerültség", "井": "Kút",
    "革": "Forradalom", "鼎": "Üst / Átalakítás", "震": "Mennydörgés",
    "艮": "Hegy / Megállapodás", "漸": "Lassú fejlődés", "歸妹": "Menyasszony",
    "豐": "Bőség", "旅": "Vándor", "巽": "Szél / Szelídség",
    "兌": "Tó / Öröm", "渙": "Szétoszlás", "節": "Mértékletesség",
    "中孚": "Belső igazság", "小過": "Kis túllépés", "既濟": "Befejezés",
    "未濟": "Befejezetlenség",
};

// Diagonális hexagramok
// Kék: #1 乾, #61 中孚, #30 離, #27 頤, #28 大過, #29 坎, #62 小過, #2 坤
const DIAGONAL_BLUE = new Set(["乾", "中孚", "離", "頤", "大過", "坎", "小過", "坤"]);
// Piros: #11 泰, #54 歸妹, #63 既濟, #17 隨, #18 蠱, #64 未濟, #53 漸, #12 否
const DIAGONAL_RED = new Set(["泰", "歸妹", "既濟", "隨", "蠱", "未濟", "漸", "否"]);

const UPPER_PAIRS = [
    { a: "乾", b: "坤", type: "自對", note: "乾坤天地也，陰陽之純", huNote: "Ég és Föld: a yang és yin tiszta megtestesülése. A Felső Kánon kezdete és alapja." },
    { a: "屯", b: "蒙", type: "反對", note: "震坎艮以三男代母", huNote: "Csírázás és Ifjúi balgaság: a három fiú (Zhen, Kan, Gen) helyettesíti az anyát." },
    { a: "需", b: "訟", type: "反對", note: "乾遇坎而為需訟", huNote: "Várakozás és Viszály: az Ég (Qian) találkozik a Vízzel (Kan)." },
    { a: "師", b: "比", type: "反對", note: "坤遇坎而為師比", huNote: "Hadsereg és Szövetség: a Föld (Kun) találkozik a Vízzel (Kan)." },
    { a: "小畜", b: "履", type: "反對", note: "乾與巽會，長少二女代兄從父", huNote: "Kis visszatartó és Lépés: az Ég találkozik a Széllel. Az idősebb és legfiatalabb lány követi az apát." },
    { a: "泰", b: "否", type: "反對", note: "乾坤自相遇成泰否", huNote: "Béke és Pangás: az Ég és Föld önmagukkal találkoznak. Tíz változás után béke, de egy lépéssel ismét pangás." },
    { a: "同人", b: "大有", type: "反對", note: "乾自與離相遇，離始入用", huNote: "Embertársak és Nagy birtok: az Ég találkozik a Tűzzel (Li). A Tűz itt lép be először." },
    { a: "謙", b: "豫", type: "反對", note: "坤又自與艮震相遇", huNote: "Alázat és Lelkesedés: a Föld találkozik a Heggyel és a Mennydörgéssel." },
    { a: "隨", b: "蠱", type: "反對", note: "震兌巽艮會，男女長少", huNote: "Követés és Romlás: Mennydörgés, Tó, Szél és Hegy találkozása — fiúk és lányok, idősek és fiatalok." },
    { a: "臨", b: "觀", type: "反對", note: "坤與兌巽相遇", huNote: "Közeledés és Szemlélődés: a Föld találkozik a Tóval és a Széllel." },
    { a: "噬嗑", b: "賁", type: "反對", note: "震離艮相遇而成", huNote: "Harapás és Díszítés: a Mennydörgés, Tűz és Hegy találkozásából keletkezik." },
    { a: "剝", b: "復", type: "反對", note: "坤遇震艮而成剝復", huNote: "Szétesés és Visszatérés: a Föld találkozik a Mennydörgéssel és a Heggyel." },
    { a: "无妄", b: "大畜", type: "反對", note: "乾遇震艮", huNote: "Ártatlanság és Nagy visszatartó: az Ég találkozik a Mennydörgéssel és a Heggyel." },
    { a: "頤", b: "大過", type: "自對", note: "震艮巽兌男女長少自合", huNote: "Táplálás és Nagy túllépés: a négy trigram (Zhen, Gen, Xun, Dui) önmagukkal találkoznak." },
    { a: "坎", b: "離", type: "自對", note: "頤大過而後坎離終焉", huNote: "Víz és Tűz: a Felső Kánon lezárása. A Nap és Hold, a yin és yang közepének jelei." },
];

const LOWER_PAIRS = [
    { a: "咸", b: "恒", type: "反對", note: "咸恒夫婦之道，下經之主", huNote: "Érzékiség és Tartósság: a férj és feleség útja. Az Alsó Kánon vezető hexagrampárja." },
    { a: "遯", b: "大壯", type: "反對", note: "艮震遇乾，父臨二男", huNote: "Visszavonulás és Nagy erő: a Hegy és Mennydörgés találkozik az Éggel. Az apa felügyeli a két fiút." },
    { a: "晉", b: "明夷", type: "反對", note: "惟晉明夷由離坤而成", huNote: "Előrehaladás és A fény megsebzése: a Tűz (Li) és Föld (Kun) alkotja. Az anya felügyeli a középső lányt." },
    { a: "家人", b: "睽", type: "反對", note: "巽兌遇離而為家人睽", huNote: "Háznép és Ellentét: a Szél és Tó találkozik a Tűzzel." },
    { a: "蹇", b: "解", type: "反對", note: "艮震遇坎而為蹇解", huNote: "Akadály és Felszabadulás: a Hegy és Mennydörgés találkozik a Vízzel." },
    { a: "損", b: "益", type: "反對", note: "咸十變之盡為損，恒十卦變之盡為益", huNote: "Csökkentés és Növekedés: a 咸 tíz változásának végpontja a Csökkentés, a 恒-é a Növekedés — mint a Felső Kánon Béke–Pangás párja." },
    { a: "夬", b: "姤", type: "反對", note: "兌巽遇乾，父臨二女", huNote: "Elszántság és Találkozás: a Tó és Szél találkozik az Éggel. Az apa felügyeli a két lányt. Az Ég (Qian) itt fejezi be szerepét." },
    { a: "萃", b: "升", type: "反對", note: "兌巽遇坤，母臨二女", huNote: "Gyűjtés és Emelkedés: a Tó és Szél találkozik a Földdel. Az anya felügyeli a két lányt. A Föld (Kun) itt fejezi be szerepét." },
    { a: "困", b: "井", type: "反對", note: "兌巽遇坎而成困井", huNote: "Kimerültség és Kút: a Tó és Szél találkozik a Vízzel." },
    { a: "革", b: "鼎", type: "反對", note: "兌巽遇離而成鼎革", huNote: "Forradalom és Üst: a Tó és Szél találkozik a Tűzzel." },
    { a: "震", b: "艮", type: "自對", note: "震艮純卦次之", huNote: "Mennydörgés és Hegy: a két tiszta jel következik. Mindkettő megfordítva önmagával azonos." },
    { a: "漸", b: "歸妹", type: "反對", note: "艮巽兌震又自相遇", huNote: "Lassú fejlődés és Menyasszony: a Hegy, Szél, Tó és Mennydörgés ismét egymással találkoznak." },
    { a: "豐", b: "旅", type: "反對", note: "震艮遇離成豐旅", huNote: "Bőség és Vándor: a Mennydörgés és Hegy találkozik a Tűzzel." },
    { a: "巽", b: "兌", type: "自對", note: "巽兌純卦次之", huNote: "Szél és Tó: a két tiszta jel következik. Mindkettő megfordítva önmagával azonos." },
    { a: "渙", b: "節", type: "反對", note: "巽兌又自出而遇坎", huNote: "Szétoszlás és Mértékletesség: a Szél és Tó ismét megjelenik, és találkozik a Vízzel." },
    { a: "中孚", b: "小過", type: "自對", note: "渙節後兌巽艮震自相遇", huNote: "Belső igazság és Kis túllépés: a Tó, Szél, Hegy és Mennydörgés önmagukkal találkoznak. A 咸恒 harmadik változása." },
    { a: "既濟", b: "未濟", type: "自對", note: "離坎重為既未濟，下經之終", huNote: "Befejezés és Befejezetlenség: a Tűz és Víz újra megjelenik. Az Alsó Kánon lezárása — a tűz és víz találkozásának és szétválásának jelei." },
];

function HexagramLines({ name, lines: propLines, size = 32 }) {
    const lines = propLines || HEXAGRAMS[name] || [0, 0, 0, 0, 0, 0];
    const lineH = size / 10;
    const gap = size / 8;
    const totalH = 6 * lineH + 5 * gap;
    const w = size * 0.9;
    return (
        <svg width={w} height={totalH} viewBox={`0 0 ${w} ${totalH}`}>
            {[...lines].reverse().map((yang, i) => {
                const y = i * (lineH + gap);
                if (yang) {
                    return <rect key={i} x={0} y={y} width={w} height={lineH} fill="currentColor" />;
                } else {
                    const seg = (w - w * 0.18) / 2;
                    return (
                        <g key={i}>
                            <rect x={0} y={y} width={seg} height={lineH} fill="currentColor" />
                            <rect x={w - seg} y={y} width={seg} height={lineH} fill="currentColor" />
                        </g>
                    );
                }
            })}
        </svg>
    );
}

// Palindróm-e a hexagram: megfordítva önmaga marad-e?
function isPalindrome(name) {
    const l = HEXAGRAMS[name] || [];
    return l[0] === l[5] && l[1] === l[4] && l[2] === l[3];
}

// Decimális érték: alulról felfelé, 1. vonal = LSB
function linesToDecimal(lines) {
    return lines.reduce((acc, bit, i) => acc + bit * (1 << i), 0);
}
function hexToDecimal(name) {
    return linesToDecimal(HEXAGRAMS[name] || []);
}

// Gray-kód: n XOR (n >> 1)
function toGray(n) {
    return n ^ (n >> 1);
}

// Mag hexagram: alsó trigram = 2.,3.,4. vonal; felső trigram = 3.,4.,5. vonal
function getMagLines(name) {
    const l = HEXAGRAMS[name] || [0, 0, 0, 0, 0, 0];
    return [l[1], l[2], l[3], l[2], l[3], l[4]];
}

// Centrál hexagram: 3. és 4. vonal ismételve (= mag mag-ja)
function getCentralLines(name) {
    const l = HEXAGRAMS[name] || [0, 0, 0, 0, 0, 0];
    return [l[2], l[3], l[2], l[3], l[2], l[3]];
}

// Megkeresi a hexagram nevét a vonalai alapján
function findHexName(targetLines) {
    const entry = Object.entries(HEXAGRAMS).find(([, lines]) =>
        lines.every((l, i) => l === targetLines[i])
    );
    return entry ? entry[0] : null;
}

function HexagramCard({ nameA, nameB, index, isActive, onClick }) {
    const isSelfPair = isPalindrome(nameA) && isPalindrome(nameB);
    return (
        <div onClick={onClick} style={{
            cursor: "pointer",
            border: isActive ? "1px solid #c9a84c" : "1px solid rgba(201,168,76,0.2)",
            borderRadius: "4px",
            padding: "10px 8px",
            background: isActive ? "rgba(201,168,76,0.15)" : "rgba(0,0,0,0.04)",
            transition: "all 0.2s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
        }}>
            <div style={{ fontSize: "9px", color: "#555" }}>{index * 2 - 1}–{index * 2}.</div>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
                {[nameA, nameB].map((name, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <div style={{ color: "#2a1800" }}><HexagramLines name={name} size={26} /></div>
                        <div style={{ fontSize: "12px", color: "#c9a84c", fontFamily: "serif" }}>{name}</div>
                        <div style={{ fontSize: "8px", color: "#666", textAlign: "center", maxWidth: "60px", lineHeight: "1.2" }}>
                            {HU_NAMES[name]?.split(" / ")[0]}
                        </div>
                        {DIAGONAL_BLUE.has(name) && (
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2a7ab8", title: "Kék diagonális" }} />
                        )}
                        {DIAGONAL_RED.has(name) && (
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#b83a3a" }} />
                        )}
                    </div>
                ))}
            </div>
            <div style={{
                fontSize: "8px",
                color: isSelfPair ? "#1a7a8a" : "#777",
                border: `1px solid ${isSelfPair ? "rgba(26,122,138,0.4)" : "rgba(150,150,150,0.3)"}`,
                borderRadius: "2px",
                padding: "1px 5px",
            }}>
                {isSelfPair ? "Nem fordítható" : "Fordítható pár"}
            </div>
        </div>
    );
}

export default function WenWangSequence() {
    const [activeCanon, setActiveCanon] = useState("upper");
    const [activeCard, setActiveCard] = useState(null);
    const [activeBothCard, setActiveBothCard] = useState(null);
    const [showSelfPairSecond, setShowSelfPairSecond] = useState(true);

    const pairs = activeCanon === "upper" ? UPPER_PAIRS : LOWER_PAIRS;
    const activePair = activeCard !== null ? pairs[activeCard] : null;

    const activeBothPair = activeBothCard
        ? (activeBothCard.section === "upper" ? UPPER_PAIRS : LOWER_PAIRS)[activeBothCard.pairIndex]
        : null;

    const monthHexagrams = [
        { month: "十一月", hu: "11. hónap", ganzhi: "子", jieqi: "冬至", huJieqi: "Téli napforduló", hex: "復", yang: 1 },
        { month: "十二月", hu: "12. hónap", ganzhi: "丑", jieqi: "大寒", huJieqi: "Nagy hideg", hex: "臨", yang: 2 },
        { month: "正月", hu: "1. hónap", ganzhi: "寅", jieqi: "雨水", huJieqi: "Esővíz", hex: "泰", yang: 3 },
        { month: "二月", hu: "2. hónap", ganzhi: "卯", jieqi: "春分", huJieqi: "Tavaszi napéjegyenlőség", hex: "大壯", yang: 4 },
        { month: "三月", hu: "3. hónap", ganzhi: "辰", jieqi: "穀雨", huJieqi: "Gabonabeöntő eső", hex: "夬", yang: 5 },
        { month: "四月", hu: "4. hónap", ganzhi: "巳", jieqi: "小滿", huJieqi: "Kis telítettség", hex: "乾", yang: 6 },
        { month: "五月", hu: "5. hónap", ganzhi: "午", jieqi: "夏至", huJieqi: "Nyári napforduló", hex: "姤", yin: 1 },
        { month: "六月", hu: "6. hónap", ganzhi: "未", jieqi: "大暑", huJieqi: "Nagy hőség", hex: "遯", yin: 2 },
        { month: "七月", hu: "7. hónap", ganzhi: "申", jieqi: "處暑", huJieqi: "A hőség vége", hex: "否", yin: 3 },
        { month: "八月", hu: "8. hónap", ganzhi: "酉", jieqi: "秋分", huJieqi: "Őszi napéjegyenlőség", hex: "觀", yin: 4 },
        { month: "九月", hu: "9. hónap", ganzhi: "戌", jieqi: "霜降", huJieqi: "Dér ereszkedése", hex: "剝", yin: 5 },
        { month: "十月", hu: "10. hónap", ganzhi: "亥", jieqi: "小雪", huJieqi: "Kis hó", hex: "坤", yin: 6 },
    ];

    return (
        <div style={{
            minHeight: "100vh",
            background: "#faf8f3",
            color: "#1a1000",
            fontFamily: "Georgia, 'Noto Serif SC', serif",
        }}>
            {/* Header */}
            <div style={{
                borderBottom: "1px solid rgba(201,168,76,0.3)",
                padding: "24px 36px 18px",
                background: "linear-gradient(180deg, rgba(201,168,76,0.12) 0%, transparent 100%)",
            }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                    <div style={{ fontSize: "10px", color: "#666", letterSpacing: "1px", marginBottom: "6px" }}>
                        胡一桂《周易啓蒙翼傳》· 元代 · 約1290年
                        <span style={{ color: "#444", marginLeft: "8px" }}>· Hu Yigui: A Yijing felvilágosítás kiegészítése · Yuan-dinasztia · kb. 1290</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: "normal", color: "#c9a84c", margin: "0 0 2px", letterSpacing: "4px" }}>
                        文王六十四卦次序圖
                    </h1>
                    <div style={{ fontSize: "13px", color: "#888", marginBottom: "10px", letterSpacing: "1px" }}>
                        Wen király 64 hexagramjának sorrend-diagramja
                    </div>
                    <p style={{ fontSize: "11px", color: "#666", margin: 0, maxWidth: "700px", lineHeight: "1.9" }}>
                        文王演易羑里，取伏羲六十四卦，分為上下經二篇。以反對為次，乾坤坎離四純卦居上經，震艮巽兌四純卦居下經。
                        <br />
                        <span style={{ color: "#4a4a4a" }}>Wen király a Yöuli fogságban dolgozta át Fu Xi 64 hexagramját, és két kézikönyvbe rendezte. A fordítható párokat állította egymás mellé; az Ég–Föld–Víz–Tűz tiszta hexagramok a Felső Kánonba, a Mennydörgés–Hegy–Szél–Tó tiszta hexagramok az Alsó Kánonba kerültek.</span>
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 36px" }}>

                {/* Tabs */}
                <div style={{ display: "flex", gap: "0", marginBottom: "26px", borderBottom: "1px solid rgba(201,168,76,0.2)", flexWrap: "wrap" }}>
                    {[
                        { key: "upper", zh: "上經", hu: "Felső Kánon", sub: "乾→離 · 30 hexagram · 15 pár" },
                        { key: "lower", zh: "下經", hu: "Alsó Kánon", sub: "咸→未濟 · 34 hexagram · 17 pár" },
                        { key: "both", zh: "上下經", hu: "Felső és Alsó Kánon", sub: "全64卦 · 32 pár" },
                        { key: "monthly", zh: "十二月卦氣", hu: "12 havi hexagramok", sub: "Wen király kör-diagramja" },
                    ].map(tab => (
                        <button key={tab.key} onClick={() => { setActiveCanon(tab.key); setActiveCard(null); setActiveBothCard(null); }} style={{
                            background: "none", border: "none",
                            borderBottom: activeCanon === tab.key ? "2px solid #c9a84c" : "2px solid transparent",
                            color: activeCanon === tab.key ? "#c9a84c" : "#666",
                            padding: "10px 22px", cursor: "pointer", fontSize: "14px",
                            letterSpacing: "1px", marginBottom: "-1px", transition: "all 0.2s", textAlign: "left",
                        }}>
                            {tab.zh}
                            <span style={{ display: "block", fontSize: "10px", color: activeCanon === tab.key ? "#a07830" : "#555" }}>{tab.hu}</span>
                            <span style={{ display: "block", fontSize: "9px", color: "#3a3a3a" }}>{tab.sub}</span>
                        </button>
                    ))}
                </div>

                {activeCanon === "both" ? (() => {
                    const buildHexList = (pairs, offset) => {
                        const list = [];
                        pairs.forEach((pair, pairIndex) => {
                            const isSelf = isPalindrome(pair.a) && isPalindrome(pair.b);
                            const posA = offset + pairIndex * 2 + 1;
                            const posB = offset + pairIndex * 2 + 2;
                            list.push({ name: pair.a, pairIndex, pair, pos: posA, posB, isSelf, isSecond: false });
                            if (isSelf && showSelfPairSecond) list.push({ name: pair.b, pairIndex, pair, pos: posB, posB, isSelf, isSecond: true });
                        });
                        return list;
                    };
                    const canonRows = [
                        { label: "上經 · Felső Kánon", section: "upper", hexList: buildHexList(UPPER_PAIRS, 0) },
                        { label: "下經 · Alsó Kánon", section: "lower", hexList: buildHexList(LOWER_PAIRS, 30) },
                    ];
                    const renderHexItem = (h, section) => {
                        const isActive = activeBothCard?.section === section && activeBothCard?.name === h.name;
                        return (
                            <div key={h.name + section} onClick={() => setActiveBothCard(isActive ? null : { section, pairIndex: h.pairIndex, name: h.name })}
                                style={{
                                    flexShrink: 0, cursor: "pointer", width: "72px",
                                    border: isActive ? "1px solid #c9a84c" : "1px solid rgba(201,168,76,0.2)",
                                    borderRadius: "4px", padding: "10px 6px",
                                    background: isActive ? "rgba(201,168,76,0.15)" : "rgba(0,0,0,0.04)",
                                    display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                                    transition: "all 0.2s",
                                }}>
                                <div style={{ fontSize: "8px", color: "#888" }}>
                                    {h.isSelf && !h.isSecond && !showSelfPairSecond
                                        ? `${h.pos}–${h.posB}.`
                                        : `${h.pos}.`}
                                </div>
                                <div style={{ color: "#2a1800" }}><HexagramLines name={h.name} size={30} /></div>
                                <div style={{ fontSize: "13px", color: "#c9a84c", fontFamily: "serif" }}>{h.name}</div>
                                <div style={{ fontSize: "8px", color: "#666", textAlign: "center", lineHeight: "1.2" }}>
                                    {HU_NAMES[h.name]?.split(" / ")[0]}
                                </div>
                                {isPalindrome(h.name) && (
                                    <div style={{ fontSize: "7px", color: "#1a7a8a", border: "1px solid rgba(26,122,138,0.3)", borderRadius: "2px", padding: "0 3px" }}>nem fordítható</div>
                                )}
                                {DIAGONAL_BLUE.has(h.name) && (
                                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2a7ab8" }} />
                                )}
                                {DIAGONAL_RED.has(h.name) && (
                                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#b83a3a" }} />
                                )}
                            </div>
                        );
                    };
                    return (
                        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                            <div style={{ flex: "1", minWidth: "280px" }}>
                                <div style={{ marginBottom: "10px" }}>
                                    <button
                                        onClick={() => setShowSelfPairSecond(v => !v)}
                                        style={{
                                            fontSize: "11px", cursor: "pointer",
                                            padding: "4px 10px", borderRadius: "3px",
                                            border: `1px solid ${showSelfPairSecond ? "rgba(26,122,138,0.5)" : "rgba(150,150,150,0.4)"}`,
                                            background: showSelfPairSecond ? "rgba(26,122,138,0.1)" : "rgba(0,0,0,0.04)",
                                            color: showSelfPairSecond ? "#1a7a8a" : "#666",
                                        }}
                                    >
                                        {showSelfPairSecond ? "spec. 2. tagja: látható" : "spec. 2. tagja: rejtett"}
                                    </button>
                                </div>
                                <div style={{ overflowX: "auto", paddingBottom: "12px" }}>
                                    {canonRows.map(({ label, section, hexList }, rowIdx) => (
                                        <div key={section} style={{ marginBottom: rowIdx === 0 ? "16px" : "0" }}>
                                            <div style={{ fontSize: "13px", color: "#c9a84c", fontFamily: "serif", letterSpacing: "2px", marginBottom: "2px", position: "sticky", left: 0 }}>{label}</div>
                                            <div style={{ fontSize: "9px", color: "#666", marginBottom: "8px", position: "sticky", left: 0 }}>{hexList.length} hexagram</div>
                                            <div style={{ display: "flex", gap: "8px", minWidth: "max-content" }}>
                                                {hexList.map(h => renderHexItem(h, section))}
                                            </div>
                                            {rowIdx === 0 && <div style={{ borderTop: "1px solid rgba(201,168,76,0.2)", margin: "14px 0" }} />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detail Panel */}
                            <div style={{ width: "265px", flexShrink: 0 }}>
                                {activeBothPair ? (
                                    <div style={{
                                        position: "sticky", top: "20px",
                                        border: "1px solid rgba(201,168,76,0.3)", borderRadius: "6px",
                                        padding: "18px", background: "rgba(201,168,76,0.08)",
                                    }}>
                                        <div style={{ fontSize: "10px", color: "#777", letterSpacing: "1px", marginBottom: "14px" }}>
                                            卦對詳解 · Hexagrampár részletei
                                            <span style={{ marginLeft: "8px", color: "#c9a84c" }}>
                                                {activeBothCard?.section === "upper" ? "上經" : "下經"}
                                            </span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "14px" }}>
                                            {[activeBothPair.a, activeBothPair.b].map((name, i) => (
                                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                                                    <div style={{ color: "#2a1800" }}><HexagramLines name={name} size={42} /></div>
                                                    <div style={{ fontSize: "17px", color: "#c9a84c", fontFamily: "serif" }}>{name}</div>
                                                    <div style={{ fontSize: "10px", color: "#888", textAlign: "center", maxWidth: "88px", lineHeight: "1.3" }}>
                                                        {HU_NAMES[name]}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{
                                            textAlign: "center", fontSize: "10px",
                                            color: activeBothPair.type === "自對" ? "#1a7a8a" : "#666",
                                            border: `1px solid ${activeBothPair.type === "自對" ? "rgba(26,122,138,0.4)" : "rgba(150,150,150,0.3)"}`,
                                            borderRadius: "2px", padding: "4px", marginBottom: "12px",
                                        }}>
                                            {activeBothPair.type === "自對"
                                                ? <>自對卦 · <span style={{ color: "#666" }}>nem fordítható: megfordítva azonos marad</span></>
                                                : <>反對卦 · <span style={{ color: "#666" }}>fordítható pár: megfordítva a másik lesz</span></>}
                                        </div>
                                        <div style={{ fontSize: "12px", color: "#888", lineHeight: "1.9", borderTop: "1px solid rgba(201,168,76,0.12)", paddingTop: "10px", marginBottom: "8px", fontFamily: "serif" }}>
                                            {activeBothPair.note}
                                        </div>
                                        <div style={{ fontSize: "11px", color: "#5a5a5a", lineHeight: "1.8", borderTop: "1px dashed rgba(0,0,0,0.1)", paddingTop: "8px", marginBottom: "10px" }}>
                                            {activeBothPair.huNote}
                                        </div>

                                        {/* Numerikus értékek */}
                                        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "10px" }}>
                                            <div style={{ fontSize: "9px", color: "#444", marginBottom: "8px" }}>
                                                數値 · Numerikus értékek · Mag · Centrál
                                            </div>
                                            {[activeBothPair.a, activeBothPair.b].map((name, i) => {
                                                const dec = hexToDecimal(name);
                                                const magLines = getMagLines(name);
                                                const centralLines = getCentralLines(name);
                                                const magDec = linesToDecimal(magLines);
                                                const centralDec = linesToDecimal(centralLines);
                                                const magName = findHexName(magLines);
                                                const centralName = findHexName(centralLines);
                                                return (
                                                    <div key={i} style={{ marginBottom: "12px", paddingBottom: "10px", borderBottom: i === 0 ? "1px dashed rgba(0,0,0,0.08)" : "none" }}>
                                                        <div style={{ fontSize: "10px", color: "#c9a84c", fontFamily: "serif", marginBottom: "4px" }}>{name}</div>
                                                        <div style={{ fontSize: "10px", color: "#444", marginBottom: "6px" }}>
                                                            Dec: <strong>{dec}</strong> · Oct: <strong>{dec.toString(8)}</strong> · Gray: <strong>{toGray(dec)}</strong> / <strong>{toGray(dec).toString(8)} </strong>
                                                        </div>
                                                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                                                            <div style={{ color: "#5a7a5a", flexShrink: 0 }}><HexagramLines lines={magLines} size={20} /></div>
                                                            <div>
                                                                <div style={{ fontSize: "9px", color: "#5a7a5a" }}>Mag{magName ? `: ${magName} · ${HU_NAMES[magName]?.split(" / ")[0]}` : ""}</div>
                                                                <div style={{ fontSize: "9px", color: "#555" }}>Dec: {magDec} · Oct: {magDec.toString(8)} · Gray: {toGray(magDec)} / {toGray(magDec).toString(8)} </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                                            <div style={{ color: "#5a5a8a", flexShrink: 0 }}><HexagramLines lines={centralLines} size={20} /></div>
                                                            <div>
                                                                <div style={{ fontSize: "9px", color: "#5a5a8a" }}>Centrál{centralName ? `: ${centralName} · ${HU_NAMES[centralName]?.split(" / ")[0]}` : ""}</div>
                                                                <div style={{ fontSize: "9px", color: "#555" }}>Dec: {centralDec} · Oct: {centralDec.toString(8)} · Gray: {toGray(centralDec)} / {toGray(centralDec).toString(8)} </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{
                                        position: "sticky", top: "20px",
                                        border: "1px dashed rgba(201,168,76,0.3)", borderRadius: "6px",
                                        padding: "30px 20px", textAlign: "center", color: "#4a4a4a",
                                        fontSize: "12px", lineHeight: "2",
                                    }}>
                                        <div style={{ fontSize: "22px", marginBottom: "10px", color: "#2a2a2a" }}>☯</div>
                                        Kattints egy hexagramra<br />
                                        <span style={{ fontSize: "10px", color: "#3a3a3a" }}>a pár részleteihez</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })() : activeCanon === "monthly" ? (
                    <div>
                        <div style={{ marginBottom: "20px" }}>
                            <p style={{ color: "#777", fontSize: "12px", lineHeight: "1.8", margin: "0 0 4px" }}>
                                自復卦一陽生為冬至子中屬十一月中……陰陽消長如環无端。
                            </p>
                            <p style={{ color: "#4a4a4a", fontSize: "11px", lineHeight: "1.8", margin: 0 }}>
                                A Visszatérés (復) hexagramtól kezdve egy yang vonal keletkezik a téli napfordulón (11. hónap)… a yin és yang növekedése és csökkenése körforgásként, vég nélkül folytatódik.
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                            <svg viewBox="-160 -160 320 320" width="min(480px,88vw)" height="min(480px,88vw)">
                                <circle cx="0" cy="0" r="148" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="1" />
                                <circle cx="0" cy="0" r="95" fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="0.5" />
                                <circle cx="0" cy="0" r="30" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.25)" strokeWidth="0.5" />
                                <text x="0" y="2" textAnchor="middle" fill="#c9a84c" fontSize="7" fontFamily="serif">太極</text>
                                <text x="0" y="10" textAnchor="middle" fill="#555" fontSize="5">Taiji</text>
                                {monthHexagrams.map((m, i) => {
                                    const angle = (i * 30 - 90) * Math.PI / 180;
                                    const r = 118;
                                    const x = Math.cos(angle) * r;
                                    const y = Math.sin(angle) * r;
                                    const isYang = m.yang !== undefined;
                                    return (
                                        <g key={i} transform={`translate(${x},${y})`}>
                                            <circle cx="0" cy="0" r="22"
                                                fill={isYang ? "rgba(201,168,76,0.07)" : "rgba(80,120,160,0.07)"}
                                                stroke={isYang ? "rgba(201,168,76,0.4)" : "rgba(80,160,180,0.4)"}
                                                strokeWidth="0.8" />
                                            {[0, 1, 2, 3, 4, 5].map(li => {
                                                const lines = HEXAGRAMS[m.hex] || [];
                                                const isLY = lines[li] === 1;
                                                const ly = -10 + li * 3.5;
                                                return isLY
                                                    ? <rect key={li} x="-8" y={ly} width="16" height="1.5" fill={isYang ? "#c9a84c" : "#5ab4c8"} />
                                                    : <g key={li}>
                                                        <rect x="-8" y={ly} width="6" height="1.5" fill={isYang ? "#c9a84c" : "#5ab4c8"} />
                                                        <rect x="2" y={ly} width="6" height="1.5" fill={isYang ? "#c9a84c" : "#5ab4c8"} />
                                                    </g>;
                                            })}
                                            <text x="0" y="17" textAnchor="middle" fill={isYang ? "#2a1800" : "#1a6a80"} fontSize="7" fontFamily="serif">{m.hex}</text>
                                            <text x="0" y="-17" textAnchor="middle" fill="#555" fontSize="5">{m.huJieqi}</text>
                                        </g>
                                    );
                                })}
                                <text x="0" y="-75" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="7">yang ↑</text>
                                <text x="0" y="80" textAnchor="middle" fill="rgba(90,180,200,0.4)" fontSize="7">yin ↓</text>
                            </svg>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "8px", marginTop: "8px" }}>
                            {monthHexagrams.map((m, i) => (
                                <div key={i} style={{
                                    padding: "10px 12px",
                                    border: `1px solid ${m.yang ? "rgba(201,168,76,0.2)" : "rgba(90,180,200,0.2)"}`,
                                    borderRadius: "3px",
                                    display: "flex", alignItems: "center", gap: "12px",
                                    background: "rgba(0,0,0,0.04)",
                                }}>
                                    <div style={{ color: m.yang ? "#8a6018" : "#1a7a90", flexShrink: 0 }}>
                                        <HexagramLines name={m.hex} size={22} />
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                                            <span style={{ fontSize: "14px", fontFamily: "serif", color: m.yang ? "#2a1800" : "#1a6a80" }}>{m.hex}</span>
                                            <span style={{ fontSize: "10px", color: "#666" }}>{HU_NAMES[m.hex]?.split(" / ")[0]}</span>
                                        </div>
                                        <div style={{ fontSize: "9px", color: "#555" }}>
                                            {m.month} <span style={{ color: "#3a3a3a" }}>({m.hu})</span>
                                        </div>
                                        <div style={{ fontSize: "9px", color: "#555" }}>
                                            {m.jieqi} · <span style={{ color: "#3a3a3a" }}>{m.huJieqi}</span>
                                        </div>
                                        <div style={{ fontSize: "9px", color: m.yang ? "#a07830" : "#3a8a9a" }}>
                                            {m.yang ? `${m.yang} yang vonal` : `${m.yin} yin vonal`}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                        <div style={{ flex: "1", minWidth: "280px" }}>
                            <div style={{ marginBottom: "4px", fontSize: "11px", color: "#666" }}>
                                {activeCanon === "upper" ? "上經 · 正卦六，反卦二十四，共十八卦成三十卦" : "下經 · 正卦二，反卦三十二，亦十八卦成三十四卦"}
                            </div>
                            <div style={{ marginBottom: "14px", fontSize: "10px", color: "#444" }}>
                                {activeCanon === "upper"
                                    ? "Felső Kánon · 6 nem fordítható, 24 fordítható pár · 18 hexagramból 30 keletkezik"
                                    : "Alsó Kánon · 2 nem fordítható, 32 fordítható pár · 18 hexagramból 34 keletkezik"}
                            </div>
                            {activeCanon === "upper" ? (() => {
                                const rowLayout = [1, 4, 1, 2, 1, 4, 1, 1];
                                const rows = [];
                                let pairIdx = 0;
                                for (const count of rowLayout) {
                                    const startIdx = pairIdx;
                                    rows.push(pairs.slice(startIdx, startIdx + count).map((pair, colI) => ({ pair, absoluteIdx: startIdx + colI })));
                                    pairIdx += count;
                                }
                                return (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        {rows.map((rowItems, rowI) => (
                                            <div key={rowI} style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                                {rowItems.map(({ pair, absoluteIdx }) => (
                                                    <HexagramCard
                                                        key={absoluteIdx}
                                                        nameA={pair.a}
                                                        nameB={pair.b}
                                                        type={pair.type}
                                                        index={absoluteIdx + 1}
                                                        isActive={activeCard === absoluteIdx}
                                                        onClick={() => setActiveCard(activeCard === absoluteIdx ? null : absoluteIdx)}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })() : (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(138px, 1fr))", gap: "8px" }}>
                                    {pairs.map((pair, i) => (
                                        <HexagramCard
                                            key={i}
                                            nameA={pair.a}
                                            nameB={pair.b}
                                            type={pair.type}
                                            index={15 + i + 1}
                                            isActive={activeCard === i}
                                            onClick={() => setActiveCard(activeCard === i ? null : i)}
                                        />
                                    ))}
                                </div>
                            )}

                            <div style={{
                                marginTop: "18px", padding: "14px 16px",
                                border: "1px solid rgba(201,168,76,0.12)", borderRadius: "3px",
                                background: "rgba(201,168,76,0.08)", fontSize: "11px", lineHeight: "2",
                            }}>
                                {activeCanon === "upper" ? (
                                    <>
                                        <div style={{ color: "#c9a84c" }}>上經 (Felső Kánon)</div>
                                        <div style={{ color: "#666" }}>乾坤為主，終以坎離。</div>
                                        <div style={{ color: "#444" }}>Az Ég és Föld vezet, a Víz és Tűz zár le. Minden hexagram tartalmaz valahol Éget vagy Földet.</div>
                                        <div style={{ marginTop: "8px", color: "#777" }}>
                                            <span style={{ color: "#1a7a8a" }}>自對 (nem fordítható)</span>: 乾坤 · 頤大過 · 坎離 → 6 hexagram
                                        </div>
                                        <div style={{ color: "#444", fontSize: "10px" }}>Megfordítva önmagukkal azonosak.</div>
                                        <div style={{ color: "#777" }}>
                                            <span style={{ color: "#888" }}>反對 (fordítható pár)</span>: a többi 12 pár → 24 hexagram
                                        </div>
                                        <div style={{ color: "#444", fontSize: "10px" }}>Megfordítva a párjukká válnak.</div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ color: "#c9a84c" }}>下經 (Alsó Kánon)</div>
                                        <div style={{ color: "#666" }}>咸恒為主，終以既未濟。</div>
                                        <div style={{ color: "#444" }}>Az Érzékiség és Tartósság vezet, a Befejezés és Befejezetlenség zár le.</div>
                                        <div style={{ marginTop: "8px", color: "#777" }}>
                                            <span style={{ color: "#1a7a8a" }}>自對 (nem fordítható)</span>: 震艮 · 巽兌 · 中孚小過 · 既未濟 → 8 hexagram
                                        </div>
                                        <div style={{ color: "#777" }}>
                                            <span style={{ color: "#888" }}>反對 (fordítható pár)</span>: a többi 13 pár → 26 hexagram
                                        </div>
                                    </>
                                )}
                            </div>

                            <div style={{
                                marginTop: "10px", padding: "12px",
                                background: "rgba(0,0,0,0.05)", borderRadius: "4px",
                                fontSize: "10px", lineHeight: "2",
                            }}>
                                {activeCanon === "upper" ? (
                                    <>
                                        <div style={{ color: "#777" }}>以<span style={{ color: "#999" }}>天道</span>為主，具人道於其中。</div>
                                        <div style={{ color: "#3a3a3a" }}>Az égi utat állítja középpontba, magában hordozza az emberi utat.</div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ color: "#777" }}>以<span style={{ color: "#999" }}>人道</span>為主，具天道於其內。</div>
                                        <div style={{ color: "#3a3a3a" }}>Az emberi utat állítja középpontba, magában hordozza az égi utat.</div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Detail Panel */}
                        <div style={{ width: "265px", flexShrink: 0 }}>
                            {activePair ? (
                                <div style={{
                                    position: "sticky", top: "20px",
                                    border: "1px solid rgba(201,168,76,0.3)", borderRadius: "6px",
                                    padding: "18px", background: "rgba(201,168,76,0.08)",
                                }}>
                                    <div style={{ fontSize: "10px", color: "#777", letterSpacing: "1px", marginBottom: "14px" }}>
                                        卦對詳解 · Hexagrampár részletei
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "14px" }}>
                                        {[activePair.a, activePair.b].map((name, i) => (
                                            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                                                <div style={{ color: "#2a1800" }}><HexagramLines name={name} size={42} /></div>
                                                <div style={{ fontSize: "17px", color: "#c9a84c", fontFamily: "serif" }}>{name}</div>
                                                <div style={{ fontSize: "10px", color: "#888", textAlign: "center", maxWidth: "88px", lineHeight: "1.3" }}>
                                                    {HU_NAMES[name]}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{
                                        textAlign: "center", fontSize: "10px",
                                        color: activePair.type === "自對" ? "#1a7a8a" : "#666",
                                        border: `1px solid ${activePair.type === "自對" ? "rgba(26,122,138,0.4)" : "rgba(150,150,150,0.3)"}`,
                                        borderRadius: "2px", padding: "4px", marginBottom: "12px",
                                    }}>
                                        {activePair.type === "自對"
                                            ? <>自對卦 · <span style={{ color: "#666" }}>nem fordítható: megfordítva azonos marad</span></>
                                            : <>反對卦 · <span style={{ color: "#666" }}>fordítható pár: megfordítva a másik lesz</span></>}
                                    </div>

                                    {/* Chinese note */}
                                    <div style={{
                                        fontSize: "12px", color: "#888", lineHeight: "1.9",
                                        borderTop: "1px solid rgba(201,168,76,0.12)", paddingTop: "10px",
                                        marginBottom: "8px", fontFamily: "serif",
                                    }}>
                                        {activePair.note}
                                    </div>

                                    {/* Hungarian note */}
                                    <div style={{
                                        fontSize: "11px", color: "#5a5a5a", lineHeight: "1.8",
                                        borderTop: "1px dashed rgba(0,0,0,0.1)", paddingTop: "8px",
                                        marginBottom: "12px",
                                    }}>
                                        {activePair.huNote}
                                    </div>

                                    {/* Binary + Numerikus értékek */}
                                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "10px" }}>
                                        <div style={{ fontSize: "9px", color: "#444", marginBottom: "6px" }}>
                                            二進制 · bináris (felülről lefelé)
                                        </div>
                                        {[activePair.a, activePair.b].map((name, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                                <span style={{ fontSize: "11px", color: "#666", width: "44px", fontFamily: "serif" }}>{name}</span>
                                                <div style={{ display: "flex", gap: "2px" }}>
                                                    {[...(HEXAGRAMS[name] || [])].reverse().map((l, j) => (
                                                        <div key={j} style={{
                                                            width: "12px", height: "12px", borderRadius: "1px",
                                                            background: l ? "rgba(201,168,76,0.65)" : "rgba(100,100,100,0.25)",
                                                            border: "1px solid rgba(201,168,76,0.15)",
                                                            fontSize: "7px", color: l ? "#c9a84c" : "#444",
                                                            display: "flex", alignItems: "center", justifyContent: "center",
                                                        }}>{l}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mag és Centrál */}
                                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "10px", marginTop: "8px" }}>
                                        <div style={{ fontSize: "9px", color: "#444", marginBottom: "8px" }}>
                                            數値 · Numerikus értékek · Mag · Centrál
                                        </div>
                                        {[activePair.a, activePair.b].map((name, i) => {
                                            const dec = hexToDecimal(name);
                                            const magLines = getMagLines(name);
                                            const centralLines = getCentralLines(name);
                                            const magDec = linesToDecimal(magLines);
                                            const centralDec = linesToDecimal(centralLines);
                                            const magName = findHexName(magLines);
                                            const centralName = findHexName(centralLines);
                                            return (
                                                <div key={i} style={{ marginBottom: "12px", paddingBottom: "10px", borderBottom: i === 0 ? "1px dashed rgba(0,0,0,0.08)" : "none" }}>
                                                    <div style={{ fontSize: "10px", color: "#c9a84c", fontFamily: "serif", marginBottom: "4px" }}>{name}</div>
                                                    <div style={{ fontSize: "10px", color: "#444", marginBottom: "6px" }}>
                                                        Dec: <strong>{dec}</strong> · Oct: <strong>{dec.toString(8)}</strong> · Gray: <strong>{toGray(dec)}</strong> / <strong>{toGray(dec).toString(8)}</strong> 
                                                    </div>
                                                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                                                        <div style={{ color: "#5a7a5a", flexShrink: 0 }}><HexagramLines lines={magLines} size={20} /></div>
                                                        <div>
                                                            <div style={{ fontSize: "9px", color: "#5a7a5a" }}>Mag{magName ? `: ${magName} · ${HU_NAMES[magName]?.split(" / ")[0]}` : ""}</div>
                                                            <div style={{ fontSize: "9px", color: "#555" }}>Dec: {magDec} · Oct: {magDec.toString(8)} · Gray: {toGray(magDec)} / {toGray(magDec).toString(8)} </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                                        <div style={{ color: "#5a5a8a", flexShrink: 0 }}><HexagramLines lines={centralLines} size={20} /></div>
                                                        <div>
                                                            <div style={{ fontSize: "9px", color: "#5a5a8a" }}>Centrál{centralName ? `: ${centralName} · ${HU_NAMES[centralName]?.split(" / ")[0]}` : ""}</div>
                                                            <div style={{ fontSize: "9px", color: "#555" }}>Dec: {centralDec} · Oct: {centralDec.toString(8)} · Gray: {toGray(centralDec)} / {toGray(centralDec).toString(8)} </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div style={{
                                    border: "1px dashed rgba(201,168,76,0.3)", borderRadius: "6px",
                                    padding: "30px 20px", textAlign: "center", color: "#4a4a4a",
                                    fontSize: "12px", lineHeight: "2",
                                }}>
                                    <div style={{ fontSize: "22px", marginBottom: "10px", color: "#2a2a2a" }}>☯</div>
                                    Kattints egy hexagrampárra<br />
                                    <span style={{ fontSize: "10px", color: "#3a3a3a" }}>a részletek megtekintéséhez</span>
                                    <div style={{ marginTop: "14px", fontSize: "10px", color: "#3a3a3a", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "12px", lineHeight: "2" }}>
                                        <span style={{ color: "#1a7a8a" }}>nem fordítható (自對)</span>: megfordítva önmaga marad<br />
                                        <span style={{ color: "#777" }}>fordítható pár (反對)</span>: megfordítva a párja lesz <br />
                                        {[
                                            { color: "#2a7ab8", label: "Kék diagonális" },
                                            { color: "#b83a3a", label: "Piros diagonális" },
                                        ].map(({ color, label }) => (
                                            <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                                                <span style={{ color }}>{label}</span>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div style={{
                    marginTop: "36px", borderTop: "1px solid rgba(201,168,76,0.08)",
                    paddingTop: "14px", fontSize: "10px", lineHeight: "2",
                }}>
                    <div style={{ color: "#555" }}>文王演易羑里 · 取伏羲六十四卦 · 分為上下經二篇 · 胡一桂《周易啓蒙翼傳》· 元代</div>
                    <div style={{ color: "#333" }}>Wen király a Yöuli fogságban dolgozta át Fu Xi 64 hexagramját és két könyvbe rendezte · Hu Yigui kommentárja · Yuan-dinasztia</div>
                </div>
            </div>
        </div>
    );
}