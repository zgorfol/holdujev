import { useState, useRef, useEffect, useCallback } from 'react';
import './Wensorrend.css';

const trigramNames = ['Kun ☷','Gen ☶','Kan ☵','Xun ☴','Zhen ☳','Li ☲','Dui ☱','Qian ☰'];
const trigramBin = ['000','001','010','011','100','101','110','111'];
const trigramSymbols = ['☷','☶','☵','☴','☳','☲','☱','☰'];

// Wen Wang / Later Heaven (後天八卦) elrendezés
// S(fent):Li, SW:Kun, W:Dui, NW:Qian, N(lent):Kan, NE:Gen, E:Zhen, SE:Xun
// Főtengely: Li ☲ (tűz) fent — Kan ☵ (víz) lent
const wenPaguaOrder = [5, 0, 6, 7, 2, 1, 4, 3];
const paguaAngle = {};
wenPaguaOrder.forEach((t, i) => {
  paguaAngle[t] = (i / 8) * Math.PI * 2 - Math.PI / 2;
});

const wenSequence = [
  [1,7,7,"Qian","乾"],[2,0,0,"Kun","坤"],
  [3,2,4,"Zhun","屯"],[4,1,2,"Meng","蒙"],
  [5,2,7,"Xu","需"],[6,7,2,"Song","訟"],
  [7,0,2,"Shi","師"],[8,2,0,"Bi","比"],
  [9,3,7,"Xiao Xu","小畜"],[10,7,6,"Lü","履"],
  [11,0,7,"Tai","泰"],[12,7,0,"Pi","否"],
  [13,7,5,"Tong Ren","同人"],[14,5,7,"Da You","大有"],
  [15,0,1,"Qian","謙"],[16,4,0,"Yu","豫"],
  [17,6,4,"Sui","隨"],[18,1,3,"Gu","蠱"],
  [19,0,6,"Lin","臨"],[20,3,0,"Guan","觀"],
  [21,5,4,"Shi He","噬嗑"],[22,1,5,"Bi","賁"],
  [23,1,0,"Bo","剝"],[24,0,4,"Fu","復"],
  [25,7,4,"Wu Wang","無妄"],[26,1,7,"Da Xu","大畜"],
  [27,1,4,"Yi","頤"],[28,6,3,"Da Guo","大過"],
  [29,2,2,"Kan","坎"],[30,5,5,"Li","離"],
  [31,6,1,"Xian","咸"],[32,4,3,"Heng","恆"],
  [33,7,1,"Dun","遯"],[34,4,7,"Da Zhuang","大壯"],
  [35,5,0,"Jin","晉"],[36,0,5,"Ming Yi","明夷"],
  [37,3,5,"Jia Ren","家人"],[38,5,6,"Kui","睽"],
  [39,2,1,"Jian","蹇"],[40,4,2,"Jie","解"],
  [41,1,6,"Sun","損"],[42,3,4,"Yi","益"],
  [43,6,7,"Guai","夬"],[44,7,3,"Gou","姤"],
  [45,6,0,"Cui","萃"],[46,0,3,"Sheng","升"],
  [47,6,2,"Kun","困"],[48,2,3,"Jing","井"],
  [49,6,5,"Ge","革"],[50,5,3,"Ding","鼎"],
  [51,4,4,"Zhen","震"],[52,1,1,"Gen","艮"],
  [53,3,1,"Jian","漸"],[54,4,6,"Gui Mei","歸妹"],
  [55,4,5,"Feng","豐"],[56,5,1,"Lü","旅"],
  [57,3,3,"Xun","巽"],[58,6,6,"Dui","兌"],
  [59,3,2,"Huan","渙"],[60,2,6,"Jie","節"],
  [61,3,6,"Zhong Fu","中孚"],[62,4,1,"Xiao Guo","小過"],
  [63,2,5,"Ji Ji","既濟"],[64,5,2,"Wei Ji","未濟"]
];

const pairs = [];
for (let i = 0; i < 64; i += 2) {
  pairs.push({
    index: i / 2,
    a: wenSequence[i],
    b: wenSequence[i + 1],
    canon: i < 30 ? 1 : 2
  });
}

const R = 250;

function createSvgEl(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function getTrigramPos(trigramIdx, radius = R) {
  const a = paguaAngle[trigramIdx];
  return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
}

function drawTrigramSymbol(x, y, trigramIdx) {
  const g = createSvgEl('g', { transform: `translate(${x},${y})` });
  const bits = trigramBin[trigramIdx];
  for (let row = 0; row < 3; row++) {
    const ry = (row - 1) * 7;
    if (bits[row] === '1') {
      g.appendChild(createSvgEl('rect', {
        x: -10, y: ry - 2, width: 20, height: 4, rx: 1,
        fill: '#f0e6d0', opacity: 0.9
      }));
    } else {
      g.appendChild(createSvgEl('rect', { x: -10, y: ry - 2, width: 8, height: 4, rx: 1, fill: '#f0e6d0', opacity: 0.7 }));
      g.appendChild(createSvgEl('rect', { x: 2, y: ry - 2, width: 8, height: 4, rx: 1, fill: '#f0e6d0', opacity: 0.7 }));
    }
  }
  return g;
}

function chordLength(t1, t2) {
  if (t1 === t2) return 0;
  const p1 = getTrigramPos(t1);
  const p2 = getTrigramPos(t2);
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function hexBinary(upper, lower) {
  return trigramBin[upper] + trigramBin[lower];
}

function yangWeight(upper, lower) {
  return hexBinary(upper, lower).split('').filter(b => b === '1').length;
}

function symmetryIndex(upper, lower) {
  const b = hexBinary(upper, lower);
  let s = 0;
  if (b[0] === b[5]) s++;
  if (b[1] === b[4]) s++;
  if (b[2] === b[3]) s++;
  return s;
}

function alternationIndex(upper, lower) {
  const b = hexBinary(upper, lower);
  let a = 0;
  for (let i = 0; i < 5; i++) {
    if (b[i] !== b[i + 1]) a++;
  }
  return a;
}

const WenPagua = () => {
  const svgRef = useRef(null);
  const [currentView, setCurrentView] = useState('spiral');
  const [visiblePairs, setVisiblePairs] = useState(32);
  const [layers, setLayers] = useState({ canon1: true, canon2: true, central: true });
  const [hexSymbol, setHexSymbol] = useState('☲☲');
  const [hexDetailsHtml, setHexDetailsHtml] = useState('');
  const [spiralNote, setSpiralNote] = useState(
    'A spirál a Wen-pagua körön — Li ☲ (tűz) fent, Kan ☵ (víz) lent a függőleges főtengelyen'
  );
  const animationTimerRef = useRef(null);
  const visiblePairsRef = useRef(32);

  const showPairInfo = useCallback((pairIdx) => {
    const pair = pairs[pairIdx];
    const a = pair.a;
    const b = pair.b;

    const hexUniBase = 0x4DC0;
    const symA = String.fromCodePoint(hexUniBase + a[0] - 1);
    const symB = String.fromCodePoint(hexUniBase + b[0] - 1);

    setHexSymbol(`${symA} ${symB}`);

    const cl = chordLength(a[1], a[2]);
    const w = yangWeight(a[1], a[2]);
    const s = symmetryIndex(a[1], a[2]);
    const alt = alternationIndex(a[1], a[2]);

    const isCentral = [1, 2, 63, 64].includes(a[0]);
    const isDot = [3, 4].includes(a[0]);

    let special = '';
    if (isCentral) special = `<div class="highlight" style="margin-top:6px; color:#b83a3a">→ Centrálhexagram</div>`;
    if (isDot) special = `<div class="highlight" style="margin-top:6px; color:#7a9a6a">→ Jin-jang „pötty" — az ellentét magjának megjelenése</div>`;

    const isSymPair = a[1] === a[2] || (hexBinary(a[1], a[2]) === hexBinary(a[1], a[2]).split('').reverse().join(''));
    const pairType = isSymPair ? 'Komplementer pár' : 'Megfordítás (inverz) pár';

    setHexDetailsHtml(`
      <div><span class="highlight">Wen #${a[0]}</span> — ${a[3]} (${a[4]}) | <span class="highlight">#${b[0]}</span> — ${b[3]} (${b[4]})</div>
      <div style="margin-top:4px">Felső: ${trigramSymbols[a[1]]} ${trigramNames[a[1]]} (${trigramBin[a[1]]}) | Alsó: ${trigramSymbols[a[2]]} ${trigramNames[a[2]]} (${trigramBin[a[2]]})</div>
      <div>Bináris: ${hexBinary(a[1], a[2])}</div>
      <div style="margin-top:4px">Jang-súly: ${w} | Szimmetria: ${s} | Alternálás: ${alt}</div>
      <div>Húrhossz: ${cl.toFixed(0)} (Wen-pagua körön)</div>
      <div style="margin-top:4px; color:#8a7235">${pairType} | ${pair.canon === 1 ? 'I.' : 'II.'} Kánon</div>
      ${special}
    `);
  }, []);

  const render = useCallback((view, pairsCount, layersState) => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = '';

    const defs = createSvgEl('defs', {});
    const grad = createSvgEl('radialGradient', { id: 'bgGrad', cx: '50%', cy: '50%', r: '50%' });
    grad.appendChild(createSvgEl('stop', { offset: '0%', 'stop-color': '#1a1a2a', 'stop-opacity': '0.3' }));
    grad.appendChild(createSvgEl('stop', { offset: '100%', 'stop-color': '#0a0a0f', 'stop-opacity': '0' }));
    defs.appendChild(grad);

    const glow = createSvgEl('filter', { id: 'glow' });
    glow.appendChild(createSvgEl('feGaussianBlur', { stdDeviation: '3', result: 'blur' }));
    const merge = createSvgEl('feMerge', {});
    merge.appendChild(createSvgEl('feMergeNode', { in: 'blur' }));
    merge.appendChild(createSvgEl('feMergeNode', { in: 'SourceGraphic' }));
    glow.appendChild(merge);
    defs.appendChild(glow);
    svg.appendChild(defs);

    svg.appendChild(createSvgEl('circle', { cx: 0, cy: 0, r: R + 40, fill: 'url(#bgGrad)' }));
    svg.appendChild(createSvgEl('circle', {
      cx: 0, cy: 0, r: R, fill: 'none',
      stroke: '#2a2a3a', 'stroke-width': 1, 'stroke-dasharray': '3,6', opacity: 0.6
    }));

    [0.25, 0.5, 0.75].forEach(f => {
      svg.appendChild(createSvgEl('circle', {
        cx: 0, cy: 0, r: R * f, fill: 'none',
        stroke: '#1a1a2a', 'stroke-width': 0.5, 'stroke-dasharray': '2,8'
      }));
    });

    for (let t = 0; t < 8; t++) {
      const pos = getTrigramPos(t);
      const labelPos = getTrigramPos(t, R + 35);

      svg.appendChild(createSvgEl('circle', {
        cx: pos.x, cy: pos.y, r: 5,
        fill: t >= 4 ? '#f0e6d0' : '#4a4a5a',
        opacity: 0.8,
        stroke: '#c8a44e', 'stroke-width': 0.5
      }));

      svg.appendChild(drawTrigramSymbol(labelPos.x, labelPos.y, t));

      const namePos = getTrigramPos(t, R + 58);
      const nameEl = createSvgEl('text', {
        x: namePos.x, y: namePos.y + 4,
        'text-anchor': 'middle', 'font-size': '9',
        'font-family': 'JetBrains Mono', fill: '#7a7468'
      });
      nameEl.textContent = trigramNames[t].split(' ')[0];
      svg.appendChild(nameEl);
    }

    if (view === 'spiral' || view === 'chords' || view === 'animate') {
      drawChords(svg, view, pairsCount, layersState);
    } else if (view === 'matrix') {
      drawMatrixView(svg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawChords = useCallback((svg, view, maxPairs, layersState) => {
    const chordsGroup = createSvgEl('g', { id: 'chords' });

    for (let pi = 0; pi < maxPairs; pi++) {
      const pair = pairs[pi];
      if (!layersState.canon1 && pair.canon === 1) continue;
      if (!layersState.canon2 && pair.canon === 2) continue;

      const isCentral = [1, 2, 63, 64].includes(pair.a[0]) || [1, 2, 63, 64].includes(pair.b[0]);
      const isDot = [3, 4].includes(pair.a[0]) || [3, 4].includes(pair.b[0]);

      const p1 = getTrigramPos(pair.a[1]);
      const p2 = getTrigramPos(pair.a[2]);

      let color, width, opacity;

      if (isCentral && layersState.central) {
        color = '#b83a3a'; width = 3; opacity = 0.9;
      } else if (isDot) {
        color = '#7a9a6a'; width = 2.5; opacity = 0.85;
      } else if (pair.canon === 1) {
        color = '#c8a44e'; width = 1.2; opacity = 0.35 + (pi / 32) * 0.3;
      } else {
        color = '#4a7a9b'; width = 1.2; opacity = 0.3 + ((pi - 15) / 17) * 0.35;
      }

      if (pair.a[1] === pair.a[2]) {
        const p = getTrigramPos(pair.a[1]);
        const dot = createSvgEl('circle', {
          cx: p.x, cy: p.y, r: isCentral ? 10 : 7,
          fill: 'none', stroke: color,
          'stroke-width': width, opacity: opacity,
          'data-pair': pi, cursor: 'pointer'
        });
        dot.addEventListener('click', () => showPairInfo(pi));
        chordsGroup.appendChild(dot);
      } else {
        if (view === 'spiral') {
          const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
          const dist = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
          const curveFactor = (pi / 32) * 40 * (pi % 2 === 0 ? 1 : -1);
          const nx = -(p2.y - p1.y) / dist;
          const ny = (p2.x - p1.x) / dist;
          const cp = { x: mid.x + nx * curveFactor, y: mid.y + ny * curveFactor };

          const path = createSvgEl('path', {
            d: `M ${p1.x} ${p1.y} Q ${cp.x} ${cp.y} ${p2.x} ${p2.y}`,
            fill: 'none', stroke: color,
            'stroke-width': width, opacity: opacity,
            'stroke-linecap': 'round',
            'data-pair': pi, cursor: 'pointer'
          });
          if (symmetryIndex(pair.a[1], pair.a[2]) === 3) {
            path.setAttribute('stroke-dasharray', '6,4');
          }
          path.addEventListener('click', () => showPairInfo(pi));
          chordsGroup.appendChild(path);
        } else {
          const line = createSvgEl('line', {
            x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
            stroke: color, 'stroke-width': width,
            opacity: opacity, 'stroke-linecap': 'round',
            'data-pair': pi, cursor: 'pointer'
          });
          if (symmetryIndex(pair.a[1], pair.a[2]) === 3) {
            line.setAttribute('stroke-dasharray', '6,4');
          }
          line.addEventListener('click', () => showPairInfo(pi));
          chordsGroup.appendChild(line);
        }
      }

      if (maxPairs <= 16 || isCentral || isDot) {
        const labelPos = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        if (pair.a[1] === pair.a[2]) { labelPos.x += 15; labelPos.y -= 5; }
        const label = createSvgEl('text', {
          x: labelPos.x, y: labelPos.y + 3,
          'text-anchor': 'middle', 'font-size': '8',
          'font-family': 'JetBrains Mono', fill: color,
          opacity: Math.min(1, opacity + 0.3),
          'pointer-events': 'none'
        });
        label.textContent = `${pair.a[0]}-${pair.b[0]}`;
        chordsGroup.appendChild(label);
      }
    }

    svg.appendChild(chordsGroup);
    drawTaijitu(svg);
  }, [showPairInfo]);

  const drawTaijitu = (svg) => {
    const g = createSvgEl('g', { opacity: '0.3' });
    const r = 20;
    g.appendChild(createSvgEl('path', {
      d: `M 0 ${-r} A ${r} ${r} 0 0 1 0 ${r} A ${r/2} ${r/2} 0 0 0 0 0 A ${r/2} ${r/2} 0 0 1 0 ${-r}`,
      fill: '#f0e6d0', opacity: '0.15'
    }));
    g.appendChild(createSvgEl('path', {
      d: `M 0 ${r} A ${r} ${r} 0 0 1 0 ${-r} A ${r/2} ${r/2} 0 0 0 0 0 A ${r/2} ${r/2} 0 0 1 0 ${r}`,
      fill: '#2a2a3a', opacity: '0.3'
    }));
    g.appendChild(createSvgEl('circle', { cx: 0, cy: -r/2, r: 3, fill: '#2a2a3a', opacity: '0.4' }));
    g.appendChild(createSvgEl('circle', { cx: 0, cy: r/2, r: 3, fill: '#f0e6d0', opacity: '0.2' }));
    g.appendChild(createSvgEl('circle', { cx: 0, cy: 0, r: r, fill: 'none', stroke: '#3a3a4a', 'stroke-width': 0.5 }));
    svg.appendChild(g);
  };

  const drawMatrixView = useCallback((svg) => {
    const cellSize = 50;
    const offset = -cellSize * 4;
    const g = createSvgEl('g', {});

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const upper = 7 - row;
        const lower = 7 - col;
        const wenEntry = wenSequence.find(h => h[1] === upper && h[2] === lower);
        const wenNum = wenEntry ? wenEntry[0] : '?';
        const isCentral = [1, 2, 63, 64].includes(wenNum);
        const isDot = [3, 4].includes(wenNum);
        const isCanon1 = wenNum <= 30;

        let fill = isCanon1 ? 'rgba(200,164,78,0.1)' : 'rgba(74,122,155,0.1)';
        if (isCentral) fill = 'rgba(184,58,58,0.25)';
        if (isDot) fill = 'rgba(122,154,106,0.2)';

        const x = offset + col * cellSize;
        const y = offset + row * cellSize;

        const rect = createSvgEl('rect', {
          x, y, width: cellSize - 2, height: cellSize - 2,
          fill, stroke: '#2a2a35', 'stroke-width': 0.5,
          rx: 3, cursor: 'pointer'
        });
        const pairIdx = pairs.findIndex(p => p.a[0] === wenNum || p.b[0] === wenNum);
        rect.addEventListener('click', () => { if (pairIdx >= 0) showPairInfo(pairIdx); });
        g.appendChild(rect);

        const text = createSvgEl('text', {
          x: x + cellSize / 2 - 1, y: y + cellSize / 2 + 4,
          'text-anchor': 'middle', 'font-size': '11',
          'font-family': 'JetBrains Mono',
          fill: isCentral ? '#b83a3a' : isDot ? '#7a9a6a' : isCanon1 ? '#c8a44e' : '#4a7a9b',
          opacity: 0.8, 'pointer-events': 'none'
        });
        text.textContent = wenNum;
        g.appendChild(text);
      }
    }

    for (let i = 0; i < 8; i++) {
      const t = 7 - i;
      const rowLabel = createSvgEl('text', {
        x: offset - 14, y: offset + i * cellSize + cellSize / 2 + 3,
        'text-anchor': 'middle', 'font-size': '16',
        fill: '#7a7468', 'pointer-events': 'none'
      });
      rowLabel.textContent = trigramSymbols[t];
      g.appendChild(rowLabel);

      const colLabel = createSvgEl('text', {
        x: offset + i * cellSize + cellSize / 2 - 1, y: offset - 10,
        'text-anchor': 'middle', 'font-size': '16',
        fill: '#7a7468', 'pointer-events': 'none'
      });
      colLabel.textContent = trigramSymbols[t];
      g.appendChild(colLabel);
    }

    const upperLabel = createSvgEl('text', {
      x: offset - 14, y: offset - 28,
      'text-anchor': 'middle', 'font-size': '9',
      'font-family': 'JetBrains Mono', fill: '#5a5a6a'
    });
    upperLabel.textContent = 'Felső ↓';
    g.appendChild(upperLabel);

    const lowerLabel = createSvgEl('text', {
      x: offset + cellSize * 2, y: offset - 28,
      'text-anchor': 'middle', 'font-size': '9',
      'font-family': 'JetBrains Mono', fill: '#5a5a6a'
    });
    lowerLabel.textContent = 'Alsó →';
    g.appendChild(lowerLabel);

    svg.appendChild(g);
  }, [showPairInfo]);

  useEffect(() => {
    render(currentView, visiblePairs, layers);
  }, [currentView, visiblePairs, layers, render]);

  useEffect(() => {
    showPairInfo(0);
  }, [showPairInfo]);

  const handleSetView = (view) => {
    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    setCurrentView(view);

    const notes = {
      spiral: 'A spirál a Wen-pagua körön — Li ☲ (tűz) fent, Kan ☵ (víz) lent a függőleges főtengelyen',
      chords: 'Egyenes húrok a Wen-pagua körön — minden húr egy hexagrampárt képvisel. Figyeld meg a Li↔Kan tengely központi szerepét.',
      matrix: '8×8-as trigram-mátrix. A számok a Wen-féle sorszámot mutatják. Figyeld meg az I. és II. Kánon eloszlását!',
      animate: 'A Wen-féle sorrend kibontakozása a Wen-pagua elrendezésen — a kozmogóniai spirál időbeli megjelenítése'
    };
    setSpiralNote(notes[view] || '');

    if (view === 'animate') {
      visiblePairsRef.current = 0;
      setVisiblePairs(0);

      animationTimerRef.current = setInterval(() => {
        if (visiblePairsRef.current >= 32) {
          clearInterval(animationTimerRef.current);
          animationTimerRef.current = null;
          return;
        }
        visiblePairsRef.current++;
        setVisiblePairs(visiblePairsRef.current);
        showPairInfo(visiblePairsRef.current - 1);
      }, 600);
    }
  };

  useEffect(() => {
    return () => {
      if (animationTimerRef.current) clearInterval(animationTimerRef.current);
    };
  }, []);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value);
    visiblePairsRef.current = val;
    setVisiblePairs(val);
  };

  const toggleLayer = (layer) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const buildSideMatrix = () => {
    const cells = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const upper = 7 - row;
        const lower = 7 - col;
        const wenEntry = wenSequence.find(h => h[1] === upper && h[2] === lower);
        const wenNum = wenEntry ? wenEntry[0] : '?';
        const isCentral = [1, 2, 63, 64].includes(wenNum);
        const isDot = [3, 4].includes(wenNum);
        const isCanon1 = wenNum <= 30;

        let bg = isCanon1 ? 'rgba(200,164,78,0.15)' : 'rgba(74,122,155,0.15)';
        let color = isCanon1 ? '#c8a44e' : '#4a7a9b';
        if (isCentral) { bg = 'rgba(184,58,58,0.3)'; color = '#b83a3a'; }
        if (isDot) { bg = 'rgba(122,154,106,0.25)'; color = '#7a9a6a'; }

        const pairIdx = pairs.findIndex(p => p.a[0] === wenNum || p.b[0] === wenNum);
        cells.push(
          <div
            key={`${row}-${col}`}
            className="pair-cell"
            style={{ background: bg, color }}
            onClick={() => { if (pairIdx >= 0) showPairInfo(pairIdx); }}
          >
            {wenNum}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="wen-root">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet" />
      <div className="container">
        <h1>後天八卦序卦 <span>Wen király sorrendje — Wen-pagua (後天) elrendezés</span></h1>

        <div className="main-layout">
          <div className="circle-panel">
            <div className="svg-container">
              <svg ref={svgRef} viewBox="-320 -320 640 640"></svg>
            </div>
            <p className="taijitu-note">{spiralNote}</p>
          </div>

          <div className="side-panel">
            <div className="controls">
              <h3>⚙ Megjelenítés</h3>
              <div className="btn-row">
                <button className={`btn ${currentView === 'spiral' ? 'active' : ''}`} onClick={() => handleSetView('spiral')}>Spirál</button>
                <button className={`btn ${currentView === 'chords' ? 'active' : ''}`} onClick={() => handleSetView('chords')}>Húrok</button>
                <button className={`btn ${currentView === 'matrix' ? 'active' : ''}`} onClick={() => handleSetView('matrix')}>Mátrix</button>
                <button className={`btn ${currentView === 'animate' ? 'active' : ''}`} onClick={() => handleSetView('animate')}>Animáció</button>
              </div>
              <div className="slider-group">
                <label><span>Megmutatott párok</span><span>{visiblePairs} / 32</span></label>
                <input type="range" min="0" max="32" value={visiblePairs} onChange={handleSliderChange} />
              </div>
              <div className="btn-row">
                <button className={`btn ${layers.canon1 ? 'active' : ''}`} onClick={() => toggleLayer('canon1')}>I. Kánon</button>
                <button className={`btn ${layers.canon2 ? 'active' : ''}`} onClick={() => toggleLayer('canon2')}>II. Kánon</button>
                <button className={`btn ${layers.central ? 'active' : ''}`} onClick={() => toggleLayer('central')}>Centrálok</button>
              </div>
            </div>

            <div className="info-box">
              <h3>☲ Hexagram információ</h3>
              <div className="hex-symbol">{hexSymbol}</div>
              <div className="hex-info" dangerouslySetInnerHTML={{ __html: hexDetailsHtml }} />
            </div>

            <div className="legend">
              <h3>Jelmagyarázat</h3>
              <div className="legend-item">
                <div className="legend-swatch" style={{ background: 'var(--gold)' }}></div>
                <span>I. Kánon (1–30)</span>
              </div>
              <div className="legend-item">
                <div className="legend-swatch" style={{ background: 'var(--blue)' }}></div>
                <span>II. Kánon (31–64)</span>
              </div>
              <div className="legend-item">
                <div className="legend-swatch" style={{ background: 'var(--red)', height: '5px' }}></div>
                <span>Centrálhexagramok (1,2,63,64)</span>
              </div>
              <div className="legend-item">
                <div className="legend-swatch" style={{ background: '#7a9a6a', height: '4px' }}></div>
                <span>Jin-Jang „pötty" (3,4)</span>
              </div>
              <div className="legend-item">
                <div className="legend-swatch" style={{ background: 'var(--yang)', height: '1px', border: '1px dashed var(--text-dim)' }}></div>
                <span>Szimmetrikus párok (komplementer)</span>
              </div>

              <h3 style={{ marginTop: '14px' }}>8×8 Trigram-mátrix</h3>
              <div className="pair-display">
                {buildSideMatrix()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WenPagua;
