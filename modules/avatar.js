/* ==========================================
   ScholarQuest Avatar Module
   Generates & Updates customizable SVG Avatar
   ========================================== */

import { state } from '../app.js';

// SVG Accessory Drawings
const ACCESSORIES_SVG = {
  head: {
    none: '',
    wizard_hat: `
      <!-- Wizard Hat -->
      <path d="M 50 40 L 95 105 L 145 105 Z" fill="#4c1d95" stroke="#a855f7" stroke-width="3" />
      <ellipse cx="95" cy="105" rx="55" ry="10" fill="#3b0764" stroke="#a855f7" stroke-width="2" />
      <polygon points="90,65 98,72 108,68 100,60" fill="#eab308" />
    `,
    knight_helmet: `
      <!-- Knight Helmet -->
      <rect x="65" y="55" width="60" height="52" rx="15" fill="#64748b" stroke="#334155" stroke-width="3" />
      <path d="M 65 85 L 125 85 L 125 90 L 65 90 Z" fill="#1e293b" />
      <line x1="80" y1="85" x2="80" y2="98" stroke="#475569" stroke-width="2" />
      <line x1="95" y1="85" x2="95" y2="98" stroke="#475569" stroke-width="2" />
      <line x1="110" y1="85" x2="110" y2="98" stroke="#475569" stroke-width="2" />
      <path d="M 95 55 L 95 38 L 105 32 L 95 48 Z" fill="#ef4444" />
    `,
    headphones: `
      <!-- Coder Headphones -->
      <path d="M 58 85 A 38 38 0 0 1 132 85" fill="none" stroke="#06b6d4" stroke-width="6" stroke-linecap="round" />
      <rect x="52" y="78" width="12" height="24" rx="4" fill="#0891b2" stroke="#22d3ee" stroke-width="1.5" />
      <rect x="126" y="78" width="12" height="24" rx="4" fill="#0891b2" stroke="#22d3ee" stroke-width="1.5" />
      <circle cx="58" cy="90" r="2" fill="#22d3ee" />
    `
  },
  hand: {
    none: '',
    light_sword: `
      <!-- Light Sword -->
      <g transform="translate(145, 110) rotate(15)">
        <rect x="-3" y="-55" width="6" height="50" rx="3" fill="#38bdf8" stroke="#0ea5e9" stroke-width="1.5" filter="drop-shadow(0 0 5px #0ea5e9)" />
        <rect x="-8" y="-5" width="16" height="4" fill="#e2e8f0" />
        <rect x="-3" y="-1" width="6" height="12" fill="#475569" rx="1" />
        <circle cx="0" cy="13" r="2" fill="#eab308" />
      </g>
    `,
    wizard_staff: `
      <!-- Wizard Staff -->
      <g transform="translate(145, 100)">
        <rect x="-2" y="-60" width="4" height="110" fill="#78350f" rx="2" />
        <circle cx="0" cy="-65" r="12" fill="#a855f7" filter="drop-shadow(0 0 6px #c084fc)" />
        <path d="M -12 -65 L -4 -58 L 0 -72 Z" fill="#eab308" />
        <path d="M 12 -65 L 4 -58 L 0 -72 Z" fill="#eab308" />
      </g>
    `,
    focus_shield: `
      <!-- Focus Shield -->
      <g transform="translate(140, 110)">
        <path d="M -16 -20 L 16 -20 C 16 -20 18 10 0 25 C -18 10 -16 -20 -16 -20 Z" fill="#10b981" stroke="#34d399" stroke-width="2.5" />
        <path d="M -10 -15 L 10 -15 C 10 -15 11 5 0 16 C -11 5 -10 -15 -10 -15 Z" fill="#047857" />
        <polygon points="0,-8 -6,6 6,6" fill="#fbbf24" />
      </g>
    `
  }
};

// SVG Eyes Drawings
const EYES_SVG = {
  happy: `
    <path d="M 78 86 A 6 6 0 0 1 88 86" fill="none" stroke="#1f2937" stroke-width="3.5" stroke-linecap="round" />
    <path d="M 102 86 A 6 6 0 0 1 112 86" fill="none" stroke="#1f2937" stroke-width="3.5" stroke-linecap="round" />
  `,
  cool: `
    <!-- Sunglasses -->
    <path d="M 72 80 L 118 80 L 115 90 C 112 96 103 96 100 90 L 95 85 L 90 90 C 87 96 78 96 75 90 Z" fill="#111827" stroke="#9ca3af" stroke-width="1.5" />
    <line x1="75" y1="84" x2="85" y2="88" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
    <line x1="102" y1="84" x2="112" y2="88" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
  `,
  focus: `
    <circle cx="83" cy="88" r="5" fill="#f59e0b" stroke="#fff" stroke-width="1" />
    <circle cx="107" cy="88" r="5" fill="#f59e0b" stroke="#fff" stroke-width="1" />
    <circle cx="84" cy="86" r="1.5" fill="#fff" />
    <circle cx="108" cy="86" r="1.5" fill="#fff" />
  `,
  nerd: `
    <!-- Glasses -->
    <circle cx="81" cy="88" r="9" fill="none" stroke="#000" stroke-width="2.5" />
    <circle cx="109" cy="88" r="9" fill="none" stroke="#000" stroke-width="2.5" />
    <line x1="90" y1="88" x2="100" y2="88" stroke="#000" stroke-width="2.5" />
    <circle cx="81" cy="88" r="3" fill="#000" />
    <circle cx="109" cy="88" r="3" fill="#000" />
  `,
  sparkle: `
    <!-- Sparkle Stars -->
    <path d="M 81 78 L 83 83 L 88 85 L 83 87 L 81 92 L 79 87 L 74 85 L 79 83 Z" fill="#eab308" />
    <path d="M 109 78 L 111 83 L 116 85 L 111 87 L 109 92 L 107 87 L 102 85 L 107 83 Z" fill="#eab308" />
  `
};

export function initAvatar() {
  updateAvatarRender();
}

// Re-generate and draw SVG
export function updateAvatarRender() {
  const container = document.getElementById('avatar-svg-wrapper');
  if (!container) return;

  const skin = state.avatar.skin || '#fbcfe8';
  const clothes = state.avatar.clothes || '#8b5cf6';
  const eyesStyle = state.avatar.eyes || 'happy';
  
  // Equips
  const headEquip = state.equipped.head || 'none';
  const handEquip = state.equipped.hand || 'none';
  
  // Render Rank aura/visual evolution
  const lvl = state.level;
  let levelAura = '';
  let levelDetails = '';
  
  if (lvl >= 25) { // Legend
    levelAura = `
      <circle cx="95" cy="100" r="70" fill="none" stroke="#f59e0b" stroke-width="5" stroke-dasharray="10 5" filter="drop-shadow(0 0 10px #f59e0b)" />
      <circle cx="95" cy="100" r="78" fill="none" stroke="#e9d5ff" stroke-width="1" opacity="0.3" />
    `;
    levelDetails = `
      <!-- Legendary Cape & Crown Trim -->
      <path d="M 40 120 L 20 180 L 170 180 L 150 120 Z" fill="#d946ef" opacity="0.6" stroke="#f472b6" stroke-width="2" />
      <polygon points="75,55 95,35 115,55 105,65 85,65" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
      <circle cx="95" cy="35" r="3" fill="#ef4444" />
    `;
  } else if (lvl >= 18) { // Architect
    levelAura = `
      <circle cx="95" cy="100" r="68" fill="none" stroke="#a855f7" stroke-width="3" stroke-dasharray="5 5" filter="drop-shadow(0 0 8px #a855f7)" />
    `;
    levelDetails = `
      <!-- Architect Robe trim -->
      <path d="M 52 110 L 95 125 L 138 110 Z" fill="#eab308" opacity="0.8" />
    `;
  } else if (lvl >= 12) { // Developer
    levelAura = `
      <circle cx="95" cy="100" r="64" fill="none" stroke="#06b6d4" stroke-width="2.5" opacity="0.7" filter="drop-shadow(0 0 6px #22d3ee)" />
    `;
    levelDetails = `
      <!-- Dev Glowing Belt -->
      <rect x="75" y="148" width="40" height="6" rx="3" fill="#06b6d4" filter="drop-shadow(0 0 4px #06b6d4)" />
    `;
  } else if (lvl >= 7) { // Coder
    levelAura = `
      <circle cx="95" cy="100" r="60" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.5" />
    `;
  } else if (lvl >= 3) { // Apprentice
    levelDetails = `
      <!-- Small rank ribbon -->
      <polygon points="90,150 95,160 100,150 97,144 93,144" fill="#ef4444" />
    `;
  }

  // Generate SVG code
  const svgHTML = `
    <svg viewBox="0 0 190 200" class="avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.25" />
          <stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0" />
        </radialGradient>
      </defs>
      
      <!-- Background Glow -->
      <circle cx="95" cy="100" r="90" fill="url(#avatarGlow)" />
      
      <!-- Level Aura -->
      ${levelAura}
      
      <!-- Level Details (Cape/Belt/Crown) -->
      ${levelDetails}
      
      <!-- Body / Robe -->
      <path d="M 50 160 C 50 120, 140 120, 140 160 C 140 175, 50 175, 50 160 Z" fill="${clothes}" stroke="#1f2937" stroke-width="3" />
      <path d="M 80 120 L 95 145 L 110 120 Z" fill="${skin}" stroke="#1f2937" stroke-width="1.5" />
      
      <!-- Head -->
      <circle cx="95" cy="95" r="36" fill="${skin}" stroke="#1f2937" stroke-width="3" />
      
      <!-- Cheeks Blush -->
      <circle cx="69" cy="98" r="4.5" fill="#f43f5e" opacity="0.35" />
      <circle cx="121" cy="98" r="4.5" fill="#f43f5e" opacity="0.35" />
      
      <!-- Eyes -->
      ${EYES_SVG[eyesStyle] || EYES_SVG.happy}
      
      <!-- Smile -->
      <path d="M 90 108 Q 95 114 100 108" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linecap="round" />
      
      <!-- Hand Weapon/Shield Accessory -->
      ${ACCESSORIES_SVG.hand[handEquip] || ''}
      
      <!-- Head Gear Accessory -->
      ${ACCESSORIES_SVG.head[headEquip] || ''}
    </svg>
  `;
  
  container.innerHTML = svgHTML;
  
  // Render equipped label slots below
  const slotsContainer = document.getElementById('equipped-accessories');
  if (slotsContainer) {
    const headName = headEquip !== 'none' ? headEquip.replace('_', ' ') : 'Empty Head';
    const handName = handEquip !== 'none' ? handEquip.replace('_', ' ') : 'Empty Hand';
    slotsContainer.innerHTML = `
      <span class="equip-slot-lbl"><i data-lucide="crown" style="width:10px;height:10px;vertical-align:middle;"></i> ${headName}</span>
      <span class="equip-slot-lbl"><i data-lucide="shield" style="width:10px;height:10px;vertical-align:middle;"></i> ${handName}</span>
    `;
    if (window.lucide) window.lucide.createIcons();
  }
}
