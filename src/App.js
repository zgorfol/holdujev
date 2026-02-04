import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';

const SexagenaryHexagramSystem = () => {
  const [activeMethod, setActiveMethod] = useState('natural');
  const [skipOption, setSkipOption] = useState('option1');
  const [showValidation, setShowValidation] = useState(true);

  // Égi Törzsek és Földi Ágak
  const stems = [
    { name: 'Jia 甲', element: 'Yang Fa', pin: 'jiǎ', trigramBinary: 0b001, trigramName: 'Zhen ☳' },
    { name: 'Yi 乙', element: 'Yin Fa', pin: 'yǐ', trigramBinary: 0b110, trigramName: 'Xun ☴' },
    { name: 'Bing 丙', element: 'Yang Tűz', pin: 'bǐng', trigramBinary: 0b101, trigramName: 'Li ☲' },
    { name: 'Ding 丁', element: 'Yin Tűz', pin: 'dīng', trigramBinary: 0b101, trigramName: 'Li ☲' },
    { name: 'Wu 戊', element: 'Yang Föld', pin: 'wù', trigramBinary: 0b100, trigramName: 'Gen ☶' },
    { name: 'Ji 己', element: 'Yin Föld', pin: 'jǐ', trigramBinary: 0b000, trigramName: 'Kun ☷' },
    { name: 'Geng 庚', element: 'Yang Fém', pin: 'gēng', trigramBinary: 0b111, trigramName: 'Qian ☰' },
    { name: 'Xin 辛', element: 'Yin Fém', pin: 'xīn', trigramBinary: 0b011, trigramName: 'Dui ☱' },
    { name: 'Ren 壬', element: 'Yang Víz', pin: 'rén', trigramBinary: 0b010, trigramName: 'Kan ☵' },
    { name: 'Gui 癸', element: 'Yin Víz', pin: 'guǐ', trigramBinary: 0b010, trigramName: 'Kan ☵' }
  ];

  const branches = [
    { name: 'Zi 子', animal: 'Patkány', element: 'Víz', trigramBinary: 0b010, trigramName: 'Kan ☵' },
    { name: 'Chou 丑', animal: 'Bivaly', element: 'Föld', trigramBinary: 0b000, trigramName: 'Kun ☷' },
    { name: 'Yin 寅', animal: 'Tigris', element: 'Fa', trigramBinary: 0b110, trigramName: 'Xun ☴' },
    { name: 'Mao 卯', animal: 'Nyúl', element: 'Fa', trigramBinary: 0b110, trigramName: 'Xun ☴' },
    { name: 'Chen 辰', animal: 'Sárkány', element: 'Föld', trigramBinary: 0b100, trigramName: 'Gen ☶' },
    { name: 'Si 巳', animal: 'Kígyó', element: 'Tűz', trigramBinary: 0b101, trigramName: 'Li ☲' },
    { name: 'Wu 午', animal: 'Ló', element: 'Tűz', trigramBinary: 0b101, trigramName: 'Li ☲' },
    { name: 'Wei 未', animal: 'Kecske', element: 'Föld', trigramBinary: 0b000, trigramName: 'Kun ☷' },
    { name: 'Shen 申', animal: 'Majom', element: 'Fém', trigramBinary: 0b111, trigramName: 'Qian ☰' },
    { name: 'You 酉', animal: 'Kakas', element: 'Fém', trigramBinary: 0b011, trigramName: 'Dui ☱' },
    { name: 'Xu 戌', animal: 'Kutya', element: 'Föld', trigramBinary: 0b100, trigramName: 'Gen ☶' },
    { name: 'Hai 亥', animal: 'Disznó', element: 'Víz', trigramBinary: 0b010, trigramName: 'Kan ☵' }
  ];

  // 64 hexagram Wen Wang sorrendben (az első kettő és utolsó kettő kihagyva)
  // binary: alulról felfelé olvasva, 0=yin (szakadt), 1=yang (összefüggő)
  const hexagrams = [
    { num: 1, name: 'Qian 乾', meaning: 'Teremtő', wenOrder: 1, binary: 0b111111 },
    { num: 2, name: 'Kun 坤', meaning: 'Befogadó', wenOrder: 2, binary: 0b000000 },
    { num: 3, name: 'Zhun 屯', meaning: 'Kezdeti nehézség', wenOrder: 3, binary: 0b010001 },
    { num: 4, name: 'Meng 蒙', meaning: 'Éretlenség', wenOrder: 4, binary: 0b100010 },
    { num: 5, name: 'Xu 需', meaning: 'Várakozás', wenOrder: 5, binary: 0b010111 },
    { num: 6, name: 'Song 訟', meaning: 'Viszály', wenOrder: 6, binary: 0b111010 },
    { num: 7, name: 'Shi 師', meaning: 'Hadsereg', wenOrder: 7, binary: 0b000010 },
    { num: 8, name: 'Bi 比', meaning: 'Összetartás', wenOrder: 8, binary: 0b010000 },
    { num: 9, name: 'Xiao Chu 小畜', meaning: 'A kicsi szelídítő ereje', wenOrder: 9, binary: 0b110111 },
    { num: 10, name: 'Lü 履', meaning: 'Fellépés', wenOrder: 10, binary: 0b111011 },
    { num: 11, name: 'Tai 泰', meaning: 'Béke', wenOrder: 11, binary: 0b000111 },
    { num: 12, name: 'Pi 否', meaning: 'Megrekedés', wenOrder: 12, binary: 0b111000 },
    { num: 13, name: 'Tong Ren 同人', meaning: 'Közösség', wenOrder: 13, binary: 0b111101 },
    { num: 14, name: 'Da You 大有', meaning: 'A nagy birtoklása', wenOrder: 14, binary: 0b101111 },
    { num: 15, name: 'Qian 謙', meaning: 'Szerénység', wenOrder: 15, binary: 0b000100 },
    { num: 16, name: 'Yu 豫', meaning: 'Lelkesedés', wenOrder: 16, binary: 0b001000 },
    { num: 17, name: 'Sui 隨', meaning: 'Követés', wenOrder: 17, binary: 0b011001 },
    { num: 18, name: 'Gu 蠱', meaning: 'Munkálkodás az elrontotton', wenOrder: 18, binary: 0b100110 },
    { num: 19, name: 'Lin 臨', meaning: 'Közeledés', wenOrder: 19, binary: 0b000011 },
    { num: 20, name: 'Guan 觀', meaning: 'Szemlélődés', wenOrder: 20, binary: 0b110000 },
    { num: 21, name: 'Shi He 噬嗑', meaning: 'Az akadály eltávolítása', wenOrder: 21, binary: 0b101001 },
    { num: 22, name: 'Bi 賁', meaning: 'Szépség', wenOrder: 22, binary: 0b100101 },
    { num: 23, name: 'Bo 剝', meaning: 'Szétforgácsolódás', wenOrder: 23, binary: 0b100000 },
    { num: 24, name: 'Fu 復', meaning: 'Visszatérés', wenOrder: 24, binary: 0b000001 },
    { num: 25, name: 'Wu Wang 無妄', meaning: 'Ártatlanság', wenOrder: 25, binary: 0b111001 },
    { num: 26, name: 'Da Chu 大畜', meaning: 'Visszafogott erő', wenOrder: 26, binary: 0b100111 },
    { num: 27, name: 'Yi 頤', meaning: 'Táplálás', wenOrder: 27, binary: 0b100001 },
    { num: 28, name: 'Da Guo 大過', meaning: 'A nagy bősége', wenOrder: 28, binary: 0b011110 },
    { num: 29, name: 'Kan 坎', meaning: 'Mélység', wenOrder: 29, binary: 0b010010 },
    { num: 30, name: 'Li 離', meaning: 'Tapadó tűz', wenOrder: 30, binary: 0b101101 },
    { num: 31, name: 'Xian 咸', meaning: 'Vonzalom (Udvarlás)', wenOrder: 31, binary: 0b011100 },
    { num: 32, name: 'Heng 恆', meaning: 'Tartósság', wenOrder: 32, binary: 0b001110 },
    { num: 33, name: 'Dun 遯', meaning: 'Visszavonulás', wenOrder: 33, binary: 0b111100 },
    { num: 34, name: 'Da Zhuang 大壯', meaning: 'A nagy hatalma', wenOrder: 34, binary: 0b001111 },
    { num: 35, name: 'Jin 晉', meaning: 'Haladás', wenOrder: 35, binary: 0b101000 },
    { num: 36, name: 'Ming Yi 明夷', meaning: 'A fény elsötétülése', wenOrder: 36, binary: 0b000101 },
    { num: 37, name: 'Jia Ren 家人', meaning: 'Család', wenOrder: 37, binary: 0b110101 },
    { num: 38, name: 'Kui 睽', meaning: 'Ellentét', wenOrder: 38, binary: 0b101011 },
    { num: 39, name: 'Jian 蹇', meaning: 'Akadály', wenOrder: 39, binary: 0b010100 },
    { num: 40, name: 'Jie 解', meaning: 'Felszabadulás', wenOrder: 40, binary: 0b001010 },
    { num: 41, name: 'Sun 損', meaning: 'Csökkenés', wenOrder: 41, binary: 0b100011 },
    { num: 42, name: 'Yi 益', meaning: 'Növekedés', wenOrder: 42, binary: 0b110001 },
    { num: 43, name: 'Guai 夬', meaning: 'Elszántság', wenOrder: 43, binary: 0b011111 },
    { num: 44, name: 'Gou 姤', meaning: 'Elébemenés', wenOrder: 44, binary: 0b111110 },
    { num: 45, name: 'Cui 萃', meaning: 'Gyülekezés', wenOrder: 45, binary: 0b011000 },
    { num: 46, name: 'Sheng 升', meaning: 'Felemelkedés', wenOrder: 46, binary: 0b000110 },
    { num: 47, name: 'Kun 困', meaning: 'Kimerültség', wenOrder: 47, binary: 0b011010 },
    { num: 48, name: 'Jing 井', meaning: 'Kút', wenOrder: 48, binary: 0b010110 },
    { num: 49, name: 'Ge 革', meaning: 'Átalakulás', wenOrder: 49, binary: 0b011101 },
    { num: 50, name: 'Ding 鼎', meaning: 'Bronzüst', wenOrder: 50, binary: 0b101110 },
    { num: 51, name: 'Zhen 震', meaning: 'Gerjesztő villám', wenOrder: 51, binary: 0b001001 },
    { num: 52, name: 'Gen 艮', meaning: 'Mozdulatlan hegy', wenOrder: 52, binary: 0b100100 },
    { num: 53, name: 'Jian 漸', meaning: 'Fejlődés', wenOrder: 53, binary: 0b110100 },
    { num: 54, name: 'Gui Mei 歸妹', meaning: 'Menyasszony', wenOrder: 54, binary: 0b001011 },
    { num: 55, name: 'Feng 豐', meaning: 'Bőség', wenOrder: 55, binary: 0b001101 },
    { num: 56, name: 'Lü 旅', meaning: 'Vándor', wenOrder: 56, binary: 0b101100 },
    { num: 57, name: 'Xun 巽', meaning: 'Szelíd szél', wenOrder: 57, binary: 0b110110 },
    { num: 58, name: 'Dui 兌', meaning: 'Vidám tó', wenOrder: 58, binary: 0b011011 },
    { num: 59, name: 'Huan 渙', meaning: 'Feloldás', wenOrder: 59, binary: 0b110010 },
    { num: 60, name: 'Jie 節', meaning: 'Korlátozás', wenOrder: 60, binary: 0b010011 },
    { num: 61, name: 'Zhong Fu 中孚', meaning: 'A közép bizonyossága', wenOrder: 61, binary: 0b110011 },
    { num: 62, name: 'Xiao Guo 小過', meaning: 'A kicsi túlsúlya', wenOrder: 62, binary: 0b001100 },
    { num: 63, name: 'Ji Ji 既濟', meaning: 'Befejezés után', wenOrder: 63, binary: 0b010101 },
    { num: 64, name: 'Wei Ji 未濟', meaning: 'Befejezés előtt', wenOrder: 64, binary: 0b101010 }
  ];

  // Kihagyási opciók
  const skipOptions = {
    option1: { nums: [29, 30, 51, 58], name: 'Napfordulók és Napéjegyenlőségek (29,30,51,58)' },
    option2: { nums: [2, 30, 51, 58], name: 'Kun + Napéjegyenlőségek (2,30,51,58)' },
    option3: { nums: [1, 2, 29, 30], name: 'Qian, Kun + Napfordulók (1,2,29,30)' },
    option4: { nums: [1, 2, 63, 64], name: 'Qian, Kun + Ji Ji, Wei Ji (1,2,63,64)' }
  };

  // Hexagram vizuális megjelenítő függvény
  const renderHexagram = (binary) => {
    const lines = [];
    for (let i = 5; i >= 0; i--) {
      const isYang = (binary >> i) & 1;
      lines.push(
        <div key={i} className="flex justify-center my-0.5">
          {isYang ? (
            <div className="w-12 h-1 bg-gray-800" />
          ) : (
            <div className="flex gap-1">
              <div className="w-5 h-1 bg-gray-800" />
              <div className="w-5 h-1 bg-gray-800" />
            </div>
          )}
        </div>
      );
    }
    return <div className="inline-block">{lines}</div>;
  };

  // 60 év generálása 1984-től kezdve (Jia Zi évtől)
  const generateYears = () => {
    const years = [];
    const startYear = 1984;
    for (let i = 0; i < 60; i++) {
      const stemIdx = i % 10;
      const branchIdx = i % 12;
      years.push({
        year: startYear + i,
        stem: stems[stemIdx],
        branch: branches[branchIdx],
        index: i
      });
    }
    return years;
  };

  const years = generateYears();

  // Módszer 1: Választható kihagyással
  const getMethod1Hexagram = (yearIndex, option) => {
    const skipped = skipOptions[option].nums;
    let hexagramIndex = 0;
    let yearCounter = 0;

    while (hexagramIndex < hexagrams.length) {
      if (!skipped.includes(hexagrams[hexagramIndex].num)) {
        if (yearCounter === yearIndex) {
          return hexagrams[hexagramIndex];
        }
        yearCounter++;
      }
      hexagramIndex++;
    }
    return hexagrams[0];
  };

  // Módszer 2: Égi Törzs-Földi Ág kombinált rendszer (javított)
  const getMethod2Hexagram = (yearIndex) => {
    const stemIdx = yearIndex % 10;
    const branchIdx = yearIndex % 12;
    // Egyedi index generálása: minden 60 évre különböző érték
    //const combinedIdx = (stemIdx + branchIdx * 5) % 60;
    const combinedIdx = (stemIdx * 6 + branchIdx * 5) % 60;
    return hexagrams[combinedIdx+2];
  };

  // Módszer 3: Égi Törzs-Földi Ág kombinált rendszer érték alapú sorrend
  const getMethod3Hexagram = (yearIndex) => {
    const stemIdx = yearIndex % 10;
    const branchIdx = yearIndex % 12;
    // Egyedi index generálása: minden 60 évre különböző érték
    //const combinedIdx = (stemIdx + branchIdx * 5) % 60;
    const combinedIdx = (stemIdx * 6 + branchIdx * 5) % 60;
    const foundHexagram = hexagrams.find(h => h.binary === (combinedIdx + 2));
    
    // Fallback: ha a keresés nem jár sikerrel, visszatérünk a természetes sorrendhez,
    // hogy elkerüljük az összeomlást.
    if (!foundHexagram) {
      return hexagrams[yearIndex];
    }
    
    return foundHexagram;
  };

  // Módszer 4: Fu Xi bináris sorrend (Shao Yong módszer)
  const getMethod4Hexagram = (yearIndex) => {
    // Fu Xi sorrend: hexagramok bináris érték szerint rendezve
    // Hexagramokat bináris értékük alapján sorba rendezzük (0-63)
    // és a yearIndex-nek megfelelő bináris értékű hexagramot választjuk

    // Hexagramok másolása és bináris érték szerint rendezés
    const sortedByBinary = [...hexagrams].sort((a, b) => a.binary - b.binary);

    // 60 éves ciklusból csak 60 hexagram kell, ezért a 60-63 bináris értékűeket kihagyjuk
    const first60Hexagrams = sortedByBinary.slice(0, 60);

    // Visszatérünk a yearIndex-nek megfelelő hexagrammal
    return first60Hexagrams[yearIndex];
  };

  // Módszer 5: Xuankong Da Gua (玄空大卦配卦歌诀) - tradicionális feng shui rendszer
  // Forrás: fengshui.net / Stephen Skinner, a 玄空大卦 vers alapján
  // Kihagyott 4 hexagram: #4 (Meng), #24 (Fu), #44 (Gou), #49 (Ge)
  const xuankongMap = [
    2, 21, 37, 41, 10, 34, 32,  6,  7, 53,  // 甲子..癸酉 (index 0-9)
   39, 35, 27, 17, 55, 60, 11, 14, 57, 47,  // 甲戌..癸未 (index 10-19)
   64, 33, 52, 16,  3, 25, 29, 61, 26, 43,  // 甲申..癸巳 (index 20-29)
    1, 48, 40, 31, 15, 20, 42, 36, 13, 54,  // 甲午..癸卯 (index 30-39)
   38,  5, 28, 18, 59, 56, 12,  8, 51, 22,  // 甲辰..癸丑 (index 40-49)
   63, 19, 58,  9, 50, 46, 30, 62, 45, 23   // 甲寅..癸亥 (index 50-59)
  ];

  const getMethod5Hexagram = (yearIndex) => {
    const hexNum = xuankongMap[yearIndex];
    return hexagrams.find(h => h.num === hexNum);
  };

  // Módszer 6: Égi Törzs-Földi Ág kombinált rendszer (eredeti)
  const getMethod6Hexagram = (yearIndex) => {
    // Égi Törzsek és Földi Ágak
    const stems = [
      { name: 'Jia 甲', element: 'Yang Fa', pin: 'jiǎ', trigramBinary: 0b110, trigramName: 'Xun ☴' },
      { name: 'Yi 乙', element: 'Yin Fa', pin: 'yǐ', trigramBinary: 0b110, trigramName: 'Xun ☴' },
      { name: 'Bing 丙', element: 'Yang Tűz', pin: 'bǐng', trigramBinary: 0b101, trigramName: 'Li ☲' },
      { name: 'Ding 丁', element: 'Yin Tűz', pin: 'dīng', trigramBinary: 0b101, trigramName: 'Li ☲' },
      { name: 'Wu 戊', element: 'Yang Föld', pin: 'wù', trigramBinary: 0b000, trigramName: 'Kun ☷' },
      { name: 'Ji 己', element: 'Yin Föld', pin: 'jǐ', trigramBinary: 0b000, trigramName: 'Kun ☷' },
      { name: 'Geng 庚', element: 'Yang Fém', pin: 'gēng', trigramBinary: 0b011, trigramName: 'Dui ☱' },
      { name: 'Xin 辛', element: 'Yin Fém', pin: 'xīn', trigramBinary: 0b011, trigramName: 'Dui ☱' },
      { name: 'Ren 壬', element: 'Yang Víz', pin: 'rén', trigramBinary: 0b010, trigramName: 'Kan ☵' },
      { name: 'Gui 癸', element: 'Yin Víz', pin: 'guǐ', trigramBinary: 0b010, trigramName: 'Kan ☵' }
    ];

    const branches = [
      { name: 'Zi 子', animal: 'Patkány', element: 'Víz', trigramBinary: 0b010, trigramName: 'Kan ☵' },
      { name: 'Chou 丑', animal: 'Bivaly', element: 'Föld', trigramBinary: 0b100, trigramName: 'Gen ☶' },
      { name: 'Yin 寅', animal: 'Tigris', element: 'Fa', trigramBinary: 0b110, trigramName: 'Xun ☴' },
      { name: 'Mao 卯', animal: 'Nyúl', element: 'Fa', trigramBinary: 0b110, trigramName: 'Xun ☴' },
      { name: 'Chen 辰', animal: 'Sárkány', element: 'Föld', trigramBinary: 0b001, trigramName: 'Zhen ☳' },
      { name: 'Si 巳', animal: 'Kígyó', element: 'Tűz', trigramBinary: 0b101, trigramName: 'Li ☲' },
      { name: 'Wu 午', animal: 'Ló', element: 'Tűz', trigramBinary: 0b101, trigramName: 'Li ☲' },
      { name: 'Wei 未', animal: 'Kecske', element: 'Föld', trigramBinary: 0b000, trigramName: 'Kun ☷' },
      { name: 'Shen 申', animal: 'Majom', element: 'Fém', trigramBinary: 0b011, trigramName: 'Dui ☱' },
      { name: 'You 酉', animal: 'Kakas', element: 'Fém', trigramBinary: 0b011, trigramName: 'Dui ☱' },
      { name: 'Xu 戌', animal: 'Kutya', element: 'Föld', trigramBinary: 0b111, trigramName: 'Qian ☰' },
      { name: 'Hai 亥', animal: 'Disznó', element: 'Víz', trigramBinary: 0b010, trigramName: 'Kan ☵' }
    ];

    const stemIdx = yearIndex % 10;
    const branchIdx = yearIndex % 12;
    
    const upperTrigram = branches[branchIdx].trigramBinary;
    const lowerTrigram = stems[stemIdx].trigramBinary;
    const hexagramNumber = upperTrigram * 8 + lowerTrigram;

    const foundHexagram = hexagrams.find(h => h.binary === hexagramNumber);

    // Fallback: ha a keresés nem jár sikerrel, visszatérünk a természetes sorrendhez,
    // hogy elkerüljük az összeomlást.
    if (!foundHexagram) {
      return hexagrams[yearIndex];
    }
    return foundHexagram;
  };

    // Módszer 7: Égi Törzs-Földi Ág kombinált rendszer (újított)
    const getMethod7Hexagram = (yearIndex) => {
      // Égi Törzsek és Földi Ágak
      const stems = [
        { name: 'Jia 甲', element: 'Yang Fa', pin: 'jiǎ', trigramBinary: 0b001, trigramName: 'Zhen ☳' },
        { name: 'Yi 乙', element: 'Yin Fa', pin: 'yǐ', trigramBinary: 0b110, trigramName: 'Xun ☴' },
        { name: 'Bing 丙', element: 'Yang Tűz', pin: 'bǐng', trigramBinary: 0b101, trigramName: 'Li ☲' },
        { name: 'Ding 丁', element: 'Yin Tűz', pin: 'dīng', trigramBinary: 0b101, trigramName: 'Li ☲' },
        { name: 'Wu 戊', element: 'Yang Föld', pin: 'wù', trigramBinary: 0b100, trigramName: 'Gen ☶' },
        { name: 'Ji 己', element: 'Yin Föld', pin: 'jǐ', trigramBinary: 0b000, trigramName: 'Kun ☷' },
        { name: 'Geng 庚', element: 'Yang Fém', pin: 'gēng', trigramBinary: 0b111, trigramName: 'Qian ☰' },
        { name: 'Xin 辛', element: 'Yin Fém', pin: 'xīn', trigramBinary: 0b011, trigramName: 'Dui ☱' },
        { name: 'Ren 壬', element: 'Yang Víz', pin: 'rén', trigramBinary: 0b010, trigramName: 'Kan ☵' },
        { name: 'Gui 癸', element: 'Yin Víz', pin: 'guǐ', trigramBinary: 0b010, trigramName: 'Kan ☵' }
      ];

      const branches = [
        { name: 'Zi 子', animal: 'Patkány', element: 'Víz', trigramBinary: 0b010, trigramName: 'Kan ☵' },
        { name: 'Chou 丑', animal: 'Bivaly', element: 'Föld', trigramBinary: 0b100, trigramName: 'Gen ☶' },
        { name: 'Yin 寅', animal: 'Tigris', element: 'Fa', trigramBinary: 0b110, trigramName: 'Xun ☴' },
        { name: 'Mao 卯', animal: 'Nyúl', element: 'Fa', trigramBinary: 0b110, trigramName: 'Xun ☴' },
        { name: 'Chen 辰', animal: 'Sárkány', element: 'Föld', trigramBinary: 0b001, trigramName: 'Zhen ☳' },
        { name: 'Si 巳', animal: 'Kígyó', element: 'Tűz', trigramBinary: 0b101, trigramName: 'Li ☲' },
        { name: 'Wu 午', animal: 'Ló', element: 'Tűz', trigramBinary: 0b101, trigramName: 'Li ☲' },
        { name: 'Wei 未', animal: 'Kecske', element: 'Föld', trigramBinary: 0b000, trigramName: 'Kun ☷' },
        { name: 'Shen 申', animal: 'Majom', element: 'Fém', trigramBinary: 0b011, trigramName: 'Dui ☱' },
        { name: 'You 酉', animal: 'Kakas', element: 'Fém', trigramBinary: 0b011, trigramName: 'Dui ☱' },
        { name: 'Xu 戌', animal: 'Kutya', element: 'Föld', trigramBinary: 0b111, trigramName: 'Qian ☰' },
        { name: 'Hai 亥', animal: 'Disznó', element: 'Víz', trigramBinary: 0b010, trigramName: 'Kan ☵' }
      ];

      const stemIdx = yearIndex % 10;
      const branchIdx = yearIndex % 12;

      const upperTrigram = branches[branchIdx].trigramBinary;
      const lowerTrigram = stems[stemIdx].trigramBinary;
      const hexagramNumber = upperTrigram * 8 + lowerTrigram;

      const foundHexagram = hexagrams.find(h => h.binary === hexagramNumber);

      // Fallback: ha a keresés nem jár sikerrel, visszatérünk a természetes sorrendhez,
      // hogy elkerüljük az összeomlást.
      if (!foundHexagram) {
        return hexagrams[yearIndex];
      }

    return foundHexagram;
  };

 

  const getCurrentHexagram = (yearIndex) => {
    switch (activeMethod) {
      case 'natural': return getMethod1Hexagram(yearIndex, skipOption);
      case 'combined': return getMethod2Hexagram(yearIndex);
      case 'combvalue': return getMethod3Hexagram(yearIndex);
      case 'fuxi': return getMethod4Hexagram(yearIndex);
      case 'xuankong': return getMethod5Hexagram(yearIndex);
      case 'govinda': return getMethod6Hexagram(yearIndex);
      case 'govindauj': return getMethod7Hexagram(yearIndex);
      default: return getMethod1Hexagram(yearIndex, skipOption);
    }
  };

  // Validáció: ellenőrzi, hogy 60 különböző hexagram van-e
  const validateMethod = (method, option = 'option1') => {
    const hexagramCounts = {};
    const hexagramYears = {};

    for (let i = 0; i < 60; i++) {
      let hex;
      if (method === 'natural') hex = getMethod1Hexagram(i, option);
      else if (method === 'combined') hex = getMethod2Hexagram(i);
      else if (method === 'combvalue') hex = getMethod3Hexagram(i);
      else if (method === 'fuxi') hex = getMethod4Hexagram(i);
      else if (method === 'xuankong') hex = getMethod5Hexagram(i);
      else if (method === 'govinda') hex = getMethod6Hexagram(i);
      else if (method === 'govindauj') hex = getMethod7Hexagram(i);

      if (!hexagramCounts[hex.num]) {
        hexagramCounts[hex.num] = 0;
        hexagramYears[hex.num] = [];
      }
      hexagramCounts[hex.num]++;
      hexagramYears[hex.num].push(1984 + i);
    }

    const duplicatedHexagrams = [];
    const missingHexagrams = [];
    const skipped = method === 'natural' ? skipOptions[option].nums : method === 'xuankong' ? [4, 24, 44, 49] : [];
    const expectedHexagrams = hexagrams.filter(h => !skipped.includes(h.num)).map(h => h.num);

    Object.entries(hexagramCounts).forEach(([num, count]) => {
      if (count > 1) {
        duplicatedHexagrams.push({
          num: parseInt(num),
          count: count,
          years: hexagramYears[num]
        });
      }
    });

    expectedHexagrams.forEach(hexNum => {
      if (!hexagramCounts[hexNum]) {
        missingHexagrams.push(hexNum);
      }
    });

    return {
      unique: Object.keys(hexagramCounts).length,
      isValid: Object.keys(hexagramCounts).length === 60 && duplicatedHexagrams.length === 0,
      duplicates: duplicatedHexagrams,
      missing: missingHexagrams,
      skipped: skipped,
      totalAssigned: 60
    };
  };

  const validation = {
    natural: validateMethod('natural', skipOption),
    combined: validateMethod('combined'),
    combvalue: validateMethod('combvalue'),
    fuxi: validateMethod('fuxi'),
    xuankong: validateMethod('xuankong'),
    govinda: validateMethod('govinda'),
    govindauj: validateMethod('govindauj')
  };

  const currentYear = 2025;
  const currentYearData = years.find(y => y.year === currentYear);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">六十甲子 × 易經 六十四卦</h1>
        <h2 className="text-xl text-center mb-4 text-gray-600">Hatvanéves Ciklus - I Ching Hexagram Rendszer</h2>
        <p className="text-center text-sm text-gray-500 mb-4">1984-2043 ciklus (Jia Zi 甲子 - Gui Hai 癸亥)</p>

        {currentYearData && (
          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg mb-4 border-2 border-red-300">
            <p className="text-center font-semibold text-lg">
              🐍 Jelenlegi év: <span className="text-red-700">{currentYear}</span> -
              <span className="text-red-800 ml-2">{currentYearData.stem.name} {currentYearData.branch.name}</span>
              <span className="ml-2">({currentYearData.stem.element} {currentYearData.branch.animal})</span>
            </p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-700">Válassz módszert:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { key: 'natural', label: 'Módszer 1', desc: 'Természetes Sorrend', note: 'Wen Wang', activeClass: 'bg-blue-100 border-blue-500' },
              { key: 'combined', label: 'Módszer 2', desc: 'Törzs-Ág Kombináció', note: 'Stem × Branch', activeClass: 'bg-green-100 border-green-500' },
              { key: 'combvalue', label: 'Módszer 3', desc: 'Törzs-Ág Kombináció', note: 'Érték Alapú', activeClass: 'bg-yellow-100 border-yellow-500' },
              { key: 'fuxi', label: 'Módszer 4', desc: 'Fu Xi Bináris', note: 'Shao Yong', activeClass: 'bg-purple-100 border-purple-500' },
              { key: 'xuankong', label: 'Módszer 5', desc: 'Xuankong Da Gua 玄空大卦', note: 'Tradicionális Feng Shui', activeClass: 'bg-red-100 border-red-500' },
              { key: 'govinda', label: 'Módszer 6', desc: 'Govinda Törzs-Ág Eredeti', note: 'Fa→☴,Tűz→☲,Föld→☷,Fém→☱,Víz→☵', activeClass: 'bg-pink-100 border-pink-500' },
              { key: 'govindauj', label: 'Módszer 7', desc: 'Govinda Törzs-Ág Módosított', note: 'Fa→☳☴,Tűz→☲☲,Föld→☷☶,Fém→☰☱,Víz→☵☵', activeClass: 'bg-teal-100 border-teal-500' }
            ].map(m => (
              <button key={m.key} onClick={() => setActiveMethod(m.key)}
                className={`p-4 rounded-lg border-2 transition-all ${activeMethod === m.key ? m.activeClass : 'bg-white border-gray-300'}`}>
                <div className="font-semibold">{m.label}</div>
                <div className="text-sm text-gray-600">{m.desc}</div>
                <div className="text-xs mt-2 text-gray-500">{m.note}</div>
              </button>
            ))}
          </div>
        </div>

        {activeMethod === 'natural' && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-700">Kihagyási opció (Módszer 1):</h3>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(skipOptions).map(([key, opt]) => (
                <button key={key} onClick={() => setSkipOption(key)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${skipOption === key ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}>
                  <div className="font-semibold">{opt.name}</div>
                  <div className="text-xs text-gray-500 mt-1">Kihagyva: {opt.nums.join(', ')}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <button onClick={() => setShowValidation(!showValidation)}
          className="w-full mb-4 p-3 bg-indigo-100 hover:bg-indigo-200 rounded-lg flex items-center justify-center gap-2">
          {showValidation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          <span className="font-semibold">Rendszer Validáció</span>
        </button>

        {showValidation && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Validációs Eredmények:</h3>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(validation).map(([method, result]) => (
                <div key={method} className={`p-4 rounded-lg border-2 ${result.isValid ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {result.isValid ? <CheckCircle className="text-green-600" size={20} /> : <AlertCircle className="text-red-600" size={20} />}
                    <span className="font-semibold text-lg">
                      {method === 'natural' ? 'Módszer 1' : method === 'combined' ? 'Módszer 2' : method === 'combvalue' ? 'Módszer 3' : method === 'fuxi' ? 'Módszer 4' : method === 'xuankong' ? 'Módszer 5' : method === 'govinda' ? 'Módszer 6' : method === 'govindauj' ? 'Módszer 7' : ''}
                    </span>
                  </div>
                  <div className="text-sm mb-2">Egyedi: {result.unique}/60 | Kihagyva: {result.skipped.join(', ') || 'nincs'}</div>
                  {result.duplicates.length > 0 && (
                    <div className="mt-2 p-2 bg-red-100 rounded text-xs">
                      Duplikált: {result.duplicates.map(d => `#${d.num} (${d.count}×)`).join(', ')}
                    </div>
                  )}
                  {result.missing.length > 0 && (
                    <div className="mt-2 p-2 bg-yellow-100 rounded text-xs">
                      Hiányzó: {result.missing.slice(0, 10).join(', ')}{result.missing.length > 10 && '...'}
                    </div>
                  )}
                  {result.isValid && <div className="mt-2 text-sm text-green-800">✅ Helyes!</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2">Év</th>
                <th className="p-2">Törzs</th>
                <th className="p-2">Ág</th>
                <th className="p-2">Hexagram</th>
                <th className="p-2">Jelentés</th>
                <th className="p-2">Rajz</th>
                <th className="p-2">Dec/Oct</th>
              </tr>
            </thead>
            <tbody>
              {years.map((yearData, idx) => {
                const hex = getCurrentHexagram(idx);
                const isCurrentYear = yearData.year === currentYear;
                return (
                  <tr key={idx} className={`border-b hover:bg-gray-50 ${isCurrentYear ? 'bg-red-100 font-semibold' : ''}`}>
                    <td className="p-2">{yearData.year}{isCurrentYear && ' ⬅'}</td>
                    <td className="p-2">{yearData.stem.name}<br /><span className="text-xs text-gray-500">{yearData.stem.element}</span></td>
                    <td className="p-2">{yearData.branch.name}<br /><span className="text-xs text-gray-500">{yearData.branch.animal}</span></td>
                    <td className="p-2">#{hex.num} {hex.name}</td>
                    <td className="p-2">{hex.meaning}</td>
                    <td className="p-2">{renderHexagram(hex.binary)}</td>
                    <td className="p-2 font-mono">{hex.binary}/{hex.binary.toString(8)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SexagenaryHexagramSystem;
