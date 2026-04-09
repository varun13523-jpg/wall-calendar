//import React, { useMemo } from 'react';
import './HeroPanel.css';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

// Each month gets a unique SVG landscape scene
const SCENES = [
  // January - snow peaks
  { bg: ['#0a1628','#1a3a5c'], scene: (
    <g>
      <defs>
        <linearGradient id="jan-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1628"/>
          <stop offset="100%" stopColor="#1a3a5c"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#jan-sky)"/>
      <polygon points="0,260 180,80 360,180 500,60 640,160 780,50 900,120 900,260" fill="#1e3a5f" opacity="0.8"/>
      <polygon points="500,60 580,160 420,160" fill="#e8f0fa" opacity="0.9"/>
      <polygon points="780,50 840,130 720,130" fill="#e8f0fa" opacity="0.8"/>
      <circle cx="820" cy="40" r="22" fill="#fff" opacity="0.12"/>
      {[...Array(30)].map((_,i) => (
        <circle key={i} cx={Math.sin(i*137)*420+450} cy={Math.cos(i*97)*90+80} r="1" fill="#fff" opacity={0.3+Math.sin(i)*0.3}/>
      ))}
    </g>
  )},
  // February - aurora
  { bg: ['#0d1a2e','#1a3a2e'], scene: (
    <g>
      <defs>
        <linearGradient id="feb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1a2e"/>
          <stop offset="100%" stopColor="#1a3a2e"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#feb-sky)"/>
      <ellipse cx="450" cy="80" rx="350" ry="60" fill="none" stroke="#4ade80" strokeWidth="30" opacity="0.08"/>
      <ellipse cx="450" cy="100" rx="280" ry="50" fill="none" stroke="#22d3ee" strokeWidth="20" opacity="0.1"/>
      <polygon points="0,260 200,140 400,200 600,130 900,180 900,260" fill="#0f2018"/>
      {[...Array(40)].map((_,i) => (
        <circle key={i} cx={Math.sin(i*97)*430+450} cy={Math.cos(i*137)*70+60} r="1.2" fill="#fff" opacity={0.4+Math.sin(i*2)*0.3}/>
      ))}
    </g>
  )},
  // March - spring hills
  { bg: ['#1a3020','#2d5a3a'], scene: (
    <g>
      <defs>
        <linearGradient id="mar-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6bbf8e"/>
          <stop offset="100%" stopColor="#a8d8b0"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#mar-sky)"/>
      <ellipse cx="800" cy="50" r="40" fill="#fff9c4" opacity="0.9"/>
      <ellipse cx="800" cy="50" r="55" fill="#fff" opacity="0.2"/>
      <ellipse cx="160" cy="240" rx="300" ry="120" fill="#2d7a3a"/>
      <ellipse cx="600" cy="260" rx="380" ry="100" fill="#3a8a45"/>
      <ellipse cx="900" cy="270" rx="200" ry="90" fill="#2d7a3a"/>
      {[20,120,250,380,520,680,820].map((x,i) => (
        <g key={i}>
          <rect x={x} y={150+i*5} width="3" height="25" fill="#5a3020" opacity="0.6"/>
          <circle cx={x+1.5} cy={148+i*5} r="10" fill="#ff9eb5" opacity="0.7"/>
        </g>
      ))}
    </g>
  )},
  // April - rainy lake
  { bg: ['#2a3a4a','#3a5a6a'], scene: (
    <g>
      <defs>
        <linearGradient id="apr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a4a5a"/>
          <stop offset="100%" stopColor="#5a7a8a"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#apr-sky)"/>
      <rect x="0" y="160" width="900" height="100" fill="#2a4a5a" opacity="0.8"/>
      <polygon points="0,260 120,100 240,180 380,90 520,160 700,80 900,130 900,200 0,200" fill="#1a3a4a" opacity="0.9"/>
      {[...Array(50)].map((_,i) => (
        <line key={i} x1={Math.random()*900|0} y1={0} x2={(Math.random()*900-10)|0} y2={30} stroke="#8ac" strokeWidth="0.8" opacity="0.3"/>
      ))}
      {[...Array(8)].map((_,i) => (
        <ellipse key={i} cx={100+i*110} cy={175+i%2*8} rx={12+i*2} ry="3" fill="none" stroke="#6af" strokeWidth="0.8" opacity="0.4"/>
      ))}
    </g>
  )},
  // May - wildflower meadow
  { bg: ['#1a3020','#2d5a3a'], scene: (
    <g>
      <defs>
        <linearGradient id="may-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87ceeb"/>
          <stop offset="100%" stopColor="#c5e8f5"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#may-sky)"/>
      <ellipse cx="700" cy="50" r="35" fill="#fff9" />
      <ellipse cx="640" cy="60" r="22" fill="#fff8" />
      <ellipse cx="760" cy="45" r="28" fill="#fff7" />
      <rect x="0" y="160" width="900" height="100" fill="#3a7a2a"/>
      {[...Array(60)].map((_,i) => {
        const x = (i * 15.3) % 900;
        const y = 155 + (i % 5) * 8;
        const colors = ['#ff6b9d','#ffd700','#ff8c42','#a855f7','#f472b6'];
        return <circle key={i} cx={x} cy={y} r="5" fill={colors[i%5]} opacity="0.85"/>;
      })}
    </g>
  )},
  // June - sunset ocean
  { bg: ['#7a2a1a','#c47a2a'], scene: (
    <g>
      <defs>
        <linearGradient id="jun-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a3a"/>
          <stop offset="40%" stopColor="#c0392b"/>
          <stop offset="100%" stopColor="#e67e22"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#jun-sky)"/>
      <ellipse cx="450" cy="160" rx="50" ry="50" fill="#ffd700" opacity="0.9"/>
      <rect x="0" y="170" width="900" height="90" fill="#1a3a5a" opacity="0.85"/>
      {[...Array(12)].map((_,i) => (
        <rect key={i} x={i*78} y={170} width={38} height="5" fill="#ffd700" opacity={0.1+i%3*0.1}/>
      ))}
    </g>
  )},
  // July - forest
  { bg: ['#0a1a0f','#1a3a1f'], scene: (
    <g>
      <defs>
        <linearGradient id="jul-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a2a14"/>
          <stop offset="100%" stopColor="#1a4a20"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#jul-sky)"/>
      {[0,80,160,240,320,400,480,560,640,720,800].map((x,i) => (
        <g key={i}>
          <rect x={x+20} y={80+i%3*20} width="12" height={160-i%3*20} fill="#1a3a10"/>
          <polygon points={`${x+26},${80+i%3*20} ${x+60},${130+i%3*20} ${x-8},${130+i%3*20}`} fill={`hsl(${120+i*5},40%,${18+i%3*4}%)`}/>
          <polygon points={`${x+26},${60+i%3*20} ${x+55},${110+i%3*20} ${x-3},${110+i%3*20}`} fill={`hsl(${125+i*5},42%,${22+i%3*4}%)`}/>
        </g>
      ))}
      <circle cx="750" cy="30" r="18" fill="#fffde7" opacity="0.7"/>
    </g>
  )},
  // August - desert dunes
  { bg: ['#4a2a0a','#8a5a2a'], scene: (
    <g>
      <defs>
        <linearGradient id="aug-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a3a"/>
          <stop offset="100%" stopColor="#4a2a6a"/>
        </linearGradient>
        <linearGradient id="aug-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8961e"/>
          <stop offset="100%" stopColor="#8a6020"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#aug-sky)"/>
      <ellipse cx="450" cy="40" rx="200" ry="8" fill="#ffd700" opacity="0.1"/>
      <ellipse cx="700" cy="100" rx="8" ry="8" fill="#ffd700" opacity="0.9"/>
      <ellipse cx="120" cy="80" rx="6" ry="6" fill="#ffd700" opacity="0.6"/>
      <path d="M0,200 Q200,140 450,170 Q700,200 900,150 L900,260 L0,260Z" fill="url(#aug-sand)"/>
      <path d="M0,220 Q150,180 300,200 Q450,220 600,190 Q750,165 900,180 L900,260 L0,260Z" fill="#a07828" opacity="0.7"/>
    </g>
  )},
  // September - golden harvest
  { bg: ['#2a1a0a','#5a3a1a'], scene: (
    <g>
      <defs>
        <linearGradient id="sep-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a6a8a"/>
          <stop offset="100%" stopColor="#8aaa7a"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#sep-sky)"/>
      <rect x="0" y="170" width="900" height="90" fill="#8a6a20"/>
      {[...Array(40)].map((_,i) => (
        <g key={i}>
          <rect x={i*23} y={125+(i%4)*10} width="3" height="55" fill="#c8961e" opacity="0.8"/>
          <ellipse cx={i*23+1.5} cy={120+(i%4)*10} rx="6" ry="12" fill="#daa520" opacity="0.85"/>
        </g>
      ))}
      <polygon points="100,170 200,90 300,170" fill="#3a5a2a" opacity="0.8"/>
      <polygon points="600,170 720,80 840,170" fill="#3a5a2a" opacity="0.7"/>
    </g>
  )},
  // October - autumn forest
  { bg: ['#2a1a0a','#4a2a1a'], scene: (
    <g>
      <defs>
        <linearGradient id="oct-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a4a1a"/>
          <stop offset="100%" stopColor="#c47a3a"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#oct-sky)"/>
      {[0,100,200,300,400,500,600,700,800].map((x,i) => {
        const colors = ['#c0392b','#e67e22','#f39c12','#d35400','#922b21'];
        return (
          <g key={i}>
            <rect x={x+30} y={90+i%3*15} width="10" height={150-i%3*15} fill="#5a2a0a"/>
            <circle cx={x+35} cy={90+i%3*15} r={35+i%3*5} fill={colors[i%5]} opacity="0.85"/>
            <circle cx={x+15} cy={110+i%3*15} r={25+i%2*8} fill={colors[(i+2)%5]} opacity="0.7"/>
            <circle cx={x+55} cy={105+i%3*15} r={28+i%2*6} fill={colors[(i+1)%5]} opacity="0.75"/>
          </g>
        );
      })}
    </g>
  )},
  // November - misty hills
  { bg: ['#1a2a2a','#2a3a3a'], scene: (
    <g>
      <defs>
        <linearGradient id="nov-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3a3a"/>
          <stop offset="100%" stopColor="#5a6a6a"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#nov-sky)"/>
      <ellipse cx="450" cy="120" rx="500" ry="80" fill="#fff" opacity="0.06"/>
      <ellipse cx="200" cy="180" rx="400" ry="60" fill="#fff" opacity="0.05"/>
      <polygon points="0,260 100,120 200,180 350,100 500,160 700,90 900,140 900,260" fill="#2a3a2a"/>
      <polygon points="0,260 50,160 180,200 350,140 550,190 800,150 900,170 900,260" fill="#1a2a1a" opacity="0.9"/>
      {[...Array(15)].map((_,i) => (
        <rect key={i} x={i*65} y={90+i%4*20} width="2" height="60" fill="#3a4a3a" opacity="0.5"/>
      ))}
    </g>
  )},
  // December - snow night
  { bg: ['#0a0f1a','#1a2a3a'], scene: (
    <g>
      <defs>
        <linearGradient id="dec-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#05080f"/>
          <stop offset="100%" stopColor="#0d1a2a"/>
        </linearGradient>
      </defs>
      <rect width="900" height="260" fill="url(#dec-sky)"/>
      {[...Array(60)].map((_,i) => (
        <circle key={i} cx={Math.sin(i*137.5)*440+450} cy={Math.cos(i*97)*90+70} r={0.8+i%3*0.4} fill="#fff" opacity={0.3+Math.sin(i)*0.4}/>
      ))}
      <polygon points="0,260 100,160 200,210 350,140 500,190 700,130 900,165 900,260" fill="#e8f0fa" opacity="0.9"/>
      <polygon points="0,260 50,200 200,240 400,210 600,230 800,205 900,220 900,260" fill="#fff" opacity="0.7"/>
      {[...Array(20)].map((_,i) => (
        <circle key={i} cx={i*48} cy={5+i%5*8} r="1.5" fill="#fff" opacity="0.6"/>
      ))}
    </g>
  )},
];

export default function HeroPanel({ month, year, onPrev, onNext }) {
  const scene = SCENES[month];

  return (
    <div className="hero-panel">
      <svg
        className="hero-svg"
        viewBox="0 0 900 260"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {scene.scene}
      </svg>

      <div className="hero-overlay" />

      <div className="hero-nav">
        <button className="nav-btn" onClick={onPrev} aria-label="Previous month">&#8249;</button>
        <button className="nav-btn" onClick={onNext} aria-label="Next month">&#8250;</button>
      </div>

      <div className="hero-label">
        <span className="hero-year-label">{year}</span>
        <h1 className="hero-month-label">{MONTHS[month]}</h1>
      </div>

      {/* Hanging notch detail */}
      <div className="hero-ring-bar">
        {[...Array(16)].map((_,i) => (
          <div key={i} className="hero-ring" />
        ))}
      </div>
    </div>
  );
}
